import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import type { AuthUser, LoginPayload } from "@/types/auth";

const SESSION_KEY = "sinden_auth_user";

export function getCurrentUser(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setCurrentUser(user: AuthUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terlebih dahulu.");
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message || "Email atau password salah.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, username, role, is_active")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    if (profileError?.code === "42501") {
      throw new Error("Akses tabel profiles ditolak. Jalankan SQL grant_api_permissions di Supabase.");
    }
    throw new Error("Profile pengguna belum dibuat.");
  }

  if (!profile.is_active) {
    await supabase.auth.signOut();
    throw new Error("Akun tidak aktif.");
  }

  const sessionUser: AuthUser = {
    id: profile.id,
    fullName: profile.full_name,
    username: profile.username ?? undefined,
    email: authData.user.email ?? undefined,
    role: profile.role,
    isActive: profile.is_active
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export async function logout() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(SESSION_KEY);
}

export async function getCurrentProfile() {
  if (!supabase) return getCurrentUser();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, username, role, is_active")
    .eq("id", data.user.id)
    .single();

  if (!profile) return null;

  const user: AuthUser = {
    id: profile.id,
    fullName: profile.full_name,
    username: profile.username ?? undefined,
    email: data.user.email ?? undefined,
    role: profile.role,
    isActive: profile.is_active
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

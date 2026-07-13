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
  return loginWithIdentifier(payload.identifier, payload.password);
}

export async function loginWithIdentifier(identifier: string, password: string): Promise<AuthUser> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terlebih dahulu.");
  }

  const email = await resolveIdentifier(identifier);

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError || !authData.user) {
    throw new Error(mapAuthError(authError?.message));
  }

  const sessionUser = await loadProfileForUser(authData.user.id, authData.user.email ?? email);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export async function resolveIdentifier(identifier: string) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
  const value = identifier.trim();
  if (!value) throw new Error("Username/NISN/NIP/Gmail wajib diisi.");
  if (value.includes("@")) return value.toLowerCase();

  const { data, error } = await supabase.rpc("resolve_login_identifier", { identifier_input: value });
  if (error) {
    throw new Error("Resolver login belum tersedia. Jalankan migration 010_login_identifier_and_profile_fields.sql di Supabase.");
  }

  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.email) {
    throw new Error("Akun tidak ditemukan. Periksa kembali username/NISN/NIP/Gmail.");
  }
  return String(result.email).toLowerCase();
}

export async function logout() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(SESSION_KEY);
}

export async function getCurrentProfile() {
  if (!supabase) return getCurrentUser();
  const { data: sessionData } = await supabase.auth.getSession();
  const sessionUser = sessionData.session?.user;
  if (!sessionUser) return null;

  const user = await loadProfileForUser(sessionUser.id, sessionUser.email ?? undefined);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

async function loadProfileForUser(userId: string, authEmail?: string): Promise<AuthUser> {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, username, email, role, is_active")
    .eq("id", userId)
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

  if (!["admin", "teacher", "student"].includes(profile.role)) {
    await supabase.auth.signOut();
    throw new Error("Role akun tidak valid.");
  }

  const user: AuthUser = {
    id: profile.id,
    fullName: profile.full_name,
    username: profile.username ?? undefined,
    email: profile.email ?? authEmail ?? undefined,
    role: profile.role,
    isActive: profile.is_active
  };
  return user;
}

function mapAuthError(message?: string) {
  const value = message?.toLowerCase() ?? "";
  if (value.includes("invalid login credentials")) return "Password salah atau akun tidak ditemukan.";
  if (value.includes("email not confirmed")) return "Email akun belum dikonfirmasi.";
  if (value.includes("too many")) return "Terlalu banyak percobaan login. Coba lagi beberapa saat.";
  return message || "Login gagal. Periksa kembali data akun.";
}

import { clearDataCache, handleSupabaseError, requireSupabase } from "./serviceUtils";

export interface CreateAccountPayload {
  role: "teacher" | "student";
  fullName: string;
  username: string;
  email?: string;
  fallbackIdentifier: string;
  password: string;
  phone?: string;
}

export async function createUserAccount(payload: CreateAccountPayload) {
  const client = requireSupabase();

  if (!payload.fullName.trim()) throw new Error("Nama lengkap wajib diisi.");
  if (!payload.username.trim() && !payload.fallbackIdentifier.trim()) throw new Error("Username atau identifier wajib diisi.");
  if (payload.password.length < 8) throw new Error("Password minimal 8 karakter");

  const { data, error } = await client.rpc("admin_create_account", {
    p_role: payload.role,
    p_full_name: payload.fullName,
    p_username: payload.username,
    p_email: payload.email || null,
    p_fallback_identifier: payload.fallbackIdentifier,
    p_password: payload.password,
    p_phone: payload.phone || null
  });

  if (error) handleSupabaseError(error, "Akun login gagal dibuat.");

  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.profile_id) throw new Error("Akun dibuat tetapi profile_id tidak diterima.");
  clearDataCache();

  return {
    profileId: String(result.profile_id),
    email: String(result.email),
    username: String(result.username)
  };
}

export async function resetUserPassword(profileId: string, password: string) {
  const client = requireSupabase();

  if (!profileId) throw new Error("Profile user tidak ditemukan.");
  if (password.length < 8) throw new Error("Password minimal 8 karakter");

  const { error } = await client.rpc("admin_reset_user_password", {
    p_profile_id: profileId,
    p_password: password
  });

  if (error) handleSupabaseError(error, "Password gagal diperbarui.");
  clearDataCache();
  return { ok: true };
}

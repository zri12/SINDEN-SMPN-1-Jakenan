import { requireSupabase } from "./serviceUtils";

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

  const { data, error } = await client.functions.invoke("admin-create-account", {
    body: payload
  });

  if (error) throw new Error(error.message || "Akun login gagal dibuat.");
  if (data?.error) throw new Error(String(data.error));
  if (!data?.profileId) throw new Error("Akun dibuat tetapi profile_id tidak diterima.");

  return data as { profileId: string; email: string; username: string };
}

export async function resetUserPassword(profileId: string, password: string) {
  const client = requireSupabase();

  if (!profileId) throw new Error("Profile user tidak ditemukan.");
  if (password.length < 8) throw new Error("Password minimal 8 karakter");

  const { data, error } = await client.functions.invoke("admin-reset-password", {
    body: { profileId, password }
  });

  if (error) {
    throw new Error(error.message || "Password gagal diperbarui.");
  }

  if (data?.error) {
    throw new Error(String(data.error));
  }

  return data;
}

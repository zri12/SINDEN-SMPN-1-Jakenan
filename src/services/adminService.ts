import { requireSupabase } from "./serviceUtils";

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

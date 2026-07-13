import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method tidak diizinkan." }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return json({ error: "Environment Supabase function belum lengkap." }, 500);
  }

  const authorization = req.headers.get("Authorization") ?? "";
  const token = authorization.replace("Bearer ", "");
  if (!token) {
    return json({ error: "Token login tidak ditemukan." }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } }
  });
  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData.user) {
    return json({ error: "Sesi admin tidak valid." }, 401);
  }

  const { data: adminProfile, error: adminProfileError } = await adminClient
    .from("profiles")
    .select("id, role, is_active")
    .eq("id", userData.user.id)
    .single();

  if (adminProfileError || !adminProfile || adminProfile.role !== "admin" || !adminProfile.is_active) {
    return json({ error: "Hanya admin aktif yang bisa reset password." }, 403);
  }

  const body = await req.json().catch(() => null) as { profileId?: string; password?: string } | null;
  const profileId = body?.profileId?.trim();
  const password = body?.password ?? "";

  if (!profileId) {
    return json({ error: "Profile user wajib dipilih." }, 400);
  }
  if (password.length < 8) {
    return json({ error: "Password minimal 8 karakter." }, 400);
  }

  const { data: targetProfile, error: targetProfileError } = await adminClient
    .from("profiles")
    .select("id, role, is_active")
    .eq("id", profileId)
    .single();

  if (targetProfileError || !targetProfile) {
    return json({ error: "Profile user tidak ditemukan." }, 404);
  }

  if (!["teacher", "student"].includes(targetProfile.role)) {
    return json({ error: "Reset password hanya untuk guru atau siswa." }, 400);
  }

  const { error: updateError } = await adminClient.auth.admin.updateUserById(profileId, { password });
  if (updateError) {
    return json({ error: updateError.message || "Password gagal diperbarui." }, 500);
  }

  return json({ success: true, message: "Password berhasil diperbarui" });
});

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

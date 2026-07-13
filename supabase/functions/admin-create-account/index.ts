import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type Body = {
  role?: "teacher" | "student";
  fullName?: string;
  username?: string;
  email?: string;
  fallbackIdentifier?: string;
  password?: string;
  phone?: string;
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
  if (!token) return json({ error: "Token login tidak ditemukan." }, 401);

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } }
  });
  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData.user) return json({ error: "Sesi admin tidak valid." }, 401);

  const { data: adminProfile, error: adminProfileError } = await adminClient
    .from("profiles")
    .select("id, role, is_active")
    .eq("id", userData.user.id)
    .single();

  if (adminProfileError || !adminProfile || adminProfile.role !== "admin" || !adminProfile.is_active) {
    return json({ error: "Hanya admin aktif yang bisa membuat akun." }, 403);
  }

  const body = await req.json().catch(() => null) as Body | null;
  const role = body?.role;
  const fullName = body?.fullName?.trim() ?? "";
  const username = body?.username?.trim() ?? body?.fallbackIdentifier?.trim() ?? "";
  const password = body?.password ?? "";
  const fallbackIdentifier = body?.fallbackIdentifier?.trim() ?? username;
  const email = normalizeEmail(body?.email, fallbackIdentifier);

  if (role !== "teacher" && role !== "student") return json({ error: "Role akun tidak valid." }, 400);
  if (!fullName) return json({ error: "Nama lengkap wajib diisi." }, 400);
  if (!username) return json({ error: "Username atau identifier wajib diisi." }, 400);
  if (!email) return json({ error: "Email akun wajib diisi atau identifier harus tersedia." }, 400);
  if (password.length < 8) return json({ error: "Password minimal 8 karakter." }, 400);

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role }
  });

  if (createError || !created.user) {
    return json({ error: createError?.message || "Akun login gagal dibuat." }, 400);
  }

  const { error: profileError } = await adminClient
    .from("profiles")
    .upsert({
      id: created.user.id,
      full_name: fullName,
      role,
      username,
      email,
      phone: body?.phone ?? null,
      is_active: true,
      updated_at: new Date().toISOString()
    }, { onConflict: "id" });

  if (profileError) {
    await adminClient.auth.admin.deleteUser(created.user.id);
    return json({ error: profileError.message || "Profile akun gagal dibuat." }, 400);
  }

  return json({ profileId: created.user.id, email, username });
});

function normalizeEmail(email: string | undefined, fallbackIdentifier: string) {
  const value = email?.trim().toLowerCase();
  if (value) return value;
  const clean = fallbackIdentifier.toLowerCase().replace(/[^a-z0-9._-]/g, "");
  return clean ? `${clean}@sinden.local` : "";
}

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

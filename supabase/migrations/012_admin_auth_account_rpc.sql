-- Fallback account-management RPCs for deployments where Supabase Edge
-- Functions are not deployed. These functions are restricted to logged-in
-- admin users through public.is_admin().

create or replace function public.admin_create_account(
  p_role text,
  p_full_name text,
  p_username text,
  p_email text,
  p_fallback_identifier text,
  p_password text,
  p_phone text default null
)
returns table(profile_id uuid, email text, username text)
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  new_user_id uuid := gen_random_uuid();
  normalized_role text := lower(trim(coalesce(p_role, '')));
  normalized_name text := trim(coalesce(p_full_name, ''));
  normalized_username text := lower(trim(coalesce(nullif(p_username, ''), p_fallback_identifier, '')));
  normalized_email text := lower(trim(coalesce(nullif(p_email, ''), '')));
  identifier text := lower(regexp_replace(trim(coalesce(p_fallback_identifier, normalized_username)), '[^a-zA-Z0-9._-]+', '', 'g'));
begin
  if not public.is_admin() then
    raise exception 'Hanya admin yang bisa membuat akun.';
  end if;

  if normalized_role not in ('teacher', 'student') then
    raise exception 'Role akun harus teacher atau student.';
  end if;

  if normalized_name = '' then
    raise exception 'Nama lengkap wajib diisi.';
  end if;

  if normalized_username = '' then
    raise exception 'Username wajib diisi.';
  end if;

  if p_password is null or length(p_password) < 8 then
    raise exception 'Password minimal 8 karakter.';
  end if;

  if normalized_email = '' then
    normalized_email := coalesce(nullif(identifier, ''), normalized_username) || '@sinden.local';
  end if;

  if exists (select 1 from public.profiles p where lower(p.username) = normalized_username) then
    raise exception 'Username sudah digunakan.';
  end if;

  if exists (select 1 from public.profiles p where lower(p.email) = normalized_email)
    or exists (select 1 from auth.users u where lower(u.email) = normalized_email and u.deleted_at is null) then
    raise exception 'Email sudah digunakan.';
  end if;

  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_token,
    recovery_token,
    email_change,
    email_change_token_new,
    email_change_token_current,
    reauthentication_token,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    normalized_email,
    crypt(p_password, gen_salt('bf', 10)),
    now(),
    '',
    '',
    '',
    '',
    '',
    '',
    jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
    jsonb_build_object('email_verified', true),
    now(),
    now()
  );

  insert into auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    new_user_id::text,
    new_user_id,
    jsonb_build_object(
      'sub', new_user_id::text,
      'email', normalized_email,
      'email_verified', false,
      'phone_verified', false
    ),
    'email',
    now(),
    now(),
    now()
  );

  insert into public.profiles (
    id,
    full_name,
    username,
    email,
    role,
    phone,
    is_active
  )
  values (
    new_user_id,
    normalized_name,
    normalized_username,
    normalized_email,
    normalized_role,
    nullif(trim(coalesce(p_phone, '')), ''),
    true
  );

  profile_id := new_user_id;
  email := normalized_email;
  username := normalized_username;
  return next;
end;
$$;

create or replace function public.admin_reset_user_password(
  p_profile_id uuid,
  p_password text
)
returns void
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
begin
  if not public.is_admin() then
    raise exception 'Hanya admin yang bisa reset password.';
  end if;

  if p_profile_id is null then
    raise exception 'Profile user tidak ditemukan.';
  end if;

  if p_password is null or length(p_password) < 8 then
    raise exception 'Password minimal 8 karakter.';
  end if;

  update auth.users
  set encrypted_password = crypt(p_password, gen_salt('bf')),
      updated_at = now(),
      recovery_token = '',
      confirmation_token = '',
      email_change = '',
      email_change_token_new = '',
      email_change_token_current = '',
      reauthentication_token = ''
  where id = p_profile_id
    and deleted_at is null;

  if not found then
    raise exception 'Akun auth tidak ditemukan.';
  end if;
end;
$$;

grant execute on function public.admin_create_account(text, text, text, text, text, text, text) to authenticated;
grant execute on function public.admin_reset_user_password(uuid, text) to authenticated;

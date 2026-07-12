-- Jalankan ini di Supabase SQL Editor untuk memastikan Auth UID sudah
-- terhubung ke public.profiles.

select
  u.id,
  u.email,
  p.full_name,
  p.username,
  p.role,
  p.is_active,
  case
    when p.id is null then 'BELUM ADA PROFILE'
    else 'OK'
  end as status_profile
from auth.users u
left join public.profiles p on p.id = u.id
where u.email in ('admin@sinden.local', 'guru@sinden.local', 'siswa@sinden.local')
order by u.email;

# Create And Link Demo Users

Akun login dibuat dari Supabase Dashboard, bukan dari seed SQL.

## Buat Akun Auth

Di Supabase Dashboard buka `Authentication` -> `Users` -> `Add user`, lalu buat minimal:

- `admin@sinden.local`
- `guru@sinden.local`
- `siswa@sinden.local`

Simpan UID masing-masing user.

## Buat Profiles

Jalankan SQL ini setelah akun Auth dibuat. Ganti UID sesuai UID asli dari Supabase Auth.

```sql
insert into public.profiles (id, full_name, username, role, is_active)
values
  ('UID_ADMIN', 'Administrator', 'admin', 'admin', true),
  ('UID_GURU', 'Guru Demo Matematika', 'guru', 'teacher', true),
  ('UID_SISWA', 'Ahmad Fauzan', 'siswa', 'student', true)
on conflict (id) do update
set full_name = excluded.full_name,
    username = excluded.username,
    role = excluded.role,
    is_active = excluded.is_active,
    updated_at = now();
```

## Link Ke Teachers Dan Students

Setelah profiles ada, jalankan:

```sql
update public.teachers
set profile_id = (select id from public.profiles where role = 'teacher' and is_active = true limit 1)
where id = '00000000-0000-0000-0000-000000002001';

update public.students
set profile_id = (select id from public.profiles where role = 'student' and is_active = true limit 1)
where id = '00000000-0000-0000-0000-000000003001';
```

File `009_reset_and_seed_demo_data.sql` juga melakukan link otomatis jika profiles sudah tersedia sebelum seed dijalankan.

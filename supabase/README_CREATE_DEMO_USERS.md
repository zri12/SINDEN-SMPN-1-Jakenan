# Membuat Demo User Supabase Auth

Migration SQL tidak membuat password user secara langsung karena Supabase Auth dikelola oleh `auth.users`.

## 1. Buat User Di Dashboard

Buka Supabase Dashboard:

`Authentication -> Users -> Add user`

Buat akun berikut:

| Role | Email | Password |
|---|---|---|
| Admin | admin@sinden.local | Admin12345 |
| Guru | guru@sinden.local | Guru12345 |
| Siswa | siswa@sinden.local | Siswa12345 |

Centang opsi email confirmed jika tersedia.

## 2. Hubungkan Ke Profiles

Setelah user dibuat, copy `id` setiap user dari tabel Auth Users. Jalankan SQL ini dengan mengganti UUID:

```sql
insert into public.profiles (id, full_name, role, username, phone)
values
  ('UUID_ADMIN_AUTH_USER', 'Administrator', 'admin', 'admin', '08xx-xxxx-0000'),
  ('UUID_GURU_AUTH_USER', 'Bapak Fauzan', 'teacher', 'guru', '08xx-xxxx-0001'),
  ('UUID_SISWA_AUTH_USER', 'Ahmad Fauzan', 'student', 'siswa', '08xx-xxxx-0002')
on conflict (id) do update
set full_name = excluded.full_name,
    role = excluded.role,
    username = excluded.username,
    phone = excluded.phone;

update public.teachers
set profile_id = 'UUID_GURU_AUTH_USER'
where full_name = 'Bapak Fauzan';

update public.students
set profile_id = 'UUID_SISWA_AUTH_USER'
where nisn = '0051234001';
```

Admin tidak membutuhkan baris di tabel `teachers` atau `students`.

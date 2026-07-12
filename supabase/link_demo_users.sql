-- Jalankan file ini setelah:
-- 1. Semua migration 001-009 sudah dijalankan.
-- 2. User Auth berikut sudah dibuat di Supabase Authentication:
--    admin@sinden.local, guru@sinden.local, siswa@sinden.local
--
-- Tujuan:
-- Menghubungkan UID Supabase Auth ke tabel profiles, teachers, dan students.

begin;

-- Kalau sebelumnya pernah ada profile demo lama dengan username sama
-- tetapi ID bukan UID Auth yang benar, username itu akan bentrok.
-- Baris ini mengamankan konflik tersebut tanpa menghapus data lama.
update public.profiles
set
  username = concat(username, '_old_', left(id::text, 8)),
  updated_at = now()
where username in ('admin', 'guru', 'siswa')
  and id not in (
    '9938c4c5-1bba-4e53-8de2-97489c1255d7',
    'e6d0300c-462c-44b1-b097-11cb8b4fa4e8',
    '51cc82fb-cc3c-469d-889b-944bde0d0e42'
  );

-- Data master minimal yang dibutuhkan akun demo.
insert into public.classes (name, grade_level, academic_year, description)
values
  ('7A', 7, '2025/2026', 'Kelas demo 7A'),
  ('7B', 7, '2025/2026', 'Kelas demo 7B'),
  ('8A', 8, '2025/2026', 'Kelas demo 8A')
on conflict (name) do update
set
  grade_level = excluded.grade_level,
  academic_year = excluded.academic_year,
  description = coalesce(public.classes.description, excluded.description);

insert into public.subjects (code, name, description)
values
  ('MTK', 'Matematika', 'Mata pelajaran Matematika'),
  ('IPA', 'IPA', 'Ilmu Pengetahuan Alam'),
  ('BIND', 'Bahasa Indonesia', 'Mata pelajaran Bahasa Indonesia')
on conflict (code) do update
set
  name = excluded.name,
  description = coalesce(public.subjects.description, excluded.description);

-- Hubungkan UID Auth ke profile aplikasi.
insert into public.profiles (id, full_name, role, username, phone, is_active)
values
  ('9938c4c5-1bba-4e53-8de2-97489c1255d7', 'Administrator', 'admin', 'admin', null, true),
  ('e6d0300c-462c-44b1-b097-11cb8b4fa4e8', 'Bapak Fauzan', 'teacher', 'guru', '081234567801', true),
  ('51cc82fb-cc3c-469d-889b-944bde0d0e42', 'Ahmad Fauzan', 'student', 'siswa', '081234567802', true)
on conflict (id) do update
set
  full_name = excluded.full_name,
  role = excluded.role,
  username = excluded.username,
  phone = excluded.phone,
  is_active = true,
  updated_at = now();

-- Hubungkan akun guru ke data guru.
with updated_teacher as (
  update public.teachers
  set
    profile_id = 'e6d0300c-462c-44b1-b097-11cb8b4fa4e8',
    nip = coalesce(public.teachers.nip, '198501012010011001'),
    full_name = 'Bapak Fauzan',
    gender = coalesce(public.teachers.gender, 'L'),
    employment_status = coalesce(public.teachers.employment_status, 'PNS'),
    teacher_type = coalesce(public.teachers.teacher_type, 'Guru Mata Pelajaran'),
    phone = coalesce(public.teachers.phone, '081234567801'),
    status = 'active',
    updated_at = now()
  where public.teachers.profile_id = 'e6d0300c-462c-44b1-b097-11cb8b4fa4e8'
     or public.teachers.full_name = 'Bapak Fauzan'
  returning id
)
insert into public.teachers (
  profile_id,
  nip,
  full_name,
  gender,
  employment_status,
  teacher_type,
  phone,
  status
)
select
  'e6d0300c-462c-44b1-b097-11cb8b4fa4e8',
  '198501012010011001',
  'Bapak Fauzan',
  'L',
  'PNS',
  'Guru Mata Pelajaran',
  '081234567801',
  'active'
where not exists (select 1 from updated_teacher);

-- Hubungkan akun siswa ke data siswa.
with updated_student as (
  update public.students
  set
    profile_id = '51cc82fb-cc3c-469d-889b-944bde0d0e42',
    class_id = (select id from public.classes where name = '7A' limit 1),
    nis = coalesce(public.students.nis, '2021001'),
    nisn = coalesce(public.students.nisn, '0051234001'),
    full_name = 'Ahmad Fauzan',
    gender = coalesce(public.students.gender, 'L'),
    status = 'active',
    updated_at = now()
  where public.students.profile_id = '51cc82fb-cc3c-469d-889b-944bde0d0e42'
     or public.students.nisn = '0051234001'
     or public.students.full_name = 'Ahmad Fauzan'
  returning id
)
insert into public.students (
  profile_id,
  class_id,
  nis,
  nisn,
  full_name,
  gender,
  status
)
select
  '51cc82fb-cc3c-469d-889b-944bde0d0e42',
  (select id from public.classes where name = '7A' limit 1),
  '2021001',
  '0051234001',
  'Ahmad Fauzan',
  'L',
  'active'
where not exists (select 1 from updated_student);

-- Beri guru akses mengajar lebih dari satu mapel/kelas.
insert into public.teacher_classes (teacher_id, class_id, subject_id, academic_year, semester)
select
  t.id,
  c.id,
  s.id,
  '2025/2026',
  'genap'
from public.teachers t
join public.classes c on c.name in ('7A', '7B', '8A')
join public.subjects s on (
  (c.name in ('7A', '7B') and s.code = 'MTK')
  or (c.name = '8A' and s.code = 'IPA')
)
where t.profile_id = 'e6d0300c-462c-44b1-b097-11cb8b4fa4e8'
on conflict (teacher_id, class_id, subject_id, academic_year, semester) do nothing;

commit;

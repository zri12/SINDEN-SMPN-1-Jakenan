-- SINDEN real starter data
-- Jalankan setelah:
-- 1. semua migration utama
-- 2. supabase/fix_rls_recursion_and_public_settings.sql
-- 3. auth users admin@guru@siswa sudah dibuat di Supabase Auth

begin;

-- Izinkan guru mengelola relasi mapel/kelas miliknya sendiri dari halaman Profile.
drop policy if exists "teacher_classes_teacher_insert_own" on public.teacher_classes;
create policy "teacher_classes_teacher_insert_own" on public.teacher_classes
for insert
with check (teacher_id = public.get_current_teacher_id());

drop policy if exists "teacher_classes_teacher_update_own" on public.teacher_classes;
create policy "teacher_classes_teacher_update_own" on public.teacher_classes
for update
using (teacher_id = public.get_current_teacher_id())
with check (teacher_id = public.get_current_teacher_id());

drop policy if exists "teacher_classes_teacher_delete_own" on public.teacher_classes;
create policy "teacher_classes_teacher_delete_own" on public.teacher_classes
for delete
using (teacher_id = public.get_current_teacher_id());

insert into public.profiles (id, full_name, username, role, phone, is_active)
values
  ('9938c4c5-1bba-4e53-8de2-97489c1255d7', 'Administrator', 'admin', 'admin', '081234567800', true),
  ('e6d0300c-462c-44b1-b097-11cb8b4fa4e8', 'Bapak Fauzan', 'guru', 'teacher', '081234567801', true),
  ('51cc82fb-cc3c-469d-889b-944bde0d0e42', 'Ahmad Fauzan', 'siswa', 'student', '081234567802', true)
on conflict (id) do update set
  full_name = excluded.full_name,
  username = excluded.username,
  role = excluded.role,
  phone = excluded.phone,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.classes (id, name, grade_level, academic_year, description, is_active)
values
  ('00000000-0000-0000-0000-000000000701', '7A', 7, '2026/2027', 'Kelas 7A', true),
  ('00000000-0000-0000-0000-000000000702', '7B', 7, '2026/2027', 'Kelas 7B', true),
  ('00000000-0000-0000-0000-000000000801', '8A', 8, '2026/2027', 'Kelas 8A', true)
on conflict (name) do update set
  grade_level = excluded.grade_level,
  academic_year = excluded.academic_year,
  description = excluded.description,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.subjects (id, code, name, kkm, description, is_active)
values
  ('00000000-0000-0000-0000-000000001001', 'MTK', 'Matematika', 75, 'Mata pelajaran Matematika', true),
  ('00000000-0000-0000-0000-000000001002', 'BIN', 'Bahasa Indonesia', 75, 'Mata pelajaran Bahasa Indonesia', true),
  ('00000000-0000-0000-0000-000000001003', 'IPA', 'IPA', 75, 'Mata pelajaran IPA', true),
  ('00000000-0000-0000-0000-000000001004', 'BIG', 'Bahasa Inggris', 70, 'Mata pelajaran Bahasa Inggris', true),
  ('00000000-0000-0000-0000-000000001005', 'INF', 'Informatika', 70, 'Mata pelajaran Informatika', true)
on conflict (code) do update set
  name = excluded.name,
  kkm = excluded.kkm,
  description = excluded.description,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.teachers (id, profile_id, nip, full_name, gender, employment_status, teacher_type, phone, status)
values
  ('00000000-0000-0000-0000-000000002001', 'e6d0300c-462c-44b1-b097-11cb8b4fa4e8', '198701012010011001', 'Bapak Fauzan', 'L', 'PNS', 'Guru Mata Pelajaran', '081234567801', 'active')
on conflict (id) do update set
  profile_id = excluded.profile_id,
  nip = excluded.nip,
  full_name = excluded.full_name,
  gender = excluded.gender,
  employment_status = excluded.employment_status,
  teacher_type = excluded.teacher_type,
  phone = excluded.phone,
  status = excluded.status,
  updated_at = now();

insert into public.students (id, profile_id, class_id, nis, nisn, full_name, gender, status)
values
  ('00000000-0000-0000-0000-000000003001', '51cc82fb-cc3c-469d-889b-944bde0d0e42', '00000000-0000-0000-0000-000000000701', '2021001', '2021001', 'Ahmad Fauzan', 'L', 'active'),
  ('00000000-0000-0000-0000-000000003002', null, '00000000-0000-0000-0000-000000000701', '2021002', '2021002', 'Siti Aisyah', 'P', 'active'),
  ('00000000-0000-0000-0000-000000003003', null, '00000000-0000-0000-0000-000000000702', '2021003', '2021003', 'Budi Pratama', 'L', 'active'),
  ('00000000-0000-0000-0000-000000003004', null, '00000000-0000-0000-0000-000000000801', '2021004', '2021004', 'Dewi Lestari', 'P', 'active'),
  ('00000000-0000-0000-0000-000000003005', null, '00000000-0000-0000-0000-000000000801', '2021005', '2021005', 'Raka Maulana', 'L', 'active')
on conflict (nisn) do update set
  profile_id = excluded.profile_id,
  class_id = excluded.class_id,
  nis = excluded.nis,
  full_name = excluded.full_name,
  gender = excluded.gender,
  status = excluded.status,
  updated_at = now();

delete from public.teacher_classes
where teacher_id = '00000000-0000-0000-0000-000000002001';

insert into public.teacher_classes (teacher_id, class_id, subject_id, academic_year, semester)
values
  ('00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000001001', '2026/2027', 'genap'),
  ('00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000001001', '2026/2027', 'genap'),
  ('00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000801', '00000000-0000-0000-0000-000000001003', '2026/2027', 'genap');

insert into public.assignments (id, teacher_id, class_id, subject_id, title, description, assignment_link_url, deadline, status)
values
  ('00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000001001', 'Tugas Matematika Bab Pecahan', 'Kerjakan soal pecahan sesuai instruksi.', 'https://example.com/tugas-pecahan', '2026-07-15 23:59:00+07', 'active'),
  ('00000000-0000-0000-0000-000000004002', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000801', '00000000-0000-0000-0000-000000001003', 'Tugas IPA Sistem Pencernaan', 'Buat ringkasan sistem pencernaan.', 'https://example.com/tugas-ipa', '2026-07-20 23:59:00+07', 'active')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  assignment_link_url = excluded.assignment_link_url,
  deadline = excluded.deadline,
  status = excluded.status,
  updated_at = now();

insert into public.submissions (id, assignment_id, student_id, submission_link_url, note, status, submitted_at)
values
  ('00000000-0000-0000-0000-000000005001', '00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000003001', 'https://example.com/jawaban-ahmad', 'Sudah sesuai petunjuk', 'submitted', '2026-07-13 08:00:00+07'),
  ('00000000-0000-0000-0000-000000005002', '00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000003002', 'https://example.com/jawaban-siti', 'Sesuai petunjuk', 'submitted', '2026-07-14 09:00:00+07'),
  ('00000000-0000-0000-0000-000000005003', '00000000-0000-0000-0000-000000004002', '00000000-0000-0000-0000-000000003004', 'https://example.com/jawaban-dewi', null, 'submitted', '2026-07-14 10:00:00+07')
on conflict (assignment_id, student_id) do update set
  submission_link_url = excluded.submission_link_url,
  note = excluded.note,
  status = excluded.status,
  submitted_at = excluded.submitted_at,
  updated_at = now();

insert into public.grades (id, student_id, teacher_id, class_id, subject_id, assignment_id, submission_id, grade_type, score, kkm, semester, academic_year, note)
values
  ('00000000-0000-0000-0000-000000006001', '00000000-0000-0000-0000-000000003001', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000005001', 'assignment', 85, 75, 'genap', '2026/2027', 'Baik'),
  ('00000000-0000-0000-0000-000000006002', '00000000-0000-0000-0000-000000003002', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000005002', 'assignment', 89, 75, 'genap', '2026/2027', 'Baik'),
  ('00000000-0000-0000-0000-000000006003', '00000000-0000-0000-0000-000000003004', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000801', '00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000004002', '00000000-0000-0000-0000-000000005003', 'assignment', 91, 75, 'genap', '2026/2027', 'Sangat baik')
on conflict (id) do update set
  score = excluded.score,
  kkm = excluded.kkm,
  note = excluded.note,
  updated_at = now();

insert into public.announcements (id, title, content, target_role, created_by, is_active)
values
  ('00000000-0000-0000-0000-000000007001', 'Jadwal Pengumpulan Tugas', 'Pastikan tugas dikumpulkan sebelum batas waktu.', 'all', '9938c4c5-1bba-4e53-8de2-97489c1255d7', true),
  ('00000000-0000-0000-0000-000000007002', 'Input Nilai Tugas', 'Guru dapat menilai pengumpulan langsung dari halaman Pengumpulan Tugas.', 'teacher', '9938c4c5-1bba-4e53-8de2-97489c1255d7', true)
on conflict (id) do update set
  title = excluded.title,
  content = excluded.content,
  target_role = excluded.target_role,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.settings (app_name, app_full_name, school_name, academic_year, semester, default_kkm)
select 'SINDEN', 'Sistem Informasi Digital Evaluasi Nilai', 'SMP Negeri 1 Jakenan', '2026/2027', 'genap', 75
where not exists (select 1 from public.settings);

commit;

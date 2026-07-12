-- RESET + SEED DATA SEKOLAH SINDEN
-- Aman untuk akun/login: file ini TIDAK menghapus auth.users dan TIDAK mengubah public.profiles.
-- Jalankan dari Supabase SQL Editor setelah:
-- 1. fix_rls_recursion_and_public_settings.sql
-- 2. setup_storage_buckets.sql
-- 3. add_assignment_publish_at.sql

begin;

alter table public.assignments
add column if not exists publish_at timestamptz not null default now();

-- Bersihkan data akademik agar semua role membaca data yang sama dan tidak campur data lama.
truncate table
  public.activity_logs,
  public.grades,
  public.submissions,
  public.assignments,
  public.teacher_classes,
  public.students,
  public.teachers,
  public.announcements,
  public.subjects,
  public.classes,
  public.settings
restart identity cascade;

-- Settings aplikasi.
insert into public.settings (
  id,
  app_name,
  app_full_name,
  school_name,
  academic_year,
  semester,
  default_kkm
) values (
  '10000000-0000-0000-0000-000000000001',
  'SINDEN',
  'Sistem Informasi Digital Evaluasi Nilai',
  'SMP Negeri 1 Jakenan',
  '2026/2027',
  'genap',
  75
);

-- Data kelas SMP.
insert into public.classes (id, name, grade_level, academic_year, description, is_active)
values
  ('10000000-0000-0000-0000-000000000701', '7A', 7, '2026/2027', 'Kelas 7A tahun ajaran 2026/2027', true),
  ('10000000-0000-0000-0000-000000000702', '7B', 7, '2026/2027', 'Kelas 7B tahun ajaran 2026/2027', true),
  ('10000000-0000-0000-0000-000000000801', '8A', 8, '2026/2027', 'Kelas 8A tahun ajaran 2026/2027', true),
  ('10000000-0000-0000-0000-000000000802', '8B', 8, '2026/2027', 'Kelas 8B tahun ajaran 2026/2027', true),
  ('10000000-0000-0000-0000-000000000901', '9A', 9, '2026/2027', 'Kelas 9A tahun ajaran 2026/2027', true);

-- Mata pelajaran SMP.
insert into public.subjects (id, code, name, kkm, description, is_active)
values
  ('10000000-0000-0000-0000-000000001001', 'MTK', 'Matematika', 75, 'Mata pelajaran Matematika', true),
  ('10000000-0000-0000-0000-000000001002', 'BIN', 'Bahasa Indonesia', 75, 'Mata pelajaran Bahasa Indonesia', true),
  ('10000000-0000-0000-0000-000000001003', 'IPA', 'Ilmu Pengetahuan Alam', 75, 'Mata pelajaran IPA', true),
  ('10000000-0000-0000-0000-000000001004', 'BIG', 'Bahasa Inggris', 75, 'Mata pelajaran Bahasa Inggris', true),
  ('10000000-0000-0000-0000-000000001005', 'IPS', 'Ilmu Pengetahuan Sosial', 75, 'Mata pelajaran IPS', true),
  ('10000000-0000-0000-0000-000000001006', 'PPKN', 'PPKn', 75, 'Mata pelajaran PPKn', true),
  ('10000000-0000-0000-0000-000000001007', 'PAI', 'Pendidikan Agama', 75, 'Mata pelajaran Pendidikan Agama', true),
  ('10000000-0000-0000-0000-000000001008', 'SBK', 'Seni Budaya', 70, 'Mata pelajaran Seni Budaya', true),
  ('10000000-0000-0000-0000-000000001009', 'PJOK', 'PJOK', 70, 'Mata pelajaran PJOK', true),
  ('10000000-0000-0000-0000-000000001010', 'INF', 'Informatika', 70, 'Mata pelajaran Informatika', true);

-- Guru akun login tetap memakai profile_id yang sudah ada.
insert into public.teachers (
  id,
  profile_id,
  nip,
  nuptk,
  full_name,
  gender,
  employment_status,
  teacher_type,
  phone,
  status
) values (
  '10000000-0000-0000-0000-000000002001',
  'e6d0300c-462c-44b1-b097-11cb8b4fa4e8',
  '198701012010011001',
  '1234567890123456',
  'Bapak Fauzan',
  'L',
  'PNS',
  'Guru Mata Pelajaran',
  '081234567801',
  'active'
);

-- Siswa. Akun siswa login tetap memakai profile_id yang sudah ada dan ditempatkan di 7A.
insert into public.students (
  id,
  profile_id,
  class_id,
  nis,
  nisn,
  full_name,
  gender,
  birth_place,
  birth_date,
  address,
  status
) values
  ('10000000-0000-0000-0000-000000003001', '51cc82fb-cc3c-469d-889b-944bde0d0e42', '10000000-0000-0000-0000-000000000701', '2026001', '2026001', 'Ahmad Fauzan', 'L', 'Pati', '2013-04-12', 'Jakenan', 'active'),
  ('10000000-0000-0000-0000-000000003002', null, '10000000-0000-0000-0000-000000000701', '2026002', '2026002', 'Siti Aisyah', 'P', 'Pati', '2013-08-03', 'Jakenan', 'active'),
  ('10000000-0000-0000-0000-000000003003', null, '10000000-0000-0000-0000-000000000701', '2026003', '2026003', 'Budi Pratama', 'L', 'Pati', '2013-06-21', 'Jakenan', 'active'),
  ('10000000-0000-0000-0000-000000003004', null, '10000000-0000-0000-0000-000000000701', '2026004', '2026004', 'Dewi Lestari', 'P', 'Pati', '2013-01-15', 'Jakenan', 'active'),
  ('10000000-0000-0000-0000-000000003005', null, '10000000-0000-0000-0000-000000000702', '2026005', '2026005', 'Raka Maulana', 'L', 'Pati', '2013-09-27', 'Jakenan', 'active'),
  ('10000000-0000-0000-0000-000000003006', null, '10000000-0000-0000-0000-000000000801', '2025001', '2025001', 'Fitri Handayani', 'P', 'Pati', '2012-11-09', 'Jakenan', 'active'),
  ('10000000-0000-0000-0000-000000003007', null, '10000000-0000-0000-0000-000000000901', '2024001', '2024001', 'Andi Saputra', 'L', 'Pati', '2011-05-30', 'Jakenan', 'active');

-- Relasi guru: akun guru mengajar semua tugas yang di-seed supaya role guru dan siswa login konsisten.
insert into public.teacher_classes (teacher_id, class_id, subject_id, academic_year, semester)
values
  ('10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001001', '2026/2027', 'genap'),
  ('10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001002', '2026/2027', 'genap'),
  ('10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001003', '2026/2027', 'genap'),
  ('10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001010', '2026/2027', 'genap');

-- Semua tugas sengaja untuk 7A agar akun guru dan akun siswa login melihat jumlah tugas yang sama.
insert into public.assignments (
  id,
  teacher_id,
  class_id,
  subject_id,
  title,
  description,
  assignment_link_url,
  publish_at,
  deadline,
  status
) values
  (
    '10000000-0000-0000-0000-000000004001',
    '10000000-0000-0000-0000-000000002001',
    '10000000-0000-0000-0000-000000000701',
    '10000000-0000-0000-0000-000000001001',
    'Tugas Matematika Bab Pecahan',
    'Kerjakan soal pecahan halaman 45 nomor 1 sampai 10. Tuliskan langkah pengerjaan dengan rapi.',
    'https://example.com/tugas-matematika-pecahan',
    '2026-07-12 07:00:00+07',
    '2026-07-20 23:59:00+07',
    'active'
  ),
  (
    '10000000-0000-0000-0000-000000004002',
    '10000000-0000-0000-0000-000000002001',
    '10000000-0000-0000-0000-000000000701',
    '10000000-0000-0000-0000-000000001003',
    'Tugas IPA Sistem Pencernaan',
    'Buat rangkuman sistem pencernaan manusia minimal satu halaman dan sertakan gambar pendukung.',
    'https://example.com/tugas-ipa-pencernaan',
    '2026-07-12 08:00:00+07',
    '2026-07-22 23:59:00+07',
    'active'
  ),
  (
    '10000000-0000-0000-0000-000000004003',
    '10000000-0000-0000-0000-000000002001',
    '10000000-0000-0000-0000-000000000701',
    '10000000-0000-0000-0000-000000001002',
    'Teks Deskripsi Lingkungan Sekolah',
    'Tulis teks deskripsi tentang lingkungan sekolah SMP Negeri 1 Jakenan minimal 3 paragraf.',
    'https://example.com/tugas-bahasa-indonesia-deskripsi',
    '2026-07-12 09:00:00+07',
    '2026-07-24 23:59:00+07',
    'active'
  ),
  (
    '10000000-0000-0000-0000-000000004004',
    '10000000-0000-0000-0000-000000002001',
    '10000000-0000-0000-0000-000000000701',
    '10000000-0000-0000-0000-000000001010',
    'Latihan Informatika Algoritma',
    'Buat algoritma sederhana untuk kegiatan berangkat sekolah dalam bentuk langkah-langkah atau flowchart.',
    'https://example.com/tugas-informatika-algoritma',
    '2026-07-12 10:00:00+07',
    '2026-07-26 23:59:00+07',
    'active'
  );

-- Pengumpulan contoh dari siswa lain, bukan siswa login, agar akun siswa login melihat 4 tugas Todo.
insert into public.submissions (
  id,
  assignment_id,
  student_id,
  submission_link_url,
  note,
  status,
  submitted_at
) values
  ('10000000-0000-0000-0000-000000005001', '10000000-0000-0000-0000-000000004001', '10000000-0000-0000-0000-000000003002', 'https://example.com/jawaban-siti-pecahan', 'Sudah sesuai petunjuk.', 'submitted', '2026-07-14 09:00:00+07'),
  ('10000000-0000-0000-0000-000000005002', '10000000-0000-0000-0000-000000004002', '10000000-0000-0000-0000-000000003003', 'https://example.com/jawaban-budi-pencernaan', 'Rangkuman dan gambar sudah dilampirkan.', 'submitted', '2026-07-15 10:00:00+07');

-- Nilai contoh untuk rekap guru/admin.
insert into public.grades (
  id,
  student_id,
  teacher_id,
  class_id,
  subject_id,
  assignment_id,
  submission_id,
  grade_type,
  score,
  kkm,
  semester,
  academic_year,
  note
) values
  ('10000000-0000-0000-0000-000000006001', '10000000-0000-0000-0000-000000003002', '10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001001', '10000000-0000-0000-0000-000000004001', '10000000-0000-0000-0000-000000005001', 'assignment', 88, 75, 'genap', '2026/2027', 'Baik'),
  ('10000000-0000-0000-0000-000000006002', '10000000-0000-0000-0000-000000003003', '10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001003', '10000000-0000-0000-0000-000000004002', '10000000-0000-0000-0000-000000005002', 'assignment', 82, 75, 'genap', '2026/2027', 'Tuntas'),
  ('10000000-0000-0000-0000-000000006003', '10000000-0000-0000-0000-000000003001', '10000000-0000-0000-0000-000000002001', '10000000-0000-0000-0000-000000000701', '10000000-0000-0000-0000-000000001002', null, null, 'daily_test', 91, 75, 'genap', '2026/2027', 'Ulangan harian');

-- Informasi sekolah.
insert into public.announcements (
  id,
  title,
  content,
  target_role,
  class_id,
  created_by,
  is_active
) values
  ('10000000-0000-0000-0000-000000007001', 'Jadwal Pengumpulan Tugas', 'Semua tugas kelas 7A dikumpulkan sesuai deadline di menu Tugas Saya.', 'all', null, '9938c4c5-1bba-4e53-8de2-97489c1255d7', true),
  ('10000000-0000-0000-0000-000000007002', 'Pengumuman Kelas 7A', 'Siswa kelas 7A diminta mengecek tugas Matematika, IPA, Bahasa Indonesia, dan Informatika.', 'student', '10000000-0000-0000-0000-000000000701', '9938c4c5-1bba-4e53-8de2-97489c1255d7', true),
  ('10000000-0000-0000-0000-000000007003', 'Input Nilai Tugas', 'Guru dapat memberi nilai dari halaman Pengumpulan Tugas setelah siswa mengirim jawaban.', 'teacher', null, '9938c4c5-1bba-4e53-8de2-97489c1255d7', true);

-- Ringkasan hasil seed untuk dicek cepat di SQL Editor.
select 'profiles_preserved' as item, count(*)::text as total from public.profiles
union all select 'classes', count(*)::text from public.classes
union all select 'subjects', count(*)::text from public.subjects
union all select 'teachers', count(*)::text from public.teachers
union all select 'students', count(*)::text from public.students
union all select 'teacher_classes', count(*)::text from public.teacher_classes
union all select 'assignments', count(*)::text from public.assignments
union all select 'submissions', count(*)::text from public.submissions
union all select 'grades', count(*)::text from public.grades
union all select 'announcements', count(*)::text from public.announcements;

commit;

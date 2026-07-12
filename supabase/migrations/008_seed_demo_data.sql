-- SINDEN 008 - demo seed data
-- Auth users are not created here. See supabase/README_CREATE_DEMO_USERS.md.

insert into public.classes (name, grade_level, academic_year, description)
select
  grade_level::text || section,
  grade_level,
  '2025/2026',
  'Kelas demo ' || grade_level::text || section
from generate_series(7, 9) as grade_level
cross join unnest(array['A','B','C','D','E','F','G','H','I']) as section
on conflict (name) do update
set grade_level = excluded.grade_level,
    academic_year = excluded.academic_year,
    description = excluded.description;

insert into public.subjects (code, name, kkm, description)
values
  ('BIN', 'Bahasa Indonesia', 75, 'Mata pelajaran Bahasa Indonesia'),
  ('MTK', 'Matematika', 75, 'Mata pelajaran Matematika'),
  ('IPA', 'IPA', 75, 'Ilmu Pengetahuan Alam'),
  ('IPS', 'IPS', 70, 'Ilmu Pengetahuan Sosial'),
  ('BIG', 'Bahasa Inggris', 70, 'Mata pelajaran Bahasa Inggris'),
  ('PKN', 'PPKn', 70, 'Pendidikan Pancasila dan Kewarganegaraan'),
  ('PAI', 'Pendidikan Agama', 75, 'Pendidikan Agama'),
  ('SBD', 'Seni Budaya', 70, 'Seni Budaya'),
  ('PJK', 'PJOK', 70, 'Pendidikan Jasmani, Olahraga, dan Kesehatan'),
  ('INF', 'Informatika', 70, 'Informatika')
on conflict (code) do update
set name = excluded.name,
    kkm = excluded.kkm,
    description = excluded.description;

insert into public.settings (app_name, app_full_name, school_name, academic_year, semester, default_kkm)
select 'SINDEN', 'Sistem Informasi Digital Evaluasi Nilai', 'SMP Negeri 1 Jakenan', '2025/2026', 'genap', 75
where not exists (select 1 from public.settings);

insert into public.teachers (nip, full_name, gender, employment_status, teacher_type, phone, status)
values
  ('198501012010011001', 'Bapak Fauzan', 'L', 'PNS', 'Guru Mata Pelajaran', '08xx-xxxx-0001', 'active'),
  ('197803152005012002', 'Ibu Siti Aminah', 'P', 'PNS', 'Guru Mata Pelajaran', '08xx-xxxx-0002', 'active'),
  ('198209202008011003', 'Bapak Andi Prasetyo', 'L', 'PNS', 'Guru Mata Pelajaran', '08xx-xxxx-0003', 'active')
on conflict do nothing;

insert into public.students (class_id, nis, nisn, full_name, gender, status)
values
  ((select id from public.classes where name = '7A'), '2021001', '0051234001', 'Ahmad Fauzan', 'L', 'active'),
  ((select id from public.classes where name = '7A'), '2021002', '0051234002', 'Siti Aisyah', 'P', 'active'),
  ((select id from public.classes where name = '7B'), '2021003', '0051234003', 'Budi Pratama', 'L', 'active'),
  ((select id from public.classes where name = '8A'), '2021004', '0051234004', 'Dewi Lestari', 'P', 'active'),
  ((select id from public.classes where name = '8A'), '2021005', '0051234005', 'Raka Maulana', 'L', 'active')
on conflict (nisn) do update
set full_name = excluded.full_name,
    class_id = excluded.class_id,
    gender = excluded.gender,
    status = excluded.status;

insert into public.teacher_classes (teacher_id, class_id, subject_id, academic_year, semester)
values
  ((select id from public.teachers where full_name = 'Bapak Fauzan' limit 1), (select id from public.classes where name = '7A'), (select id from public.subjects where code = 'MTK'), '2025/2026', 'genap'),
  ((select id from public.teachers where full_name = 'Bapak Fauzan' limit 1), (select id from public.classes where name = '7B'), (select id from public.subjects where code = 'MTK'), '2025/2026', 'genap'),
  ((select id from public.teachers where full_name = 'Bapak Fauzan' limit 1), (select id from public.classes where name = '8A'), (select id from public.subjects where code = 'IPA'), '2025/2026', 'genap'),
  ((select id from public.teachers where full_name = 'Ibu Siti Aminah' limit 1), (select id from public.classes where name = '7A'), (select id from public.subjects where code = 'BIN'), '2025/2026', 'genap'),
  ((select id from public.teachers where full_name = 'Bapak Andi Prasetyo' limit 1), (select id from public.classes where name = '8A'), (select id from public.subjects where code = 'IPA'), '2025/2026', 'genap')
on conflict do nothing;

insert into public.assignments (teacher_id, class_id, subject_id, title, description, assignment_link_url, deadline, status)
values
  (
    (select id from public.teachers where full_name = 'Bapak Fauzan' limit 1),
    (select id from public.classes where name = '7A'),
    (select id from public.subjects where code = 'MTK'),
    'Tugas Matematika Bab Pecahan',
    'Kerjakan latihan pecahan halaman 24-25.',
    'https://example.com/tugas-pecahan',
    now() + interval '7 days',
    'active'
  ),
  (
    (select id from public.teachers where full_name = 'Bapak Andi Prasetyo' limit 1),
    (select id from public.classes where name = '8A'),
    (select id from public.subjects where code = 'IPA'),
    'Tugas IPA Sistem Pencernaan',
    'Buat rangkuman sistem pencernaan manusia.',
    null,
    now() + interval '5 days',
    'active'
  )
on conflict do nothing;

insert into public.submissions (assignment_id, student_id, submission_link_url, note, status)
values
  (
    (select id from public.assignments where title = 'Tugas Matematika Bab Pecahan' limit 1),
    (select id from public.students where nisn = '0051234001'),
    'https://drive.google.com/demo-ahmad',
    'Sesuai petunjuk.',
    'submitted'
  ),
  (
    (select id from public.assignments where title = 'Tugas Matematika Bab Pecahan' limit 1),
    (select id from public.students where nisn = '0051234002'),
    'https://drive.google.com/demo-siti',
    'Mohon diperiksa.',
    'submitted'
  )
on conflict (assignment_id, student_id) do update
set submission_link_url = excluded.submission_link_url,
    note = excluded.note,
    status = excluded.status,
    submitted_at = now();

insert into public.grades (student_id, teacher_id, class_id, subject_id, assignment_id, submission_id, grade_type, score, kkm, semester, academic_year, note)
select
  s.id,
  a.teacher_id,
  a.class_id,
  a.subject_id,
  a.id,
  sub.id,
  'assignment',
  85,
  subj.kkm,
  'genap',
  '2025/2026',
  'Nilai demo dari pengumpulan tugas'
from public.submissions sub
join public.assignments a on a.id = sub.assignment_id
join public.students s on s.id = sub.student_id
join public.subjects subj on subj.id = a.subject_id
where s.nisn = '0051234001'
on conflict do nothing;

insert into public.announcements (title, content, target_role, class_id, is_active)
values
  ('Pengumuman Ujian Tengah Semester', 'PTS semester genap akan dilaksanakan sesuai jadwal sekolah.', 'all', null, true),
  ('Tugas Baru Matematika', 'Kelas 7A memiliki tugas baru pada mata pelajaran Matematika.', 'student', (select id from public.classes where name = '7A'), true)
on conflict do nothing;

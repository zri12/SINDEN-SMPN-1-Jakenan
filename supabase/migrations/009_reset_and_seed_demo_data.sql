-- SINDEN 009 - reset demo data and seed consistent SMP data
-- Safe reset: this file never deletes auth.users and never deletes profiles.

do $$
declare
  admin_profile_id uuid;
  teacher_profile_id uuid;
  student_profile_id uuid;
begin
  select id into admin_profile_id from public.profiles where role = 'admin' and is_active = true limit 1;
  select id into teacher_profile_id from public.profiles where role = 'teacher' and is_active = true limit 1;
  select id into student_profile_id from public.profiles where role = 'student' and is_active = true limit 1;

  if admin_profile_id is null then
    raise notice 'Profile admin belum ada. Buat profile role admin dari UID Supabase Auth sebelum test admin.';
  end if;
  if teacher_profile_id is null then
    raise notice 'Profile guru belum ada. Data guru utama tetap dibuat dengan profile_id NULL.';
  end if;
  if student_profile_id is null then
    raise notice 'Profile siswa belum ada. Data siswa utama tetap dibuat dengan profile_id NULL.';
  end if;

  delete from public.grades;
  delete from public.submissions;
  delete from public.assignments;
  delete from public.announcements;
  delete from public.activity_logs;
  delete from public.teacher_classes;
  delete from public.students;
  delete from public.teachers;
  delete from public.subjects;
  delete from public.classes;
  delete from public.settings;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'grades_submission_id_unique'
      and conrelid = 'public.grades'::regclass
  ) then
    alter table public.grades add constraint grades_submission_id_unique unique (submission_id);
  end if;

  insert into public.settings (
    id, app_name, app_full_name, school_name, academic_year, semester, default_kkm, logo_url
  ) values (
    '00000000-0000-0000-0000-000000000001',
    'SINDEN',
    'Sistem Informasi Digital Evaluasi Nilai',
    'SMP Negeri 1 Jakenan',
    '2025/2026',
    'genap',
    75,
    null
  );

  insert into public.classes (id, name, grade_level, academic_year, description, is_active) values
    ('00000000-0000-0000-0000-000000000701','7A',7,'2025/2026','Kelas 7A SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000702','7B',7,'2025/2026','Kelas 7B SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000703','7C',7,'2025/2026','Kelas 7C SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000704','7D',7,'2025/2026','Kelas 7D SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000705','7E',7,'2025/2026','Kelas 7E SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000706','7F',7,'2025/2026','Kelas 7F SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000707','7G',7,'2025/2026','Kelas 7G SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000708','7H',7,'2025/2026','Kelas 7H SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000709','7I',7,'2025/2026','Kelas 7I SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000801','8A',8,'2025/2026','Kelas 8A SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000802','8B',8,'2025/2026','Kelas 8B SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000803','8C',8,'2025/2026','Kelas 8C SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000804','8D',8,'2025/2026','Kelas 8D SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000805','8E',8,'2025/2026','Kelas 8E SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000806','8F',8,'2025/2026','Kelas 8F SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000807','8G',8,'2025/2026','Kelas 8G SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000808','8H',8,'2025/2026','Kelas 8H SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000809','8I',8,'2025/2026','Kelas 8I SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000901','9A',9,'2025/2026','Kelas 9A SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000902','9B',9,'2025/2026','Kelas 9B SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000903','9C',9,'2025/2026','Kelas 9C SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000904','9D',9,'2025/2026','Kelas 9D SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000905','9E',9,'2025/2026','Kelas 9E SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000906','9F',9,'2025/2026','Kelas 9F SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000907','9G',9,'2025/2026','Kelas 9G SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000908','9H',9,'2025/2026','Kelas 9H SMP Negeri 1 Jakenan',true),
    ('00000000-0000-0000-0000-000000000909','9I',9,'2025/2026','Kelas 9I SMP Negeri 1 Jakenan',true);

  insert into public.subjects (id, code, name, kkm, description, is_active) values
    ('00000000-0000-0000-0000-000000001001','BIN','Bahasa Indonesia',75,'Mata pelajaran Bahasa Indonesia',true),
    ('00000000-0000-0000-0000-000000001002','MTK','Matematika',75,'Mata pelajaran Matematika',true),
    ('00000000-0000-0000-0000-000000001003','IPA','IPA',75,'Ilmu Pengetahuan Alam',true),
    ('00000000-0000-0000-0000-000000001004','IPS','IPS',75,'Ilmu Pengetahuan Sosial',true),
    ('00000000-0000-0000-0000-000000001005','BIG','Bahasa Inggris',75,'Mata pelajaran Bahasa Inggris',true),
    ('00000000-0000-0000-0000-000000001006','PPKN','PPKn',75,'Pendidikan Pancasila dan Kewarganegaraan',true),
    ('00000000-0000-0000-0000-000000001007','PAI','Pendidikan Agama',75,'Pendidikan Agama dan Budi Pekerti',true),
    ('00000000-0000-0000-0000-000000001008','SBK','Seni Budaya',75,'Mata pelajaran Seni Budaya',true),
    ('00000000-0000-0000-0000-000000001009','PJOK','PJOK',75,'Pendidikan Jasmani, Olahraga, dan Kesehatan',true),
    ('00000000-0000-0000-0000-000000001010','INF','Informatika',75,'Mata pelajaran Informatika',true),
    ('00000000-0000-0000-0000-000000001011','PKY','Prakarya',75,'Mata pelajaran Prakarya',true),
    ('00000000-0000-0000-0000-000000001012','BJW','Bahasa Jawa',75,'Muatan lokal Bahasa Jawa',true);

  insert into public.teachers (id, profile_id, nip, nuptk, full_name, gender, employment_status, teacher_type, phone, status) values
    ('00000000-0000-0000-0000-000000002001', teacher_profile_id, '198501012010011001', '1234567890123456', 'Guru Demo Matematika', 'L', 'PNS', 'Guru Mata Pelajaran', '081234567801', 'active'),
    ('00000000-0000-0000-0000-000000002002', null, '198602022011012002', '2234567890123456', 'Guru Demo IPA', 'P', 'PNS', 'Guru Mata Pelajaran', '081234567802', 'active'),
    ('00000000-0000-0000-0000-000000002003', null, '198703032012013003', '3234567890123456', 'Guru Demo Bahasa Indonesia', 'P', 'PNS', 'Guru Mata Pelajaran', '081234567803', 'active'),
    ('00000000-0000-0000-0000-000000002004', null, '198804042013014004', '4234567890123456', 'Guru Demo Bahasa Inggris', 'L', 'PNS', 'Guru Mata Pelajaran', '081234567804', 'active'),
    ('00000000-0000-0000-0000-000000002005', null, '198905052014015005', '5234567890123456', 'Guru Demo IPS', 'L', 'PNS', 'Guru Mata Pelajaran', '081234567805', 'active');

  insert into public.students (id, profile_id, class_id, nis, nisn, full_name, gender, birth_place, birth_date, address, status) values
    ('00000000-0000-0000-0000-000000003001', student_profile_id, '00000000-0000-0000-0000-000000000701', '2025001', '0051234567', 'Ahmad Fauzan', 'L', 'Pati', '2012-05-12', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003002', null, '00000000-0000-0000-0000-000000000701', '2025002', '0051234568', 'Siti Aisyah', 'P', 'Pati', '2012-06-18', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003003', null, '00000000-0000-0000-0000-000000000701', '2025003', '0051234569', 'Budi Pratama', 'L', 'Pati', '2012-01-20', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003004', null, '00000000-0000-0000-0000-000000000701', '2025004', '0051234570', 'Dewi Lestari', 'P', 'Pati', '2012-03-08', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003005', null, '00000000-0000-0000-0000-000000000701', '2025005', '0051234571', 'Raka Maulana', 'L', 'Pati', '2012-02-11', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003006', null, '00000000-0000-0000-0000-000000000701', '2025006', '0051234572', 'Fitri Handayani', 'P', 'Pati', '2012-07-15', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003007', null, '00000000-0000-0000-0000-000000000701', '2025007', '0051234573', 'Naufal Ramadhan', 'L', 'Pati', '2012-09-01', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003008', null, '00000000-0000-0000-0000-000000000701', '2025008', '0051234574', 'Anisa Putri', 'P', 'Pati', '2012-10-22', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003009', null, '00000000-0000-0000-0000-000000000702', '2025009', '0051234575', 'Rizky Saputra', 'L', 'Pati', '2012-04-17', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003010', null, '00000000-0000-0000-0000-000000000702', '2025010', '0051234576', 'Nabila Zahra', 'P', 'Pati', '2012-11-05', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003011', null, '00000000-0000-0000-0000-000000000702', '2025011', '0051234577', 'Ardi Nugroho', 'L', 'Pati', '2012-12-12', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003012', null, '00000000-0000-0000-0000-000000000702', '2025012', '0051234578', 'Citra Maharani', 'P', 'Pati', '2012-08-19', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003013', null, '00000000-0000-0000-0000-000000000801', '2025013', '0051234579', 'Bayu Setiawan', 'L', 'Pati', '2011-05-04', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003014', null, '00000000-0000-0000-0000-000000000801', '2025014', '0051234580', 'Maya Safitri', 'P', 'Pati', '2011-02-13', 'Jakenan, Pati', 'active'),
    ('00000000-0000-0000-0000-000000003015', null, '00000000-0000-0000-0000-000000000801', '2025015', '0051234581', 'Dimas Pamungkas', 'L', 'Pati', '2011-06-27', 'Jakenan, Pati', 'active');

  insert into public.teacher_classes (teacher_id, class_id, subject_id, academic_year, semester) values
    ('00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','2025/2026','genap'),
    ('00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000702','00000000-0000-0000-0000-000000001002','2025/2026','genap'),
    ('00000000-0000-0000-0000-000000002002','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001003','2025/2026','genap'),
    ('00000000-0000-0000-0000-000000002003','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001001','2025/2026','genap'),
    ('00000000-0000-0000-0000-000000002004','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001005','2025/2026','genap'),
    ('00000000-0000-0000-0000-000000002005','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001004','2025/2026','genap');

  insert into public.assignments (
    id, teacher_id, class_id, subject_id, title, description, assignment_file_url, assignment_file_path,
    assignment_link_url, publish_at, deadline, status
  ) values
    ('00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','Tugas Matematika Bab Pecahan','Kerjakan soal pecahan sesuai instruksi. Unggah foto jawaban atau link dokumen jawaban.','https://example.com/tugas/pecahan.pdf',null,'https://example.com/materi/pecahan',now() - interval '1 day',now() + interval '5 days','active'),
    ('00000000-0000-0000-0000-000000004002','00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000702','00000000-0000-0000-0000-000000001002','Tugas Matematika Persamaan Linear','Kerjakan latihan persamaan linear satu variabel.',null,null,'https://example.com/materi/persamaan-linear',now() - interval '1 day',now() + interval '7 days','active'),
    ('00000000-0000-0000-0000-000000004003','00000000-0000-0000-0000-000000002002','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001003','Tugas IPA Sistem Pencernaan','Buat rangkuman sistem pencernaan manusia.',null,null,'https://example.com/materi/sistem-pencernaan',now() - interval '1 day',now() + interval '9 days','active'),
    ('00000000-0000-0000-0000-000000004004','00000000-0000-0000-0000-000000002003','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001001','Tugas Bahasa Indonesia Teks Deskripsi','Tulis teks deskripsi tentang lingkungan sekolah.',null,null,'https://example.com/materi/teks-deskripsi',now() - interval '3 days',now() - interval '1 day','active'),
    ('00000000-0000-0000-0000-000000004005','00000000-0000-0000-0000-000000002004','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001005','Tugas Bahasa Inggris Daily Activity','Write a short paragraph about your daily activity.',null,null,'https://example.com/materi/daily-activity',now() - interval '1 day',now() + interval '10 days','active');

  insert into public.submissions (
    id, assignment_id, student_id, submission_file_url, submission_file_path, submission_link_url, note, status, submitted_at
  ) values
    ('00000000-0000-0000-0000-000000005001','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000003001',null,null,'https://example.com/jawaban/ahmad-pecahan','Jawaban lengkap sesuai instruksi.','reviewed',now() - interval '12 hours'),
    ('00000000-0000-0000-0000-000000005002','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000003002',null,null,'https://example.com/jawaban/siti-pecahan','Sudah dikumpulkan.','submitted',now() - interval '10 hours'),
    ('00000000-0000-0000-0000-000000005003','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000003003',null,null,'https://example.com/jawaban/budi-pecahan','Perlu diperiksa.','reviewed',now() - interval '8 hours'),
    ('00000000-0000-0000-0000-000000005004','00000000-0000-0000-0000-000000004004','00000000-0000-0000-0000-000000003004',null,null,'https://example.com/jawaban/dewi-deskripsi','Terlambat satu hari.','late',now());

  insert into public.grades (
    id, student_id, teacher_id, class_id, subject_id, assignment_id, submission_id, grade_type,
    score, kkm, semester, academic_year, note
  ) values
    ('00000000-0000-0000-0000-000000006001','00000000-0000-0000-0000-000000003001','00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000005001','assignment',88,75,'genap','2025/2026','Tuntas'),
    ('00000000-0000-0000-0000-000000006002','00000000-0000-0000-0000-000000003003','00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000005003','assignment',72,75,'genap','2025/2026','Perlu remedial'),
    ('00000000-0000-0000-0000-000000006003','00000000-0000-0000-0000-000000003004','00000000-0000-0000-0000-000000002003','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001001','00000000-0000-0000-0000-000000004004','00000000-0000-0000-0000-000000005004','assignment',80,75,'genap','2025/2026','Terlambat tetapi tuntas');

  insert into public.announcements (id, title, content, target_role, class_id, created_by, is_active) values
    ('00000000-0000-0000-0000-000000007001','Informasi Pengumpulan Tugas Matematika','Tugas Matematika Bab Pecahan dikumpulkan sebelum deadline.', 'student', '00000000-0000-0000-0000-000000000701', admin_profile_id, true),
    ('00000000-0000-0000-0000-000000007002','Pengumuman Nilai Terbaru','Nilai tugas yang sudah direview dapat dilihat di menu Nilai Saya.', 'student', null, admin_profile_id, true),
    ('00000000-0000-0000-0000-000000007003','Informasi Jadwal Belajar','Kegiatan belajar mengajar semester genap berjalan sesuai jadwal.', 'all', null, admin_profile_id, true),
    ('00000000-0000-0000-0000-000000007004','Pengumuman Untuk Semua Siswa','Selalu cek menu Tugas Saya untuk melihat tugas terbaru.', 'student', null, admin_profile_id, true),
    ('00000000-0000-0000-0000-000000007005','Pengumuman Untuk Guru','Input nilai dilakukan dari halaman Pengumpulan Tugas.', 'teacher', null, admin_profile_id, true);

  insert into public.activity_logs (actor_id, action, entity_type, entity_id, description) values
    (teacher_profile_id, 'create_assignment', 'assignments', '00000000-0000-0000-0000-000000004001', 'Guru membuat tugas Matematika Bab Pecahan'),
    (student_profile_id, 'submit_assignment', 'submissions', '00000000-0000-0000-0000-000000005001', 'Siswa mengumpulkan tugas Matematika'),
    (teacher_profile_id, 'grade_submission', 'grades', '00000000-0000-0000-0000-000000006001', 'Guru memberi nilai dari submission'),
    (admin_profile_id, 'seed_demo_data', 'settings', '00000000-0000-0000-0000-000000000001', 'Admin menjalankan seed demo SINDEN');
end;
$$;

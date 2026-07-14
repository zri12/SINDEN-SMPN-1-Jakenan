-- Reset all school data and seed realistic SMP data.
-- This keeps the core admin/guru/siswa demo accounts available and recreates
-- all teacher/student seed accounts with password: Password12345

do $$
begin
  create extension if not exists pgcrypto;

  create temp table if not exists seed_accounts (
    id uuid primary key,
    email text not null unique,
    full_name text not null,
    username text not null unique,
    role text not null,
    phone text,
    password text not null
  ) on commit drop;

  truncate seed_accounts;

  insert into seed_accounts (id, email, full_name, username, role, phone, password) values
    ('9938c4c5-1bba-4e53-8de2-97489c1255d7','admin@sinden.local','Administrator','admin','admin',null,'Admin12345'),
    ('e6d0300c-462c-44b1-b097-11cb8b4fa4e8','guru@sinden.local','Bapak Fauzan','guru','teacher','081234567801','Guru12345'),
    ('51cc82fb-cc3c-469d-889b-944bde0d0e42','siswa@sinden.local','Ahmad Fauzan','siswa','student',null,'Siswa12345'),
    ('10000000-0000-0000-0000-000000002002','siti.aminah@smpn1jakenan.sch.id','Ibu Siti Aminah','siti.aminah','teacher','081234567802','Password12345'),
    ('10000000-0000-0000-0000-000000002003','andi.prasetyo@smpn1jakenan.sch.id','Bapak Andi Prasetyo','andi.prasetyo','teacher','081234567803','Password12345'),
    ('10000000-0000-0000-0000-000000002004','dedi.santoso@smpn1jakenan.sch.id','Bapak Dedi Santoso','dedi.santoso','teacher','081234567804','Password12345'),
    ('10000000-0000-0000-0000-000000002005','rina.kartika@smpn1jakenan.sch.id','Ibu Rina Kartika','rina.kartika','teacher','081234567805','Password12345'),
    ('10000000-0000-0000-0000-000000002006','nur.hidayati@smpn1jakenan.sch.id','Ibu Nur Hidayati','nur.hidayati','teacher','081234567806','Password12345'),
    ('10000000-0000-0000-0000-000000002007','agus.setiawan@smpn1jakenan.sch.id','Bapak Agus Setiawan','agus.setiawan','teacher','081234567807','Password12345'),
    ('20000000-0000-0000-0000-000000003002','siti.aisyah@smpn1jakenan.sch.id','Siti Aisyah','siti.aisyah','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003003','budi.pratama@smpn1jakenan.sch.id','Budi Pratama','budi.pratama','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003004','dewi.lestari@smpn1jakenan.sch.id','Dewi Lestari','dewi.lestari','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003005','raka.maulana@smpn1jakenan.sch.id','Raka Maulana','raka.maulana','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003006','fitri.handayani@smpn1jakenan.sch.id','Fitri Handayani','fitri.handayani','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003007','naufal.ramadhan@smpn1jakenan.sch.id','Naufal Ramadhan','naufal.ramadhan','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003008','anisa.putri@smpn1jakenan.sch.id','Anisa Putri','anisa.putri','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003009','rizky.saputra@smpn1jakenan.sch.id','Rizky Saputra','rizky.saputra','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003010','nabila.zahra@smpn1jakenan.sch.id','Nabila Zahra','nabila.zahra','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003011','ardi.nugroho@smpn1jakenan.sch.id','Ardi Nugroho','ardi.nugroho','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003012','citra.maharani@smpn1jakenan.sch.id','Citra Maharani','citra.maharani','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003013','bayu.setiawan@smpn1jakenan.sch.id','Bayu Setiawan','bayu.setiawan','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003014','maya.safitri@smpn1jakenan.sch.id','Maya Safitri','maya.safitri','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003015','dimas.pamungkas@smpn1jakenan.sch.id','Dimas Pamungkas','dimas.pamungkas','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003016','salma.nuraini@smpn1jakenan.sch.id','Salma Nuraini','salma.nuraini','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003017','farhan.akbar@smpn1jakenan.sch.id','Farhan Akbar','farhan.akbar','student',null,'Password12345'),
    ('20000000-0000-0000-0000-000000003018','putri.ramadhani@smpn1jakenan.sch.id','Putri Ramadhani','putri.ramadhani','student',null,'Password12345');

  delete from public.grades;
  delete from public.assignment_comments;
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

  delete from auth.users
  where id in (select id from public.profiles where role in ('teacher', 'student'))
    and id not in ('e6d0300c-462c-44b1-b097-11cb8b4fa4e8','51cc82fb-cc3c-469d-889b-944bde0d0e42');

  delete from auth.users
  where email in (select email from seed_accounts)
    and id not in (select id from seed_accounts);

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    confirmation_token, recovery_token, email_change, email_change_token_new,
    email_change_token_current, reauthentication_token, raw_app_meta_data,
    raw_user_meta_data, created_at, updated_at
  )
  select
    '00000000-0000-0000-0000-000000000000',
    id,
    'authenticated',
    'authenticated',
    email,
    crypt(password, gen_salt('bf', 10)),
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
  from seed_accounts
  on conflict (id) do update set
    email = excluded.email,
    encrypted_password = excluded.encrypted_password,
    email_confirmed_at = now(),
    confirmation_token = '',
    recovery_token = '',
    email_change = '',
    email_change_token_new = '',
    email_change_token_current = '',
    reauthentication_token = '',
    raw_app_meta_data = excluded.raw_app_meta_data,
    raw_user_meta_data = excluded.raw_user_meta_data,
    updated_at = now();

  insert into auth.identities (
    provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  )
  select
    id::text,
    id,
    jsonb_build_object('sub', id::text, 'email', email, 'email_verified', false, 'phone_verified', false),
    'email',
    now(),
    now(),
    now()
  from seed_accounts
  on conflict (provider_id, provider) do update set
    user_id = excluded.user_id,
    identity_data = excluded.identity_data,
    updated_at = now();

  insert into public.profiles (id, full_name, username, email, role, phone, is_active)
  select id, full_name, username, email, role, phone, true
  from seed_accounts
  on conflict (id) do update set
    full_name = excluded.full_name,
    username = excluded.username,
    email = excluded.email,
    role = excluded.role,
    phone = excluded.phone,
    is_active = true,
    updated_at = now();

  insert into public.settings (id, app_name, app_full_name, school_name, academic_year, semester, default_kkm, logo_url)
  values (
    '00000000-0000-0000-0000-000000000001',
    'SINDEN',
    'Sistem Informasi Digital Evaluasi Nilai',
    'SMP Negeri 1 Jakenan',
    '2026/2027',
    'ganjil',
    75,
    null
  );

  insert into public.classes (id, name, grade_level, academic_year, description, student_count, is_active) values
    ('00000000-0000-0000-0000-000000000701','7A',7,'2026/2027','Kelas VII A',32,true),
    ('00000000-0000-0000-0000-000000000702','7B',7,'2026/2027','Kelas VII B',31,true),
    ('00000000-0000-0000-0000-000000000703','7C',7,'2026/2027','Kelas VII C',30,true),
    ('00000000-0000-0000-0000-000000000801','8A',8,'2026/2027','Kelas VIII A',33,true),
    ('00000000-0000-0000-0000-000000000802','8B',8,'2026/2027','Kelas VIII B',32,true),
    ('00000000-0000-0000-0000-000000000901','9A',9,'2026/2027','Kelas IX A',29,true),
    ('00000000-0000-0000-0000-000000000902','9B',9,'2026/2027','Kelas IX B',30,true);

  insert into public.subjects (id, code, name, kkm, description, is_active) values
    ('00000000-0000-0000-0000-000000001001','BIN','Bahasa Indonesia',75,'Bahasa Indonesia SMP',true),
    ('00000000-0000-0000-0000-000000001002','MTK','Matematika',75,'Matematika SMP',true),
    ('00000000-0000-0000-0000-000000001003','IPA','Ilmu Pengetahuan Alam',75,'IPA SMP',true),
    ('00000000-0000-0000-0000-000000001004','IPS','Ilmu Pengetahuan Sosial',75,'IPS SMP',true),
    ('00000000-0000-0000-0000-000000001005','BIG','Bahasa Inggris',75,'Bahasa Inggris SMP',true),
    ('00000000-0000-0000-0000-000000001006','PPKN','PPKn',75,'Pendidikan Pancasila dan Kewarganegaraan',true),
    ('00000000-0000-0000-0000-000000001007','PAI','Pendidikan Agama Islam',75,'Pendidikan Agama dan Budi Pekerti',true),
    ('00000000-0000-0000-0000-000000001008','SBK','Seni Budaya',75,'Seni Budaya',true),
    ('00000000-0000-0000-0000-000000001009','PJOK','PJOK',75,'Pendidikan Jasmani, Olahraga, dan Kesehatan',true),
    ('00000000-0000-0000-0000-000000001010','INF','Informatika',75,'Informatika SMP',true);

  insert into public.teachers (id, profile_id, nip, nuptk, full_name, gender, employment_status, teacher_type, phone, status) values
    ('00000000-0000-0000-0000-000000002001','e6d0300c-462c-44b1-b097-11cb8b4fa4e8','198501012010011001','1234567890123456','Bapak Fauzan','L','PNS','Guru Mata Pelajaran','081234567801','active'),
    ('00000000-0000-0000-0000-000000002002','10000000-0000-0000-0000-000000002002','198602022011012002','2234567890123456','Ibu Siti Aminah','P','PNS','Guru Mata Pelajaran','081234567802','active'),
    ('00000000-0000-0000-0000-000000002003','10000000-0000-0000-0000-000000002003','198703032012013003','3234567890123456','Bapak Andi Prasetyo','L','PNS','Guru Mata Pelajaran','081234567803','active'),
    ('00000000-0000-0000-0000-000000002004','10000000-0000-0000-0000-000000002004','198804042013014004','4234567890123456','Bapak Dedi Santoso','L','PPPK','Guru Mata Pelajaran','081234567804','active'),
    ('00000000-0000-0000-0000-000000002005','10000000-0000-0000-0000-000000002005','198905052014015005','5234567890123456','Ibu Rina Kartika','P','PNS','Guru Mata Pelajaran','081234567805','active'),
    ('00000000-0000-0000-0000-000000002006','10000000-0000-0000-0000-000000002006','199006062015016006','6234567890123456','Ibu Nur Hidayati','P','PNS','Guru Mata Pelajaran','081234567806','active'),
    ('00000000-0000-0000-0000-000000002007','10000000-0000-0000-0000-000000002007','199107072016017007','7234567890123456','Bapak Agus Setiawan','L','Honorer','Guru Mata Pelajaran','081234567807','active');

  insert into public.students (id, profile_id, class_id, nis, nisn, full_name, gender, birth_place, birth_date, address, status) values
    ('00000000-0000-0000-0000-000000003001','51cc82fb-cc3c-469d-889b-944bde0d0e42','00000000-0000-0000-0000-000000000701','2026001','0061234567','Ahmad Fauzan','L','Pati','2013-05-12','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003002','20000000-0000-0000-0000-000000003002','00000000-0000-0000-0000-000000000701','2026002','0061234568','Siti Aisyah','P','Pati','2013-06-18','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003003','20000000-0000-0000-0000-000000003003','00000000-0000-0000-0000-000000000701','2026003','0061234569','Budi Pratama','L','Pati','2013-01-20','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003004','20000000-0000-0000-0000-000000003004','00000000-0000-0000-0000-000000000701','2026004','0061234570','Dewi Lestari','P','Pati','2013-03-08','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003005','20000000-0000-0000-0000-000000003005','00000000-0000-0000-0000-000000000702','2026005','0061234571','Raka Maulana','L','Pati','2013-02-11','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003006','20000000-0000-0000-0000-000000003006','00000000-0000-0000-0000-000000000702','2026006','0061234572','Fitri Handayani','P','Pati','2013-07-15','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003007','20000000-0000-0000-0000-000000003007','00000000-0000-0000-0000-000000000702','2026007','0061234573','Naufal Ramadhan','L','Pati','2013-09-01','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003008','20000000-0000-0000-0000-000000003008','00000000-0000-0000-0000-000000000703','2026008','0061234574','Anisa Putri','P','Pati','2013-10-22','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003009','20000000-0000-0000-0000-000000003009','00000000-0000-0000-0000-000000000801','2026009','0061234575','Rizky Saputra','L','Pati','2012-04-17','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003010','20000000-0000-0000-0000-000000003010','00000000-0000-0000-0000-000000000801','2026010','0061234576','Nabila Zahra','P','Pati','2012-11-05','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003011','20000000-0000-0000-0000-000000003011','00000000-0000-0000-0000-000000000801','2026011','0061234577','Ardi Nugroho','L','Pati','2012-12-12','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003012','20000000-0000-0000-0000-000000003012','00000000-0000-0000-0000-000000000802','2026012','0061234578','Citra Maharani','P','Pati','2012-08-19','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003013','20000000-0000-0000-0000-000000003013','00000000-0000-0000-0000-000000000901','2026013','0061234579','Bayu Setiawan','L','Pati','2011-05-04','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003014','20000000-0000-0000-0000-000000003014','00000000-0000-0000-0000-000000000901','2026014','0061234580','Maya Safitri','P','Pati','2011-02-13','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003015','20000000-0000-0000-0000-000000003015','00000000-0000-0000-0000-000000000901','2026015','0061234581','Dimas Pamungkas','L','Pati','2011-06-27','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003016','20000000-0000-0000-0000-000000003016','00000000-0000-0000-0000-000000000902','2026016','0061234582','Salma Nuraini','P','Pati','2011-09-21','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003017','20000000-0000-0000-0000-000000003017','00000000-0000-0000-0000-000000000902','2026017','0061234583','Farhan Akbar','L','Pati','2011-01-30','Jakenan, Pati','active'),
    ('00000000-0000-0000-0000-000000003018','20000000-0000-0000-0000-000000003018','00000000-0000-0000-0000-000000000902','2026018','0061234584','Putri Ramadhani','P','Pati','2011-04-02','Jakenan, Pati','active');

  insert into public.teacher_classes (teacher_id, class_id, subject_id, academic_year, semester) values
    ('00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000702','00000000-0000-0000-0000-000000001002','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002002','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001001','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002003','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001003','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002004','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001005','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002005','00000000-0000-0000-0000-000000000901','00000000-0000-0000-0000-000000001004','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002006','00000000-0000-0000-0000-000000000902','00000000-0000-0000-0000-000000001006','2026/2027','ganjil'),
    ('00000000-0000-0000-0000-000000002007','00000000-0000-0000-0000-000000000703','00000000-0000-0000-0000-000000001010','2026/2027','ganjil');

  insert into public.assignments (id, teacher_id, class_id, subject_id, title, description, assignment_link_url, publish_at, deadline, status) values
    ('00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','Latihan Pecahan Kelas 7','Kerjakan latihan operasi pecahan dan unggah jawaban dalam bentuk foto atau PDF.','https://example.com/materi/pecahan',now() - interval '1 day',now() + interval '5 days','active'),
    ('00000000-0000-0000-0000-000000004002','00000000-0000-0000-0000-000000002002','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001001','Teks Deskripsi Lingkungan Sekolah','Tulis teks deskripsi minimal tiga paragraf tentang lingkungan sekolah.','https://example.com/materi/teks-deskripsi',now() - interval '1 day',now() + interval '7 days','active'),
    ('00000000-0000-0000-0000-000000004003','00000000-0000-0000-0000-000000002003','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001003','Rangkuman Sistem Pencernaan','Buat rangkuman sistem pencernaan manusia dalam satu halaman.','https://example.com/materi/sistem-pencernaan',now() - interval '1 day',now() + interval '8 days','active'),
    ('00000000-0000-0000-0000-000000004004','00000000-0000-0000-0000-000000002004','00000000-0000-0000-0000-000000000801','00000000-0000-0000-0000-000000001005','Daily Activity Paragraph','Write a short paragraph about your daily activities.','https://example.com/materi/daily-activity',now() - interval '2 days',now() - interval '1 day','active');

  insert into public.submissions (id, assignment_id, student_id, submission_link_url, note, status, submitted_at) values
    ('00000000-0000-0000-0000-000000005001','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000003001','https://example.com/jawaban/ahmad-pecahan','Jawaban lengkap sesuai instruksi.','reviewed',now() - interval '10 hours'),
    ('00000000-0000-0000-0000-000000005002','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000003002','https://example.com/jawaban/siti-pecahan','Sudah dikumpulkan.','submitted',now() - interval '8 hours');

  insert into public.grades (id, student_id, teacher_id, class_id, subject_id, assignment_id, submission_id, grade_type, score, kkm, semester, academic_year, note) values
    ('00000000-0000-0000-0000-000000006001','00000000-0000-0000-0000-000000003001','00000000-0000-0000-0000-000000002001','00000000-0000-0000-0000-000000000701','00000000-0000-0000-0000-000000001002','00000000-0000-0000-0000-000000004001','00000000-0000-0000-0000-000000005001','assignment',88,75,'ganjil','2026/2027','Tuntas');

  insert into public.announcements (id, title, content, target_role, class_id, created_by, is_active) values
    ('00000000-0000-0000-0000-000000007001','Jadwal Pengumpulan Tugas','Periksa menu Tugas Saya secara berkala untuk melihat tugas terbaru.','student',null,'9938c4c5-1bba-4e53-8de2-97489c1255d7',true),
    ('00000000-0000-0000-0000-000000007002','Informasi Guru','Data kelas, tugas, dan pengumpulan sudah disinkronkan dengan Supabase.','teacher',null,'9938c4c5-1bba-4e53-8de2-97489c1255d7',true);
end;
$$;

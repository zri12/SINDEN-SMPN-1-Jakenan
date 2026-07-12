# 05 — Database Schema SINDEN

Dokumen ini menjelaskan rancangan database Supabase untuk aplikasi SINDEN.

Database menggunakan PostgreSQL dari Supabase.

---

## 1. Daftar Tabel

Tabel utama:

1. `profiles`
2. `students`
3. `teachers`
4. `classes`
5. `subjects`
6. `teacher_classes`
7. `grades`
8. `assignments`
9. `submissions`
10. `announcements`
11. `settings`

---

## 2. Relasi Umum

```txt
profiles
├── students
└── teachers

classes
└── students

subjects
└── grades
└── assignments

teachers
└── teacher_classes
└── grades
└── assignments

students
└── grades
└── submissions

assignments
└── submissions
```

---

# 3. Tabel `profiles`

## Fungsi

Menyimpan data akun pengguna untuk login dan role.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| auth_id | uuid | ID dari Supabase Auth, nullable jika auth sederhana |
| full_name | text | Nama lengkap pengguna |
| username | text | Username login |
| email | text | Email, nullable |
| role | text | admin, teacher, student |
| is_active | boolean | Status aktif |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table profiles (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid,
  full_name text not null,
  username text unique not null,
  email text,
  role text not null check (role in ('admin', 'teacher', 'student')),
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 4. Tabel `students`

## Fungsi

Menyimpan data siswa.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| profile_id | uuid | Relasi ke profiles |
| nis | text | NIS/NIPD |
| nisn | text | NISN |
| full_name | text | Nama siswa |
| class_id | uuid | Relasi ke classes |
| gender | text | L/P |
| status | text | active/inactive |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table students (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  nis text,
  nisn text,
  full_name text not null,
  class_id uuid references classes(id) on delete set null,
  gender text check (gender in ('L', 'P')),
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## Catatan

- NIS/NISN harus menggunakan tipe `text`.
- Jangan gunakan tipe angka agar angka 0 di depan tidak hilang.
- Siswa hanya boleh melihat datanya sendiri.

---

# 5. Tabel `teachers`

## Fungsi

Menyimpan data guru.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| profile_id | uuid | Relasi ke profiles |
| nip | text | NIP |
| nuptk | text | NUPTK |
| full_name | text | Nama guru |
| status | text | active/inactive |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table teachers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  nip text,
  nuptk text,
  full_name text not null,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 6. Tabel `classes`

## Fungsi

Menyimpan data kelas.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| name | text | Nama kelas, contoh 7A |
| grade_level | integer | Tingkat kelas, 7/8/9 |
| academic_year | text | Tahun ajaran |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade_level integer not null,
  academic_year text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 7. Tabel `subjects`

## Fungsi

Menyimpan data mata pelajaran.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| code | text | Kode mapel |
| name | text | Nama mapel |
| kkm | integer | Nilai KKM |
| status | text | active/inactive |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table subjects (
  id uuid primary key default gen_random_uuid(),
  code text,
  name text not null,
  kkm integer default 75,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 8. Tabel `teacher_classes`

## Fungsi

Menyimpan relasi guru, kelas, dan mata pelajaran.

Satu guru dapat mengajar beberapa kelas. Satu kelas dapat memiliki beberapa guru/mapel.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| teacher_id | uuid | Relasi ke teachers |
| class_id | uuid | Relasi ke classes |
| subject_id | uuid | Relasi ke subjects |
| created_at | timestamp | Waktu dibuat |

## SQL

```sql
create table teacher_classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references teachers(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  subject_id uuid references subjects(id) on delete cascade,
  created_at timestamp with time zone default now()
);
```

---

# 9. Tabel `grades`

## Fungsi

Menyimpan nilai siswa.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| student_id | uuid | Relasi ke students |
| teacher_id | uuid | Relasi ke teachers |
| class_id | uuid | Relasi ke classes |
| subject_id | uuid | Relasi ke subjects |
| semester | text | Semester |
| grade_type | text | Jenis nilai |
| score | numeric | Nilai 0-100 |
| note | text | Catatan |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## Jenis Nilai

- tugas
- ulangan_harian
- pts
- pas
- praktik
- remedial

## SQL

```sql
create table grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  teacher_id uuid references teachers(id) on delete set null,
  class_id uuid references classes(id) on delete set null,
  subject_id uuid references subjects(id) on delete set null,
  semester text,
  grade_type text not null check (
    grade_type in ('tugas', 'ulangan_harian', 'pts', 'pas', 'praktik', 'remedial')
  ),
  score numeric not null check (score >= 0 and score <= 100),
  note text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 10. Tabel `assignments`

## Fungsi

Menyimpan tugas yang dibuat oleh guru.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| teacher_id | uuid | Pembuat tugas |
| class_id | uuid | Kelas tujuan |
| subject_id | uuid | Mata pelajaran |
| title | text | Judul tugas |
| description | text | Deskripsi tugas |
| file_url | text | File tugas dari guru |
| link_url | text | Link tambahan |
| deadline | timestamp | Batas pengumpulan |
| status | text | active/closed |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references teachers(id) on delete set null,
  class_id uuid references classes(id) on delete cascade,
  subject_id uuid references subjects(id) on delete set null,
  title text not null,
  description text,
  file_url text,
  link_url text,
  deadline timestamp with time zone,
  status text default 'active' check (status in ('active', 'closed')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 11. Tabel `submissions`

## Fungsi

Menyimpan pengumpulan tugas oleh siswa.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| assignment_id | uuid | Relasi ke assignments |
| student_id | uuid | Relasi ke students |
| file_url | text | File jawaban siswa |
| note | text | Catatan siswa |
| status | text | submitted/late |
| submitted_at | timestamp | Waktu mengumpulkan |
| created_at | timestamp | Waktu dibuat |

## SQL

```sql
create table submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references assignments(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  file_url text,
  note text,
  status text default 'submitted' check (status in ('submitted', 'late')),
  submitted_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);
```

## Catatan

- Siswa dapat upload tugas.
- Guru hanya melihat status/catatan, tidak perlu fitur download file siswa.
- File tetap bisa tersimpan di storage untuk keperluan sistem.

---

# 12. Tabel `announcements`

## Fungsi

Menyimpan informasi/pengumuman sederhana.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| title | text | Judul informasi |
| content | text | Isi informasi |
| target_role | text | admin/teacher/student/all |
| created_by | uuid | Pembuat |
| created_at | timestamp | Waktu dibuat |

## SQL

```sql
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  target_role text default 'all' check (target_role in ('admin', 'teacher', 'student', 'all')),
  created_by uuid references profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);
```

---

# 13. Tabel `settings`

## Fungsi

Menyimpan pengaturan dasar aplikasi.

## Kolom

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key |
| school_name | text | Nama sekolah |
| app_name | text | Nama aplikasi |
| app_subtitle | text | Subjudul |
| academic_year | text | Tahun ajaran |
| semester | text | Semester aktif |
| default_kkm | integer | KKM default |
| logo_url | text | URL logo |
| updated_at | timestamp | Waktu update |

## SQL

```sql
create table settings (
  id uuid primary key default gen_random_uuid(),
  school_name text default 'SMP Negeri 1 Jakenan',
  app_name text default 'SINDEN',
  app_subtitle text default 'Sistem Informasi Digital Evaluasi Nilai',
  academic_year text,
  semester text,
  default_kkm integer default 75,
  logo_url text,
  updated_at timestamp with time zone default now()
);
```

---

# 14. View Rekap Nilai

Untuk mempermudah rekap, dapat dibuat view sederhana.

```sql
create view grade_summary as
select
  s.id as student_id,
  s.full_name as student_name,
  c.name as class_name,
  sub.name as subject_name,
  avg(g.score) as average_score,
  sub.kkm,
  case
    when avg(g.score) >= sub.kkm then 'Tuntas'
    else 'Belum Tuntas'
  end as status
from grades g
join students s on s.id = g.student_id
left join classes c on c.id = g.class_id
left join subjects sub on sub.id = g.subject_id
group by s.id, s.full_name, c.name, sub.name, sub.kkm;
```

---

# 15. Catatan Keamanan Data

Data yang perlu dijaga:

- NISN
- NIPD/NIS
- NIP
- NUPTK
- nama siswa
- data nilai
- file tugas siswa

Aturan umum:

- jangan publish data mentah ke publik;
- gunakan auth/role;
- siswa hanya melihat data sendiri;
- guru hanya melihat kelas yang diajar;
- admin memiliki akses penuh;
- file storage jangan dibuat terbuka tanpa pertimbangan.

---

# 16. Catatan Implementasi

Database schema ini bisa disesuaikan saat implementasi, tetapi struktur utama tidak boleh berubah terlalu jauh agar fitur tetap konsisten.

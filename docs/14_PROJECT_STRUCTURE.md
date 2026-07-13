# 14 — Project Structure SINDEN

Dokumen ini menjelaskan struktur folder project SINDEN yang disarankan.

Project menggunakan:

- React
- Vite
- TypeScript
- Supabase
- Vercel

---

## 1. Struktur Utama

```txt
sinden-app/
├── docs/
│   ├── 01_PROJECT_BRIEF.md
│   ├── 02_FEATURES.md
│   ├── 03_UI_GUIDELINES.md
│   ├── 04_ROUTES.md
│   ├── 05_DATABASE_SCHEMA.md
│   ├── 06_AUTH_AND_ROLES.md
│   ├── 07_WORKFLOW.md
│   ├── 08_SUPABASE_SETUP.md
│   ├── 09_STORAGE_RULES.md
│   ├── 10_DEPLOYMENT.md
│   ├── 11_TESTING_CHECKLIST.md
│   ├── 12_CHANGELOG.md
│   ├── 13_LIMITATIONS.md
│   └── 14_PROJECT_STRUCTURE.md
│
├── public/
│   ├── logo-smp.png
│   ├── logo-sinden.png
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── routes/
│   ├── types/
│   ├── constants/
│   ├── utils/
│   ├── data/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── policies/
│
├── .env.example
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

# 2. Folder `docs/`

Untuk dokumentasi project.

Fungsi:

- menjaga scope;
- menyimpan detail fitur;
- menyimpan aturan UI;
- menyimpan schema database;
- menyimpan panduan deploy;
- menyimpan checklist testing.

---

# 3. Folder `public/`

Untuk file statis yang dapat diakses langsung.

Contoh:

```txt
public/
├── logo-smp.png
├── logo-sinden.png
└── favicon.ico
```

Cocok untuk:

- logo sekolah;
- favicon;
- gambar statis umum.

---

# 4. Folder `src/assets/`

Untuk aset yang digunakan di dalam kode React.

```txt
src/assets/
├── images/
├── icons/
└── illustrations/
```

Fungsi:

- gambar ilustrasi;
- ikon custom;
- gambar pendukung UI.

---

# 5. Folder `src/components/`

Untuk komponen reusable.

```txt
src/components/
├── common/
├── layout/
├── dashboard/
├── forms/
└── tables/
```

---

## 5.1 `components/common/`

Untuk komponen umum.

```txt
Button.tsx
Input.tsx
Select.tsx
Modal.tsx
Badge.tsx
Card.tsx
Table.tsx
SearchBar.tsx
FilterDropdown.tsx
EmptyState.tsx
Loading.tsx
```

Komponen ini dipakai oleh semua role.

---

## 5.2 `components/layout/`

Untuk layout utama.

```txt
DashboardLayout.tsx
Sidebar.tsx
Topbar.tsx
MobileSidebar.tsx
PageHeader.tsx
```

Fungsi:

- sidebar;
- header;
- layout dashboard;
- responsive mobile.

---

## 5.3 `components/dashboard/`

Untuk elemen dashboard.

```txt
StatCard.tsx
ActivityList.tsx
SimpleChart.tsx
SummaryCard.tsx
```

---

## 5.4 `components/forms/`

Untuk form tambah/edit.

```txt
StudentForm.tsx
TeacherForm.tsx
ClassForm.tsx
SubjectForm.tsx
GradeForm.tsx
AssignmentForm.tsx
SubmissionForm.tsx
```

---

## 5.5 `components/tables/`

Untuk tabel data.

```txt
StudentTable.tsx
TeacherTable.tsx
ClassTable.tsx
SubjectTable.tsx
GradeTable.tsx
AssignmentTable.tsx
SubmissionTable.tsx
```

---

# 6. Folder `src/features/`

Folder ini membagi fitur berdasarkan role.

```txt
src/features/
├── auth/
├── admin/
├── teacher/
└── student/
```

---

## 6.1 `features/auth/`

```txt
auth/
├── LoginPage.tsx
├── ProtectedRoute.tsx
├── authService.ts
└── authTypes.ts
```

Fungsi:

- halaman login;
- validasi login;
- redirect role;
- proteksi route;
- logout.

---

## 6.2 `features/admin/`

```txt
admin/
├── pages/
│   ├── AdminDashboard.tsx
│   ├── ManageStudents.tsx
│   ├── ManageTeachers.tsx
│   ├── ManageClasses.tsx
│   ├── ManageSubjects.tsx
│   ├── ManageGrades.tsx
│   ├── ManageAssignments.tsx
│   ├── GradeRecap.tsx
│   └── Settings.tsx
└── adminService.ts
```

---

## 6.3 `features/teacher/`

```txt
teacher/
├── pages/
│   ├── TeacherDashboard.tsx
│   ├── MyClasses.tsx
│   ├── InputGrades.tsx
│   ├── TeacherAssignments.tsx
│   ├── AssignmentSubmissions.tsx
│   └── TeacherGradeRecap.tsx
└── teacherService.ts
```

---

## 6.4 `features/student/`

```txt
student/
├── pages/
│   ├── StudentDashboard.tsx
│   ├── MyGrades.tsx
│   ├── MyAssignments.tsx
│   └── StudentProfile.tsx
└── studentService.ts
```

---

# 7. Folder `src/hooks/`

Untuk custom hooks.

```txt
hooks/
├── useAuth.ts
├── useStudents.ts
├── useTeachers.ts
├── useClasses.ts
├── useSubjects.ts
├── useGrades.ts
├── useAssignments.ts
└── useSubmissions.ts
```

Fungsi:

- memisahkan logic data;
- menghindari kode berulang;
- membuat halaman lebih rapi.

---

# 8. Folder `src/lib/`

Untuk konfigurasi library.

```txt
lib/
├── supabaseClient.ts
├── storage.ts
└── helpers.ts
```

### `supabaseClient.ts`

Untuk koneksi Supabase.

### `storage.ts`

Untuk fungsi upload file.

### `helpers.ts`

Untuk helper umum.

---

# 9. Folder `src/services/`

Untuk query database.

```txt
services/
├── studentService.ts
├── teacherService.ts
├── classService.ts
├── subjectService.ts
├── gradeService.ts
├── assignmentService.ts
├── submissionService.ts
└── announcementService.ts
```

Aturan:

- komponen UI tidak langsung query Supabase;
- query database masuk ke service;
- service mengembalikan data ke hooks/pages.

---

# 10. Folder `src/routes/`

Untuk route aplikasi.

```txt
routes/
├── AppRoutes.tsx
├── adminRoutes.tsx
├── teacherRoutes.tsx
└── studentRoutes.tsx
```

---

# 11. Folder `src/types/`

Untuk type/interface TypeScript.

```txt
types/
├── auth.ts
├── user.ts
├── student.ts
├── teacher.ts
├── class.ts
├── subject.ts
├── grade.ts
├── assignment.ts
└── submission.ts
```

Contoh:

```ts
export interface Student {
  id: string
  nis?: string
  nisn?: string
  full_name: string
  class_id: string
  gender?: 'L' | 'P'
  status: 'active' | 'inactive'
}
```

---

# 12. Folder `src/constants/`

Untuk data tetap.

```txt
constants/
├── roles.ts
├── menus.ts
├── status.ts
├── routes.ts
└── appConfig.ts
```

Contoh isi:

- daftar role;
- menu sidebar;
- status badge;
- route path;
- nama aplikasi.

---

# 13. Folder `src/utils/`

Untuk fungsi bantuan.

```txt
utils/
├── formatDate.ts
├── formatGrade.ts
├── calculateGrade.ts
├── getStatusBadge.ts
└── validateFile.ts
```

Contoh fungsi:

- format tanggal;
- hitung nilai akhir;
- validasi file;
- menentukan status tuntas.

---

# 14. Folder `src/data/`

Untuk data dummy sementara.

```txt
data/
├── dummyStudents.ts
├── dummyTeachers.ts
├── dummyClasses.ts
├── dummySubjects.ts
└── dummyAssignments.ts
```

Catatan:

- data dummy dipakai saat UI belum tersambung database;
- setelah Supabase aktif, data dummy dapat dihapus atau dipakai fallback.

---

# 15. Folder `src/styles/`

Untuk style global.

```txt
styles/
├── globals.css
└── variables.css
```

---

# 16. Folder `supabase/`

Untuk SQL project.

```txt
supabase/
├── migrations/
│   ├── 001_create_profiles.sql
│   ├── 002_create_classes.sql
│   ├── 003_create_subjects.sql
│   ├── 004_create_students.sql
│   ├── 005_create_teachers.sql
│   ├── 006_create_teacher_classes.sql
│   ├── 007_create_grades.sql
│   ├── 008_create_assignments.sql
│   ├── 009_create_submissions.sql
│   ├── 010_create_announcements.sql
│   └── 011_create_settings.sql
│
├── seed/
│   ├── classes_seed.sql
│   ├── subjects_seed.sql
│   ├── admin_seed.sql
│   ├── teachers_seed.sql
│   └── students_seed.sql
│
└── policies/
    ├── profiles_policy.sql
    ├── students_policy.sql
    ├── teachers_policy.sql
    ├── grades_policy.sql
    ├── assignments_policy.sql
    └── submissions_policy.sql
```

---

# 17. File Environment

## `.env`

File asli, tidak boleh diupload ke GitHub.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## `.env.example`

File contoh, boleh diupload.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# 18. File Root

| File | Fungsi |
|---|---|
| `package.json` | dependency dan script |
| `vite.config.ts` | konfigurasi Vite |
| `tsconfig.json` | konfigurasi TypeScript |
| `tailwind.config.js` | konfigurasi Tailwind jika digunakan |
| `postcss.config.js` | konfigurasi PostCSS |
| `.gitignore` | daftar file yang tidak masuk Git |
| `README.md` | dokumentasi utama |
| `vercel.json` | redirect SPA untuk Vercel |

---

# 19. Prinsip Kode

Jangan menaruh semua kode di `App.tsx`.

`App.tsx` cukup untuk:

- provider;
- route utama;
- layout dasar.

Yang harus dipisah:

- UI reusable → `components/`
- halaman role → `features/`
- query database → `services/`
- custom logic → `hooks/`
- konfigurasi Supabase → `lib/`
- type → `types/`
- helper → `utils/`

---

# 20. Urutan Pengerjaan

```txt
1. Rapikan struktur project
2. Pisahkan UI Figma menjadi komponen
3. Buat routing
4. Buat layout dashboard
5. Buat Supabase project
6. Buat database schema
7. Buat login role
8. Sambungkan data master
9. Sambungkan input nilai
10. Sambungkan tugas guru
11. Sambungkan upload tugas siswa
12. Buat rekap sederhana
13. Testing semua role
14. Deploy ke Vercel
```

---

# 21. Kesimpulan

Struktur ini dibuat agar project tetap rapi, mudah dikembangkan, dan tidak menumpuk semua logic di satu file. Dengan struktur ini, fitur tambahan di masa depan juga lebih mudah dibuat.

# 04 — Routes SINDEN

Dokumen ini berisi daftar route/halaman aplikasi SINDEN.

---

## 1. Prinsip Routing

Aplikasi menggunakan pembagian route berdasarkan role:

```txt
/login
/admin/*
/guru/*
/siswa/*
```

Setiap role hanya boleh mengakses route miliknya sendiri.

---

## 2. Route Umum

| Route | Halaman | Akses |
|---|---|---|
| `/` | Redirect ke login/dashboard | Semua |
| `/login` | Login | Semua |
| `/unauthorized` | Akses ditolak | Semua |
| `*` | Not Found | Semua |

---

## 3. Route Admin

| Route | Halaman | Fungsi |
|---|---|---|
| `/admin/dashboard` | Dashboard Admin | Ringkasan sistem |
| `/admin/siswa` | Data Siswa | Kelola data siswa |
| `/admin/guru` | Data Guru | Kelola data guru |
| `/admin/kelas` | Data Kelas | Kelola data kelas |
| `/admin/mapel` | Mata Pelajaran | Kelola mata pelajaran |
| `/admin/nilai` | Data Nilai | Melihat data nilai |
| `/admin/tugas` | Data Tugas | Melihat data tugas |
| `/admin/rekap` | Rekap Nilai | Melihat rekap nilai sederhana |
| `/admin/pengaturan` | Pengaturan | Pengaturan aplikasi |

---

## 4. Route Guru

| Route | Halaman | Fungsi |
|---|---|---|
| `/guru/dashboard` | Dashboard Guru | Ringkasan aktivitas guru |
| `/guru/kelas` | Kelas Saya | Melihat kelas yang diajar |
| `/guru/input-nilai` | Input Nilai | Input nilai siswa |
| `/guru/tugas` | Tugas | Membuat dan mengelola tugas |
| `/guru/pengumpulan` | Pengumpulan Tugas | Melihat status pengumpulan |
| `/guru/rekap` | Rekap Nilai | Rekap nilai sederhana |

---

## 5. Route Siswa

| Route | Halaman | Fungsi |
|---|---|---|
| `/siswa/dashboard` | Dashboard Siswa | Ringkasan siswa |
| `/siswa/nilai` | Nilai Saya | Melihat nilai sendiri |
| `/siswa/tugas` | Tugas Saya | Melihat daftar tugas |
| `/siswa/upload-tugas` | Upload Tugas | Mengumpulkan tugas |

---

## 6. Redirect Setelah Login

Aturan redirect:

| Role | Redirect |
|---|---|
| Admin | `/admin/dashboard` |
| Guru | `/guru/dashboard` |
| Siswa | `/siswa/dashboard` |

---

## 7. Proteksi Route

Aturan proteksi:

- user belum login tidak boleh akses dashboard;
- user admin tidak boleh akses route guru/siswa;
- user guru tidak boleh akses route admin/siswa;
- user siswa tidak boleh akses route admin/guru;
- jika role salah, arahkan ke `/unauthorized`;
- jika user logout, arahkan ke `/login`.

---

## 8. Struktur File Routing

Rekomendasi struktur:

```txt
src/routes/
├── AppRoutes.tsx
├── adminRoutes.tsx
├── teacherRoutes.tsx
└── studentRoutes.tsx
```

---

## 9. Contoh Definisi Route

Contoh struktur route:

```tsx
<Route path="/login" element={<LoginPage />} />

<Route element={<ProtectedRoute allowedRoles={['admin']} />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/siswa" element={<ManageStudents />} />
</Route>

<Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
  <Route path="/guru/dashboard" element={<TeacherDashboard />} />
</Route>

<Route element={<ProtectedRoute allowedRoles={['student']} />}>
  <Route path="/siswa/dashboard" element={<StudentDashboard />} />
</Route>
```

---

## 10. Menu Sidebar Berdasarkan Route

### Admin

```txt
Dashboard       → /admin/dashboard
Data Siswa      → /admin/siswa
Data Guru       → /admin/guru
Data Kelas      → /admin/kelas
Mata Pelajaran  → /admin/mapel
Data Nilai      → /admin/nilai
Data Tugas      → /admin/tugas
Rekap Nilai     → /admin/rekap
Pengaturan      → /admin/pengaturan
Logout          → logout action
```

### Guru

```txt
Dashboard           → /guru/dashboard
Kelas Saya          → /guru/kelas
Input Nilai         → /guru/input-nilai
Tugas               → /guru/tugas
Pengumpulan Tugas   → /guru/pengumpulan
Rekap Nilai         → /guru/rekap
Logout              → logout action
```

### Siswa

```txt
Dashboard       → /siswa/dashboard
Nilai Saya      → /siswa/nilai
Tugas Saya      → /siswa/tugas
Upload Tugas    → /siswa/upload-tugas
Logout          → logout action
```

---

## 11. Catatan URL Bahasa

URL menggunakan kata yang pendek dan konsisten.

- Untuk guru digunakan `/guru`, bukan `/teacher`, agar sesuai bahasa Indonesia.
- Untuk admin tetap `/admin`.
- Untuk siswa digunakan `/siswa`.

Namun untuk nama folder kode TypeScript tetap boleh menggunakan bahasa Inggris seperti `teacher`, `student`, `assignment`, agar lebih rapi secara teknis.

---

## 12. Error Page

### Unauthorized

Route:

```txt
/unauthorized
```

Tampilan:

- Judul: Akses Tidak Diizinkan
- Pesan: Anda tidak memiliki akses ke halaman ini.
- Tombol: Kembali ke Dashboard

### Not Found

Route:

```txt
*
```

Tampilan:

- Judul: Halaman Tidak Ditemukan
- Pesan: Halaman yang Anda cari tidak tersedia.
- Tombol: Kembali ke Login/Dashboard

# 01 — Project Brief SINDEN

## 1. Nama Project

**SINDEN — Sistem Informasi Digital Evaluasi Nilai**

Aplikasi ini dibuat untuk **SMP Negeri 1 Jakenan** sebagai sistem informasi digital sederhana untuk monitoring nilai dan tugas siswa.

---

## 2. Latar Belakang

Sebelumnya, konsep aplikasi SINDEN sudah pernah dibuat menggunakan Canva AI/Canva Code. Tampilan awal tersebut sudah dapat menampilkan halaman login, dashboard, dan role, tetapi file sumbernya tidak dapat diedit secara penuh. Di editor Canva hanya tersedia pengubahan nama sekolah, nama aplikasi, dan slogan. Alur role, dashboard, menu, dan logika sistem tidak dapat diubah secara langsung.

Karena aplikasi akan digunakan secara lebih nyata dan membutuhkan penyimpanan data, maka solusi yang lebih tepat adalah membuat ulang versi program sederhana menggunakan:

- React + Vite untuk frontend;
- Supabase untuk database dan penyimpanan file;
- Vercel untuk publish web.

Dengan pendekatan ini, sistem tidak hanya menjadi tampilan statis, tetapi dapat menyimpan data dan menjalankan fitur utama.

---

## 3. Tujuan Project

Tujuan utama project ini adalah membuat web sistem sederhana yang dapat digunakan untuk:

1. Mengelola data siswa.
2. Mengelola data guru.
3. Mengelola data kelas.
4. Mengelola data mata pelajaran.
5. Menginput nilai siswa.
6. Membuat tugas dari guru kepada siswa.
7. Mengunggah file/link tugas dari guru.
8. Mengizinkan siswa mengumpulkan tugas.
9. Melihat status pengumpulan tugas.
10. Melihat nilai siswa.
11. Menampilkan rekap nilai sederhana.
12. Menyediakan dashboard berbeda untuk Admin, Guru, dan Siswa.

---

## 4. Sasaran Pengguna

Aplikasi ini ditujukan untuk lingkungan sekolah, terutama:

- Admin/operator sekolah;
- Guru mata pelajaran;
- Siswa.

---

## 5. Role yang Digunakan

Versi awal aplikasi hanya menggunakan 3 role:

### 5.1 Admin

Admin bertugas mengelola data utama sistem seperti siswa, guru, kelas, mata pelajaran, nilai, tugas, dan rekap.

### 5.2 Guru

Guru bertugas membuat tugas, menginput nilai siswa, melihat daftar pengumpulan tugas, dan melihat rekap sederhana.

### 5.3 Siswa

Siswa dapat melihat nilai, melihat tugas, dan mengunggah/mengumpulkan tugas yang diberikan oleh guru.

---

## 6. Role yang Tidak Digunakan

Role berikut tidak dibuat pada versi awal:

- Wali Kelas
- Orang Tua

Kedua role tersebut sebelumnya ada pada konsep Canva, tetapi tidak termasuk dalam scope versi program sederhana ini.

---

## 7. Batasan Project

Project ini dibuat sebagai sistem sederhana yang **running well**, bukan sistem akademik sekolah lengkap.

Batasannya:

1. Hanya 3 role: Admin, Guru, Siswa.
2. Fitur nilai dibuat sederhana.
3. Rekap nilai dibuat sederhana.
4. Tugas dapat dibuat oleh guru.
5. Siswa dapat upload/mengumpulkan tugas.
6. Guru dapat melihat status pengumpulan tugas.
7. Guru tidak perlu download file tugas yang dikumpulkan siswa.
8. Tidak ada export PDF/Excel.
9. Tidak ada notifikasi WhatsApp/email.
10. Tidak ada custom domain.
11. Tidak ada integrasi dengan sistem sekolah resmi seperti Dapodik.
12. Tidak ada fitur raport lengkap.
13. Tidak ada role tambahan tanpa revisi biaya.

---

## 8. Stack Teknologi

| Kebutuhan | Teknologi |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS / CSS Utility dari UI Figma |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth atau auth sederhana berbasis tabel profiles |
| File Storage | Supabase Storage |
| Deployment | Vercel |
| Version Control | Git / GitHub |

---

## 9. Data Awal

Data awal yang sudah tersedia dari customer:

1. Data guru SMP Negeri 1 Jakenan.
2. Data siswa SMP Negeri 1 Jakenan.
3. Data pembagian jam mengajar, tetapi perlu dipastikan format dan tahun ajarannya.

Catatan penting:

- Data guru dan siswa harus diolah dengan hati-hati karena berisi data pribadi.
- NISN, NIPD, NIP, dan NUPTK harus disimpan sebagai teks, bukan angka.
- Data yang ditampilkan di UI publik jangan memuat data sensitif secara terbuka.

---

## 10. Kesepakatan Awal Fitur

Versi program sederhana meliputi:

### Admin

- Login admin
- Dashboard
- Data siswa
- Data guru
- Data kelas
- Mata pelajaran
- Data nilai
- Data tugas
- Rekap nilai
- Pengaturan dasar

### Guru

- Login guru
- Dashboard
- Kelas saya
- Input nilai
- Tugas
- Upload file/link tugas
- Pengumpulan tugas
- Rekap nilai

### Siswa

- Login siswa
- Dashboard
- Nilai saya
- Tugas saya
- Upload tugas
- Informasi

---

## 11. Kesepakatan Hosting dan Domain

Project akan dipublish menggunakan Vercel.

- Hosting/publish gratis selama 1 bulan pertama.
- Jika bulan berikutnya ingin tetap online, biaya hosting/publish adalah 75k/bulan.
- Domain menggunakan domain/link free bawaan dari Vercel.
- Link tidak custom menggunakan nama sekolah.
- Custom domain tidak termasuk dalam versi ini.

---

## 12. Catatan Biaya Tambahan

Jika setelah pengerjaan berjalan ada permintaan tambahan fitur di luar daftar fitur final, maka akan dikenakan biaya tambahan sesuai tingkat kesulitannya.

Contoh fitur tambahan:

- tambah role Wali Kelas;
- tambah role Orang Tua;
- export PDF/Excel;
- notifikasi WhatsApp;
- notifikasi email;
- custom domain;
- laporan lengkap per semester;
- fitur download pengumpulan tugas;
- sistem raport;
- import data Excel otomatis;
- desain ulang besar-besaran.

---

## 13. Definisi Selesai

Project dianggap selesai jika:

1. Aplikasi dapat diakses online.
2. Login role Admin, Guru, dan Siswa berjalan.
3. Dashboard masing-masing role tampil.
4. Admin dapat mengelola data dasar.
5. Guru dapat membuat tugas dan input nilai.
6. Siswa dapat melihat tugas dan upload tugas.
7. Data tersimpan di Supabase.
8. Rekap sederhana tampil.
9. Tampilan mengikuti UI yang sudah dibuat.
10. Tidak ada bug utama pada fitur yang termasuk scope.

---

## 14. Ringkasan

SINDEN versi ini adalah web sistem sederhana, bukan sistem akademik sekolah yang sangat lengkap. Fokusnya adalah membuat fitur inti berjalan dengan baik, mudah digunakan, dan dapat dikembangkan lagi jika dibutuhkan.

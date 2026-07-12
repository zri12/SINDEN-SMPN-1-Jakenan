# 15 — Implementation Plan SINDEN

Dokumen ini berisi rencana pengerjaan teknis SINDEN dari UI menjadi program berjalan.

---

## 1. Target Akhir

Target akhir versi awal:

- web bisa diakses online;
- login 3 role berjalan;
- data tersimpan di Supabase;
- admin dapat mengelola data utama;
- guru dapat input nilai dan membuat tugas;
- siswa dapat melihat nilai dan mengumpulkan tugas;
- rekap sederhana tampil;
- UI mengikuti desain Figma Make.

---

## 2. Tahap 1 — Persiapan Project

Checklist:

- buat project React + Vite;
- install dependency;
- rapikan folder;
- pindahkan UI dari Figma Make;
- pastikan UI bisa berjalan lokal.

Command:

```bash
npm install
npm run dev
```

Output tahap ini:

- UI tampil lokal;
- tidak ada error utama;
- struktur folder sudah rapi.

---

## 3. Tahap 2 — Pisahkan Komponen UI

Pisahkan UI menjadi:

- layout;
- sidebar;
- topbar;
- card;
- tabel;
- form;
- modal;
- badge;
- halaman role.

Tujuan:

- kode tidak menumpuk;
- lebih mudah disambungkan ke database;
- lebih mudah revisi.

---

## 4. Tahap 3 — Routing

Buat route:

- login;
- admin;
- guru;
- siswa.

Output:

- menu sidebar bisa berpindah halaman;
- route sesuai role;
- logout kembali ke login.

---

## 5. Tahap 4 — Setup Supabase

Langkah:

1. buat project Supabase;
2. buat env;
3. buat supabase client;
4. test koneksi.

Output:

- aplikasi bisa membaca data dari Supabase.

---

## 6. Tahap 5 — Database Schema

Buat tabel:

- profiles;
- classes;
- subjects;
- students;
- teachers;
- teacher_classes;
- grades;
- assignments;
- submissions;
- announcements;
- settings.

Output:

- semua tabel siap;
- relasi dasar siap.

---

## 7. Tahap 6 — Auth/Login

Buat login:

- username/password;
- role;
- redirect sesuai role;
- proteksi route;
- logout.

Output:

- admin login ke admin;
- guru login ke guru;
- siswa login ke siswa;
- role tidak bisa akses halaman role lain.

---

## 8. Tahap 7 — Master Data Admin

Sambungkan halaman admin:

- data siswa;
- data guru;
- data kelas;
- mata pelajaran.

Output:

- data tampil dari Supabase;
- tambah/edit/hapus berjalan;
- search/filter dasar berjalan.

---

## 9. Tahap 8 — Nilai

Sambungkan fitur nilai:

- guru input nilai;
- admin lihat data nilai;
- siswa lihat nilai sendiri;
- rekap sederhana.

Output:

- nilai tersimpan;
- KKM terbaca;
- status tuntas/belum tuntas tampil.

---

## 10. Tahap 9 — Tugas Guru

Sambungkan fitur tugas:

- guru membuat tugas;
- guru upload file/link;
- tugas tersimpan;
- siswa melihat tugas sesuai kelas.

Output:

- tugas muncul di akun siswa;
- file tugas guru tersimpan jika ada.

---

## 11. Tahap 10 — Upload Tugas Siswa

Sambungkan fitur submission:

- siswa pilih tugas;
- siswa upload file;
- siswa isi catatan;
- status pengumpulan berubah;
- guru melihat data pengumpulan.

Output:

- file masuk Supabase Storage;
- submission masuk database;
- status pengumpulan tampil.

---

## 12. Tahap 11 — Dashboard dan Rekap

Sambungkan dashboard:

- total siswa;
- total guru;
- total kelas;
- total mapel;
- tugas aktif;
- jumlah pengumpulan;
- rata-rata nilai;
- tuntas/belum tuntas.

Output:

- dashboard tidak lagi dummy;
- statistik berasal dari database.

---

## 13. Tahap 12 — Testing

Lakukan testing sesuai:

```txt
docs/11_TESTING_CHECKLIST.md
```

Fokus:

- login;
- role;
- CRUD;
- input nilai;
- tugas;
- upload;
- rekap;
- mobile;
- deploy.

---

## 14. Tahap 13 — Deploy

Langkah:

1. push ke GitHub;
2. deploy ke Vercel;
3. isi env Vercel;
4. test link online;
5. serahkan link ke customer.

---

## 15. Prioritas Pengerjaan

Prioritas paling penting:

1. Login role
2. Dashboard role
3. Data siswa/guru/kelas/mapel
4. Input nilai
5. Tugas guru
6. Upload tugas siswa
7. Rekap sederhana
8. Deploy

Fitur lain hanya jika waktu cukup.

---

## 16. Catatan Risiko

Risiko:

- data customer belum lengkap;
- file Excel perlu dirapikan;
- auth akun banyak memakan waktu;
- upload file perlu testing storage;
- responsive UI dari Figma perlu perbaikan;
- scope bisa melebar jika ada fitur tambahan.

Solusi:

- batasi fitur sesuai dokumen;
- gunakan data dummy dulu jika data belum siap;
- fokus running well;
- catat fitur tambahan di changelog.

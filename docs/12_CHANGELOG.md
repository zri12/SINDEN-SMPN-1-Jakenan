# 12 — Changelog SINDEN

Dokumen ini digunakan untuk mencatat perubahan project SINDEN.

Format:

```txt
## Tanggal
- Perubahan
- Fitur ditambahkan
- Bug diperbaiki
- Catatan revisi
```

---

## 12 Juli 2026

- Menetapkan project SINDEN sebagai web sistem sederhana.
- Menetapkan 3 role utama:
  - Admin
  - Guru
  - Siswa
- Menghapus role Wali Kelas dan Orang Tua dari scope versi awal.
- Memutuskan penggunaan program sederhana dibanding melanjutkan Canva AI lama karena code/alur dashboard tidak bisa diedit penuh.
- Menetapkan stack:
  - React + Vite
  - Supabase
  - Vercel
- Menetapkan fitur utama:
  - login role
  - dashboard tiap role
  - data siswa
  - data guru
  - data kelas
  - mata pelajaran
  - input nilai
  - tugas guru
  - upload tugas siswa
  - pengumpulan tugas
  - rekap nilai sederhana
- Menambahkan fitur guru dapat upload tugas kepada siswa.
- Menambahkan fitur siswa dapat mengumpulkan/upload tugas.
- Menetapkan bahwa guru tidak perlu fitur download file tugas siswa.
- Menetapkan publish/hosting:
  - free 1 bulan pertama
  - bulan berikutnya 75k/bulan
  - domain menggunakan link free/bawaan
- Menetapkan bahwa fitur tambahan di luar scope dikenakan biaya tambahan.

---

## UI Awal

- UI dibuat menggunakan Figma Make.
- UI sudah memiliki halaman:
  - Login
  - Dashboard Admin
  - Data Siswa
  - Data Guru
  - Data Kelas
  - Mata Pelajaran
  - Data Nilai
  - Data Tugas
  - Rekap Nilai
  - Pengaturan
  - Dashboard Guru
  - Kelas Saya
  - Input Nilai
  - Tugas Guru
  - Pengumpulan Tugas
  - Rekap Nilai Guru
  - Dashboard Siswa
  - Nilai Saya
  - Tugas Saya
  - Upload Tugas
  - Informasi
- UI sudah cukup layak untuk dilanjutkan ke tahap program.
- Data UI masih dummy dan perlu dihubungkan ke Supabase.

---

## Catatan Selanjutnya

Perubahan berikut perlu dicatat di bawah ini saat pengerjaan berjalan:

```txt
## [Tanggal]
- ...
```

---

## Template Changelog

```txt
## 13 Juli 2026

### Added
- Menambahkan fitur ...

### Changed
- Mengubah ...

### Fixed
- Memperbaiki ...

### Notes
- Catatan ...
```

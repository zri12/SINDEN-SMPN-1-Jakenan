# 11 — Testing Checklist SINDEN

Dokumen ini digunakan untuk memastikan aplikasi SINDEN sudah berjalan sebelum diserahkan ke customer.

---

# 1. Testing Umum

| No | Test | Status |
|---:|---|---|
| 1 | Website bisa dibuka | ☐ |
| 2 | Halaman login tampil | ☐ |
| 3 | Tidak ada error console utama | ☐ |
| 4 | Tampilan desktop rapi | ☐ |
| 5 | Tampilan mobile rapi | ☐ |
| 6 | Sidebar desktop berjalan | ☐ |
| 7 | Sidebar mobile/hamburger berjalan | ☐ |
| 8 | Tombol logout berjalan | ☐ |
| 9 | Refresh halaman tidak 404 | ☐ |

---

# 2. Testing Login

| No | Test | Status |
|---:|---|---|
| 1 | Login admin berhasil | ☐ |
| 2 | Login guru berhasil | ☐ |
| 3 | Login siswa berhasil | ☐ |
| 4 | Password salah ditolak | ☐ |
| 5 | User nonaktif tidak bisa login | ☐ |
| 6 | Setelah logout tidak bisa akses dashboard | ☐ |
| 7 | Admin diarahkan ke dashboard admin | ☐ |
| 8 | Guru diarahkan ke dashboard guru | ☐ |
| 9 | Siswa diarahkan ke dashboard siswa | ☐ |

---

# 3. Testing Proteksi Role

| No | Test | Status |
|---:|---|---|
| 1 | Admin tidak diarahkan ke halaman guru | ☐ |
| 2 | Admin tidak diarahkan ke halaman siswa | ☐ |
| 3 | Guru tidak bisa akses halaman admin | ☐ |
| 4 | Guru tidak bisa akses halaman siswa | ☐ |
| 5 | Siswa tidak bisa akses halaman admin | ☐ |
| 6 | Siswa tidak bisa akses halaman guru | ☐ |
| 7 | Akses salah menampilkan unauthorized | ☐ |

---

# 4. Testing Admin

## 4.1 Dashboard Admin

| No | Test | Status |
|---:|---|---|
| 1 | Card total siswa tampil | ☐ |
| 2 | Card total guru tampil | ☐ |
| 3 | Card total kelas tampil | ☐ |
| 4 | Card total mata pelajaran tampil | ☐ |
| 5 | Aktivitas terbaru tampil | ☐ |
| 6 | Rekap sederhana tampil | ☐ |

## 4.2 Data Siswa

| No | Test | Status |
|---:|---|---|
| 1 | Daftar siswa tampil | ☐ |
| 2 | Search siswa berjalan | ☐ |
| 3 | Filter kelas berjalan | ☐ |
| 4 | Tambah siswa berhasil | ☐ |
| 5 | Edit siswa berhasil | ☐ |
| 6 | Hapus/nonaktif siswa berhasil | ☐ |
| 7 | Data tersimpan di Supabase | ☐ |
| 8 | NIS/NISN tidak berubah format | ☐ |

## 4.3 Data Guru

| No | Test | Status |
|---:|---|---|
| 1 | Daftar guru tampil | ☐ |
| 2 | Search guru berjalan | ☐ |
| 3 | Tambah guru berhasil | ☐ |
| 4 | Edit guru berhasil | ☐ |
| 5 | Hapus/nonaktif guru berhasil | ☐ |
| 6 | Data tersimpan di Supabase | ☐ |
| 7 | NIP/NUPTK tidak berubah format | ☐ |

## 4.4 Data Kelas

| No | Test | Status |
|---:|---|---|
| 1 | Daftar kelas tampil | ☐ |
| 2 | Tambah kelas berhasil | ☐ |
| 3 | Edit kelas berhasil | ☐ |
| 4 | Hapus kelas berhasil | ☐ |

## 4.5 Mata Pelajaran

| No | Test | Status |
|---:|---|---|
| 1 | Daftar mapel tampil | ☐ |
| 2 | Tambah mapel berhasil | ☐ |
| 3 | Edit mapel berhasil | ☐ |
| 4 | Hapus mapel berhasil | ☐ |
| 5 | KKM tersimpan | ☐ |

## 4.6 Data Nilai

| No | Test | Status |
|---:|---|---|
| 1 | Data nilai tampil | ☐ |
| 2 | Filter kelas berjalan | ☐ |
| 3 | Filter mapel berjalan | ☐ |
| 4 | Status tuntas/belum tuntas benar | ☐ |

## 4.7 Data Tugas

| No | Test | Status |
|---:|---|---|
| 1 | Data tugas tampil | ☐ |
| 2 | Filter tugas berjalan | ☐ |
| 3 | Status tugas tampil | ☐ |
| 4 | Jumlah pengumpulan tampil | ☐ |

## 4.8 Rekap Nilai

| No | Test | Status |
|---:|---|---|
| 1 | Rekap nilai tampil | ☐ |
| 2 | Rata-rata tampil | ☐ |
| 3 | Jumlah tuntas tampil | ☐ |
| 4 | Jumlah belum tuntas tampil | ☐ |

---

# 5. Testing Guru

## 5.1 Dashboard Guru

| No | Test | Status |
|---:|---|---|
| 1 | Dashboard guru tampil | ☐ |
| 2 | Kelas yang diajar tampil | ☐ |
| 3 | Tugas aktif tampil | ☐ |
| 4 | Pengumpulan tugas tampil | ☐ |

## 5.2 Kelas Saya

| No | Test | Status |
|---:|---|---|
| 1 | Daftar kelas guru tampil | ☐ |
| 2 | Daftar siswa kelas tampil | ☐ |
| 3 | Guru hanya melihat kelas yang diajar | ☐ |

## 5.3 Input Nilai

| No | Test | Status |
|---:|---|---|
| 1 | Form input nilai tampil | ☐ |
| 2 | Pilih kelas berjalan | ☐ |
| 3 | Pilih mapel berjalan | ☐ |
| 4 | Pilih jenis nilai berjalan | ☐ |
| 5 | Input nilai 0–100 berhasil | ☐ |
| 6 | Nilai di luar 0–100 ditolak | ☐ |
| 7 | Simpan nilai berhasil | ☐ |
| 8 | Nilai masuk ke Supabase | ☐ |
| 9 | Status KKM benar | ☐ |

## 5.4 Tugas Guru

| No | Test | Status |
|---:|---|---|
| 1 | Daftar tugas tampil | ☐ |
| 2 | Buat tugas berhasil | ☐ |
| 3 | Upload file tugas berhasil | ☐ |
| 4 | Link tugas tersimpan | ☐ |
| 5 | Deadline tersimpan | ☐ |
| 6 | Tugas muncul di akun siswa sesuai kelas | ☐ |

## 5.5 Pengumpulan Tugas

| No | Test | Status |
|---:|---|---|
| 1 | Daftar pengumpulan tampil | ☐ |
| 2 | Status sudah mengumpulkan tampil | ☐ |
| 3 | Status belum mengumpulkan tampil | ☐ |
| 4 | Status terlambat tampil | ☐ |
| 5 | Guru tidak melihat tombol download file siswa | ☐ |

## 5.6 Rekap Nilai Guru

| No | Test | Status |
|---:|---|---|
| 1 | Rekap guru tampil | ☐ |
| 2 | Filter kelas berjalan | ☐ |
| 3 | Filter mapel berjalan | ☐ |
| 4 | Rata-rata tampil | ☐ |
| 5 | Status tuntas/belum tuntas benar | ☐ |

---

# 6. Testing Siswa

## 6.1 Dashboard Siswa

| No | Test | Status |
|---:|---|---|
| 1 | Dashboard siswa tampil | ☐ |
| 2 | Nama siswa tampil | ☐ |
| 3 | Kelas siswa tampil | ☐ |
| 4 | Rata-rata nilai tampil | ☐ |
| 5 | Tugas aktif tampil | ☐ |

## 6.2 Nilai Saya

| No | Test | Status |
|---:|---|---|
| 1 | Nilai siswa tampil | ☐ |
| 2 | Siswa hanya melihat nilai sendiri | ☐ |
| 3 | Status tuntas/belum tuntas benar | ☐ |
| 4 | KKM tampil | ☐ |

## 6.3 Tugas Saya

| No | Test | Status |
|---:|---|---|
| 1 | Tugas siswa tampil | ☐ |
| 2 | Tugas sesuai kelas siswa | ☐ |
| 3 | Detail tugas tampil | ☐ |
| 4 | File/link tugas dari guru tampil | ☐ |
| 5 | Deadline tampil | ☐ |

## 6.4 Upload Tugas

| No | Test | Status |
|---:|---|---|
| 1 | Form upload tugas tampil | ☐ |
| 2 | Siswa bisa memilih tugas | ☐ |
| 3 | Siswa bisa upload file | ☐ |
| 4 | Catatan siswa tersimpan | ☐ |
| 5 | Status berubah menjadi sudah mengumpulkan | ☐ |
| 6 | Data masuk ke submissions | ☐ |
| 7 | File masuk ke Supabase Storage | ☐ |
| 8 | File terlalu besar ditolak | ☐ |
| 9 | Format file tidak sesuai ditolak | ☐ |

## 6.5 Informasi

| No | Test | Status |
|---:|---|---|
| 1 | Informasi tampil | ☐ |
| 2 | Pengumuman tampil sesuai target role | ☐ |

---

# 7. Testing Upload File

| No | Test | Status |
|---:|---|---|
| 1 | Guru upload file tugas berhasil | ☐ |
| 2 | File tugas masuk bucket assignment-files | ☐ |
| 3 | Siswa upload jawaban berhasil | ☐ |
| 4 | File siswa masuk bucket submission-files | ☐ |
| 5 | File terlalu besar ditolak | ☐ |
| 6 | Format file berbahaya ditolak | ☐ |

---

# 8. Testing Responsive

| No | Test | Status |
|---:|---|---|
| 1 | Tampilan laptop aman | ☐ |
| 2 | Tampilan tablet aman | ☐ |
| 3 | Tampilan HP aman | ☐ |
| 4 | Sidebar mobile dapat dibuka | ☐ |
| 5 | Tabel mobile tidak rusak | ☐ |
| 6 | Tombol mudah ditekan di HP | ☐ |

---

# 9. Testing Deployment

| No | Test | Status |
|---:|---|---|
| 1 | Build sukses | ☐ |
| 2 | Deploy Vercel sukses | ☐ |
| 3 | Environment variable Vercel benar | ☐ |
| 4 | Link online bisa dibuka | ☐ |
| 5 | Refresh route dashboard tidak 404 | ☐ |
| 6 | Supabase tetap terkoneksi setelah deploy | ☐ |

---

# 10. Catatan Bug

Gunakan format:

```txt
Tanggal:
Halaman:
Role:
Bug:
Langkah reproduce:
Status:
Catatan:
```

Contoh:

```txt
Tanggal: 12 Juli 2026
Halaman: Guru > Input Nilai
Role: Guru
Bug: Nilai tidak tersimpan
Langkah: Pilih kelas 7A, input nilai, klik simpan
Status: Belum diperbaiki
Catatan: Query insert error
```

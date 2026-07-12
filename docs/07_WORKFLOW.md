# 07 — Workflow SINDEN

Dokumen ini menjelaskan alur kerja sistem SINDEN dari sisi Admin, Guru, dan Siswa.

---

# 1. Workflow Umum Sistem

```txt
Admin menyiapkan data master
→ Guru membuat tugas dan input nilai
→ Siswa melihat tugas dan mengumpulkan tugas
→ Guru melihat status pengumpulan
→ Admin/Guru melihat rekap nilai
→ Siswa melihat nilai sendiri
```

---

# 2. Workflow Admin

## 2.1 Admin Login

```txt
Admin membuka halaman login
→ mengisi username/password
→ sistem mengecek role admin
→ admin masuk ke dashboard admin
```

Jika login gagal:

```txt
Tampilkan pesan: Username atau password salah.
```

---

## 2.2 Admin Mengelola Data Siswa

```txt
Admin masuk ke menu Data Siswa
→ klik Tambah Siswa
→ isi data siswa
→ klik Simpan
→ data tersimpan ke tabel students dan profiles
→ siswa muncul di daftar siswa
```

Data yang diisi:

- Nama siswa
- NIS/NISN
- Kelas
- Jenis kelamin
- Username
- Password

Edit siswa:

```txt
Admin klik Edit
→ ubah data
→ klik Simpan
→ data diperbarui
```

Hapus siswa:

```txt
Admin klik Hapus
→ konfirmasi
→ data dihapus/nonaktif
```

Rekomendasi:

- lebih aman gunakan status nonaktif daripada hapus permanen.

---

## 2.3 Admin Mengelola Data Guru

```txt
Admin masuk ke menu Data Guru
→ klik Tambah Guru
→ isi data guru
→ pilih mata pelajaran/kelas yang diajar
→ klik Simpan
→ data tersimpan
```

Data guru:

- Nama guru
- NIP/NUPTK
- Mata pelajaran
- Kelas yang diajar
- Username
- Password

---

## 2.4 Admin Mengelola Kelas

```txt
Admin masuk ke Data Kelas
→ tambah/edit/hapus kelas
→ kelas tersedia untuk siswa dan guru
```

Contoh kelas:

- 7A sampai 7I
- 8A sampai 8I
- 9A sampai 9I

---

## 2.5 Admin Mengelola Mata Pelajaran

```txt
Admin masuk ke Mata Pelajaran
→ tambah mapel
→ isi nama mapel dan KKM
→ simpan
```

Mapel digunakan untuk:

- input nilai;
- tugas;
- rekap nilai.

---

## 2.6 Admin Melihat Rekap

```txt
Admin masuk ke Rekap Nilai
→ pilih kelas/mapel/semester
→ sistem menampilkan rata-rata dan status ketuntasan
```

Rekap yang tampil:

- rata-rata;
- nilai tertinggi;
- nilai terendah;
- jumlah tuntas;
- jumlah belum tuntas.

---

# 3. Workflow Guru

## 3.1 Guru Login

```txt
Guru membuka login
→ mengisi username/password
→ sistem mengecek role guru
→ masuk ke dashboard guru
```

---

## 3.2 Guru Melihat Kelas

```txt
Guru masuk ke menu Kelas Saya
→ sistem menampilkan kelas yang diajar
→ guru memilih kelas
→ daftar siswa muncul
```

Data yang tampil:

- nama siswa;
- kelas;
- status nilai;
- status tugas.

---

## 3.3 Guru Input Nilai

```txt
Guru masuk ke Input Nilai
→ pilih kelas
→ pilih mata pelajaran
→ pilih semester
→ pilih jenis nilai
→ masukkan nilai siswa
→ klik Simpan Nilai
→ data tersimpan ke tabel grades
```

Jenis nilai:

- Tugas
- Ulangan Harian
- PTS
- PAS
- Praktik
- Remedial

Validasi:

- nilai wajib diisi;
- nilai 0–100;
- siswa harus sesuai kelas;
- guru hanya input untuk kelas/mapel yang diajar.

Status nilai:

```txt
Jika nilai >= KKM → Tuntas
Jika nilai < KKM → Belum Tuntas
```

---

## 3.4 Guru Membuat Tugas

```txt
Guru masuk ke menu Tugas
→ klik Buat Tugas
→ isi judul, kelas, mapel, deskripsi, deadline
→ upload file/link jika ada
→ klik Simpan Tugas
→ tugas muncul di akun siswa sesuai kelas
```

Data tugas:

- judul tugas;
- mapel;
- kelas;
- deskripsi;
- deadline;
- file/link tugas;
- status aktif.

---

## 3.5 Guru Melihat Pengumpulan Tugas

```txt
Guru masuk ke Pengumpulan Tugas
→ pilih kelas/tugas
→ sistem menampilkan daftar siswa
→ guru melihat status sudah/belum mengumpulkan
```

Status pengumpulan:

- Sudah Mengumpulkan
- Belum Mengumpulkan
- Terlambat

Catatan:

- Guru tidak perlu fitur download file pengumpulan siswa.
- Guru hanya melihat data pengumpulan dan status.

---

## 3.6 Guru Melihat Rekap Nilai

```txt
Guru masuk ke Rekap Nilai
→ pilih kelas dan mapel
→ sistem menampilkan nilai akhir dan status siswa
```

---

# 4. Workflow Siswa

## 4.1 Siswa Login

```txt
Siswa membuka login
→ mengisi username/password
→ sistem mengecek role siswa
→ masuk ke dashboard siswa
```

---

## 4.2 Siswa Melihat Dashboard

Dashboard siswa menampilkan:

- nama siswa;
- kelas;
- rata-rata nilai;
- jumlah tugas aktif;
- tugas sudah dikumpulkan;
- informasi terbaru.

---

## 4.3 Siswa Melihat Nilai

```txt
Siswa masuk ke Nilai Saya
→ sistem menampilkan nilai milik siswa tersebut
```

Data nilai:

- mata pelajaran;
- nilai tugas;
- ulangan;
- PTS;
- PAS;
- nilai akhir;
- KKM;
- status.

Aturan:

- siswa hanya melihat nilai sendiri.

---

## 4.4 Siswa Melihat Tugas

```txt
Siswa masuk ke Tugas Saya
→ sistem menampilkan tugas sesuai kelas siswa
→ siswa melihat detail tugas
```

Data tugas:

- judul;
- mapel;
- guru;
- deadline;
- status;
- deskripsi;
- file/link dari guru.

---

## 4.5 Siswa Mengumpulkan Tugas

```txt
Siswa masuk ke Upload Tugas
→ pilih tugas
→ upload file jawaban
→ isi catatan jika ada
→ klik Kumpulkan Tugas
→ data tersimpan ke submissions
→ status berubah menjadi Sudah Mengumpulkan
```

Validasi:

- tugas wajib dipilih;
- file wajib diupload jika pengumpulan membutuhkan file;
- file harus sesuai format;
- siswa hanya bisa submit untuk tugas kelasnya.

---

# 5. Workflow Informasi/Pengumuman

```txt
Admin/Guru membuat informasi
→ informasi disimpan
→ siswa melihat di menu Informasi
```

Contoh informasi:

- tugas baru;
- nilai baru;
- deadline tugas;
- pengumuman sekolah.

---

# 6. Workflow Upload File

## Guru Upload File Tugas

```txt
Guru membuat tugas
→ memilih file
→ file diupload ke Supabase Storage bucket assignment-files
→ URL file disimpan ke tabel assignments
```

## Siswa Upload Tugas

```txt
Siswa memilih tugas
→ memilih file jawaban
→ file diupload ke Supabase Storage bucket submission-files
→ URL file disimpan ke tabel submissions
```

---

# 7. Workflow Rekap Nilai

Rekap nilai dihitung dari tabel `grades`.

Alur:

```txt
Sistem mengambil nilai siswa
→ kelompokkan berdasarkan siswa/mapel/kelas
→ hitung rata-rata
→ bandingkan dengan KKM
→ tampilkan status tuntas/belum tuntas
```

Contoh status:

```txt
Nilai akhir 82, KKM 75 → Tuntas
Nilai akhir 70, KKM 75 → Belum Tuntas
```

---

# 8. Workflow Error

Jika data gagal dimuat:

```txt
Tampilkan: Data gagal dimuat, silakan coba lagi.
```

Jika simpan gagal:

```txt
Tampilkan: Data gagal disimpan.
```

Jika akses ditolak:

```txt
Tampilkan: Anda tidak memiliki akses ke halaman ini.
```

Jika file terlalu besar:

```txt
Tampilkan: Ukuran file terlalu besar.
```

---

# 9. Workflow Selesai Project

Project dianggap siap diberikan ke customer jika:

1. Admin bisa login.
2. Guru bisa login.
3. Siswa bisa login.
4. Dashboard tiap role tampil.
5. Data master berjalan.
6. Guru bisa membuat tugas.
7. Siswa bisa mengumpulkan tugas.
8. Guru bisa melihat status pengumpulan.
9. Guru bisa input nilai.
10. Siswa bisa melihat nilai.
11. Rekap sederhana tampil.
12. Project berhasil dipublish.

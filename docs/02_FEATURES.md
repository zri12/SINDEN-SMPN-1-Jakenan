# 02 — Detail Fitur SINDEN

Dokumen ini menjelaskan fitur final yang akan dibuat pada aplikasi SINDEN. Fitur di dalam dokumen ini menjadi acuan agar pengerjaan tidak melebar dari kesepakatan awal.

---

## 1. Role Aplikasi

Aplikasi memiliki 3 role:

1. Admin
2. Guru
3. Siswa

Role lain seperti Wali Kelas dan Orang Tua tidak dibuat pada versi ini.

---

# 2. Fitur Admin

## 2.1 Login Admin

Admin dapat login ke sistem menggunakan akun admin.

Fungsi:

- masuk ke dashboard admin;
- mengakses seluruh data utama;
- logout dari sistem.

Data yang digunakan:

- username/email;
- password;
- role admin.

---

## 2.2 Dashboard Admin

Dashboard admin menampilkan ringkasan sistem.

Isi dashboard:

- Total siswa
- Total guru
- Total kelas
- Total mata pelajaran
- Total tugas aktif
- Total nilai yang sudah masuk
- Rekap siswa tuntas dan belum tuntas
- Aktivitas terbaru

Contoh aktivitas terbaru:

- Guru membuat tugas baru.
- Guru menginput nilai.
- Siswa mengumpulkan tugas.
- Admin menambahkan data siswa.

---

## 2.3 Kelola Data Siswa

Admin dapat mengelola data siswa.

Fitur:

- melihat daftar siswa;
- mencari siswa;
- filter berdasarkan kelas;
- tambah siswa;
- edit siswa;
- hapus siswa;
- melihat detail siswa.

Kolom data siswa:

- ID siswa
- Nama siswa
- NIS
- NISN
- Kelas
- Jenis kelamin
- Username
- Status

Catatan:

- NIS/NISN disimpan sebagai teks.
- Tanggal lahir dan data sensitif tidak wajib ditampilkan.
- Data siswa sebaiknya tidak dibuka secara publik.

---

## 2.4 Kelola Data Guru

Admin dapat mengelola data guru.

Fitur:

- melihat daftar guru;
- mencari guru;
- tambah guru;
- edit guru;
- hapus guru;
- melihat detail guru.

Kolom data guru:

- ID guru
- Nama guru
- NIP/NUPTK
- Mata pelajaran
- Kelas yang diajar
- Username
- Status

Catatan:

- NIP/NUPTK disimpan sebagai teks.
- Satu guru dapat mengajar beberapa kelas.
- Relasi guru, kelas, dan mapel disimpan melalui tabel `teacher_classes`.

---

## 2.5 Kelola Data Kelas

Admin dapat mengelola data kelas.

Fitur:

- melihat daftar kelas;
- tambah kelas;
- edit kelas;
- hapus kelas.

Kolom data kelas:

- ID kelas
- Nama kelas
- Tingkat kelas
- Tahun ajaran
- Jumlah siswa

Contoh kelas:

- 7A sampai 7I
- 8A sampai 8I
- 9A sampai 9I

---

## 2.6 Kelola Mata Pelajaran

Admin dapat mengelola mata pelajaran.

Fitur:

- melihat daftar mata pelajaran;
- tambah mata pelajaran;
- edit mata pelajaran;
- hapus mata pelajaran;
- menentukan KKM.

Kolom data mata pelajaran:

- ID mapel
- Kode mapel
- Nama mata pelajaran
- KKM
- Status

Contoh mata pelajaran:

- Bahasa Indonesia
- Matematika
- IPA
- IPS
- Bahasa Inggris
- PPKn
- Pendidikan Agama
- Seni Budaya
- PJOK
- Informatika

---

## 2.7 Data Nilai

Admin dapat melihat data nilai yang sudah diinput guru.

Fitur:

- filter kelas;
- filter mata pelajaran;
- filter semester;
- pencarian siswa;
- melihat status tuntas/belum tuntas.

Kolom tabel nilai:

- Nama siswa
- Kelas
- Mata pelajaran
- Jenis nilai
- Nilai
- KKM
- Status
- Guru penginput

Status:

- Tuntas
- Belum Tuntas

Catatan:

- Admin tidak harus menjadi pihak utama yang menginput nilai.
- Input nilai utama dilakukan oleh guru.
- Admin hanya melihat dan memantau.

---

## 2.8 Data Tugas

Admin dapat melihat seluruh tugas yang dibuat oleh guru.

Fitur:

- melihat daftar tugas;
- filter kelas;
- filter mata pelajaran;
- melihat status tugas;
- melihat jumlah pengumpulan.

Kolom tugas:

- Judul tugas
- Guru
- Mata pelajaran
- Kelas
- Deadline
- Status
- Jumlah pengumpulan

---

## 2.9 Rekap Nilai

Admin dapat melihat rekap nilai sederhana.

Fitur:

- rekap per kelas;
- rekap per mata pelajaran;
- rekap per semester;
- jumlah siswa tuntas;
- jumlah siswa belum tuntas;
- rata-rata nilai.

Catatan:

- Export PDF/Excel tidak termasuk.
- Rekap dibuat tampilan sederhana di sistem.

---

## 2.10 Pengaturan

Admin dapat mengubah pengaturan dasar aplikasi.

Isi pengaturan:

- Nama sekolah
- Nama aplikasi
- Tahun ajaran
- Semester aktif
- KKM default
- Logo sekolah

---

# 3. Fitur Guru

## 3.1 Login Guru

Guru dapat login ke sistem menggunakan akun yang disediakan.

Setelah login, guru diarahkan ke dashboard guru.

---

## 3.2 Dashboard Guru

Dashboard guru menampilkan ringkasan aktivitas guru.

Isi dashboard:

- jumlah kelas yang diajar;
- jumlah tugas aktif;
- jumlah siswa sudah mengumpulkan tugas;
- jumlah siswa belum mengumpulkan tugas;
- daftar tugas terbaru;
- daftar siswa belum tuntas;
- aktivitas terbaru.

---

## 3.3 Kelas Saya

Guru dapat melihat daftar kelas yang diajar.

Fitur:

- melihat kelas;
- melihat jumlah siswa;
- melihat mata pelajaran;
- melihat daftar siswa per kelas.

Kolom daftar siswa:

- Nama siswa
- Kelas
- Status nilai
- Status tugas

---

## 3.4 Input Nilai

Guru dapat menginput nilai siswa.

Fitur:

- memilih kelas;
- memilih mata pelajaran;
- memilih semester;
- memilih jenis nilai;
- mengisi nilai siswa;
- menyimpan nilai.

Jenis nilai:

- Tugas
- Ulangan Harian
- PTS
- PAS
- Praktik
- Remedial

Kolom input nilai:

- Nama siswa
- Kelas
- Nilai
- Keterangan

Aturan nilai:

- Nilai minimal 0.
- Nilai maksimal 100.
- Nilai kosong tidak boleh disimpan.
- Status tuntas dihitung berdasarkan KKM mapel.

---

## 3.5 Tugas

Guru dapat membuat tugas untuk siswa.

Fitur:

- melihat daftar tugas;
- membuat tugas baru;
- mengedit tugas;
- menghapus tugas;
- upload file tugas;
- menambahkan link tugas;
- mengatur deadline.

Form tugas:

- Judul tugas
- Mata pelajaran
- Kelas tujuan
- Deskripsi tugas
- Deadline
- File tugas
- Link tambahan
- Status

Catatan:

- Guru dapat upload file atau menambahkan link.
- File tugas guru disimpan di Supabase Storage.
- Jika file tidak digunakan, tugas tetap bisa dibuat dengan deskripsi/link saja.

---

## 3.6 Pengumpulan Tugas

Guru dapat melihat status pengumpulan tugas siswa.

Fitur:

- filter kelas;
- filter judul tugas;
- melihat siswa yang sudah mengumpulkan;
- melihat siswa yang belum mengumpulkan;
- melihat tanggal pengumpulan;
- melihat catatan siswa.

Kolom pengumpulan:

- Nama siswa
- Kelas
- Judul tugas
- Status pengumpulan
- Tanggal upload
- Catatan

Catatan penting:

- Guru **tidak perlu fitur download file tugas siswa**.
- Guru hanya melihat data pengumpulan dan statusnya.
- Jika suatu saat butuh download file siswa, itu masuk fitur tambahan.

---

## 3.7 Rekap Nilai Guru

Guru dapat melihat rekap nilai untuk kelas dan mata pelajaran yang diajar.

Fitur:

- filter kelas;
- filter mata pelajaran;
- melihat nilai akhir;
- melihat status tuntas/belum tuntas;
- melihat rata-rata nilai;
- melihat jumlah siswa tuntas dan belum tuntas.

---

# 4. Fitur Siswa

## 4.1 Login Siswa

Siswa dapat login menggunakan akun siswa.

Setelah login, siswa diarahkan ke dashboard siswa.

---

## 4.2 Dashboard Siswa

Dashboard siswa menampilkan ringkasan akademik siswa.

Isi dashboard:

- Nama siswa
- Kelas
- Rata-rata nilai
- Jumlah mapel tuntas
- Jumlah tugas aktif
- Jumlah tugas sudah dikumpulkan
- Informasi terbaru
- Peringatan tugas belum dikumpulkan

---

## 4.3 Nilai Saya

Siswa dapat melihat nilai sendiri.

Fitur:

- melihat nilai per mata pelajaran;
- melihat nilai tugas;
- melihat nilai ulangan;
- melihat nilai PTS;
- melihat nilai PAS;
- melihat nilai akhir;
- melihat KKM;
- melihat status tuntas/belum tuntas.

Catatan:

- Siswa hanya boleh melihat nilai miliknya sendiri.
- Siswa tidak boleh melihat nilai siswa lain.

---

## 4.4 Tugas Saya

Siswa dapat melihat daftar tugas yang diberikan guru.

Fitur:

- melihat judul tugas;
- melihat mata pelajaran;
- melihat guru pembuat tugas;
- melihat deadline;
- melihat status tugas;
- melihat deskripsi tugas;
- membuka file/link tugas dari guru.

Status tugas:

- Belum Dikerjakan
- Sudah Dikumpulkan
- Terlambat

---

## 4.5 Upload Tugas

Siswa dapat mengumpulkan tugas.

Fitur:

- memilih tugas;
- upload file jawaban;
- mengisi catatan;
- submit tugas;
- melihat status berhasil dikumpulkan.

Catatan:

- File jawaban disimpan di Supabase Storage.
- Guru tidak perlu download file tugas siswa pada versi ini.
- Guru cukup melihat status pengumpulan dan catatan siswa.

---

## 4.6 Informasi

Siswa dapat melihat informasi sederhana.

Contoh informasi:

- tugas baru;
- deadline tugas;
- nilai baru;
- informasi sekolah;
- pengumuman dari admin/guru.

---

# 5. Fitur File Upload

Ada dua jenis upload:

## 5.1 Upload Tugas oleh Guru

Guru dapat upload file tugas kepada siswa.

Contoh file:

- PDF
- DOC/DOCX
- PPT/PPTX
- Gambar
- Link Google Drive/YouTube/Website

## 5.2 Upload Pengumpulan oleh Siswa

Siswa dapat upload file jawaban tugas.

Contoh file:

- PDF
- DOC/DOCX
- Gambar
- ZIP kecil jika diperlukan

---

# 6. Fitur Rekap

Rekap dibuat sederhana.

Contoh rekap:

- rata-rata nilai siswa;
- siswa tuntas;
- siswa belum tuntas;
- rekap per kelas;
- rekap per mata pelajaran;
- status tugas.

Tidak termasuk:

- export PDF;
- export Excel;
- cetak raport;
- grafik kompleks;
- analisis nilai lanjutan.

---

# 7. Fitur yang Tidak Dibuat

Fitur berikut tidak dibuat pada versi ini:

1. Role Wali Kelas.
2. Role Orang Tua.
3. Download file pengumpulan tugas oleh guru.
4. Export PDF/Excel.
5. Notifikasi WhatsApp.
6. Notifikasi email.
7. Notifikasi real-time.
8. Custom domain sekolah.
9. Raport lengkap.
10. Sistem presensi.
11. Import Excel otomatis.
12. Jadwal pelajaran lengkap otomatis.
13. Chat guru-siswa.
14. App mobile Android/iOS.
15. Integrasi Google Classroom.
16. Integrasi Dapodik.

---

# 8. Catatan Tambahan

Jika customer meminta fitur tambahan di luar dokumen ini, fitur tersebut akan dihitung sebagai pekerjaan tambahan dan perlu disepakati ulang dari sisi waktu dan biaya.

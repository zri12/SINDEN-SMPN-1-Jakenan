Buatkan UI/UX web app modern untuk aplikasi bernama “SINDEN” dengan kepanjangan “Sistem Informasi Digital Evaluasi Nilai” untuk SMP Negeri 1 Jakenan.

Aplikasi ini adalah sistem informasi digital sederhana untuk membantu sekolah dalam mengelola data siswa, guru, kelas, mata pelajaran, nilai, tugas, pengumpulan tugas, dan rekap nilai. Aplikasi memiliki 3 role utama, yaitu Admin, Guru, dan Siswa.

Buat desain dalam Bahasa Indonesia sepenuhnya. Gunakan gaya desain modern, bersih, profesional, mudah dipahami guru dan siswa, serta cocok untuk lingkungan sekolah. Desain harus terlihat seperti sistem web sekolah yang rapi, bukan landing page. Fokus pada dashboard, sidebar, tabel data, form input, card statistik, dan tampilan yang mudah digunakan.

Gunakan tema warna:

* Biru tua sebagai warna utama untuk sidebar dan header
* Biru royal untuk tombol utama
* Putih untuk background konten
* Abu-abu muda untuk area halaman
* Hijau untuk status selesai/tuntas
* Kuning untuk status menunggu/proses
* Merah untuk status belum tuntas/belum mengumpulkan
* Gunakan warna yang soft, clean, dan tidak terlalu mencolok

Gunakan layout:

* Sidebar di kiri untuk desktop
* Header/topbar di atas konten
* Card statistik di dashboard
* Tabel data yang rapi
* Form input yang jelas
* Button dengan rounded corner
* Card dengan shadow halus
* Font modern dan mudah dibaca
* Responsive untuk laptop dan mobile
* Pada mobile, sidebar berubah menjadi hamburger menu

Nama aplikasi:
SINDEN

Subjudul:
Sistem Informasi Digital Evaluasi Nilai

Nama sekolah:
SMP Negeri 1 Jakenan

Buat UI dengan 3 role:

1. Admin
2. Guru
3. Siswa

Jangan buat role Wali Kelas dan Orang Tua.

==================================================

1. HALAMAN LOGIN
   ==================================================

Buat halaman login yang modern dan profesional.

Isi halaman login:

* Logo/ikon aplikasi berbentuk buku, grafik nilai, atau dashboard sekolah
* Nama aplikasi: SINDEN
* Subjudul: Sistem Informasi Digital Evaluasi Nilai
* Nama sekolah: SMP Negeri 1 Jakenan
* Dropdown/pilihan role: Admin, Guru, Siswa
* Input username/email
* Input password
* Ikon show/hide password
* Tombol “Masuk”
* Teks kecil: “Masuk sesuai role pengguna”
* Background biru soft dengan ilustrasi pendidikan atau pattern abstrak ringan

Buat tampilan login terlihat clean, tidak terlalu ramai, dan tetap formal.

==================================================
2. ROLE ADMIN
=============

Sidebar Admin berisi menu:

* Dashboard
* Data Siswa
* Data Guru
* Data Kelas
* Mata Pelajaran
* Data Nilai
* Data Tugas
* Rekap Nilai
* Pengaturan
* Logout

Buat Dashboard Admin dengan isi:

* Header: “Dashboard Admin”
* Sapaan: “Selamat datang, Administrator”
* Card statistik:

  1. Total Siswa: 853
  2. Total Guru: 51
  3. Total Kelas: 27
  4. Total Mata Pelajaran: 12
* Card ringkasan:

  * Rata-rata nilai siswa
  * Jumlah tugas aktif
  * Jumlah siswa tuntas
  * Jumlah siswa belum tuntas
* Grafik sederhana pencapaian nilai per kelas
* Grafik/status pengumpulan tugas
* Tabel aktivitas terbaru, contoh:

  * Guru menambahkan tugas baru
  * Nilai siswa diperbarui
  * Siswa mengumpulkan tugas
* Gunakan data dummy yang realistis

Halaman Data Siswa:

* Judul: “Data Siswa”
* Tombol “Tambah Siswa”
* Search bar
* Filter kelas
* Tabel berisi:

  * No
  * NIS/NISN
  * Nama Siswa
  * Kelas
  * Jenis Kelamin
  * Status
  * Aksi
* Tombol aksi: Detail, Edit, Hapus
* Buat modal/form tambah siswa dengan field:

  * Nama siswa
  * NIS/NISN
  * Kelas
  * Jenis kelamin
  * Username
  * Password

Halaman Data Guru:

* Judul: “Data Guru”
* Tombol “Tambah Guru”
* Search bar
* Tabel berisi:

  * No
  * Nama Guru
  * NIP/NUPTK
  * Mata Pelajaran
  * Kelas Diampu
  * Status
  * Aksi
* Tombol aksi: Detail, Edit, Hapus
* Form tambah guru:

  * Nama guru
  * NIP/NUPTK
  * Mata pelajaran
  * Kelas yang diajar
  * Username
  * Password

Halaman Data Kelas:

* Judul: “Data Kelas”
* Tombol “Tambah Kelas”
* Tabel berisi:

  * No
  * Nama Kelas
  * Jumlah Siswa
  * Wali/Penanggung Jawab
  * Aksi
* Contoh kelas: 7A sampai 9I

Halaman Mata Pelajaran:

* Judul: “Mata Pelajaran”
* Tombol “Tambah Mata Pelajaran”
* Tabel berisi:

  * No
  * Kode Mapel
  * Nama Mata Pelajaran
  * KKM
  * Status
  * Aksi
* Contoh mapel:

  * Bahasa Indonesia
  * Matematika
  * IPA
  * IPS
  * Bahasa Inggris
  * PPKn
  * Pendidikan Agama
  * Seni Budaya
  * PJOK
  * Informatika

Halaman Data Nilai:

* Judul: “Data Nilai”
* Filter kelas
* Filter mata pelajaran
* Filter semester
* Search siswa
* Tabel berisi:

  * Nama Siswa
  * Kelas
  * Mata Pelajaran
  * Nilai Tugas
  * Nilai Ulangan
  * PTS
  * PAS
  * Nilai Akhir
  * KKM
  * Status
* Status memakai badge:

  * Tuntas warna hijau
  * Belum Tuntas warna merah

Halaman Data Tugas:

* Judul: “Data Tugas”
* Filter kelas
* Filter mata pelajaran
* Tabel berisi:

  * Judul Tugas
  * Guru
  * Mata Pelajaran
  * Kelas
  * Deadline
  * Status
  * Jumlah Pengumpulan
  * Aksi
* Status:

  * Aktif
  * Selesai
  * Terlambat

Halaman Rekap Nilai:

* Judul: “Rekap Nilai”
* Filter kelas
* Filter mapel
* Filter semester
* Card ringkasan:

  * Rata-rata kelas
  * Nilai tertinggi
  * Nilai terendah
  * Jumlah siswa tuntas
  * Jumlah siswa belum tuntas
* Tabel rekap nilai siswa
* Tombol “Cetak Rekap” sebagai tampilan saja
* Tombol “Export” sebagai tampilan saja

Halaman Pengaturan:

* Judul: “Pengaturan”
* Form:

  * Nama sekolah
  * Tahun ajaran
  * Semester
  * KKM default
  * Nama aplikasi
  * Logo sekolah
* Tombol Simpan Pengaturan

==================================================
3. ROLE GURU
============

Sidebar Guru berisi menu:

* Dashboard
* Kelas Saya
* Input Nilai
* Tugas
* Pengumpulan Tugas
* Rekap Nilai
* Logout

Dashboard Guru:

* Header: “Dashboard Guru”
* Sapaan: “Selamat datang, Guru Mata Pelajaran”
* Card statistik:

  1. Kelas Diampu
  2. Tugas Aktif
  3. Siswa Sudah Mengumpulkan
  4. Siswa Belum Mengumpulkan
* Card daftar kelas yang diajar
* Card tugas terbaru
* Card siswa belum tuntas
* Tabel aktivitas terbaru

Halaman Kelas Saya:

* Judul: “Kelas Saya”
* Card kelas, contoh:

  * 7A
  * 7B
  * 8A
  * 9C
* Tiap card menampilkan:

  * Nama kelas
  * Jumlah siswa
  * Mata pelajaran
  * Tombol “Lihat Detail”
* Tabel daftar siswa per kelas:

  * No
  * Nama Siswa
  * Kelas
  * Status Nilai
  * Status Tugas

Halaman Input Nilai:

* Judul: “Input Nilai”
* Form filter:

  * Pilih kelas
  * Pilih mata pelajaran
  * Pilih semester
  * Pilih jenis nilai: Tugas, Ulangan Harian, PTS, PAS, Praktik, Remedial
* Tabel input nilai:

  * No
  * Nama Siswa
  * Kelas
  * Kolom input nilai
  * Keterangan
* Tombol “Simpan Nilai”
* Tambahkan alert sukses kecil setelah simpan sebagai tampilan

Halaman Tugas:

* Judul: “Tugas”
* Tombol “Buat Tugas”
* Tabel tugas:

  * Judul Tugas
  * Mata Pelajaran
  * Kelas
  * Deadline
  * Status
  * Aksi
* Form/modal buat tugas:

  * Judul tugas
  * Mata pelajaran
  * Kelas tujuan
  * Deskripsi tugas
  * Deadline
  * Upload file tugas
  * Link tambahan
  * Tombol Simpan Tugas
* Guru bisa upload file atau memberikan link tugas kepada siswa

Halaman Pengumpulan Tugas:

* Judul: “Pengumpulan Tugas”
* Filter kelas
* Filter tugas
* Tabel:

  * No
  * Nama Siswa
  * Kelas
  * Judul Tugas
  * Status Pengumpulan
  * Tanggal Upload
  * Catatan
* Status:

  * Sudah Mengumpulkan
  * Belum Mengumpulkan
  * Terlambat
* Tidak perlu tombol download tugas siswa
* Guru hanya melihat data pengumpulan dan statusnya saja

Halaman Rekap Nilai Guru:

* Judul: “Rekap Nilai”
* Filter kelas
* Filter mata pelajaran
* Tabel:

  * Nama Siswa
  * Nilai Akhir
  * KKM
  * Status
  * Keterangan
* Card ringkasan:

  * Rata-rata nilai
  * Jumlah tuntas
  * Jumlah belum tuntas

==================================================
4. ROLE SISWA
=============

Sidebar Siswa berisi menu:

* Dashboard
* Nilai Saya
* Tugas Saya
* Upload Tugas
* Informasi
* Logout

Dashboard Siswa:

* Header: “Dashboard Siswa”
* Sapaan: “Halo, [Nama Siswa]”
* Tampilkan data siswa:

  * Nama siswa
  * Kelas
  * NIS/NISN
* Card statistik:

  1. Rata-rata Nilai
  2. Mapel Tuntas
  3. Tugas Aktif
  4. Tugas Dikumpulkan
* Card peringatan:

  * “Ada tugas yang belum dikumpulkan”
  * “Ada nilai di bawah KKM”
* List tugas terbaru
* List notifikasi/informasi terbaru

Halaman Nilai Saya:

* Judul: “Nilai Saya”
* Tabel nilai:

  * Mata Pelajaran
  * Nilai Tugas
  * Ulangan
  * PTS
  * PAS
  * Nilai Akhir
  * KKM
  * Status
* Gunakan badge tuntas/belum tuntas
* Tambahkan card ringkasan rata-rata nilai

Halaman Tugas Saya:

* Judul: “Tugas Saya”
* Card/tabel daftar tugas:

  * Judul tugas
  * Mata pelajaran
  * Guru
  * Deadline
  * Status
  * Tombol “Lihat Tugas”
* Status:

  * Belum Dikerjakan
  * Sudah Dikumpulkan
  * Terlambat

Halaman Upload Tugas:

* Judul: “Upload Tugas”
* Form:

  * Pilih tugas
  * Nama siswa otomatis
  * Kelas otomatis
  * Upload file jawaban
  * Catatan siswa
  * Tombol “Kumpulkan Tugas”
* Setelah upload, tampilkan status “Tugas berhasil dikumpulkan”
* Tidak perlu fitur download jawaban yang dikumpulkan

Halaman Informasi:

* Judul: “Informasi”
* Daftar pengumuman:

  * Tugas baru
  * Deadline tugas
  * Nilai baru
  * Informasi sekolah
* Gunakan card sederhana dengan tanggal dan status

==================================================
5. KOMPONEN UI YANG HARUS ADA
=============================

Buat komponen reusable:

* Sidebar
* Topbar/header
* Card statistik
* Tabel data
* Badge status
* Button primary
* Button secondary
* Button danger
* Form input
* Select dropdown
* Modal tambah/edit
* Search bar
* Filter
* Empty state
* Alert sukses/error
* Pagination sederhana

==================================================
6. GAYA VISUAL DETAIL
=====================

Desain harus:

* Modern dan rapi
* Cocok untuk sekolah SMP
* Tidak terlalu ramai
* Tidak terlalu futuristik
* Mudah dibaca oleh guru
* Ramah untuk siswa
* Konsisten di semua halaman
* Menggunakan spacing yang lega
* Menggunakan ikon pendidikan, nilai, tugas, kelas, guru, siswa, dan laporan
* Menggunakan rounded corner 12-16px
* Menggunakan shadow halus
* Menggunakan tabel yang rapi dan mudah dibaca

Jangan gunakan desain yang terlalu gelap. Jangan gunakan warna neon. Jangan gunakan tampilan yang terlalu childish. Tetap profesional tapi tidak kaku.

==================================================
7. RESPONSIVE DESIGN
====================

Buat juga tampilan responsive:

* Desktop: sidebar tetap di kiri
* Tablet: sidebar lebih kecil
* Mobile: sidebar menjadi hamburger menu
* Card dashboard menjadi satu kolom di mobile
* Tabel di mobile berubah menjadi card list agar tidak terlalu kecil
* Tombol harus mudah ditekan di HP

==================================================
8. DATA DUMMY
=============

Gunakan data dummy yang realistis.

Contoh siswa:

* Ahmad Fauzan
* Siti Aisyah
* Budi Pratama
* Dewi Lestari
* Raka Maulana

Contoh guru:

* Bapak Fauzan
* Ibu Siti Aminah
* Bapak Andi Prasetyo
* Ibu Rina Marlina

Contoh kelas:

* 7A, 7B, 7C
* 8A, 8B, 8C
* 9A, 9B, 9C

Contoh nilai:

* 85, 78, 92, 70, 88

Contoh tugas:

* Tugas Matematika Bab Pecahan
* Tugas IPA Sistem Pencernaan
* Tugas Bahasa Indonesia Teks Deskripsi
* Tugas IPS Interaksi Sosial

==================================================
9. OUTPUT YANG DIHARAPKAN
=========================

Buat desain UI lengkap dalam bentuk prototype web app dengan halaman/screen berikut:

1. Login
2. Dashboard Admin
3. Data Siswa
4. Data Guru
5. Data Kelas
6. Mata Pelajaran
7. Data Nilai
8. Data Tugas
9. Rekap Nilai
10. Pengaturan Admin
11. Dashboard Guru
12. Kelas Saya
13. Input Nilai
14. Tugas Guru
15. Pengumpulan Tugas
16. Rekap Nilai Guru
17. Dashboard Siswa
18. Nilai Saya
19. Tugas Saya
20. Upload Tugas
21. Informasi Siswa

Pastikan seluruh halaman terlihat konsisten, rapi, dan siap dijadikan referensi implementasi web menggunakan Vercel dan Supabase.

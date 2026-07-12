# 13 — Limitations SINDEN

Dokumen ini menjelaskan batasan sistem SINDEN agar scope project tetap jelas.

---

## 1. Scope Utama

Aplikasi SINDEN versi ini adalah **web sistem sederhana** untuk monitoring nilai dan tugas.

Fokus utama:

- 3 role;
- database berjalan;
- login role;
- input nilai;
- tugas guru;
- upload tugas siswa;
- rekap sederhana;
- publish online.

---

## 2. Role yang Tidak Dibuat

Role berikut tidak termasuk:

1. Wali Kelas
2. Orang Tua

Jika nanti customer meminta role tersebut, maka itu termasuk fitur tambahan.

---

## 3. Fitur yang Tidak Dibuat

Fitur yang tidak termasuk:

- download file tugas siswa oleh guru;
- export PDF;
- export Excel;
- cetak raport;
- notifikasi WhatsApp;
- notifikasi email;
- notifikasi real-time;
- custom domain;
- sistem presensi;
- jadwal pelajaran otomatis lengkap;
- fitur chat;
- integrasi Google Classroom;
- integrasi Dapodik;
- sistem multi sekolah;
- aplikasi Android/iOS;
- import Excel otomatis;
- approval tugas bertingkat;
- komentar tugas;
- penilaian tugas dari file upload;
- statistik nilai kompleks;
- backup otomatis terjadwal.

---

## 4. Batasan Hosting

Hosting/publish menggunakan Vercel.

Batasan:

- bulan pertama free;
- bulan berikutnya 75k/bulan jika ingin tetap online;
- link menggunakan bawaan Vercel;
- domain tidak custom;
- custom domain butuh biaya tambahan;
- jika traffic/storage besar, layanan gratis dapat memiliki batas.

---

## 5. Batasan Database

Database menggunakan Supabase.

Batasan:

- kapasitas database mengikuti paket Supabase;
- storage file juga mengikuti batas Supabase;
- jika file upload banyak dan besar, storage dapat penuh;
- fitur backup lanjutan tidak termasuk;
- optimasi performa tingkat lanjut tidak termasuk.

---

## 6. Batasan File Upload

Guru dapat upload file/link tugas.

Siswa dapat upload tugas.

Namun:

- ukuran file dibatasi;
- format file dibatasi;
- guru tidak dibuatkan tombol download file tugas siswa;
- preview file tidak dibuat;
- komentar tugas tidak dibuat;
- scanning file berbahaya tidak dibuat.

---

## 7. Batasan Nilai

Fitur nilai dibuat sederhana.

Termasuk:

- input nilai;
- jenis nilai;
- KKM;
- status tuntas/belum tuntas;
- rekap sederhana.

Tidak termasuk:

- rumus raport kompleks;
- bobot nilai detail jika belum disepakati;
- nilai sikap;
- nilai keterampilan lengkap;
- nilai ekstrakurikuler;
- cetak raport;
- tanda tangan digital.

---

## 8. Batasan Rekap

Rekap hanya sederhana.

Termasuk:

- rata-rata;
- nilai tertinggi;
- nilai terendah;
- jumlah tuntas;
- jumlah belum tuntas.

Tidak termasuk:

- export PDF;
- export Excel;
- grafik kompleks;
- analisis trend nilai;
- prediksi nilai;
- laporan per semester lengkap.

---

## 9. Batasan Desain

Desain mengikuti UI yang sudah dibuat dari Figma Make.

Yang termasuk:

- penyesuaian ringan;
- menjaga tampilan konsisten;
- responsive dasar;
- perbaikan tampilan jika ada yang rusak.

Yang tidak termasuk:

- redesign total;
- perubahan tema besar;
- pembuatan branding baru;
- pembuatan ilustrasi custom;
- animasi kompleks.

---

## 10. Batasan Maintenance

Maintenance hanya untuk bug/error pada fitur yang dibuat.

Termasuk:

- error login;
- data tidak tersimpan;
- upload gagal karena bug sistem;
- halaman tidak terbuka;
- kesalahan tampilan ringan;
- query rekap error.

Tidak termasuk:

- tambah fitur baru;
- ubah flow besar;
- tambah role baru;
- migrasi hosting;
- custom domain;
- input data besar manual;
- training penggunaan panjang;
- perbaikan akibat data dihapus/diubah oleh user.

---

## 11. Batasan Keamanan

Sistem dibuat sederhana, bukan sistem keamanan tingkat enterprise.

Yang dilakukan:

- proteksi route berdasarkan role;
- pemisahan halaman role;
- validasi form dasar;
- pembatasan akses data dasar.

Yang tidak termasuk:

- audit keamanan lengkap;
- penetration testing;
- enkripsi khusus di luar bawaan platform;
- log aktivitas detail;
- sistem backup enterprise.

---

## 12. Batasan Data Awal

Data dari customer perlu dikonfirmasi.

Hal yang harus diperhatikan:

- tahun ajaran data siswa/guru;
- pembagian guru dan kelas;
- daftar mapel;
- KKM;
- format nilai;
- kelas aktif;
- data yang boleh ditampilkan.

Jika data belum lengkap, sistem tetap bisa dibuat dengan data dummy atau data sementara.

---

## 13. Fitur Tambahan

Fitur tambahan akan dikenakan biaya tambahan.

Contoh fitur tambahan:

- tambah role orang tua;
- tambah role wali kelas;
- export PDF/Excel;
- custom domain;
- notifikasi WhatsApp;
- download tugas siswa;
- import Excel otomatis;
- raport lengkap;
- dashboard grafik kompleks;
- multi tahun ajaran lengkap;
- mobile app.

---

## 14. Kesimpulan

Batasan ini dibuat agar pengerjaan tetap realistis dan sesuai kesepakatan awal. SINDEN versi ini difokuskan sebagai sistem sederhana yang berjalan dengan baik, bukan sistem akademik lengkap skala besar.

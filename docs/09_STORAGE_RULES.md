# 09 — Storage Rules SINDEN

Dokumen ini menjelaskan aturan penyimpanan file untuk aplikasi SINDEN.

Aplikasi memiliki fitur upload file dari dua arah:

1. Guru upload file/link tugas.
2. Siswa upload file pengumpulan tugas.

Storage menggunakan **Supabase Storage**.

---

## 1. Bucket yang Digunakan

Bucket utama:

```txt
assignment-files
submission-files
```

---

## 2. Bucket `assignment-files`

Digunakan untuk menyimpan file tugas dari guru.

Contoh file:

- PDF materi tugas
- DOC/DOCX
- PPT/PPTX
- gambar pendukung
- file instruksi tugas

Struktur folder:

```txt
assignment-files/
├── teacher-{teacher_id}/
│   ├── assignment-{assignment_id}/
│   │   ├── tugas.pdf
│   │   └── lampiran.png
```

Contoh URL disimpan di tabel:

```txt
assignments.file_url
```

---

## 3. Bucket `submission-files`

Digunakan untuk menyimpan file jawaban dari siswa.

Contoh file:

- PDF jawaban
- DOC/DOCX
- gambar tugas
- file hasil kerja siswa

Struktur folder:

```txt
submission-files/
├── assignment-{assignment_id}/
│   ├── student-{student_id}/
│   │   └── jawaban.pdf
```

Contoh URL disimpan di tabel:

```txt
submissions.file_url
```

---

## 4. Format File yang Diizinkan

Format yang disarankan:

```txt
.pdf
.doc
.docx
.ppt
.pptx
.jpg
.jpeg
.png
.zip
```

Catatan:

- ZIP sebaiknya hanya untuk file kecil.
- EXE, APK, dan file berbahaya tidak boleh diupload.

---

## 5. Batas Ukuran File

Rekomendasi:

| Jenis File | Maksimal |
|---|---:|
| File tugas guru | 10 MB |
| File jawaban siswa | 10 MB |
| Gambar | 5 MB |
| ZIP | 15 MB |

Untuk versi awal, batasi maksimal **10 MB** agar tidak cepat memenuhi storage.

---

## 6. Validasi File

Validasi yang perlu dibuat di frontend:

1. File wajib ada jika tugas membutuhkan upload.
2. Ukuran file tidak boleh melebihi batas.
3. Format file harus sesuai.
4. Nama file sebaiknya dibersihkan dari karakter aneh.
5. Tampilkan pesan error jika upload gagal.

Contoh pesan:

```txt
Format file tidak didukung.
Ukuran file terlalu besar.
File berhasil diupload.
Tugas berhasil dikumpulkan.
```

---

## 7. Penamaan File

Agar file tidak bentrok, gunakan format:

```txt
{timestamp}-{role}-{user_id}-{original_filename}
```

Contoh:

```txt
20260712-081500-student-123-jawaban-matematika.pdf
```

Atau gunakan UUID:

```txt
submissions/assignment-id/student-id/uuid.pdf
```

---

## 8. Hak Akses File

### File Tugas Guru

- Admin bisa melihat semua.
- Guru bisa melihat tugas miliknya.
- Siswa bisa melihat file tugas untuk kelasnya.

### File Pengumpulan Siswa

- Admin bisa melihat semua jika diperlukan.
- Siswa hanya bisa upload dan melihat status miliknya.
- Guru pada versi ini cukup melihat status pengumpulan, tidak perlu download file.

Catatan:

Walaupun fitur download tidak dibuat, file tetap tersimpan sebagai bukti pengumpulan.

---

## 9. Catatan Fitur Download

Sesuai kesepakatan, guru **tidak perlu download file tugas siswa** pada versi awal.

Yang dibuat:

- siswa upload tugas;
- sistem menyimpan file;
- status berubah menjadi sudah mengumpulkan;
- guru melihat status dan catatan.

Yang tidak dibuat:

- tombol download file pengumpulan siswa;
- preview file siswa;
- penilaian langsung dari file;
- komentar file.

Jika nanti customer meminta fitur download/preview file tugas siswa, itu termasuk fitur tambahan.

---

## 10. Policy Supabase Storage

Jika menggunakan RLS storage, policy perlu disesuaikan.

Contoh konsep:

### assignment-files

- Guru bisa upload ke folder miliknya.
- Siswa bisa membaca file tugas sesuai kelas.
- Admin bisa membaca semua.

### submission-files

- Siswa bisa upload ke folder miliknya.
- Siswa bisa melihat file miliknya.
- Guru bisa melihat metadata pengumpulan.
- Admin bisa melihat semua.

---

## 11. Error Handling Upload

Kasus error yang perlu ditangani:

### File kosong

Pesan:

```txt
Silakan pilih file terlebih dahulu.
```

### File terlalu besar

Pesan:

```txt
Ukuran file terlalu besar. Maksimal 10 MB.
```

### Format tidak didukung

Pesan:

```txt
Format file tidak didukung.
```

### Upload gagal

Pesan:

```txt
File gagal diupload. Silakan coba lagi.
```

### Upload berhasil

Pesan:

```txt
Tugas berhasil dikumpulkan.
```

---

## 12. Cleanup File

Jika tugas dihapus, file tugas sebaiknya ikut dihapus dari storage.

Jika submission dihapus, file siswa sebaiknya ikut dihapus.

Namun untuk versi awal, boleh cukup hapus data database dahulu jika cleanup storage terlalu memakan waktu.

---

## 13. Catatan Kapasitas

Karena hosting menggunakan Vercel dan database/storage menggunakan Supabase, kapasitas gratis memiliki batas. Jika penggunaan file tugas cukup banyak, ada kemungkinan storage penuh dan perlu upgrade.

Untuk mencegah cepat penuh:

- batasi ukuran file;
- hapus file tidak terpakai;
- hindari upload video besar;
- gunakan link Google Drive untuk file besar.

---

## 14. Rekomendasi Praktis

Untuk tugas dengan file besar, guru lebih baik memasukkan link Google Drive/YouTube, bukan upload langsung.

Untuk pengumpulan siswa, file sebaiknya dibatasi PDF/DOC/gambar kecil.

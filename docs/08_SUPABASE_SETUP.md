# 08 — Supabase Setup SINDEN

Dokumen ini berisi panduan setup Supabase untuk aplikasi SINDEN.

---

## 1. Buat Project Supabase

Langkah:

1. Masuk ke Supabase.
2. Klik New Project.
3. Isi nama project: `sinden-smpn1-jakenan`.
4. Pilih region terdekat.
5. Buat database password yang aman.
6. Tunggu project selesai dibuat.

---

## 2. Environment Variable

Buat file `.env` di project React.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Nilai didapat dari:

```txt
Supabase Dashboard → Project Settings → API
```

Gunakan:

- Project URL → `VITE_SUPABASE_URL`
- anon public key → `VITE_SUPABASE_ANON_KEY`

---

## 3. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## 4. Buat Supabase Client

File:

```txt
src/lib/supabaseClient.ts
```

Isi:

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables belum diatur.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 5. Buat Tabel Database

Tabel yang perlu dibuat:

1. profiles
2. students
3. teachers
4. classes
5. subjects
6. teacher_classes
7. grades
8. assignments
9. submissions
10. announcements
11. settings

Detail schema tersedia di:

```txt
docs/05_DATABASE_SCHEMA.md
```

---

## 6. Urutan Membuat Tabel

Urutan disarankan:

1. `profiles`
2. `classes`
3. `subjects`
4. `students`
5. `teachers`
6. `teacher_classes`
7. `grades`
8. `assignments`
9. `submissions`
10. `announcements`
11. `settings`

Kenapa urutan penting?

Karena beberapa tabel memiliki foreign key ke tabel lain.

---

## 7. Buat Storage Bucket

Bucket yang dibutuhkan:

```txt
assignment-files
submission-files
```

### assignment-files

Untuk file tugas yang diupload guru.

Contoh:

```txt
assignment-files/
├── teacher-id/
│   ├── assignment-id/
│   │   └── file.pdf
```

### submission-files

Untuk file tugas yang diupload siswa.

Contoh:

```txt
submission-files/
├── assignment-id/
│   ├── student-id/
│   │   └── jawaban.pdf
```

---

## 8. Setup Policy Sederhana

Untuk tahap awal, jika belum menggunakan RLS ketat, project dapat menggunakan akses dasar dari aplikasi.

Namun untuk keamanan production, aktifkan RLS.

### Rekomendasi Akses

Admin:

- akses semua data.

Guru:

- akses data kelas/mapel yang diajar.
- akses tugas miliknya.
- akses pengumpulan tugas miliknya.
- akses nilai yang dia input.

Siswa:

- akses nilai miliknya sendiri.
- akses tugas untuk kelasnya.
- upload submission miliknya sendiri.

---

## 9. Seed Data

Data awal yang perlu dimasukkan:

- data kelas;
- data mata pelajaran;
- data admin;
- data guru;
- data siswa;
- relasi guru-kelas-mapel.

Contoh kelas:

```txt
7A, 7B, 7C, 7D, 7E, 7F, 7G, 7H, 7I
8A, 8B, 8C, 8D, 8E, 8F, 8G, 8H, 8I
9A, 9B, 9C, 9D, 9E, 9F, 9G, 9H, 9I
```

---

## 10. Catatan Import Excel

Data guru dan siswa dari Excel harus diproses dulu sebelum masuk database.

Yang perlu diperhatikan:

- NISN sebagai teks.
- NIPD/NIS sebagai teks.
- NIP sebagai teks.
- NUPTK sebagai teks.
- Nama dirapikan jika perlu.
- Kelas disesuaikan dengan data aktif.
- Jangan memasukkan data yang belum dikonfirmasi tahun ajarannya.

---

## 11. Auth User

Ada dua opsi:

### Opsi A — Supabase Auth

Buat akun melalui Supabase Auth. Lalu hubungkan ke `profiles.auth_id`.

Kelebihan:

- lebih aman;
- session otomatis;
- cocok untuk produksi.

Kekurangan:

- setup akun banyak lebih lama.

### Opsi B — Auth Sederhana

Gunakan tabel `profiles` untuk login sederhana.

Kelebihan:

- lebih cepat;
- cocok untuk deadline pendek;
- mudah dibuat.

Kekurangan:

- tidak sekuat Supabase Auth.

Catatan:

Jika menggunakan auth sederhana, password jangan disimpan plaintext untuk versi final. Minimal gunakan hashing jika memungkinkan.

---

## 12. Service Query

Query Supabase sebaiknya tidak ditulis langsung di komponen UI. Gunakan folder:

```txt
src/services/
```

Contoh:

```txt
studentService.ts
teacherService.ts
gradeService.ts
assignmentService.ts
submissionService.ts
```

---

## 13. Testing Supabase

Checklist:

- koneksi Supabase berhasil;
- data siswa bisa tampil;
- data guru bisa tampil;
- data kelas bisa tampil;
- data mapel bisa tampil;
- nilai bisa disimpan;
- tugas bisa dibuat;
- file tugas bisa diupload;
- siswa bisa upload tugas;
- rekap bisa tampil;
- role tidak bisa akses data yang salah.

---

## 14. Catatan Keamanan

Jangan commit file `.env`.

Tambahkan ke `.gitignore`:

```txt
.env
.env.local
```

Gunakan `.env.example` sebagai contoh.

---

## 15. Troubleshooting

### Data tidak muncul

Cek:

- URL Supabase benar?
- anon key benar?
- nama tabel benar?
- RLS memblokir akses?
- query error?

### Upload gagal

Cek:

- bucket sudah dibuat?
- policy storage sudah benar?
- ukuran file terlalu besar?
- format file diizinkan?

### Login gagal

Cek:

- akun ada di `profiles`?
- role sesuai?
- password benar?
- session tersimpan?

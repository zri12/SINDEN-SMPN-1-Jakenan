# SINDEN — Sistem Informasi Digital Evaluasi Nilai

**SINDEN** adalah aplikasi web sederhana untuk membantu SMP Negeri 1 Jakenan dalam mengelola data siswa, guru, kelas, mata pelajaran, nilai, tugas, pengumpulan tugas, dan rekap nilai sederhana.

Project ini dibuat sebagai pengembangan dari konsep awal yang sebelumnya dibuat di Canva. Karena file Canva AI/Canva Code lama tidak dapat diedit penuh, sistem kemudian diarahkan menjadi aplikasi web sederhana menggunakan program, sehingga data dapat tersimpan di database dan fitur dapat berjalan lebih baik.

---

## Identitas Project

| Item | Detail |
|---|---|
| Nama Aplikasi | SINDEN |
| Kepanjangan | Sistem Informasi Digital Evaluasi Nilai |
| Sekolah | SMP Negeri 1 Jakenan |
| Jenis Aplikasi | Web App Sistem Informasi Sekolah |
| Role | Admin, Guru, Siswa |
| Stack Frontend | React + Vite |
| Database | Supabase |
| Storage File | Supabase Storage |
| Deployment | Vercel |
| Domain Awal | Link bawaan Vercel / domain free |
| Hosting | Free 1 bulan, bulan berikutnya 75k/bulan |

---

## Tujuan Aplikasi

Aplikasi ini dibuat untuk membantu proses digitalisasi monitoring dan evaluasi nilai siswa. Sistem ini berfokus pada fitur utama yang dibutuhkan sekolah, yaitu:

- pendataan siswa;
- pendataan guru;
- pendataan kelas;
- pendataan mata pelajaran;
- input nilai siswa;
- pembuatan tugas oleh guru;
- pengumpulan tugas oleh siswa;
- rekap nilai sederhana;
- tampilan dashboard berdasarkan role pengguna.

---

## Role Pengguna

Aplikasi hanya memiliki **3 role utama**:

1. **Admin**
   - Mengelola data master dan melihat rekap sistem.
2. **Guru**
   - Mengelola nilai, tugas, dan pengumpulan tugas siswa.
3. **Siswa**
   - Melihat nilai, melihat tugas, dan mengumpulkan tugas.

Role **Wali Kelas** dan **Orang Tua** tidak termasuk dalam scope versi ini.

---

## Fitur Utama

### Admin

- Login admin
- Dashboard admin
- Kelola data siswa
- Kelola data guru
- Kelola data kelas
- Kelola mata pelajaran
- Melihat data nilai
- Melihat data tugas
- Rekap nilai sederhana
- Pengaturan dasar aplikasi

### Guru

- Login guru
- Dashboard guru
- Melihat kelas yang diajar
- Input nilai siswa
- Membuat tugas
- Upload file/link tugas
- Melihat data pengumpulan tugas
- Rekap nilai sederhana

### Siswa

- Login siswa
- Dashboard siswa
- Melihat nilai sendiri
- Melihat daftar tugas
- Upload/mengumpulkan tugas
- Melihat status tugas
- Melihat informasi sederhana

---

## Fitur yang Tidak Termasuk

Agar scope tetap sesuai kesepakatan, fitur berikut **tidak termasuk** pada versi ini:

- Role Wali Kelas
- Role Orang Tua
- Download file tugas yang dikumpulkan siswa oleh guru
- Export PDF/Excel
- Notifikasi WhatsApp/email
- Notifikasi real-time
- Custom domain sekolah
- Sistem raport lengkap
- Presensi siswa
- Jadwal pelajaran lengkap otomatis
- Fitur chat
- Integrasi Google Classroom
- Integrasi Dapodik
- Multi tahun ajaran kompleks
- Hak akses granular tingkat lanjut

Jika fitur tambahan diperlukan setelah versi awal selesai, maka dapat dibuat sebagai pengembangan lanjutan dengan biaya tambahan.

---

## Struktur Folder Project

Struktur folder yang disarankan:

```txt
sinden-app/
├── docs/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── routes/
│   ├── types/
│   ├── constants/
│   ├── utils/
│   ├── data/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── supabase/
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

Detail lengkap struktur project tersedia di:

```txt
docs/14_PROJECT_STRUCTURE.md
```

---

## Cara Menjalankan Project

### 1. Install dependency

```bash
npm install
```

### 2. Buat file environment

Buat file `.env` dari `.env.example`.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### 3. Jalankan project

```bash
npm run dev
```

### 4. Build project

```bash
npm run build
```

---

## Catatan Database

Database menggunakan Supabase. Tabel utama yang diperlukan:

- profiles
- students
- teachers
- classes
- subjects
- teacher_classes
- grades
- assignments
- submissions
- announcements
- settings

Detail lengkap tersedia di:

```txt
docs/05_DATABASE_SCHEMA.md
```

---

## Catatan Deployment

Project akan dipublish menggunakan Vercel.

- Bulan pertama: free hosting/publish
- Bulan berikutnya: 75k/bulan jika ingin tetap online
- Domain awal: link bawaan/free
- Custom domain tidak termasuk dalam paket awal

Detail deployment tersedia di:

```txt
docs/10_DEPLOYMENT.md
```

---

## Catatan Maintenance

Maintenance berlaku untuk bug/error dari sistem yang dibuat, bukan untuk permintaan fitur baru di luar scope awal.

Contoh yang termasuk maintenance:

- error saat login;
- data tidak tersimpan;
- halaman tidak terbuka;
- upload gagal karena bug sistem;
- rekap tidak tampil karena kesalahan query.

Contoh yang tidak termasuk maintenance:

- tambah role baru;
- tambah fitur export PDF;
- tambah notifikasi WhatsApp;
- ubah desain besar-besaran;
- tambah fitur raport lengkap;
- migrasi ke hosting/domain lain.

---

## Status Project

Dokumentasi ini dibuat sebagai acuan sebelum tahap implementasi program agar hasil coding tetap konsisten dengan UI dan kesepakatan fitur final.

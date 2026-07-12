# 03 — UI Guidelines SINDEN

Dokumen ini berisi panduan tampilan agar UI aplikasi SINDEN tetap konsisten saat dikembangkan menjadi program.

---

## 1. Konsep Visual

Aplikasi SINDEN menggunakan konsep visual:

- modern;
- bersih;
- profesional;
- mudah dipahami guru;
- ramah digunakan siswa;
- tidak terlalu ramai;
- tidak terlalu formal kaku;
- cocok untuk sistem sekolah SMP.

Tampilan harus terasa seperti sistem dashboard sekolah, bukan landing page promosi.

---

## 2. Identitas Aplikasi

| Elemen | Isi |
|---|---|
| Nama Aplikasi | SINDEN |
| Kepanjangan | Sistem Informasi Digital Evaluasi Nilai |
| Sekolah | SMP Negeri 1 Jakenan |
| Role | Admin, Guru, Siswa |

---

## 3. Warna Utama

Rekomendasi palet warna:

| Fungsi | Warna | Hex |
|---|---|---|
| Biru Utama | Sidebar, header utama | `#1E3A8A` |
| Biru Aksen | Tombol utama, link aktif | `#2563EB` |
| Biru Muda | Background aksen ringan | `#DBEAFE` |
| Putih | Konten utama | `#FFFFFF` |
| Abu Background | Background halaman | `#F3F4F6` |
| Abu Border | Border tabel/input | `#E5E7EB` |
| Abu Text | Teks sekunder | `#6B7280` |
| Hitam Soft | Teks utama | `#111827` |

---

## 4. Warna Status

| Status | Warna | Hex | Penggunaan |
|---|---|---|---|
| Tuntas/Selesai | Hijau | `#16A34A` | Nilai tuntas, tugas selesai |
| Menunggu/Proses | Kuning | `#F59E0B` | Menunggu upload, proses |
| Belum/Terlambat | Merah | `#DC2626` | Belum tuntas, belum mengumpulkan |
| Informasi | Biru | `#2563EB` | Informasi umum |
| Nonaktif | Abu | `#9CA3AF` | Data tidak aktif |

---

## 5. Layout Umum

Layout utama menggunakan:

- sidebar di kiri;
- topbar di atas konten;
- area konten utama;
- card statistik;
- tabel data;
- modal/form.

Struktur layout:

```txt
+------------------------------------------------+
| Sidebar | Topbar                               |
|         |--------------------------------------|
|         | Page Header                          |
|         | Card Statistik                       |
|         | Tabel/Form/Konten                    |
+------------------------------------------------+
```

---

## 6. Sidebar

Sidebar digunakan untuk navigasi setiap role.

Aturan sidebar:

- berada di kiri pada desktop;
- warna biru tua;
- logo/nama aplikasi di atas;
- menu aktif diberi background biru lebih terang;
- logout berada di bagian bawah;
- ikon menu konsisten;
- sidebar mobile berubah menjadi drawer/hamburger.

---

## 7. Topbar

Topbar berisi:

- judul halaman;
- nama user;
- role user;
- tombol menu mobile;
- tombol logout jika diperlukan.

Contoh:

```txt
Dashboard Admin                      Administrator
SMP Negeri 1 Jakenan                 Role: Admin
```

---

## 8. Card Statistik

Card statistik digunakan pada dashboard.

Isi card:

- ikon;
- label;
- angka utama;
- deskripsi singkat.

Contoh:

```txt
Total Siswa
853
Siswa aktif
```

Aturan card:

- background putih;
- border abu muda;
- shadow halus;
- rounded corner 12–16px;
- padding cukup lega;
- ikon berwarna biru/hijau/kuning/merah sesuai konteks.

---

## 9. Tabel Data

Tabel digunakan untuk data siswa, guru, kelas, mapel, nilai, tugas, dan pengumpulan tugas.

Aturan tabel:

- header tabel jelas;
- row cukup tinggi;
- ada hover state;
- teks tidak terlalu kecil;
- status menggunakan badge;
- aksi menggunakan tombol kecil atau icon button;
- tersedia search/filter jika data banyak.

Kolom aksi umum:

- Detail
- Edit
- Hapus

Catatan:

- Untuk mobile, tabel dapat berubah menjadi card list agar tetap terbaca.

---

## 10. Form Input

Form digunakan pada modal tambah/edit dan halaman input.

Aturan form:

- label di atas input;
- placeholder jelas;
- input tinggi 40–44px;
- border abu muda;
- focus state biru;
- error state merah;
- tombol simpan di kanan bawah atau bawah form.

Contoh field:

```txt
Nama Siswa
[Nama siswa]

Kelas
[Pilih kelas]

Status
[Pilih status]
```

---

## 11. Button

Jenis tombol:

### Primary Button

Digunakan untuk aksi utama.

Contoh:

- Simpan
- Tambah Data
- Masuk
- Kumpulkan Tugas

Style:

- background biru;
- teks putih;
- rounded 8–12px.

### Secondary Button

Digunakan untuk aksi tambahan.

Contoh:

- Batal
- Reset Filter
- Lihat Detail

Style:

- background putih;
- border abu;
- teks biru/hitam.

### Danger Button

Digunakan untuk hapus.

Contoh:

- Hapus
- Konfirmasi Hapus

Style:

- background merah;
- teks putih.

---

## 12. Badge Status

Badge digunakan untuk menampilkan status.

Contoh badge:

- Tuntas
- Belum Tuntas
- Aktif
- Selesai
- Terlambat
- Sudah Mengumpulkan
- Belum Mengumpulkan

Aturan:

- teks pendek;
- warna sesuai status;
- bentuk rounded penuh/pill;
- ukuran kecil tapi terbaca.

---

## 13. Modal

Modal digunakan untuk tambah/edit data.

Aturan modal:

- overlay gelap transparan;
- card putih;
- judul modal jelas;
- tombol close;
- form di dalam modal;
- tombol Batal dan Simpan.

Contoh modal:

- Tambah Siswa
- Edit Guru
- Buat Tugas
- Input Nilai

---

## 14. Empty State

Jika data kosong, tampilkan empty state.

Contoh teks:

- “Belum ada data siswa.”
- “Belum ada tugas aktif.”
- “Belum ada pengumpulan tugas.”

Tambahkan tombol aksi jika relevan:

- “Tambah Data”
- “Buat Tugas”

---

## 15. Loading State

Saat data sedang diambil dari database, tampilkan loading.

Bentuk loading:

- spinner kecil;
- skeleton card;
- teks “Memuat data...”.

Jangan biarkan layar kosong tanpa keterangan.

---

## 16. Alert dan Toast

Alert digunakan untuk memberi feedback.

Contoh:

- “Data berhasil disimpan.”
- “Nilai berhasil diperbarui.”
- “Tugas berhasil dikumpulkan.”
- “Terjadi kesalahan, silakan coba lagi.”

Warna:

- sukses: hijau;
- error: merah;
- informasi: biru;
- peringatan: kuning.

---

## 17. Responsive Design

### Desktop

- sidebar tetap di kiri;
- konten lebar;
- tabel full;
- card statistik 3–4 kolom.

### Tablet

- sidebar lebih kecil;
- card 2 kolom;
- tabel bisa scroll horizontal.

### Mobile

- sidebar menjadi hamburger;
- card menjadi 1 kolom;
- tabel berubah menjadi card list;
- tombol full width jika perlu;
- teks jangan terlalu kecil;
- jarak antar elemen cukup besar.

---

## 18. Gaya Bahasa UI

Gunakan bahasa Indonesia yang sederhana.

Contoh yang baik:

- “Tambah Siswa”
- “Simpan Nilai”
- “Buat Tugas”
- “Kumpulkan Tugas”
- “Belum Mengumpulkan”
- “Data berhasil disimpan”

Hindari bahasa yang terlalu teknis:

- “Submit Payload”
- “Fetch Data”
- “Database Error”
- “Unauthorized Role”

Jika error teknis terjadi, ubah menjadi bahasa pengguna:

- “Akses tidak diizinkan.”
- “Data gagal dimuat.”
- “Silakan login kembali.”

---

## 19. Ikon

Gunakan ikon sederhana dan konsisten.

Rekomendasi ikon:

- Dashboard: layout/grid
- Siswa: user/group
- Guru: user/check
- Kelas: building/book
- Mapel: book
- Nilai: chart/check
- Tugas: file/list
- Upload: upload/cloud
- Pengaturan: gear
- Logout: log out

---

## 20. Konsistensi Data Dummy

Data dummy harus realistis dan sesuai konteks sekolah.

Contoh siswa:

- Ahmad Fauzan
- Siti Aisyah
- Budi Pratama
- Dewi Lestari
- Raka Maulana

Contoh guru:

- Bapak Fauzan
- Ibu Siti Aminah
- Bapak Andi Prasetyo
- Ibu Rina Marlina

Contoh kelas:

- 7A
- 7B
- 8A
- 8B
- 9A
- 9B

---

## 21. Catatan Implementasi

Saat UI diubah menjadi program:

- jangan menaruh semua layout di `App.tsx`;
- pisahkan sidebar, topbar, card, tabel, form, modal;
- gunakan data dari Supabase, bukan dummy;
- pertahankan style dari UI Figma;
- hindari perubahan desain besar tanpa persetujuan.

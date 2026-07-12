# 10 — Deployment SINDEN

Dokumen ini menjelaskan cara publish aplikasi SINDEN menggunakan Vercel.

---

## 1. Platform Deployment

Aplikasi dipublish menggunakan:

```txt
Vercel
```

Database dan storage menggunakan:

```txt
Supabase
```

---

## 2. Catatan Kesepakatan Hosting

Kesepakatan publish/hosting:

- Bulan pertama free.
- Bulan berikutnya jika tetap online: 75k/bulan.
- Domain awal menggunakan link bawaan/free dari Vercel.
- Link belum custom nama sekolah.
- Custom domain tidak termasuk paket awal.

Contoh link:

```txt
https://sinden-smpn1-jakenan.vercel.app
```

---

## 3. Persiapan Sebelum Deploy

Pastikan:

1. Project bisa jalan lokal.
2. Tidak ada error build.
3. File `.env` sudah benar.
4. Supabase sudah aktif.
5. Database sudah dibuat.
6. Storage bucket sudah dibuat.
7. Semua route utama bisa diakses.
8. Login role berjalan.
9. Data tampil dari Supabase.
10. Upload tugas berjalan.

---

## 4. Build Project

Jalankan:

```bash
npm run build
```

Jika berhasil, Vite akan membuat folder:

```txt
dist/
```

Jika gagal, perbaiki error terlebih dahulu.

---

## 5. Deploy ke Vercel

Langkah:

1. Push project ke GitHub.
2. Masuk ke Vercel.
3. Klik Add New Project.
4. Pilih repository project.
5. Framework akan terdeteksi sebagai Vite.
6. Isi environment variable.
7. Klik Deploy.

---

## 6. Environment Variable di Vercel

Masuk ke:

```txt
Vercel Dashboard → Project → Settings → Environment Variables
```

Tambahkan:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Setelah env ditambahkan, lakukan redeploy.

---

## 7. Setting Build Vercel

Default untuk Vite:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## 8. Redirect Route SPA

Karena React menggunakan client-side routing, perlu fallback route.

Buat file:

```txt
vercel.json
```

Isi:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Tujuannya agar ketika user membuka `/admin/dashboard` langsung, halaman tidak error 404.

---

## 9. Testing Setelah Deploy

Checklist:

- link Vercel bisa dibuka;
- halaman login tampil;
- login admin berhasil;
- login guru berhasil;
- login siswa berhasil;
- data dari Supabase muncul;
- admin bisa kelola data;
- guru bisa buat tugas;
- siswa bisa upload tugas;
- rekap tampil;
- logout berhasil;
- refresh halaman dashboard tidak 404;
- tampilan mobile aman.

---

## 10. Domain

Versi awal menggunakan domain/link free dari Vercel.

Contoh:

```txt
sinden-smpn1-jakenan.vercel.app
```

Catatan:

- Link ini tidak custom `.web.id`.
- Jika ingin domain custom seperti `sinden.smpn1jakenan.web.id`, perlu membeli/menyiapkan domain.
- Custom domain masuk biaya tambahan jika belum disepakati.

---

## 11. Maintenance

Maintenance berlaku untuk error/bug dari sistem yang dibuat.

Contoh yang termasuk:

- login error;
- halaman tidak terbuka;
- data tidak tersimpan;
- upload gagal karena bug;
- rekap tidak tampil;
- route error;
- tampilan rusak ringan.

Tidak termasuk maintenance:

- tambah fitur baru;
- tambah role baru;
- ubah desain besar;
- tambah export PDF;
- tambah notifikasi WhatsApp;
- pindah hosting;
- custom domain.

---

## 12. Update Project Setelah Deploy

Jika ada revisi:

```txt
Edit kode lokal
→ test lokal
→ commit ke GitHub
→ push
→ Vercel auto deploy
→ test link online
```

---

## 13. Rollback

Jika update menyebabkan error, gunakan fitur rollback Vercel:

```txt
Vercel Dashboard → Deployments → pilih deployment lama → Promote to Production
```

---

## 14. Serah Terima

File/akses yang perlu disiapkan saat serah terima:

- link aplikasi;
- akun admin;
- akun guru contoh;
- akun siswa contoh;
- link Supabase jika diperlukan;
- link repository jika diberikan;
- catatan penggunaan singkat;
- catatan biaya hosting bulan berikutnya.

---

## 15. Catatan Penting

Jangan memberikan password akun pribadi atau akun sekolah secara sembarangan. Untuk pengelolaan, lebih aman menggunakan akun project khusus atau memberikan akses terbatas.

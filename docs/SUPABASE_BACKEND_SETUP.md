# Setup Backend Supabase SINDEN

Ikuti urutan ini di Supabase SQL Editor.

## 1. Jalankan Migration

Jalankan file di `supabase/migrations/` secara berurutan:

1. `001_enable_extensions.sql`
2. `002_create_tables.sql`
3. `003_create_triggers.sql`
4. `004_enable_rls.sql`
5. `005_rls_policies.sql`
6. `006_storage_buckets.sql`
7. `007_storage_policies.sql`
8. `008_seed_demo_data.sql`
9. `009_views_and_helpers.sql`

## 2. Buat User Auth Demo

Ikuti `supabase/README_CREATE_DEMO_USERS.md`.

Demo user:

| Role | Email | Password |
|---|---|---|
| Admin | admin@sinden.local | Admin12345 |
| Guru | guru@sinden.local | Guru12345 |
| Siswa | siswa@sinden.local | Siswa12345 |

## 3. Environment Frontend

Buat `.env` dari `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Nilai diambil dari:

`Supabase Dashboard -> Project Settings -> API`

## 4. Storage

Bucket yang dibuat:

- `assignment-files`
- `submission-files`

Keduanya private. Frontend dapat membuat signed URL atau public URL sesuai kebutuhan UI.

## 5. Alur Terbaru

- Guru tidak punya halaman `Input Nilai` terpisah.
- Nilai tugas diinput dari halaman `Pengumpulan Tugas`.
- Siswa mengumpulkan tugas dari halaman `Tugas Saya`.
- Tidak ada tombol download massal tugas siswa.

## 6. Testing

Setelah env terisi:

```bash
npm install
npm run dev
npm run build
```

Pastikan login dengan tiga akun demo berhasil dan role diarahkan ke dashboard masing-masing.

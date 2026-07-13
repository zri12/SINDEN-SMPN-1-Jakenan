# Reset And Seed Demo Data

File reset final:

`supabase/migrations/009_reset_and_seed_demo_data.sql`

## Data Yang Dihapus

File ini menghapus data demo/transaksi berikut:

- `grades`
- `submissions`
- `assignments`
- `announcements`
- `activity_logs`
- `teacher_classes`
- `students`
- `teachers`
- `subjects`
- `classes`
- `settings`

## Data Yang Tidak Dihapus

File ini tidak menghapus:

- `auth.users`
- `profiles`
- akun login admin/guru/siswa
- password user

## Cara Menjalankan Ulang

1. Pastikan akun Auth dan profiles admin/guru/siswa sudah ada.
2. Jalankan migration `001` sampai `008` jika belum pernah.
3. Jalankan `009_reset_and_seed_demo_data.sql`.
4. Login ulang di aplikasi.

Jika profile guru/siswa belum ada, seed tetap membuat data master, tetapi `profile_id` guru/siswa utama akan `NULL`. Buat profiles dulu, lalu jalankan ulang file `009`.

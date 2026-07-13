# Keep Alive

Project Supabase Free bisa pause jika tidak aktif beberapa hari. Untuk menjaga project tetap aktif, gunakan ping ringan 2-3 kali seminggu.

Endpoint ringan yang cukup:

- Baca satu row dari `settings`.
- Jangan jalankan query berat.
- Jangan upload file hanya untuk keep-alive.

Pilihan tools:

- cron-job.org
- GitHub Actions schedule

Contoh target:

`https://PROJECT_REF.supabase.co/rest/v1/settings?select=id&limit=1`

Gunakan anon key yang aman untuk client dan pastikan RLS `settings` mengizinkan select untuk user/session yang sesuai.

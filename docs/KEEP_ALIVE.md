# Keep Alive Supabase Free

Supabase Free dapat pause jika tidak aktif beberapa hari. Untuk menjaga project tetap bangun, gunakan ping ringan 2-3 kali seminggu.

## Endpoint Yang Dipakai

Gunakan halaman aplikasi atau endpoint ringan yang membaca tabel `settings`.

Jika hanya memakai Vite frontend, cukup jadwalkan cron ke URL aplikasi:

```txt
https://domain-vercel-anda.vercel.app/
```

Saat aplikasi dibuka, frontend dapat membaca `settings` memakai anon key.

## Cron-job.org

1. Buka `https://cron-job.org`.
2. Buat cron baru.
3. URL: link Vercel aplikasi.
4. Method: GET.
5. Jadwal: 2-3 kali seminggu.

## Catatan

- Jangan gunakan service role key.
- Jangan expose secret.
- Pastikan policy `settings` mengizinkan SELECT untuk user login. Untuk ping publik tanpa login, buat endpoint khusus nanti jika memang dibutuhkan.

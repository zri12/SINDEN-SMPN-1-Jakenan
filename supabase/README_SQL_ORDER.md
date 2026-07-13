# SINDEN SQL Order

Jalankan file berikut berurutan di Supabase SQL Editor.

1. `supabase/migrations/001_enable_extensions_and_helpers.sql`
2. `supabase/migrations/002_create_tables.sql`
3. `supabase/migrations/003_create_triggers.sql`
4. `supabase/migrations/004_enable_rls.sql`
5. `supabase/migrations/005_create_rls_policies.sql`
6. `supabase/migrations/006_create_storage_buckets.sql`
7. `supabase/migrations/007_create_storage_policies.sql`
8. `supabase/migrations/008_create_views_and_functions.sql`
9. `supabase/migrations/009_reset_and_seed_demo_data.sql`

Catatan penting:

- Jangan menjalankan file SQL lama di luar folder `migrations/` karena sudah dihapus/dirapikan.
- File `009_reset_and_seed_demo_data.sql` aman untuk akun login: tidak menghapus `auth.users` dan tidak menghapus `profiles`.
- Jika policy sudah pernah ada, file `005` dan `007` melakukan `drop policy if exists` sebelum membuat policy final.
- Setelah menjalankan SQL, refresh aplikasi dan login ulang supaya session membaca data terbaru.

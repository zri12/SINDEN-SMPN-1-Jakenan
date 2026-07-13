# Backend Fix Report

## SQL Lama Yang Dihapus

File patch sementara dan seed lama dihapus dari repo, termasuk file root seperti `fix_submission_rls.sql`, `reset_and_seed_smp_data.sql`, `seed_real_school_data.sql`, `setup_storage_buckets.sql`, folder `supabase/policies/`, folder `supabase/seed/`, dan migration tambahan `010` sampai `012`.

## SQL Final Yang Dibuat

- `001_enable_extensions_and_helpers.sql`
- `002_create_tables.sql`
- `003_create_triggers.sql`
- `004_enable_rls.sql`
- `005_create_rls_policies.sql`
- `006_create_storage_buckets.sql`
- `007_create_storage_policies.sql`
- `008_create_views_and_functions.sql`
- `009_reset_and_seed_demo_data.sql`

## Fitur Backend Yang Dirapikan

- Reset demo aman tanpa menghapus `auth.users` dan `profiles`.
- Seed sekolah SMP dengan 27 kelas, 12 mapel, 5 guru, 15 siswa, tugas, submissions, grades, announcements, dan activity logs.
- `assignments.publish_at` masuk schema utama.
- `grades.submission_id` unique jika tidak null.
- RLS dibuat ulang dengan helper `security definer` untuk menghindari recursion.
- Storage private untuk `assignment-files` dan `submission-files`.
- Views rekap dibuat dengan `security_invoker = true`.
- Komentar tugas disimpan permanen di tabel `assignment_comments`, bukan state frontend.

## Frontend Yang Disesuaikan

- `classService` membaca `classes_with_student_count`.
- `gradeService` melakukan upsert nilai berdasarkan `submission_id`.
- Input nilai guru mengirim `assignment_id` dan `submission_id`.
- Assignment insert/update membersihkan field `undefined`.
- Validator upload disesuaikan dengan limit 10 MB dan format final.
- Detail tugas siswa membaca dan menyimpan komentar melalui Supabase.

## Catatan Testing

Jalankan `npm run build` setelah perubahan. Setelah SQL final dijalankan di Supabase, test ulang login admin, guru, dan siswa sesuai alur utama.

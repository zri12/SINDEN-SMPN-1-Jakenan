# Account Creation Note

Akun login dibuat di Supabase Auth.

Form admin di aplikasi dipakai untuk mengelola data master seperti siswa, guru, kelas, mapel, tugas, dan nilai. Form admin tidak boleh menyimpan password plain text.

Alur aman:

1. Buat user di Supabase Auth.
2. Copy UID user.
3. Buat atau update row `profiles` dengan UID tersebut.
4. Link `profiles.id` ke `teachers.profile_id` atau `students.profile_id`.

Jangan commit service role key, password database, `.env`, `.env.local`, atau folder `.vercel`.

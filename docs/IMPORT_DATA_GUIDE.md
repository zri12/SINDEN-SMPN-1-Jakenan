# Import Data Guide

Gunakan format CSV sederhana dan pastikan kolom identifier disimpan sebagai text.

## CSV Siswa

Kolom:

`nis,nisn,full_name,gender,class_name,birth_place,birth_date,address,status`

Catatan:

- `nis` dan `nisn` wajib text.
- `gender` isi `L` atau `P`.
- `class_name` harus sudah ada di tabel `classes`.
- `status` isi `active`, `inactive`, atau `graduated`.

## CSV Guru

Kolom:

`nip,nuptk,full_name,gender,employment_status,teacher_type,phone,status`

Catatan:

- `nip` dan `nuptk` wajib text.
- `status` isi `active` atau `inactive`.
- Akun login guru dibuat di Supabase Auth, bukan dari CSV.

## CSV Kelas

Kolom:

`name,grade_level,academic_year,description,is_active`

Contoh:

`7A,7,2025/2026,Kelas 7A,true`

## CSV Mata Pelajaran

Kolom:

`code,name,kkm,description,is_active`

Contoh:

`MTK,Matematika,75,Mata pelajaran Matematika,true`

## CSV Pembagian Guru Mengajar

Kolom:

`teacher_nip,class_name,subject_code,academic_year,semester`

Catatan:

- `semester` isi `ganjil` atau `genap`.
- Pastikan guru, kelas, dan mapel sudah diimport sebelum relasi mengajar.

## Cara Import Ke Supabase

1. Import kelas.
2. Import mata pelajaran.
3. Import guru.
4. Import siswa.
5. Import relasi guru mengajar.
6. Cek foreign key sebelum membuat tugas/nilai.

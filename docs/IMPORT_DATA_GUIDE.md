# Panduan Import Data Asli SINDEN

Gunakan CSV saat import ke Supabase. Jangan memasukkan data asli siswa/guru ke source code.

## Siswa

Kolom disarankan:

```csv
full_name,nis,nisn,class_name,gender,birth_place,birth_date,address,status
```

Catatan:
- `nis` dan `nisn` harus bertipe text.
- `gender` isi `L` atau `P`.
- `status` isi `active`, `inactive`, atau `graduated`.
- Cocokkan `class_name` ke tabel `classes`, lalu isi `class_id`.

## Guru

Kolom disarankan:

```csv
full_name,nip,nuptk,gender,employment_status,teacher_type,phone,status
```

Catatan:
- `nip` dan `nuptk` harus bertipe text.
- Relasi guru-mapel-kelas dimasukkan ke `teacher_classes`.

## Kelas

Kolom:

```csv
name,grade_level,academic_year,description,is_active
```

Contoh kelas: `7A` sampai `9I`.

## Mata Pelajaran

Kolom:

```csv
code,name,kkm,description,is_active
```

## Relasi Guru Kelas Mapel

Kolom:

```csv
teacher_id,class_id,subject_id,academic_year,semester
```

`semester` harus `ganjil` atau `genap`.

## Cara Import

1. Buka Supabase Table Editor.
2. Pilih tabel tujuan.
3. Klik Import Data from CSV.
4. Pastikan tipe kolom text tidak berubah menjadi numeric.
5. Import bertahap: `classes`, `subjects`, `teachers`, `students`, lalu `teacher_classes`.

# 06 — Auth and Roles SINDEN

Dokumen ini menjelaskan aturan login, role, dan hak akses aplikasi SINDEN.

---

## 1. Role Aplikasi

Role yang digunakan:

1. `admin`
2. `teacher`
3. `student`

Role yang tidak digunakan:

- `wali_kelas`
- `parent`

---

## 2. Alur Login

Alur login umum:

```txt
User membuka /login
→ user mengisi username/password
→ sistem mengecek akun di database
→ sistem membaca role user
→ user diarahkan ke dashboard sesuai role
```

Redirect:

| Role | Redirect |
|---|---|
| admin | `/admin/dashboard` |
| teacher | `/guru/dashboard` |
| student | `/siswa/dashboard` |

---

## 3. Pilihan Sistem Auth

Ada dua opsi:

## 3.1 Supabase Auth

Opsi lebih aman.

Karakteristik:

- menggunakan email/password;
- session dikelola Supabase;
- cocok untuk production;
- butuh setup akun user lebih rapi.

## 3.2 Auth Sederhana

Opsi lebih cepat untuk versi sederhana.

Karakteristik:

- login menggunakan tabel `profiles`;
- username/password dicek manual;
- lebih cepat dibuat;
- tidak seaman Supabase Auth penuh;
- cocok jika deadline pendek dan sistem sederhana.

Rekomendasi awal:

- Gunakan Supabase Auth jika waktu cukup.
- Gunakan auth sederhana jika target utama adalah sistem running well dulu.

---

## 4. Aturan Akses Admin

Admin boleh mengakses:

```txt
/admin/dashboard
/admin/siswa
/admin/guru
/admin/kelas
/admin/mapel
/admin/nilai
/admin/tugas
/admin/rekap
/admin/pengaturan
```

Admin boleh melakukan:

- melihat dashboard;
- tambah/edit/hapus siswa;
- tambah/edit/hapus guru;
- tambah/edit/hapus kelas;
- tambah/edit/hapus mapel;
- melihat data nilai;
- melihat data tugas;
- melihat rekap;
- mengubah pengaturan.

Admin tidak perlu menginput nilai utama karena nilai diinput guru.

---

## 5. Aturan Akses Guru

Guru boleh mengakses:

```txt
/guru/dashboard
/guru/kelas
/guru/input-nilai
/guru/tugas
/guru/pengumpulan
/guru/rekap
```

Guru boleh melakukan:

- melihat dashboard guru;
- melihat kelas yang diajar;
- input nilai siswa;
- membuat tugas;
- upload file/link tugas;
- edit/hapus tugas miliknya;
- melihat status pengumpulan tugas;
- melihat rekap nilai kelas/mapel yang diajar.

Guru tidak boleh:

- menghapus data siswa utama;
- menghapus data guru lain;
- melihat data semua guru jika tidak diperlukan;
- mengakses halaman admin;
- melihat halaman siswa lain secara bebas;
- download file pengumpulan siswa jika fitur ini tidak dibuat.

---

## 6. Aturan Akses Siswa

Siswa boleh mengakses:

```txt
/siswa/dashboard
/siswa/nilai
/siswa/tugas
/siswa/upload-tugas
```

Siswa boleh melakukan:

- melihat dashboard sendiri;
- melihat nilai sendiri;
- melihat tugas untuk kelasnya;
- upload/mengumpulkan tugas;
- melihat status tugas;

Siswa tidak boleh:

- melihat nilai siswa lain;
- melihat data guru lengkap;
- mengubah nilai;
- membuat tugas;
- mengakses halaman admin;
- mengakses halaman guru;
- menghapus tugas;
- mengubah data master.

---

## 7. Proteksi Route

Setiap route harus dicek:

1. Apakah user sudah login?
2. Apakah user aktif?
3. Apakah role user sesuai?
4. Jika tidak sesuai, arahkan ke halaman akses ditolak.

Contoh logic:

```txt
Jika belum login → /login
Jika role admin akses /guru → /unauthorized
Jika role guru akses /admin → /unauthorized
Jika role siswa akses /admin → /unauthorized
```

---

## 8. Data yang Boleh Dilihat Setiap Role

| Data | Admin | Guru | Siswa |
|---|---|---|---|
| Data siswa | Semua | Kelas yang diajar | Diri sendiri |
| Data guru | Semua | Diri sendiri/seperlunya | Tidak |
| Data kelas | Semua | Kelas yang diajar | Kelas sendiri |
| Mata pelajaran | Semua | Mapel yang diajar | Mapel siswa |
| Nilai | Semua | Kelas/mapel yang diajar | Nilai sendiri |
| Tugas | Semua | Tugas miliknya | Tugas kelasnya |
| Pengumpulan | Semua | Tugas miliknya | Pengumpulan sendiri |
| Pengaturan | Ya | Tidak | Tidak |

---

## 9. Logout

Logout harus:

1. menghapus session/local state;
2. menghapus data user aktif dari client;
3. mengarahkan ke `/login`;
4. mencegah akses kembali ke dashboard tanpa login.

---

## 10. Penyimpanan Session

Jika menggunakan Supabase Auth:

- gunakan session Supabase.
- simpan role dari tabel `profiles`.

Jika auth sederhana:

- simpan data user di localStorage/sessionStorage.
- jangan menyimpan password.
- simpan minimal:
  - user_id
  - full_name
  - role

Contoh:

```json
{
  "id": "uuid",
  "full_name": "Administrator",
  "role": "admin"
}
```

---

## 11. Akun Demo

Saat development, boleh dibuat akun demo:

| Role | Username | Password |
|---|---|---|
| Admin | admin | admin123 |
| Guru | guru | guru123 |
| Siswa | siswa | siswa123 |

Catatan:

- Akun demo hanya untuk testing.
- Jika sistem sudah diserahkan, password harus diganti.

---

## 12. RLS Supabase

Jika memakai Row Level Security, aturan minimal:

### Admin

- bisa akses semua tabel.

### Guru

- bisa akses data kelas/mapel yang diajar.
- bisa insert/update nilai yang dia input.
- bisa insert/update tugas miliknya.
- bisa melihat pengumpulan tugas untuk tugas miliknya.

### Siswa

- bisa melihat data dirinya.
- bisa melihat nilai dirinya.
- bisa melihat tugas kelasnya.
- bisa insert/update submission miliknya.

---

## 13. Halaman Unauthorized

Tampilan halaman akses ditolak:

Judul:

```txt
Akses Tidak Diizinkan
```

Pesan:

```txt
Anda tidak memiliki izin untuk membuka halaman ini.
```

Tombol:

```txt
Kembali ke Dashboard
```

---

## 14. Catatan Implementasi

Auth harus dibuat sederhana tapi jelas. Jangan sampai user bisa mengganti URL dan masuk ke dashboard role lain.

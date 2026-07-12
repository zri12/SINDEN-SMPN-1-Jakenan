export type Role = "admin" | "guru" | "siswa";

export type Page =
  // Admin
  | "admin-dashboard"
  | "admin-siswa"
  | "admin-guru"
  | "admin-kelas"
  | "admin-mapel"
  | "admin-nilai"
  | "admin-tugas"
  | "admin-rekap"
  | "admin-pengaturan"
  // Guru
  | "guru-dashboard"
  | "guru-kelas"
  | "guru-input-nilai"
  | "guru-tugas"
  | "guru-pengumpulan"
  | "guru-rekap"
  // Siswa
  | "siswa-dashboard"
  | "siswa-nilai"
  | "siswa-tugas"
  | "siswa-upload"
  | "siswa-informasi";

export const siswaDummy = [
  { id: 1, nis: "2021001", nisn: "0051234001", nama: "Ahmad Fauzan", kelas: "7A", jk: "L", status: "Aktif" },
  { id: 2, nis: "2021002", nisn: "0051234002", nama: "Siti Aisyah", kelas: "7A", jk: "P", status: "Aktif" },
  { id: 3, nis: "2021003", nisn: "0051234003", nama: "Budi Pratama", kelas: "7B", jk: "L", status: "Aktif" },
  { id: 4, nis: "2021004", nisn: "0051234004", nama: "Dewi Lestari", kelas: "8A", jk: "P", status: "Aktif" },
  { id: 5, nis: "2021005", nisn: "0051234005", nama: "Raka Maulana", kelas: "8A", jk: "L", status: "Aktif" },
  { id: 6, nis: "2021006", nisn: "0051234006", nama: "Fitri Handayani", kelas: "8B", jk: "P", status: "Aktif" },
  { id: 7, nis: "2021007", nisn: "0051234007", nama: "Eko Prasetyo", kelas: "9A", jk: "L", status: "Aktif" },
  { id: 8, nis: "2021008", nisn: "0051234008", nama: "Nur Hidayah", kelas: "9B", jk: "P", status: "Aktif" },
  { id: 9, nis: "2021009", nisn: "0051234009", nama: "Dimas Ariyanto", kelas: "9C", jk: "L", status: "Nonaktif" },
  { id: 10, nis: "2021010", nisn: "0051234010", nama: "Indah Permata", kelas: "7C", jk: "P", status: "Aktif" },
];

export const guruDummy = [
  { id: 1, nama: "Bapak Fauzan", nip: "198501012010011001", mapel: "Matematika", kelas: "7A, 7B, 8A", status: "Aktif" },
  { id: 2, nama: "Ibu Siti Aminah", nip: "197803152005012002", mapel: "Bahasa Indonesia", kelas: "7A, 7C, 8B", status: "Aktif" },
  { id: 3, nama: "Bapak Andi Prasetyo", nip: "198209202008011003", mapel: "IPA", kelas: "8A, 8B, 9A", status: "Aktif" },
  { id: 4, nama: "Ibu Rina Marlina", nip: "198411302009012004", mapel: "IPS", kelas: "7B, 9B, 9C", status: "Aktif" },
  { id: 5, nama: "Bapak Dedi Santoso", nip: "197602082003011005", mapel: "Bahasa Inggris", kelas: "7A, 8A, 9A", status: "Aktif" },
  { id: 6, nama: "Ibu Wulandari", nip: "198907112014012006", mapel: "PPKn", kelas: "7B, 8B, 9B", status: "Aktif" },
  { id: 7, nama: "Bapak Hendra Kurniawan", nip: "198303252011011007", mapel: "PJOK", kelas: "8C, 9C", status: "Aktif" },
];

export const kelasDummy = [
  { id: 1, nama: "7A", jumlahSiswa: 32, wali: "Ibu Siti Aminah" },
  { id: 2, nama: "7B", jumlahSiswa: 31, wali: "Ibu Rina Marlina" },
  { id: 3, nama: "7C", jumlahSiswa: 30, wali: "Bapak Dedi Santoso" },
  { id: 4, nama: "8A", jumlahSiswa: 33, wali: "Bapak Andi Prasetyo" },
  { id: 5, nama: "8B", jumlahSiswa: 31, wali: "Ibu Wulandari" },
  { id: 6, nama: "8C", jumlahSiswa: 30, wali: "Bapak Hendra Kurniawan" },
  { id: 7, nama: "9A", jumlahSiswa: 32, wali: "Bapak Fauzan" },
  { id: 8, nama: "9B", jumlahSiswa: 31, wali: "Ibu Rina Marlina" },
  { id: 9, nama: "9C", jumlahSiswa: 28, wali: "Bapak Andi Prasetyo" },
];

export const mapelDummy = [
  { id: 1, kode: "MTK", nama: "Matematika", kkm: 75, status: "Aktif" },
  { id: 2, kode: "BIN", nama: "Bahasa Indonesia", kkm: 75, status: "Aktif" },
  { id: 3, kode: "IPA", nama: "IPA", kkm: 75, status: "Aktif" },
  { id: 4, kode: "IPS", nama: "IPS", kkm: 70, status: "Aktif" },
  { id: 5, kode: "BIG", nama: "Bahasa Inggris", kkm: 70, status: "Aktif" },
  { id: 6, kode: "PKN", nama: "PPKn", kkm: 70, status: "Aktif" },
  { id: 7, kode: "PAI", nama: "Pendidikan Agama", kkm: 75, status: "Aktif" },
  { id: 8, kode: "SBD", nama: "Seni Budaya", kkm: 70, status: "Aktif" },
  { id: 9, kode: "PJK", nama: "PJOK", kkm: 70, status: "Aktif" },
  { id: 10, kode: "INF", nama: "Informatika", kkm: 70, status: "Aktif" },
];

export const nilaiDummy = [
  { id: 1, nama: "Ahmad Fauzan", kelas: "7A", mapel: "Matematika", tugas: 85, ulangan: 78, pts: 80, pas: 82, nilaiAkhir: 81, kkm: 75, status: "Tuntas" },
  { id: 2, nama: "Siti Aisyah", kelas: "7A", mapel: "Matematika", tugas: 90, ulangan: 88, pts: 85, pas: 92, nilaiAkhir: 89, kkm: 75, status: "Tuntas" },
  { id: 3, nama: "Budi Pratama", kelas: "7B", mapel: "Bahasa Indonesia", tugas: 70, ulangan: 65, pts: 68, pas: 70, nilaiAkhir: 68, kkm: 75, status: "Belum Tuntas" },
  { id: 4, nama: "Dewi Lestari", kelas: "8A", mapel: "IPA", tugas: 92, ulangan: 88, pts: 90, pas: 94, nilaiAkhir: 91, kkm: 75, status: "Tuntas" },
  { id: 5, nama: "Raka Maulana", kelas: "8A", mapel: "IPS", tugas: 75, ulangan: 72, pts: 70, pas: 78, nilaiAkhir: 74, kkm: 70, status: "Tuntas" },
  { id: 6, nama: "Fitri Handayani", kelas: "8B", mapel: "IPA", tugas: 60, ulangan: 58, pts: 62, pas: 65, nilaiAkhir: 61, kkm: 75, status: "Belum Tuntas" },
  { id: 7, nama: "Eko Prasetyo", kelas: "9A", mapel: "Matematika", tugas: 88, ulangan: 85, pts: 82, pas: 86, nilaiAkhir: 85, kkm: 75, status: "Tuntas" },
];

export const tugasDummy = [
  { id: 1, judul: "Tugas Matematika Bab Pecahan", guru: "Bapak Fauzan", mapel: "Matematika", kelas: "7A", deadline: "2026-07-15", status: "Aktif", terkumpul: 28 },
  { id: 2, judul: "Tugas IPA Sistem Pencernaan", guru: "Bapak Andi Prasetyo", mapel: "IPA", kelas: "8A", deadline: "2026-07-10", status: "Selesai", terkumpul: 33 },
  { id: 3, judul: "Tugas Bahasa Indonesia Teks Deskripsi", guru: "Ibu Siti Aminah", mapel: "Bahasa Indonesia", kelas: "7A", deadline: "2026-07-12", status: "Aktif", terkumpul: 20 },
  { id: 4, judul: "Tugas IPS Interaksi Sosial", guru: "Ibu Rina Marlina", mapel: "IPS", kelas: "9B", deadline: "2026-07-08", status: "Terlambat", terkumpul: 25 },
  { id: 5, judul: "Tugas Bahasa Inggris Reading", guru: "Bapak Dedi Santoso", mapel: "Bahasa Inggris", kelas: "8A", deadline: "2026-07-20", status: "Aktif", terkumpul: 10 },
  { id: 6, judul: "Tugas PPKn Nilai Pancasila", guru: "Ibu Wulandari", mapel: "PPKn", kelas: "9B", deadline: "2026-07-18", status: "Aktif", terkumpul: 15 },
];

export const pengumpulanDummy = [
  { id: 1, nama: "Ahmad Fauzan", kelas: "7A", judul: "Tugas Matematika Bab Pecahan", status: "Sudah Mengumpulkan", tanggal: "2026-07-13", catatan: "-" },
  { id: 2, nama: "Siti Aisyah", kelas: "7A", judul: "Tugas Matematika Bab Pecahan", status: "Sudah Mengumpulkan", tanggal: "2026-07-14", catatan: "Sesuai petunjuk" },
  { id: 3, nama: "Budi Pratama", kelas: "7B", judul: "Tugas Matematika Bab Pecahan", status: "Belum Mengumpulkan", tanggal: "-", catatan: "-" },
  { id: 4, nama: "Dewi Lestari", kelas: "8A", judul: "Tugas IPA Sistem Pencernaan", status: "Sudah Mengumpulkan", tanggal: "2026-07-09", catatan: "-" },
  { id: 5, nama: "Raka Maulana", kelas: "8A", judul: "Tugas IPA Sistem Pencernaan", status: "Terlambat", tanggal: "2026-07-11", catatan: "Terlambat 1 hari" },
  { id: 6, nama: "Fitri Handayani", kelas: "8B", judul: "Tugas Bahasa Indonesia Teks Deskripsi", status: "Belum Mengumpulkan", tanggal: "-", catatan: "-" },
];

export const aktivitasDummy = [
  { id: 1, tipe: "tugas", keterangan: "Bapak Fauzan menambahkan tugas baru: Matematika Bab Pecahan", waktu: "2 jam lalu" },
  { id: 2, tipe: "nilai", keterangan: "Nilai siswa kelas 8A mapel IPA diperbarui oleh Bapak Andi Prasetyo", waktu: "3 jam lalu" },
  { id: 3, tipe: "pengumpulan", keterangan: "Siti Aisyah mengumpulkan tugas Matematika Bab Pecahan", waktu: "4 jam lalu" },
  { id: 4, tipe: "siswa", keterangan: "Data siswa baru ditambahkan: Indah Permata ke kelas 7C", waktu: "1 hari lalu" },
  { id: 5, tipe: "nilai", keterangan: "Rekap nilai semester 1 kelas 9A selesai diinput", waktu: "1 hari lalu" },
];

export const informasiDummy = [
  { id: 1, judul: "Tugas Baru: Matematika Bab Pecahan", kategori: "Tugas", tanggal: "11 Jul 2026", isi: "Bapak Fauzan telah memberikan tugas baru untuk kelas 7A. Deadline: 15 Juli 2026.", status: "Baru" },
  { id: 2, judul: "Pengumuman Ujian Tengah Semester", kategori: "Sekolah", tanggal: "10 Jul 2026", isi: "PTS Semester 1 akan dilaksanakan pada tanggal 20-25 Juli 2026.", status: "Penting" },
  { id: 3, judul: "Nilai IPA Sudah Diinput", kategori: "Nilai", tanggal: "09 Jul 2026", isi: "Nilai ulangan harian IPA kelas 8A sudah diinput oleh Bapak Andi Prasetyo.", status: "Info" },
  { id: 4, judul: "Deadline Tugas IPS: 3 Hari Lagi", kategori: "Tugas", tanggal: "08 Jul 2026", isi: "Segera kumpulkan tugas IPS Interaksi Sosial sebelum 11 Juli 2026.", status: "Peringatan" },
  { id: 5, judul: "Libur Nasional", kategori: "Sekolah", tanggal: "07 Jul 2026", isi: "Sekolah libur pada tanggal 17 Agustus 2026 dalam rangka HUT RI ke-81.", status: "Info" },
];

export const grafikNilaiDummy = [
  { kelas: "7A", rataRata: 82 },
  { kelas: "7B", rataRata: 76 },
  { kelas: "7C", rataRata: 79 },
  { kelas: "8A", rataRata: 85 },
  { kelas: "8B", rataRata: 74 },
  { kelas: "8C", rataRata: 78 },
  { kelas: "9A", rataRata: 84 },
  { kelas: "9B", rataRata: 81 },
  { kelas: "9C", rataRata: 77 },
];

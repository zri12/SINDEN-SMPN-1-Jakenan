import type { Announcement } from "@/types/submission";

export const dummyAnnouncements: Announcement[] = [
  { id: "announcement-1", title: "Tugas Baru: Matematika Bab Pecahan", category: "Tugas", createdAt: "2026-07-11", content: "Bapak Fauzan telah memberikan tugas baru untuk kelas 7A. Deadline: 15 Juli 2026.", status: "Baru", targetRole: "student" },
  { id: "announcement-2", title: "Pengumuman Ujian Tengah Semester", category: "Sekolah", createdAt: "2026-07-10", content: "PTS Semester 1 akan dilaksanakan pada tanggal 20-25 Juli 2026.", status: "Penting", targetRole: "all" },
  { id: "announcement-3", title: "Nilai IPA Sudah Diinput", category: "Nilai", createdAt: "2026-07-09", content: "Nilai ulangan harian IPA kelas 8A sudah diinput.", status: "Info", targetRole: "student" },
  { id: "announcement-4", title: "Deadline Tugas IPS", category: "Tugas", createdAt: "2026-07-08", content: "Segera kumpulkan tugas IPS Interaksi Sosial sebelum batas waktu.", status: "Peringatan", targetRole: "student" }
];

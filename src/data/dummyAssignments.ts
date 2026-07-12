import type { Assignment } from "@/types/assignment";

export const dummyAssignments: Assignment[] = [
  { id: "assignment-1", teacherId: "teacher-1", teacherName: "Bapak Fauzan", subjectId: "subject-mtk", subjectName: "Matematika", classId: "class-7a", className: "7A", title: "Tugas Matematika Bab Pecahan", description: "Kerjakan latihan pecahan halaman 24-25.", deadline: "2026-07-15", status: "active", submittedCount: 28, linkUrl: "https://example.com/matematika" },
  { id: "assignment-2", teacherId: "teacher-3", teacherName: "Bapak Andi Prasetyo", subjectId: "subject-ipa", subjectName: "IPA", classId: "class-8a", className: "8A", title: "Tugas IPA Sistem Pencernaan", description: "Buat rangkuman sistem pencernaan manusia.", deadline: "2026-07-10", status: "closed", submittedCount: 33 },
  { id: "assignment-3", teacherId: "teacher-2", teacherName: "Ibu Siti Aminah", subjectId: "subject-bin", subjectName: "Bahasa Indonesia", classId: "class-7a", className: "7A", title: "Teks Deskripsi", description: "Tulis teks deskripsi tentang lingkungan sekolah.", deadline: "2026-07-12", status: "active", submittedCount: 20 },
  { id: "assignment-4", teacherId: "teacher-4", teacherName: "Ibu Rina Marlina", subjectId: "subject-ips", subjectName: "IPS", classId: "class-9b", className: "9B", title: "Interaksi Sosial", description: "Amati bentuk interaksi sosial di sekitar rumah.", deadline: "2026-07-08", status: "late", submittedCount: 25 },
  { id: "assignment-5", teacherId: "teacher-5", teacherName: "Bapak Dedi Santoso", subjectId: "subject-big", subjectName: "Bahasa Inggris", classId: "class-8a", className: "8A", title: "Reading Practice", description: "Jawab pertanyaan reading comprehension.", deadline: "2026-07-20", status: "active", submittedCount: 10 }
];

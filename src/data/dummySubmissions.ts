import type { Submission } from "@/types/submission";

export const dummySubmissions: Submission[] = [
  { id: "submission-1", assignmentId: "assignment-1", assignmentTitle: "Tugas Matematika Bab Pecahan", studentId: "student-1", studentName: "Ahmad Fauzan", className: "7A", status: "submitted", submittedAt: "2026-07-13", note: "-", fileUrl: "jawaban-ahmad-pecahan.pdf" },
  { id: "submission-2", assignmentId: "assignment-1", assignmentTitle: "Tugas Matematika Bab Pecahan", studentId: "student-2", studentName: "Siti Aisyah", className: "7A", status: "submitted", submittedAt: "2026-07-14", note: "Sesuai petunjuk", fileUrl: "https://drive.google.com/contoh-jawaban-siti" },
  { id: "submission-3", assignmentId: "assignment-1", assignmentTitle: "Tugas Matematika Bab Pecahan", studentId: "student-3", studentName: "Budi Pratama", className: "7B", status: "not_submitted", note: "-" },
  { id: "submission-4", assignmentId: "assignment-2", assignmentTitle: "Tugas IPA Sistem Pencernaan", studentId: "student-4", studentName: "Dewi Lestari", className: "8A", status: "submitted", submittedAt: "2026-07-09", note: "-", fileUrl: "foto-rangkuman-dewi.png" },
  { id: "submission-5", assignmentId: "assignment-2", assignmentTitle: "Tugas IPA Sistem Pencernaan", studentId: "student-5", studentName: "Raka Maulana", className: "8A", status: "late", submittedAt: "2026-07-11", note: "Terlambat 1 hari", fileUrl: "jawaban-raka.docx" }
];

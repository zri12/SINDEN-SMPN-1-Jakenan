import type { Grade } from "@/types/grade";

export const dummyGrades: Grade[] = [
  { id: "grade-1", studentId: "student-1", studentName: "Ahmad Fauzan", teacherId: "teacher-1", teacherName: "Bapak Fauzan", classId: "class-7a", className: "7A", subjectId: "subject-mtk", subjectName: "Matematika", semester: "Semester 1", gradeType: "tugas", score: 85, kkm: 75 },
  { id: "grade-2", studentId: "student-2", studentName: "Siti Aisyah", teacherId: "teacher-1", teacherName: "Bapak Fauzan", classId: "class-7a", className: "7A", subjectId: "subject-mtk", subjectName: "Matematika", semester: "Semester 1", gradeType: "ulangan_harian", score: 89, kkm: 75 },
  { id: "grade-3", studentId: "student-3", studentName: "Budi Pratama", teacherId: "teacher-2", teacherName: "Ibu Siti Aminah", classId: "class-7b", className: "7B", subjectId: "subject-bin", subjectName: "Bahasa Indonesia", semester: "Semester 1", gradeType: "pts", score: 68, kkm: 75 },
  { id: "grade-4", studentId: "student-4", studentName: "Dewi Lestari", teacherId: "teacher-3", teacherName: "Bapak Andi Prasetyo", classId: "class-8a", className: "8A", subjectId: "subject-ipa", subjectName: "IPA", semester: "Semester 1", gradeType: "pas", score: 91, kkm: 75 },
  { id: "grade-5", studentId: "student-5", studentName: "Raka Maulana", teacherId: "teacher-4", teacherName: "Ibu Rina Marlina", classId: "class-8a", className: "8A", subjectId: "subject-ips", subjectName: "IPS", semester: "Semester 1", gradeType: "praktik", score: 74, kkm: 70 },
  { id: "grade-6", studentId: "student-6", studentName: "Fitri Handayani", teacherId: "teacher-3", teacherName: "Bapak Andi Prasetyo", classId: "class-8b", className: "8B", subjectId: "subject-ipa", subjectName: "IPA", semester: "Semester 1", gradeType: "remedial", score: 61, kkm: 75 }
];

export type GradeType =
  | "tugas"
  | "ulangan_harian"
  | "pts"
  | "pas"
  | "praktik"
  | "remedial"
  | "assignment"
  | "daily_test"
  | "midterm"
  | "final"
  | "practice";

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  assignmentId?: string;
  submissionId?: string;
  semester: string;
  gradeType: GradeType;
  score: number;
  kkm: number;
  note?: string;
}

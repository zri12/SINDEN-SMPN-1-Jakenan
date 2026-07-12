export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  teacherId?: string;
  classId?: string;
  subjectId?: string;
  subjectName?: string;
  kkm?: number;
  studentId: string;
  studentName: string;
  className: string;
  fileUrl?: string;
  filePath?: string;
  linkUrl?: string;
  note?: string;
  status: "submitted" | "not_submitted" | "late";
  submittedAt?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "Tugas" | "Nilai" | "Sekolah" | "Info";
  targetRole: "admin" | "teacher" | "student" | "all";
  status: "Baru" | "Penting" | "Info" | "Peringatan";
  createdAt: string;
}

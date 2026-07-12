export interface Assignment {
  id: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  fileUrl?: string;
  linkUrl?: string;
  deadline: string;
  status: "active" | "closed" | "late";
  submittedCount: number;
}

export interface TeachingRelation {
  id?: string;
  teacherId: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  academicYear: string;
  semester: "ganjil" | "genap";
  studentCount: number;
}

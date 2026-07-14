import type { TeachingRelation } from "./teachingRelation";

export interface Teacher {
  id: string;
  profileId?: string;
  nip?: string;
  nuptk?: string;
  fullName: string;
  gender?: "L" | "P";
  employmentStatus?: string;
  teacherType?: string;
  phone?: string;
  email?: string;
  subjectName: string;
  classNames: string[];
  teachingRelations?: TeachingRelation[];
  username: string;
  status: "active" | "inactive";
}

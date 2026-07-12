export interface Student {
  id: string;
  profileId?: string;
  nis: string;
  nisn: string;
  fullName: string;
  classId: string;
  className: string;
  gender: "L" | "P";
  username: string;
  status: "active" | "inactive";
}

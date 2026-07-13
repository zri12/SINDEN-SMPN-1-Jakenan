export interface Student {
  id: string;
  profileId?: string;
  nis: string;
  nisn: string;
  fullName: string;
  classId: string;
  className: string;
  gender: "L" | "P";
  birthPlace?: string;
  birthDate?: string;
  address?: string;
  username: string;
  email?: string;
  status: "active" | "inactive" | "graduated";
}

import type { Role } from "@/types/auth";

export const ADMIN: Role = "admin";
export const TEACHER: Role = "teacher";
export const STUDENT: Role = "student";

export const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  teacher: "Guru",
  student: "Siswa"
};

export const roleAvatars: Record<Role, string> = {
  admin: "AD",
  teacher: "GR",
  student: "SW"
};

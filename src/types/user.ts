import type { Role } from "./auth";

export interface UserProfile {
  id: string;
  authId?: string;
  fullName: string;
  username: string;
  email?: string;
  role: Role;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppSettings {
  id: string;
  schoolName: string;
  appName: string;
  appSubtitle: string;
  academicYear: string;
  semester: string;
  defaultKkm: number;
  logoUrl?: string;
}

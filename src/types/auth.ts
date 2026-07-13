export type Role = "admin" | "teacher" | "student";

export interface AuthUser {
  id: string;
  fullName: string;
  username?: string;
  email?: string;
  role: Role;
  isActive: boolean;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

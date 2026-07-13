import {
  BarChart3,
  BookMarked,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  FileText,
  LayoutDashboard,
  UserCircle,
  School,
  Settings,
  UserCheck,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/types/auth";
import { ROUTES } from "./routes";

export interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const adminMenus: MenuItem[] = [
  { label: "Dashboard", path: ROUTES.admin.dashboard, icon: LayoutDashboard },
  { label: "Data Siswa", path: ROUTES.admin.students, icon: Users },
  { label: "Data Guru", path: ROUTES.admin.teachers, icon: UserCheck },
  { label: "Data Kelas", path: ROUTES.admin.classes, icon: School },
  { label: "Mata Pelajaran", path: ROUTES.admin.subjects, icon: BookOpen },
  { label: "Data Nilai", path: ROUTES.admin.grades, icon: ClipboardList },
  { label: "Data Tugas", path: ROUTES.admin.assignments, icon: FileText },
  { label: "Rekap Nilai", path: ROUTES.admin.recap, icon: BarChart3 },
  { label: "Pengaturan", path: ROUTES.admin.settings, icon: Settings },
  { label: "Profile", path: ROUTES.admin.profile, icon: UserCircle }
];

export const teacherMenus: MenuItem[] = [
  { label: "Dashboard", path: ROUTES.teacher.dashboard, icon: LayoutDashboard },
  { label: "Kelas Saya", path: ROUTES.teacher.classes, icon: School },
  { label: "Tugas", path: ROUTES.teacher.assignments, icon: FileText },
  { label: "Pengumpulan Tugas", path: ROUTES.teacher.submissions, icon: ClipboardCheck },
  { label: "Rekap Nilai", path: ROUTES.teacher.recap, icon: BarChart3 },
  { label: "Profile", path: ROUTES.teacher.profile, icon: UserCircle }
];

export const studentMenus: MenuItem[] = [
  { label: "Dashboard", path: ROUTES.student.dashboard, icon: LayoutDashboard },
  { label: "Nilai Saya", path: ROUTES.student.grades, icon: ClipboardList },
  { label: "Tugas Saya", path: ROUTES.student.assignments, icon: BookMarked },
  { label: "Profile", path: ROUTES.student.profile, icon: UserCircle }
];

export const menusByRole: Record<Role, MenuItem[]> = {
  admin: adminMenus,
  teacher: teacherMenus,
  student: studentMenus
};

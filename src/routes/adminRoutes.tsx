import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { AdminDashboard } from "@/features/admin/pages/AdminDashboard";
import { GradeRecap } from "@/features/admin/pages/GradeRecap";
import { ManageAssignments } from "@/features/admin/pages/ManageAssignments";
import { ManageClasses } from "@/features/admin/pages/ManageClasses";
import { ManageGrades } from "@/features/admin/pages/ManageGrades";
import { ManageStudents } from "@/features/admin/pages/ManageStudents";
import { ManageSubjects } from "@/features/admin/pages/ManageSubjects";
import { ManageTeachers } from "@/features/admin/pages/ManageTeachers";
import { AdminProfile } from "@/features/admin/pages/AdminProfile";
import { Settings } from "@/features/admin/pages/Settings";

export const adminRoutes: RouteObject[] = [
  { path: ROUTES.admin.dashboard, element: <AdminDashboard /> },
  { path: ROUTES.admin.students, element: <ManageStudents /> },
  { path: ROUTES.admin.teachers, element: <ManageTeachers /> },
  { path: ROUTES.admin.classes, element: <ManageClasses /> },
  { path: ROUTES.admin.subjects, element: <ManageSubjects /> },
  { path: ROUTES.admin.grades, element: <ManageGrades /> },
  { path: ROUTES.admin.assignments, element: <ManageAssignments /> },
  { path: ROUTES.admin.recap, element: <GradeRecap /> },
  { path: ROUTES.admin.settings, element: <Settings /> },
  { path: ROUTES.admin.profile, element: <AdminProfile /> }
];

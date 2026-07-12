import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { MyAssignments } from "@/features/student/pages/MyAssignments";
import { MyGrades } from "@/features/student/pages/MyGrades";
import { StudentDashboard } from "@/features/student/pages/StudentDashboard";
import { StudentInformation } from "@/features/student/pages/StudentInformation";
import { StudentProfile } from "@/features/student/pages/StudentProfile";

export const studentRoutes: RouteObject[] = [
  { path: ROUTES.student.dashboard, element: <StudentDashboard /> },
  { path: ROUTES.student.grades, element: <MyGrades /> },
  { path: ROUTES.student.assignments, element: <MyAssignments /> },
  { path: ROUTES.student.information, element: <StudentInformation /> },
  { path: ROUTES.student.profile, element: <StudentProfile /> }
];

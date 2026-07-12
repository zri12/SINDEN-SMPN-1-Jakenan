import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { AssignmentSubmissions } from "@/features/teacher/pages/AssignmentSubmissions";
import { MyClasses } from "@/features/teacher/pages/MyClasses";
import { TeacherAssignments } from "@/features/teacher/pages/TeacherAssignments";
import { TeacherDashboard } from "@/features/teacher/pages/TeacherDashboard";
import { TeacherGradeRecap } from "@/features/teacher/pages/TeacherGradeRecap";
import { TeacherProfile } from "@/features/teacher/pages/TeacherProfile";

export const teacherRoutes: RouteObject[] = [
  { path: ROUTES.teacher.dashboard, element: <TeacherDashboard /> },
  { path: ROUTES.teacher.classes, element: <MyClasses /> },
  { path: ROUTES.teacher.assignments, element: <TeacherAssignments /> },
  { path: ROUTES.teacher.submissions, element: <AssignmentSubmissions /> },
  { path: ROUTES.teacher.recap, element: <TeacherGradeRecap /> },
  { path: ROUTES.teacher.profile, element: <TeacherProfile /> }
];

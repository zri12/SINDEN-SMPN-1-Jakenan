import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/constants/routes";
import { getCurrentUser } from "./authService";
import type { Role } from "@/types/auth";

const dashboardByRole: Record<Role, string> = {
  admin: ROUTES.admin.dashboard,
  teacher: ROUTES.teacher.dashboard,
  student: ROUTES.student.dashboard
};

export function ProtectedRoute({ allowedRoles }: { allowedRoles: Role[] }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={dashboardByRole[user.role]} replace />;
  }

  return <DashboardLayout user={user} />;
}

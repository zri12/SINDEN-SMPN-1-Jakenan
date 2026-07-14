import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "@/components/common/Loading";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/constants/routes";
import { getCurrentProfile, getCurrentUser } from "./authService";
import type { AuthUser, Role } from "@/types/auth";

const dashboardByRole: Record<Role, string> = {
  admin: ROUTES.admin.dashboard,
  teacher: ROUTES.teacher.dashboard,
  student: ROUTES.student.dashboard
};

export function ProtectedRoute({ allowedRoles }: { allowedRoles: Role[] }) {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCurrentProfile()
      .then((profile) => {
        if (active) setUser(profile);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100"><Loading /></div>;
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={dashboardByRole[user.role]} replace />;
  }

  return <DashboardLayout user={user} />;
}

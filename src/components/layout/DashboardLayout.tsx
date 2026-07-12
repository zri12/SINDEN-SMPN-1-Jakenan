import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { menusByRole } from "@/constants/menus";
import { ROUTES } from "@/constants/routes";
import type { AuthUser } from "@/types/auth";
import { logout } from "@/features/auth/authService";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileSidebar } from "./MobileSidebar";

export function DashboardLayout({ user }: { user: AuthUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const title = useMemo(() => {
    const item = menusByRole[user.role].find((menu) => menu.path === location.pathname);
    return item?.label ?? "SINDEN";
  }, [location.pathname, user.role]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <div className="flex h-dvh min-h-dvh overflow-hidden bg-slate-100">
      <div className="hidden lg:block">
        <Sidebar role={user.role} onLogout={handleLogout} />
      </div>
      <MobileSidebar role={user.role} open={mobileOpen} onClose={() => setMobileOpen(false)} onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} role={user.role} onOpenSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

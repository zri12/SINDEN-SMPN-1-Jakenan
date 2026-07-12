import { ChevronRight, GraduationCap, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { menusByRole } from "@/constants/menus";
import { roleAvatars, roleLabels } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { useAssignments } from "@/hooks/useAssignments";
import { useSubmissions } from "@/hooks/useSubmissions";
import type { AuthUser, Role } from "@/types/auth";

interface SidebarProps {
  role: Role;
  user: AuthUser;
  onLogout: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ role, user, onLogout, onNavigate }: SidebarProps) {
  const menus = menusByRole[role];
  const { settings } = useAppSettings();
  const { assignments } = useAssignments();
  const { submissions } = useSubmissions();
  const displayName = user.username || user.email?.split("@")[0] || user.fullName;
  const pendingAssignmentCount =
    role === "student"
      ? assignments.filter((assignment) => isPublished(assignment.publishAt) && !submissions.some((submission) => submission.assignmentId === assignment.id)).length
      : 0;

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-sinden-sidebar text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo sekolah" className="h-7 w-7 object-contain" /> : <GraduationCap className="h-6 w-6" />}
          </div>
          <div>
            <p className="font-bold leading-tight">{settings.appName}</p>
            <p className="text-xs text-white/55">{settings.schoolName}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold">
            {roleAvatars[role]}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-xs text-white/50">{roleLabels[role]}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/35">Menu Utama</p>
        <div className="space-y-1">
          {menus.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive ? "bg-blue-600 font-semibold text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.path === ROUTES.student.assignments && pendingAssignmentCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold leading-none text-white">
                        {pendingAssignmentCount > 99 ? "99+" : pendingAssignmentCount}
                      </span>
                    )}
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => {
            onNavigate?.();
            onLogout();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-red-500/15 hover:text-red-100"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}

function isPublished(publishAt?: string) {
  if (!publishAt) return true;
  return new Date(publishAt).getTime() <= Date.now();
}

import { Bell, Menu } from "lucide-react";
import { roleAvatars } from "@/constants/roles";
import type { Role } from "@/types/auth";

interface TopbarProps {
  title: string;
  role: Role;
  onOpenSidebar: () => void;
}

export function Topbar({ title, role, onOpenSidebar }: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button onClick={onOpenSidebar} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Buka menu">
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="truncate text-base font-bold text-sinden-sidebar sm:text-lg">{title}</h2>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Informasi">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sinden-sidebar text-xs font-bold text-white">
          {roleAvatars[role]}
        </div>
      </div>
    </header>
  );
}

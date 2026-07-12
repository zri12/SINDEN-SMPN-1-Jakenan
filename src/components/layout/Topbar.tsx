import { Bell, CheckCheck, Info, Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { roleAvatars } from "@/constants/roles";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import type { Role } from "@/types/auth";

interface TopbarProps {
  title: string;
  role: Role;
  onOpenSidebar: () => void;
}

export function Topbar({ title, role, onOpenSidebar }: TopbarProps) {
  const { announcements } = useAnnouncements();
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>(() => getReadNotificationIds());

  const notifications = useMemo(
    () => announcements.filter((item) => item.targetRole === "all" || item.targetRole === role).slice(0, 6),
    [announcements, role]
  );
  const unreadCount = notifications.filter((item) => !readIds.includes(item.id)).length;

  const markAllRead = () => {
    const ids = Array.from(new Set([...readIds, ...notifications.map((item) => item.id)]));
    setReadIds(ids);
    localStorage.setItem("sinden_read_notifications", JSON.stringify(ids));
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button onClick={onOpenSidebar} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Buka menu">
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="truncate text-base font-bold text-sinden-sidebar sm:text-lg">{title}</h2>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notifikasi"
            onClick={() => setOpen((value) => !value)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
          </button>
          {open && (
            <div className="absolute right-0 top-12 z-30 w-[calc(100vw-1.5rem)] max-w-sm overflow-hidden rounded-xl border border-slate-100 bg-white shadow-2xl sm:w-96">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">Notifikasi</p>
                  <p className="text-xs text-slate-500">{unreadCount} belum dibaca</p>
                </div>
                <button onClick={markAllRead} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50">
                  <CheckCheck className="h-3.5 w-3.5" />
                  Tandai
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {notifications.length === 0 ? (
                  <div className="flex items-center gap-2 rounded-lg px-3 py-4 text-sm text-slate-500">
                    <Info className="h-4 w-4" />
                    Belum ada notifikasi.
                  </div>
                ) : (
                  notifications.map((item) => {
                    const unread = !readIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          const ids = Array.from(new Set([...readIds, item.id]));
                          setReadIds(ids);
                          localStorage.setItem("sinden_read_notifications", JSON.stringify(ids));
                        }}
                        className="flex w-full gap-3 rounded-lg px-3 py-3 text-left hover:bg-slate-50"
                      >
                        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-red-500" : "bg-slate-200"}`} />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-slate-900">{item.title}</span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">{item.content}</span>
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sinden-sidebar text-xs font-bold text-white">
          {roleAvatars[role]}
        </div>
      </div>
    </header>
  );
}

function getReadNotificationIds() {
  try {
    const raw = localStorage.getItem("sinden_read_notifications");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    localStorage.removeItem("sinden_read_notifications");
    return [];
  }
}

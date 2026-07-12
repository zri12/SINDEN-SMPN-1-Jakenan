import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import type { Role } from "@/types/auth";

interface MobileSidebarProps {
  role: Role;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileSidebar({ role, open, onClose, onLogout }: MobileSidebarProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex lg:hidden">
      <button className="absolute inset-0 bg-slate-950/50" onClick={onClose} aria-label="Tutup menu" />
      <div className="relative z-10 flex h-full">
        <Sidebar role={role} onLogout={onLogout} onNavigate={onClose} />
        <button onClick={onClose} className="m-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg" aria-label="Tutup menu">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  LayoutDashboard, Users, UserCheck, School, BookOpen, ClipboardList,
  FileText, BarChart3, Settings, LogOut, Menu, X, Bell, ChevronRight,
  GraduationCap, BookMarked, Upload, Info, ClipboardCheck, FileInput
} from "lucide-react";
import type { Role, Page } from "./data";

const SIDEBAR_BG = "#1b3a6b";
const SIDEBAR_ACTIVE = "#2563eb";
const SIDEBAR_HOVER = "rgba(255,255,255,0.08)";

interface NavItem {
  label: string;
  page: Page;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", page: "admin-dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Data Siswa", page: "admin-siswa", icon: <Users size={18} /> },
  { label: "Data Guru", page: "admin-guru", icon: <UserCheck size={18} /> },
  { label: "Data Kelas", page: "admin-kelas", icon: <School size={18} /> },
  { label: "Mata Pelajaran", page: "admin-mapel", icon: <BookOpen size={18} /> },
  { label: "Data Nilai", page: "admin-nilai", icon: <ClipboardList size={18} /> },
  { label: "Data Tugas", page: "admin-tugas", icon: <FileText size={18} /> },
  { label: "Rekap Nilai", page: "admin-rekap", icon: <BarChart3 size={18} /> },
  { label: "Pengaturan", page: "admin-pengaturan", icon: <Settings size={18} /> },
];

const guruNav: NavItem[] = [
  { label: "Dashboard", page: "guru-dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Kelas Saya", page: "guru-kelas", icon: <School size={18} /> },
  { label: "Input Nilai", page: "guru-input-nilai", icon: <FileInput size={18} /> },
  { label: "Tugas", page: "guru-tugas", icon: <FileText size={18} /> },
  { label: "Pengumpulan Tugas", page: "guru-pengumpulan", icon: <ClipboardCheck size={18} /> },
  { label: "Rekap Nilai", page: "guru-rekap", icon: <BarChart3 size={18} /> },
];

const siswaNav: NavItem[] = [
  { label: "Dashboard", page: "siswa-dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Nilai Saya", page: "siswa-nilai", icon: <ClipboardList size={18} /> },
  { label: "Tugas Saya", page: "siswa-tugas", icon: <BookMarked size={18} /> },
  { label: "Upload Tugas", page: "siswa-upload", icon: <Upload size={18} /> },
  { label: "Informasi", page: "siswa-informasi", icon: <Info size={18} /> },
];

const roleLabel: Record<Role, string> = {
  admin: "Administrator",
  guru: "Guru",
  siswa: "Siswa",
};

const roleAvatar: Record<Role, string> = {
  admin: "AD",
  guru: "GR",
  siswa: "SW",
};

interface LayoutProps {
  role: Role;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
  pageTitle: string;
}

export function Layout({ role, currentPage, onNavigate, onLogout, children, pageTitle }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = role === "admin" ? adminNav : role === "guru" ? guruNav : siswaNav;

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ background: SIDEBAR_BG }}>
      {/* Logo area */}
      <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>SINDEN</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.65rem", lineHeight: 1.3 }}>SMP Negeri 1 Jakenan</div>
          </div>
        </div>
      </div>

      {/* Role badge */}
      <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "0.5rem 0.75rem", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>
            {roleAvatar[role]}
          </div>
          <div>
            <div style={{ color: "white", fontSize: "0.8rem", fontWeight: 600 }}>{roleLabel[role]}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>
              {role === "admin" ? "admin@smp1jakenan.sch.id" : role === "guru" ? "Bapak Fauzan" : "Ahmad Fauzan · 7A"}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0.75rem 0.75rem", overflowY: "auto" }}>
        <div style={{ marginBottom: "0.25rem", padding: "0 0.5rem 0.25rem", color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Menu Utama
        </div>
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => { onNavigate(item.page); setSidebarOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.625rem 0.75rem",
                borderRadius: 8,
                border: "none",
                background: isActive ? SIDEBAR_ACTIVE : "transparent",
                color: isActive ? "white" : "rgba(255,255,255,0.75)",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                marginBottom: "0.125rem",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = SIDEBAR_HOVER; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && <ChevronRight size={14} />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            padding: "0.625rem 0.75rem",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.875rem",
            cursor: "pointer",
            textAlign: "left",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#fca5a5"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f0f4f8" }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col" style={{ width: 240, flexShrink: 0, overflowY: "auto" }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ width: 260, position: "relative", zIndex: 1, overflowY: "auto" }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 1.5rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", padding: 4 }}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 style={{ color: "#1b3a6b", fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>{pageTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", padding: 6 }}>
              <Bell size={20} />
              <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: "2px solid white" }} />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1b3a6b", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.75rem", fontWeight: 700 }}>
              {roleAvatar[role]}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// Reusable UI components
export function StatCard({ title, value, icon, color, subtitle }: { title: string; value: string | number; icon: React.ReactNode; color: string; subtitle?: string }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9" }}>
      <div className="flex items-start justify-between">
        <div>
          <p style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: "0.375rem" }}>{title}</p>
          <p style={{ color: "#1e293b", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>{value}</p>
          {subtitle && <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.25rem" }}>{subtitle}</p>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function Badge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "Tuntas": { bg: "#dcfce7", color: "#16a34a" },
    "Belum Tuntas": { bg: "#fee2e2", color: "#dc2626" },
    "Aktif": { bg: "#dbeafe", color: "#2563eb" },
    "Nonaktif": { bg: "#f1f5f9", color: "#64748b" },
    "Selesai": { bg: "#dcfce7", color: "#16a34a" },
    "Terlambat": { bg: "#fee2e2", color: "#dc2626" },
    "Sudah Mengumpulkan": { bg: "#dcfce7", color: "#16a34a" },
    "Belum Mengumpulkan": { bg: "#fee2e2", color: "#dc2626" },
    "Sudah Dikumpulkan": { bg: "#dcfce7", color: "#16a34a" },
    "Belum Dikerjakan": { bg: "#fef9c3", color: "#ca8a04" },
    "Baru": { bg: "#dbeafe", color: "#2563eb" },
    "Penting": { bg: "#fee2e2", color: "#dc2626" },
    "Info": { bg: "#f0fdf4", color: "#16a34a" },
    "Peringatan": { bg: "#fef9c3", color: "#ca8a04" },
  };
  const style = map[status] || { bg: "#f1f5f9", color: "#64748b" };
  return (
    <span style={{ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: 20, background: style.bg, color: style.color, fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

export function SearchBar({ value, onChange, placeholder = "Cari..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "0.5rem 0.875rem",
        borderRadius: 8,
        border: "1.5px solid #e2e8f0",
        background: "#f8fafc",
        fontSize: "0.875rem",
        outline: "none",
        width: 220,
      }}
    />
  );
}

export function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "0.5rem 2rem 0.5rem 0.875rem",
        borderRadius: 8,
        border: "1.5px solid #e2e8f0",
        background: "#f8fafc",
        fontSize: "0.875rem",
        outline: "none",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 8px center",
        backgroundSize: "16px",
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Btn({ children, onClick, variant = "primary", size = "md" }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "danger" | "outline"; size?: "sm" | "md" }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "#2563eb", color: "white", border: "none" },
    secondary: { background: "#f1f5f9", color: "#374151", border: "1px solid #e2e8f0" },
    danger: { background: "#dc2626", color: "white", border: "none" },
    outline: { background: "transparent", color: "#2563eb", border: "1.5px solid #2563eb" },
  };
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "0.35rem 0.75rem", fontSize: "0.8rem" },
    md: { padding: "0.55rem 1.125rem", fontSize: "0.875rem" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 8,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        transition: "opacity 0.15s",
        ...styles[variant],
        ...sizeStyles[size],
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}

export function Card({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ background: "white", borderRadius: 12, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9", ...style }}>
      {children}
    </div>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
                Tidak ada data
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbfc")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "0.875rem 1rem", color: "#374151", whiteSpace: j === row.length - 1 ? "nowrap" : undefined }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "white", borderRadius: 16, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0" }}>
          <h3 style={{ color: "#1e293b", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: "1.5rem" }}>{children}</div>
      </div>
    </div>
  );
}

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.375rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>{label}</label>
      {children}
    </div>
  );
}

export function Input({ placeholder, value, onChange, type = "text" }: { placeholder?: string; value?: string; onChange?: (v: string) => void; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.625rem 0.875rem",
        borderRadius: 8,
        border: "1.5px solid #e2e8f0",
        background: "#f8fafc",
        fontSize: "0.875rem",
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  );
}

export function Alert({ message, type = "success" }: { message: string; type?: "success" | "error" }) {
  return (
    <div style={{
      padding: "0.75rem 1rem",
      borderRadius: 8,
      background: type === "success" ? "#dcfce7" : "#fee2e2",
      color: type === "success" ? "#16a34a" : "#dc2626",
      fontSize: "0.875rem",
      fontWeight: 500,
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}>
      {type === "success" ? "✓" : "✗"} {message}
    </div>
  );
}

export function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginBottom: "1.5rem" }}>
      <h2 style={{ color: "#1e293b", margin: 0 }}>{title}</h2>
      <div className="flex items-center gap-2 flex-wrap">{children}</div>
    </div>
  );
}

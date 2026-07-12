import { BookOpen, CheckCircle, FileText, Upload, AlertTriangle, Bell } from "lucide-react";
import { StatCard, Card, Badge } from "../Layout";
import { tugasDummy, informasiDummy } from "../data";

export function SiswaDashboard() {
  return (
    <div>
      {/* Profile card */}
      <Card style={{ marginBottom: "1.5rem" }}>
        <div className="flex items-center gap-4">
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#1b3a6b", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "1.25rem", flexShrink: 0 }}>
            AF
          </div>
          <div>
            <h3 style={{ color: "#1e293b", margin: 0 }}>Halo, Ahmad Fauzan 👋</h3>
            <div className="flex flex-wrap gap-3" style={{ marginTop: "0.375rem" }}>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Kelas <strong style={{ color: "#2563eb" }}>7A</strong></span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>NIS: <strong>2021001</strong></span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>NISN: <strong>0051234001</strong></span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard title="Rata-rata Nilai" value="81.5" icon={<BookOpen size={22} />} color="#2563eb" subtitle="Semester ini" />
        <StatCard title="Mapel Tuntas" value="8" icon={<CheckCircle size={22} />} color="#16a34a" subtitle="dari 10 mapel" />
        <StatCard title="Tugas Aktif" value="3" icon={<FileText size={22} />} color="#d97706" subtitle="Perlu dikerjakan" />
        <StatCard title="Tugas Dikumpulkan" value="12" icon={<Upload size={22} />} color="#7c3aed" subtitle="Total semester" />
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ marginBottom: "1.5rem" }}>
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontWeight: 600, color: "#92400e", marginBottom: "0.25rem" }}>Ada tugas yang belum dikumpulkan</p>
            <p style={{ color: "#b45309", fontSize: "0.85rem" }}>Tugas Matematika Bab Pecahan — Deadline: 15 Juli 2026</p>
          </div>
        </div>
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <AlertTriangle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontWeight: 600, color: "#991b1b", marginBottom: "0.25rem" }}>Ada nilai di bawah KKM</p>
            <p style={{ color: "#b91c1c", fontSize: "0.85rem" }}>Bahasa Indonesia — Nilai Akhir: 68 (KKM: 75)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tugas terbaru */}
        <Card>
          <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Tugas Terbaru</h3>
          <div className="flex flex-col gap-3">
            {tugasDummy.slice(0, 4).map((t) => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid #f8fafc" }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: "0.875rem", color: "#1e293b", marginBottom: "0.125rem" }}>{t.judul}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{t.mapel} · {t.deadline}</p>
                </div>
                <Badge status={t.id === 1 ? "Belum Dikerjakan" : t.id === 2 ? "Sudah Dikumpulkan" : "Belum Dikerjakan"} />
              </div>
            ))}
          </div>
        </Card>

        {/* Informasi terbaru */}
        <Card>
          <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Informasi & Notifikasi</h3>
          <div className="flex flex-col gap-3">
            {informasiDummy.slice(0, 4).map((info) => (
              <div key={info.id} style={{ display: "flex", gap: "0.75rem", paddingBottom: "0.75rem", borderBottom: "1px solid #f8fafc" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bell size={14} color="#2563eb" />
                </div>
                <div>
                  <p style={{ fontWeight: 500, fontSize: "0.875rem", color: "#1e293b", marginBottom: "0.125rem" }}>{info.judul}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{info.tanggal} · {info.kategori}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Clock, ExternalLink } from "lucide-react";
import { PageHeader, Card, Badge, Btn } from "../Layout";
import { tugasDummy } from "../data";

const tugasSiswa = [
  { ...tugasDummy[0], statusSiswa: "Belum Dikerjakan" },
  { ...tugasDummy[1], statusSiswa: "Sudah Dikumpulkan" },
  { ...tugasDummy[2], statusSiswa: "Belum Dikerjakan" },
  { ...tugasDummy[3], statusSiswa: "Terlambat" },
  { ...tugasDummy[4], statusSiswa: "Sudah Dikumpulkan" },
  { ...tugasDummy[5], statusSiswa: "Belum Dikerjakan" },
];

const statusColor: Record<string, string> = {
  "Belum Dikerjakan": "#fffbeb",
  "Sudah Dikumpulkan": "#f0fdf4",
  "Terlambat": "#fef2f2",
};

const statusBorder: Record<string, string> = {
  "Belum Dikerjakan": "#fde68a",
  "Sudah Dikumpulkan": "#bbf7d0",
  "Terlambat": "#fecaca",
};

export function TugasSaya() {
  return (
    <div>
      <PageHeader title="Tugas Saya" />

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Belum Dikerjakan", count: tugasSiswa.filter((t) => t.statusSiswa === "Belum Dikerjakan").length, color: "#d97706", bg: "#fef9c3" },
          { label: "Sudah Dikumpulkan", count: tugasSiswa.filter((t) => t.statusSiswa === "Sudah Dikumpulkan").length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Terlambat", count: tugasSiswa.filter((t) => t.statusSiswa === "Terlambat").length, color: "#dc2626", bg: "#fee2e2" },
        ].map((s) => (
          <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontWeight: 700, fontSize: "1rem" }}>
                {s.count}
              </div>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Task cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tugasSiswa.map((t) => (
          <div
            key={t.id}
            style={{
              background: statusColor[t.statusSiswa] || "white",
              border: `1px solid ${statusBorder[t.statusSiswa] || "#f1f5f9"}`,
              borderRadius: 12,
              padding: "1.25rem",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-start justify-between gap-3" style={{ marginBottom: "0.75rem" }}>
              <h4 style={{ color: "#1e293b", margin: 0, lineHeight: 1.4 }}>{t.judul}</h4>
              <Badge status={t.statusSiswa} />
            </div>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: "0.875rem" }}>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>📚 {t.mapel}</span>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>👨‍🏫 {t.guru}</span>
              <span style={{ color: "#64748b", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={13} /> {t.deadline}
              </span>
            </div>
            <Btn variant="outline" size="sm"><ExternalLink size={13} /> Lihat Tugas</Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

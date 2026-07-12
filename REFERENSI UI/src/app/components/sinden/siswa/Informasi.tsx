import { PageHeader, Card, Badge } from "../Layout";
import { informasiDummy } from "../data";
import { Bell, BookOpen, School, AlertTriangle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Tugas": <BookOpen size={18} />,
  "Sekolah": <School size={18} />,
  "Nilai": <Bell size={18} />,
};

const bgMap: Record<string, string> = {
  "Tugas": "#eff6ff",
  "Sekolah": "#f0fdf4",
  "Nilai": "#fefce8",
};

const colorMap: Record<string, string> = {
  "Tugas": "#2563eb",
  "Sekolah": "#16a34a",
  "Nilai": "#ca8a04",
};

export function Informasi() {
  return (
    <div>
      <PageHeader title="Informasi" />

      {/* Alert banner */}
      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: 12, marginBottom: "1.5rem" }}>
        <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontWeight: 600, color: "#92400e", marginBottom: "0.25rem" }}>Perhatian</p>
          <p style={{ color: "#b45309", fontSize: "0.875rem" }}>Kamu memiliki 2 tugas yang belum dikumpulkan. Segera kumpulkan sebelum deadline!</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="flex flex-col gap-4">
        {informasiDummy.map((info) => (
          <Card key={info.id}>
            <div className="flex items-start gap-4">
              <div style={{ width: 44, height: 44, borderRadius: 10, background: bgMap[info.kategori] || "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: colorMap[info.kategori] || "#64748b", flexShrink: 0 }}>
                {iconMap[info.kategori] || <Bell size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-start justify-between gap-3" style={{ marginBottom: "0.5rem" }}>
                  <h4 style={{ color: "#1e293b", margin: 0 }}>{info.judul}</h4>
                  <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
                    <Badge status={info.status} />
                    <span style={{ color: "#94a3b8", fontSize: "0.75rem", whiteSpace: "nowrap" }}>{info.tanggal}</span>
                  </div>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{info.isi}</p>
                <span style={{ display: "inline-block", background: bgMap[info.kategori] || "#f1f5f9", color: colorMap[info.kategori] || "#64748b", padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>
                  {info.kategori}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

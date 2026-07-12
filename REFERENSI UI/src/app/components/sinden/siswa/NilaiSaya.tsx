import { TrendingUp } from "lucide-react";
import { PageHeader, Card, Badge, StatCard } from "../Layout";

const nilaiSaya = [
  { mapel: "Matematika", tugas: 85, ulangan: 78, pts: 80, pas: 82, nilaiAkhir: 81, kkm: 75, status: "Tuntas" },
  { mapel: "Bahasa Indonesia", tugas: 70, ulangan: 65, pts: 68, pas: 70, nilaiAkhir: 68, kkm: 75, status: "Belum Tuntas" },
  { mapel: "IPA", tugas: 88, ulangan: 85, pts: 82, pas: 86, nilaiAkhir: 85, kkm: 75, status: "Tuntas" },
  { mapel: "IPS", tugas: 75, ulangan: 72, pts: 70, pas: 78, nilaiAkhir: 74, kkm: 70, status: "Tuntas" },
  { mapel: "Bahasa Inggris", tugas: 80, ulangan: 75, pts: 78, pas: 82, nilaiAkhir: 79, kkm: 70, status: "Tuntas" },
  { mapel: "PPKn", tugas: 90, ulangan: 88, pts: 85, pas: 87, nilaiAkhir: 87, kkm: 70, status: "Tuntas" },
  { mapel: "Pendidikan Agama", tugas: 92, ulangan: 90, pts: 88, pas: 91, nilaiAkhir: 90, kkm: 75, status: "Tuntas" },
  { mapel: "Seni Budaya", tugas: 85, ulangan: 80, pts: 82, pas: 84, nilaiAkhir: 83, kkm: 70, status: "Tuntas" },
  { mapel: "PJOK", tugas: 88, ulangan: 85, pts: 82, pas: 86, nilaiAkhir: 85, kkm: 70, status: "Tuntas" },
  { mapel: "Informatika", tugas: 76, ulangan: 72, pts: 74, pas: 78, nilaiAkhir: 75, kkm: 70, status: "Tuntas" },
];

const avg = Math.round(nilaiSaya.reduce((s, n) => s + n.nilaiAkhir, 0) / nilaiSaya.length);
const tuntas = nilaiSaya.filter((n) => n.status === "Tuntas").length;

export function NilaiSaya() {
  return (
    <div>
      <PageHeader title="Nilai Saya" />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard title="Rata-rata Nilai" value={avg} icon={<TrendingUp size={20} />} color="#2563eb" subtitle="Semua mata pelajaran" />
        <StatCard title="Mapel Tuntas" value={tuntas} icon={<TrendingUp size={20} />} color="#16a34a" subtitle={`dari ${nilaiSaya.length} mapel`} />
        <StatCard title="Belum Tuntas" value={nilaiSaya.length - tuntas} icon={<TrendingUp size={20} />} color="#dc2626" subtitle="Perlu remedial" />
      </div>

      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                {["Mata Pelajaran", "Nilai Tugas", "Ulangan", "PTS", "PAS", "Nilai Akhir", "KKM", "Status"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nilaiSaya.map((n) => (
                <tr key={n.mapel} style={{ borderBottom: "1px solid #f1f5f9" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbfc")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 500 }}>{n.mapel}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>{n.tugas}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>{n.ulangan}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>{n.pts}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>{n.pas}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{ fontWeight: 700, color: n.nilaiAkhir >= n.kkm ? "#16a34a" : "#dc2626", fontSize: "0.95rem" }}>{n.nilaiAkhir}</span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#64748b" }}>{n.kkm}</td>
                  <td style={{ padding: "0.875rem 1rem" }}><Badge status={n.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

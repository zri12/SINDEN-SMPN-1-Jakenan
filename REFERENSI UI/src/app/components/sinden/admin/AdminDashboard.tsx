import { Users, UserCheck, School, BookOpen, ClipboardList, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StatCard, Card } from "../Layout";
import { aktivitasDummy, grafikNilaiDummy } from "../data";

const pieData = [
  { name: "Sudah Kumpul", value: 320 },
  { name: "Belum Kumpul", value: 85 },
];
const PIE_COLORS = ["#16a34a", "#dc2626"];

export function AdminDashboard() {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Selamat datang, <strong>Administrator</strong> — SMP Negeri 1 Jakenan</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard title="Total Siswa" value="853" icon={<Users size={22} />} color="#2563eb" subtitle="Aktif semester ini" />
        <StatCard title="Total Guru" value="51" icon={<UserCheck size={22} />} color="#16a34a" subtitle="Guru pengajar" />
        <StatCard title="Total Kelas" value="27" icon={<School size={22} />} color="#d97706" subtitle="Kelas 7-9" />
        <StatCard title="Mata Pelajaran" value="12" icon={<BookOpen size={22} />} color="#7c3aed" subtitle="Aktif" />
      </div>

      {/* Summary cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "1.5rem" }}>
        <Card>
          <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.25rem" }}>Rata-rata Nilai Siswa</p>
          <p style={{ color: "#1e293b", fontSize: "1.5rem", fontWeight: 700 }}>79.4</p>
        </Card>
        <Card>
          <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.25rem" }}>Tugas Aktif</p>
          <p style={{ color: "#1e293b", fontSize: "1.5rem", fontWeight: 700 }}>14</p>
        </Card>
        <Card>
          <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.25rem" }}>Siswa Tuntas</p>
          <p style={{ color: "#16a34a", fontSize: "1.5rem", fontWeight: 700 }}>641</p>
        </Card>
        <Card>
          <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.25rem" }}>Belum Tuntas</p>
          <p style={{ color: "#dc2626", fontSize: "1.5rem", fontWeight: 700 }}>212</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        {/* Bar chart */}
        <Card className="lg:col-span-2">
          <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Rata-rata Nilai per Kelas</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={grafikNilaiDummy} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="kelas" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} domain={[60, 100]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Bar dataKey="rataRata" fill="#2563eb" radius={[4, 4, 0, 0]} name="Rata-rata" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie chart */}
        <Card>
          <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Status Pengumpulan Tugas</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between" style={{ fontSize: "0.8rem" }}>
                <div className="flex items-center gap-2">
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: PIE_COLORS[i] }} />
                  <span style={{ color: "#64748b" }}>{d.name}</span>
                </div>
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity */}
      <Card>
        <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Aktivitas Terbaru</h3>
        <div className="flex flex-col gap-3">
          {aktivitasDummy.map((a) => {
            const iconMap: Record<string, React.ReactNode> = {
              tugas: <FileText size={15} />,
              nilai: <ClipboardList size={15} />,
              pengumpulan: <TrendingUp size={15} />,
              siswa: <Users size={15} />,
            };
            const colorMap: Record<string, string> = {
              tugas: "#2563eb",
              nilai: "#16a34a",
              pengumpulan: "#d97706",
              siswa: "#7c3aed",
            };
            return (
              <div key={a.id} className="flex items-start gap-3" style={{ paddingBottom: "0.75rem", borderBottom: "1px solid #f8fafc" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: (colorMap[a.tipe] || "#64748b") + "15", display: "flex", alignItems: "center", justifyContent: "center", color: colorMap[a.tipe] || "#64748b", flexShrink: 0, marginTop: 2 }}>
                  {iconMap[a.tipe] || <AlertCircle size={15} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#374151", fontSize: "0.875rem", margin: 0 }}>{a.keterangan}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.125rem" }}>{a.waktu}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

import { School, FileText, CheckCircle, XCircle, Users, Clock } from "lucide-react";
import { StatCard, Card, Badge } from "../Layout";
import { tugasDummy, aktivitasDummy, nilaiDummy } from "../data";

const kelasSaya = [
  { nama: "7A", mapel: "Matematika", jumlah: 32 },
  { nama: "7B", mapel: "Matematika", jumlah: 31 },
  { nama: "8A", mapel: "Matematika", jumlah: 33 },
];

const siswaRemedi = nilaiDummy.filter((n) => n.status === "Belum Tuntas").slice(0, 3);

export function GuruDashboard() {
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Selamat datang, <strong>Bapak Fauzan</strong> — Guru Matematika</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard title="Kelas Diampu" value="3" icon={<School size={22} />} color="#2563eb" subtitle="Kelas aktif" />
        <StatCard title="Tugas Aktif" value="4" icon={<FileText size={22} />} color="#d97706" subtitle="Sedang berjalan" />
        <StatCard title="Sudah Kumpul" value="71" icon={<CheckCircle size={22} />} color="#16a34a" subtitle="Siswa" />
        <StatCard title="Belum Kumpul" value="25" icon={<XCircle size={22} />} color="#dc2626" subtitle="Siswa" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        {/* Kelas cards */}
        <div>
          <h3 style={{ color: "#1e293b", marginBottom: "0.75rem" }}>Kelas yang Diajar</h3>
          <div className="flex flex-col gap-3">
            {kelasSaya.map((k) => (
              <Card key={k.nama}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: 700 }}>
                      {k.nama}
                    </div>
                    <div>
                      <p style={{ color: "#1e293b", fontWeight: 600, fontSize: "0.9rem" }}>{k.mapel}</p>
                      <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{k.jumlah} siswa</p>
                    </div>
                  </div>
                  <Users size={16} color="#94a3b8" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tugas terbaru */}
        <div>
          <h3 style={{ color: "#1e293b", marginBottom: "0.75rem" }}>Tugas Terbaru</h3>
          <div className="flex flex-col gap-3">
            {tugasDummy.slice(0, 3).map((t) => (
              <Card key={t.id}>
                <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1e293b", marginBottom: "0.375rem" }}>{t.judul}</p>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#64748b", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} /> {t.deadline}
                  </span>
                  <Badge status={t.status} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Siswa belum tuntas */}
        <div>
          <h3 style={{ color: "#1e293b", marginBottom: "0.75rem" }}>Siswa Belum Tuntas</h3>
          <div className="flex flex-col gap-3">
            {siswaRemedi.map((s) => (
              <Card key={s.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1e293b" }}>{s.nama}</p>
                    <p style={{ color: "#64748b", fontSize: "0.75rem" }}>{s.kelas} · {s.mapel}</p>
                  </div>
                  <span style={{ fontWeight: 700, color: "#dc2626", fontSize: "1.1rem" }}>{s.nilaiAkhir}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Aktivitas */}
      <Card>
        <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Aktivitas Terbaru</h3>
        <div className="flex flex-col gap-3">
          {aktivitasDummy.slice(0, 4).map((a) => (
            <div key={a.id} style={{ display: "flex", gap: "0.75rem", paddingBottom: "0.75rem", borderBottom: "1px solid #f8fafc" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", marginTop: 6, flexShrink: 0 }} />
              <div>
                <p style={{ color: "#374151", fontSize: "0.875rem" }}>{a.keterangan}</p>
                <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.125rem" }}>{a.waktu}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

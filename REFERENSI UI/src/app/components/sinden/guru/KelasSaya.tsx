import { useState } from "react";
import { Users, ChevronRight } from "lucide-react";
import { PageHeader, Card, Badge, Table } from "../Layout";
import { siswaDummy } from "../data";

const kelasSaya = [
  { nama: "7A", mapel: "Matematika", jumlah: 32 },
  { nama: "7B", mapel: "Matematika", jumlah: 31 },
  { nama: "8A", mapel: "Matematika", jumlah: 33 },
  { nama: "9C", mapel: "Matematika", jumlah: 28 },
];

export function KelasSaya() {
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);

  const kelasDetail = siswaDummy.filter((s) => !selectedKelas || s.kelas === selectedKelas);

  const rows = kelasDetail.map((s) => [
    s.id,
    <span style={{ fontWeight: 500 }}>{s.nama}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{s.kelas}</span>,
    <Badge status="Tuntas" />,
    <Badge status="Sudah Mengumpulkan" />,
  ]);

  return (
    <div>
      <PageHeader title="Kelas Saya" />

      {/* Kelas cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "1.5rem" }}>
        {kelasSaya.map((k) => (
          <button
            key={k.nama}
            onClick={() => setSelectedKelas(selectedKelas === k.nama ? null : k.nama)}
            style={{
              background: selectedKelas === k.nama ? "#1b3a6b" : "white",
              borderRadius: 12,
              padding: "1.25rem",
              border: selectedKelas === k.nama ? "2px solid #2563eb" : "2px solid #f1f5f9",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              transition: "all 0.15s",
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: "0.75rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: selectedKelas === k.nama ? "rgba(255,255,255,0.15)" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: selectedKelas === k.nama ? "white" : "#2563eb", fontWeight: 700, fontSize: "1rem" }}>
                {k.nama}
              </div>
              <ChevronRight size={16} color={selectedKelas === k.nama ? "rgba(255,255,255,0.6)" : "#94a3b8"} />
            </div>
            <p style={{ color: selectedKelas === k.nama ? "rgba(255,255,255,0.7)" : "#64748b", fontSize: "0.75rem", marginBottom: "0.125rem" }}>{k.mapel}</p>
            <div className="flex items-center gap-1">
              <Users size={13} color={selectedKelas === k.nama ? "rgba(255,255,255,0.6)" : "#94a3b8"} />
              <span style={{ color: selectedKelas === k.nama ? "rgba(255,255,255,0.8)" : "#374151", fontSize: "0.875rem", fontWeight: 600 }}>{k.jumlah} siswa</span>
            </div>
            <p style={{ marginTop: "0.75rem" }}>
              <span style={{ background: selectedKelas === k.nama ? "rgba(255,255,255,0.15)" : "#eff6ff", color: selectedKelas === k.nama ? "white" : "#2563eb", padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>
                Lihat Detail
              </span>
            </p>
          </button>
        ))}
      </div>

      {/* Student list */}
      <Card>
        <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
          Daftar Siswa {selectedKelas ? `— Kelas ${selectedKelas}` : "— Semua Kelas"}
        </h3>
        <Table
          headers={["No", "Nama Siswa", "Kelas", "Status Nilai", "Status Tugas"]}
          rows={rows}
        />
      </Card>
    </div>
  );
}

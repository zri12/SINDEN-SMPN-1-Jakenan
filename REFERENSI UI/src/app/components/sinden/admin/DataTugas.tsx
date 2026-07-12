import { useState } from "react";
import { PageHeader, Select, Badge, Table, Card, Btn } from "../Layout";
import { tugasDummy } from "../data";
import { Eye } from "lucide-react";

export function DataTugas() {
  const [filterKelas, setFilterKelas] = useState("");
  const [filterMapel, setFilterMapel] = useState("");

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map((k) => ({ value: k, label: k }));
  const mapelOpts = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris", "PPKn"].map((m) => ({ value: m, label: m }));

  const filtered = tugasDummy.filter((t) => {
    const matchKelas = !filterKelas || t.kelas === filterKelas;
    const matchMapel = !filterMapel || t.mapel === filterMapel;
    return matchKelas && matchMapel;
  });

  const rows = filtered.map((t) => [
    <span style={{ fontWeight: 500, maxWidth: 220, display: "block" }}>{t.judul}</span>,
    t.guru,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem" }}>{t.mapel}</span>,
    <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{t.kelas}</span>,
    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{t.deadline}</span>,
    <Badge status={t.status} />,
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontWeight: 700 }}>{t.terkumpul}</span>
      <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>terkumpul</span>
    </div>,
    <Btn variant="outline" size="sm"><Eye size={14} /> Detail</Btn>,
  ]);

  return (
    <div>
      <PageHeader title="Data Tugas" />

      <Card>
        <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.25rem" }}>
          <Select value={filterKelas} onChange={setFilterKelas} options={kelasOpts} placeholder="Semua Kelas" />
          <Select value={filterMapel} onChange={setFilterMapel} options={mapelOpts} placeholder="Semua Mapel" />
        </div>
        <Table
          headers={["Judul Tugas", "Guru", "Mata Pelajaran", "Kelas", "Deadline", "Status", "Pengumpulan", "Aksi"]}
          rows={rows}
        />
      </Card>
    </div>
  );
}

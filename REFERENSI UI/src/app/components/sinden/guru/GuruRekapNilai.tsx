import { useState } from "react";
import { PageHeader, Card, Select, Badge, Table, StatCard } from "../Layout";
import { nilaiDummy } from "../data";
import { TrendingUp, Users, XCircle } from "lucide-react";

export function GuruRekapNilai() {
  const [filterKelas, setFilterKelas] = useState("7A");
  const [filterMapel, setFilterMapel] = useState("Matematika");

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B"].map((k) => ({ value: k, label: k }));
  const mapelOpts = ["Matematika", "Bahasa Indonesia", "IPA", "IPS"].map((m) => ({ value: m, label: m }));

  const filtered = nilaiDummy.filter((n) => {
    const matchKelas = !filterKelas || n.kelas === filterKelas;
    const matchMapel = !filterMapel || n.mapel === filterMapel;
    return matchKelas && matchMapel;
  });

  const avg = filtered.length ? Math.round(filtered.reduce((s, n) => s + n.nilaiAkhir, 0) / filtered.length) : 0;
  const tuntas = filtered.filter((n) => n.status === "Tuntas").length;
  const belumTuntas = filtered.filter((n) => n.status === "Belum Tuntas").length;

  const rows = filtered.map((n) => [
    <span style={{ fontWeight: 500 }}>{n.nama}</span>,
    <span style={{ fontWeight: 700, color: n.nilaiAkhir >= n.kkm ? "#16a34a" : "#dc2626", fontSize: "0.95rem" }}>{n.nilaiAkhir}</span>,
    n.kkm,
    <Badge status={n.status} />,
    <span style={{ color: n.nilaiAkhir >= n.kkm ? "#16a34a" : "#dc2626", fontSize: "0.8rem" }}>
      {n.nilaiAkhir >= n.kkm ? "Sudah memenuhi KKM" : "Perlu remedial"}
    </span>,
  ]);

  return (
    <div>
      <PageHeader title="Rekap Nilai" />

      <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.5rem" }}>
        <Select value={filterKelas} onChange={setFilterKelas} options={kelasOpts} />
        <Select value={filterMapel} onChange={setFilterMapel} options={mapelOpts} />
      </div>

      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard title="Rata-rata Nilai" value={avg} icon={<TrendingUp size={20} />} color="#2563eb" />
        <StatCard title="Siswa Tuntas" value={tuntas} icon={<Users size={20} />} color="#16a34a" />
        <StatCard title="Belum Tuntas" value={belumTuntas} icon={<XCircle size={20} />} color="#dc2626" />
      </div>

      <Card>
        <Table
          headers={["Nama Siswa", "Nilai Akhir", "KKM", "Status", "Keterangan"]}
          rows={rows}
        />
      </Card>
    </div>
  );
}

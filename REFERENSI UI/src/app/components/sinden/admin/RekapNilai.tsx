import { useState } from "react";
import { Printer, Download } from "lucide-react";
import { PageHeader, Select, Badge, Table, Card, StatCard, Btn } from "../Layout";
import { nilaiDummy } from "../data";
import { Users, TrendingUp, TrendingDown } from "lucide-react";

export function RekapNilai() {
  const [filterKelas, setFilterKelas] = useState("7A");
  const [filterMapel, setFilterMapel] = useState("");
  const [filterSemester, setFilterSemester] = useState("1");

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map((k) => ({ value: k, label: k }));
  const mapelOpts = ["Matematika", "Bahasa Indonesia", "IPA", "IPS"].map((m) => ({ value: m, label: m }));
  const semOpts = [{ value: "1", label: "Semester 1" }, { value: "2", label: "Semester 2" }];

  const filtered = nilaiDummy.filter((n) => {
    const matchKelas = !filterKelas || n.kelas === filterKelas;
    const matchMapel = !filterMapel || n.mapel === filterMapel;
    return matchKelas && matchMapel;
  });

  const avg = filtered.length ? Math.round(filtered.reduce((s, n) => s + n.nilaiAkhir, 0) / filtered.length) : 0;
  const highest = filtered.length ? Math.max(...filtered.map((n) => n.nilaiAkhir)) : 0;
  const lowest = filtered.length ? Math.min(...filtered.map((n) => n.nilaiAkhir)) : 0;
  const tuntas = filtered.filter((n) => n.status === "Tuntas").length;
  const belumTuntas = filtered.filter((n) => n.status === "Belum Tuntas").length;

  const rows = filtered.map((n) => [
    <span style={{ fontWeight: 500 }}>{n.nama}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{n.kelas}</span>,
    n.mapel,
    <span style={{ fontWeight: 700, color: n.nilaiAkhir >= n.kkm ? "#16a34a" : "#dc2626", fontSize: "0.95rem" }}>{n.nilaiAkhir}</span>,
    n.kkm,
    <Badge status={n.status} />,
    <span style={{ color: n.nilaiAkhir >= n.kkm ? "#16a34a" : "#dc2626", fontSize: "0.8rem" }}>
      {n.nilaiAkhir >= n.kkm ? "Sudah memenuhi KKM" : "Perlu remedial"}
    </span>,
  ]);

  return (
    <div>
      <PageHeader title="Rekap Nilai">
        <Btn variant="secondary"><Printer size={16} /> Cetak Rekap</Btn>
        <Btn variant="outline"><Download size={16} /> Export</Btn>
      </PageHeader>

      {/* Filter */}
      <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.5rem" }}>
        <Select value={filterKelas} onChange={setFilterKelas} options={kelasOpts} placeholder="Pilih Kelas" />
        <Select value={filterMapel} onChange={setFilterMapel} options={mapelOpts} placeholder="Semua Mapel" />
        <Select value={filterSemester} onChange={setFilterSemester} options={semOpts} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard title="Rata-rata Kelas" value={avg} icon={<TrendingUp size={20} />} color="#2563eb" />
        <StatCard title="Nilai Tertinggi" value={highest} icon={<TrendingUp size={20} />} color="#16a34a" />
        <StatCard title="Nilai Terendah" value={lowest} icon={<TrendingDown size={20} />} color="#dc2626" />
        <StatCard title="Siswa Tuntas" value={tuntas} icon={<Users size={20} />} color="#16a34a" />
        <StatCard title="Belum Tuntas" value={belumTuntas} icon={<Users size={20} />} color="#dc2626" />
      </div>

      <Card>
        <Table
          headers={["Nama Siswa", "Kelas", "Mata Pelajaran", "Nilai Akhir", "KKM", "Status", "Keterangan"]}
          rows={rows}
        />
      </Card>
    </div>
  );
}

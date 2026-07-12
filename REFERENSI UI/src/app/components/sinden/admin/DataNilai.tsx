import { useState } from "react";
import { PageHeader, SearchBar, Select, Badge, Table, Card } from "../Layout";
import { nilaiDummy } from "../data";

export function DataNilai() {
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [filterMapel, setFilterMapel] = useState("");
  const [filterSemester, setFilterSemester] = useState("1");

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map((k) => ({ value: k, label: k }));
  const mapelOpts = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris"].map((m) => ({ value: m, label: m }));
  const semOpts = [{ value: "1", label: "Semester 1" }, { value: "2", label: "Semester 2" }];

  const filtered = nilaiDummy.filter((n) => {
    const matchSearch = n.nama.toLowerCase().includes(search.toLowerCase());
    const matchKelas = !filterKelas || n.kelas === filterKelas;
    const matchMapel = !filterMapel || n.mapel === filterMapel;
    return matchSearch && matchKelas && matchMapel;
  });

  const rows = filtered.map((n) => [
    <span style={{ fontWeight: 500 }}>{n.nama}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{n.kelas}</span>,
    n.mapel,
    <span style={{ fontWeight: 600 }}>{n.tugas}</span>,
    <span style={{ fontWeight: 600 }}>{n.ulangan}</span>,
    <span style={{ fontWeight: 600 }}>{n.pts}</span>,
    <span style={{ fontWeight: 600 }}>{n.pas}</span>,
    <span style={{ fontWeight: 700, color: n.nilaiAkhir >= n.kkm ? "#16a34a" : "#dc2626", fontSize: "0.95rem" }}>{n.nilaiAkhir}</span>,
    <span style={{ color: "#64748b" }}>{n.kkm}</span>,
    <Badge status={n.status} />,
  ]);

  return (
    <div>
      <PageHeader title="Data Nilai" />

      <Card>
        <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.25rem" }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama siswa..." />
          <Select value={filterKelas} onChange={setFilterKelas} options={kelasOpts} placeholder="Semua Kelas" />
          <Select value={filterMapel} onChange={setFilterMapel} options={mapelOpts} placeholder="Semua Mapel" />
          <Select value={filterSemester} onChange={setFilterSemester} options={semOpts} />
        </div>
        <Table
          headers={["Nama Siswa", "Kelas", "Mata Pelajaran", "Nilai Tugas", "Ulangan", "PTS", "PAS", "Nilai Akhir", "KKM", "Status"]}
          rows={rows}
        />
        <div style={{ marginTop: "1rem", display: "flex", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#16a34a" }} />
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Tuntas: {filtered.filter((n) => n.status === "Tuntas").length} siswa</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#dc2626" }} />
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Belum Tuntas: {filtered.filter((n) => n.status === "Belum Tuntas").length} siswa</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

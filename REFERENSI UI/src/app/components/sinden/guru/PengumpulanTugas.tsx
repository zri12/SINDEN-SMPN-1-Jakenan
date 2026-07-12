import { useState } from "react";
import { PageHeader, Card, Select, Badge, Table } from "../Layout";
import { pengumpulanDummy } from "../data";

export function PengumpulanTugas() {
  const [filterKelas, setFilterKelas] = useState("");
  const [filterTugas, setFilterTugas] = useState("");

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B"].map((k) => ({ value: k, label: k }));
  const tugasOpts = [
    { value: "matematika", label: "Tugas Matematika Bab Pecahan" },
    { value: "ipa", label: "Tugas IPA Sistem Pencernaan" },
    { value: "bahasa", label: "Tugas Bahasa Indonesia" },
  ];

  const filtered = pengumpulanDummy.filter((p) => {
    const matchKelas = !filterKelas || p.kelas === filterKelas;
    return matchKelas;
  });

  const sudah = filtered.filter((p) => p.status === "Sudah Mengumpulkan").length;
  const belum = filtered.filter((p) => p.status === "Belum Mengumpulkan").length;
  const terlambat = filtered.filter((p) => p.status === "Terlambat").length;

  const rows = filtered.map((p, i) => [
    i + 1,
    <span style={{ fontWeight: 500 }}>{p.nama}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{p.kelas}</span>,
    <span style={{ fontSize: "0.85rem" }}>{p.judul}</span>,
    <Badge status={p.status} />,
    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.tanggal}</span>,
    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.catatan}</span>,
  ]);

  return (
    <div>
      <PageHeader title="Pengumpulan Tugas" />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Sudah Mengumpulkan", value: sudah, color: "#16a34a", bg: "#dcfce7" },
          { label: "Belum Mengumpulkan", value: belum, color: "#dc2626", bg: "#fee2e2" },
          { label: "Terlambat", value: terlambat, color: "#d97706", bg: "#fef9c3" },
        ].map((s) => (
          <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontWeight: 700, fontSize: "1rem" }}>
                {s.value}
              </div>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.25rem" }}>
          <Select value={filterKelas} onChange={setFilterKelas} options={kelasOpts} placeholder="Semua Kelas" />
          <Select value={filterTugas} onChange={setFilterTugas} options={tugasOpts} placeholder="Semua Tugas" />
        </div>
        <Table
          headers={["No", "Nama Siswa", "Kelas", "Judul Tugas", "Status", "Tanggal Upload", "Catatan"]}
          rows={rows}
        />
      </Card>
    </div>
  );
}

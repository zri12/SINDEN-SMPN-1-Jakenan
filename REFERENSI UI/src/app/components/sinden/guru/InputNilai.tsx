import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, Card, Select, Alert } from "../Layout";
import { siswaDummy } from "../data";

const jenisNilaiOpts = [
  { value: "tugas", label: "Tugas" },
  { value: "ulangan", label: "Ulangan Harian" },
  { value: "pts", label: "PTS" },
  { value: "pas", label: "PAS" },
  { value: "praktik", label: "Praktik" },
  { value: "remedial", label: "Remedial" },
];

export function InputNilai() {
  const [filterKelas, setFilterKelas] = useState("7A");
  const [filterMapel, setFilterMapel] = useState("Matematika");
  const [filterSemester, setFilterSemester] = useState("1");
  const [jenisNilai, setJenisNilai] = useState("tugas");
  const [saved, setSaved] = useState(false);
  const [nilaiMap, setNilaiMap] = useState<Record<number, string>>({});

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map((k) => ({ value: k, label: k }));
  const mapelOpts = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris"].map((m) => ({ value: m, label: m }));
  const semOpts = [{ value: "1", label: "Semester 1" }, { value: "2", label: "Semester 2" }];

  const siswaKelas = siswaDummy.filter((s) => s.kelas === filterKelas);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <PageHeader title="Input Nilai" />

      <Card style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Filter Data</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label style={{ display: "block", marginBottom: "0.375rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>Kelas</label>
            <Select value={filterKelas} onChange={setFilterKelas} options={kelasOpts} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.375rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>Mata Pelajaran</label>
            <Select value={filterMapel} onChange={setFilterMapel} options={mapelOpts} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.375rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>Semester</label>
            <Select value={filterSemester} onChange={setFilterSemester} options={semOpts} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.375rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>Jenis Nilai</label>
            <Select value={jenisNilai} onChange={setJenisNilai} options={jenisNilaiOpts} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
          <h3 style={{ color: "#1e293b" }}>
            Input Nilai {jenisNilaiOpts.find((j) => j.value === jenisNilai)?.label} — Kelas {filterKelas} · {filterMapel}
          </h3>
          <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{siswaKelas.length} siswa</span>
        </div>

        {saved && <Alert message="Nilai berhasil disimpan!" type="success" />}

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                {["No", "Nama Siswa", "Kelas", `Nilai ${jenisNilaiOpts.find((j) => j.value === jenisNilai)?.label}`, "Keterangan"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {siswaKelas.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "0.75rem 1rem", color: "#94a3b8" }}>{i + 1}</td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 500 }}>{s.nama}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{s.kelas}</span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={nilaiMap[s.id] ?? ""}
                      onChange={(e) => setNilaiMap({ ...nilaiMap, [s.id]: e.target.value })}
                      placeholder="0-100"
                      style={{ width: 90, padding: "0.4rem 0.6rem", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <input
                      type="text"
                      placeholder="Keterangan (opsional)"
                      style={{ width: "100%", minWidth: 150, padding: "0.4rem 0.6rem", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
          <button
            onClick={handleSave}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.625rem 1.5rem", borderRadius: 8, background: "#2563eb", color: "white", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.875rem" }}
          >
            <Save size={16} /> Simpan Nilai
          </button>
        </div>
      </Card>
    </div>
  );
}

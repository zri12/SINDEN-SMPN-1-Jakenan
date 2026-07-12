import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { PageHeader, Card, FormField, Input, Alert } from "../Layout";

export function Pengaturan() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    namaSekolah: "SMP Negeri 1 Jakenan",
    tahunAjaran: "2025/2026",
    semester: "1",
    kkmDefault: "75",
    namaAplikasi: "SINDEN",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <PageHeader title="Pengaturan" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <h3 style={{ color: "#1e293b", marginBottom: "1.5rem" }}>Pengaturan Sekolah</h3>
            {saved && <Alert message="Pengaturan berhasil disimpan!" type="success" />}

            <FormField label="Nama Sekolah">
              <Input value={form.namaSekolah} onChange={(v) => setForm({ ...form, namaSekolah: v })} />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Tahun Ajaran">
                <Input value={form.tahunAjaran} onChange={(v) => setForm({ ...form, tahunAjaran: v })} placeholder="cth: 2025/2026" />
              </FormField>
              <FormField label="Semester Aktif">
                <select
                  value={form.semester}
                  onChange={(e) => setForm({ ...form, semester: e.target.value })}
                  style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}
                >
                  <option value="1">Semester 1 (Ganjil)</option>
                  <option value="2">Semester 2 (Genap)</option>
                </select>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="KKM Default">
                <Input value={form.kkmDefault} onChange={(v) => setForm({ ...form, kkmDefault: v })} type="number" placeholder="cth: 75" />
              </FormField>
              <FormField label="Nama Aplikasi">
                <Input value={form.namaAplikasi} onChange={(v) => setForm({ ...form, namaAplikasi: v })} />
              </FormField>
            </div>

            <button
              onClick={handleSave}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "0.625rem 1.25rem", borderRadius: 8, background: "#2563eb", color: "white", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.875rem", marginTop: "0.5rem"
              }}
            >
              <Save size={16} /> Simpan Pengaturan
            </button>
          </Card>
        </div>

        {/* Logo upload */}
        <div>
          <Card>
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Logo Sekolah</h3>
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 12, background: "#f8fafc", border: "2px dashed #cbd5e1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, cursor: "pointer", marginBottom: "1rem" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#1b3a6b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "1.25rem" }}>SMP</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.8rem", textAlign: "center" }}>Logo saat ini</p>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "0.625rem", borderRadius: 8, background: "#f1f5f9", color: "#374151", border: "1px solid #e2e8f0", cursor: "pointer", justifyContent: "center", fontSize: "0.875rem" }}>
              <Upload size={16} /> Upload Logo Baru
            </button>
          </Card>

          <Card className="mt-4">
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Info Sistem</h3>
            {[
              { label: "Versi Aplikasi", value: "1.0.0" },
              { label: "Database", value: "Supabase" },
              { label: "Tahun Ajaran", value: form.tahunAjaran },
              { label: "Semester", value: `Semester ${form.semester}` },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{item.label}</span>
                <span style={{ color: "#1e293b", fontWeight: 500, fontSize: "0.85rem" }}>{item.value}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

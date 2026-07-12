import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader, Btn, Table, Modal, FormField, Input, Card } from "../Layout";
import { kelasDummy } from "../data";

export function DataKelas() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", wali: "" });

  const rows = kelasDummy.map((k) => [
    k.id,
    <span style={{ fontWeight: 600, color: "#2563eb" }}>{k.nama}</span>,
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: "0.8rem", fontWeight: 700 }}>
        {k.jumlahSiswa}
      </div>
      <span style={{ color: "#64748b", fontSize: "0.85rem" }}>siswa</span>
    </div>,
    k.wali,
    <div className="flex gap-1">
      <Btn variant="secondary" size="sm"><Pencil size={14} /></Btn>
      <Btn variant="danger" size="sm"><Trash2 size={14} /></Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="Data Kelas">
        <Btn onClick={() => setShowModal(true)}><Plus size={16} /> Tambah Kelas</Btn>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "1.5rem" }}>
        {["Kelas 7", "Kelas 8", "Kelas 9"].map((tingkat, i) => {
          const count = kelasDummy.filter((k) => k.nama.startsWith(String(i + 7))).length;
          const total = kelasDummy.filter((k) => k.nama.startsWith(String(i + 7))).reduce((sum, k) => sum + k.jumlahSiswa, 0);
          return (
            <div key={tingkat} style={{ background: "white", borderRadius: 12, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9" }}>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{tingkat}</p>
              <p style={{ color: "#1e293b", fontSize: "1.25rem", fontWeight: 700 }}>{count} kelas</p>
              <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{total} siswa</p>
            </div>
          );
        })}
      </div>

      <Card>
        <Table
          headers={["No", "Nama Kelas", "Jumlah Siswa", "Wali / Penanggung Jawab", "Aksi"]}
          rows={rows}
        />
      </Card>

      {showModal && (
        <Modal title="Tambah Kelas" onClose={() => setShowModal(false)}>
          <FormField label="Nama Kelas">
            <Input value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="cth: 7D, 8D" />
          </FormField>
          <FormField label="Wali / Penanggung Jawab">
            <Input value={form.wali} onChange={(v) => setForm({ ...form, wali: v })} placeholder="Nama wali kelas" />
          </FormField>
          <div className="flex gap-2 justify-end" style={{ marginTop: "0.5rem" }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Batal</Btn>
            <Btn onClick={() => setShowModal(false)}>Simpan Kelas</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

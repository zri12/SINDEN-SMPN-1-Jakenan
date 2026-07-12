import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader, Btn, Table, Badge, Modal, FormField, Input, Card } from "../Layout";
import { mapelDummy } from "../data";

export function MataPelajaran() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ kode: "", nama: "", kkm: "" });

  const rows = mapelDummy.map((m) => [
    m.id,
    <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#2563eb", fontSize: "0.85rem", background: "#eff6ff", padding: "0.15rem 0.5rem", borderRadius: 5 }}>{m.kode}</span>,
    <span style={{ fontWeight: 500 }}>{m.nama}</span>,
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontWeight: 700, color: "#d97706" }}>{m.kkm}</span>
    </div>,
    <Badge status={m.status} />,
    <div className="flex gap-1">
      <Btn variant="secondary" size="sm"><Pencil size={14} /></Btn>
      <Btn variant="danger" size="sm"><Trash2 size={14} /></Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="Mata Pelajaran">
        <Btn onClick={() => setShowModal(true)}><Plus size={16} /> Tambah Mata Pelajaran</Btn>
      </PageHeader>

      <Card>
        <Table
          headers={["No", "Kode Mapel", "Nama Mata Pelajaran", "KKM", "Status", "Aksi"]}
          rows={rows}
        />
      </Card>

      {showModal && (
        <Modal title="Tambah Mata Pelajaran" onClose={() => setShowModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Kode Mapel">
              <Input value={form.kode} onChange={(v) => setForm({ ...form, kode: v })} placeholder="cth: MTK" />
            </FormField>
            <FormField label="KKM">
              <Input value={form.kkm} onChange={(v) => setForm({ ...form, kkm: v })} placeholder="cth: 75" type="number" />
            </FormField>
          </div>
          <FormField label="Nama Mata Pelajaran">
            <Input value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Nama lengkap mata pelajaran" />
          </FormField>
          <div className="flex gap-2 justify-end" style={{ marginTop: "0.5rem" }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Batal</Btn>
            <Btn onClick={() => setShowModal(false)}>Simpan</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

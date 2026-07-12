import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, Upload, Link } from "lucide-react";
import { PageHeader, Card, Table, Badge, Btn, Modal, FormField, Input } from "../Layout";
import { tugasDummy } from "../data";

export function GuruTugas() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ judul: "", mapel: "", kelas: "", deskripsi: "", deadline: "", link: "" });

  const kelasOpts = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"];
  const mapelOpts = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris"];

  const rows = tugasDummy.map((t) => [
    <span style={{ fontWeight: 500, maxWidth: 200, display: "block" }}>{t.judul}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem" }}>{t.mapel}</span>,
    <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{t.kelas}</span>,
    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{t.deadline}</span>,
    <Badge status={t.status} />,
    <div className="flex gap-1">
      <Btn variant="outline" size="sm"><Eye size={14} /></Btn>
      <Btn variant="secondary" size="sm"><Pencil size={14} /></Btn>
      <Btn variant="danger" size="sm"><Trash2 size={14} /></Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="Tugas">
        <Btn onClick={() => setShowModal(true)}><Plus size={16} /> Buat Tugas</Btn>
      </PageHeader>

      <Card>
        <Table
          headers={["Judul Tugas", "Mata Pelajaran", "Kelas", "Deadline", "Status", "Aksi"]}
          rows={rows}
        />
      </Card>

      {showModal && (
        <Modal title="Buat Tugas Baru" onClose={() => setShowModal(false)}>
          <FormField label="Judul Tugas">
            <Input value={form.judul} onChange={(v) => setForm({ ...form, judul: v })} placeholder="Judul tugas" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Mata Pelajaran">
              <select value={form.mapel} onChange={(e) => setForm({ ...form, mapel: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}>
                <option value="">Pilih Mapel</option>
                {mapelOpts.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </FormField>
            <FormField label="Kelas Tujuan">
              <select value={form.kelas} onChange={(e) => setForm({ ...form, kelas: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}>
                <option value="">Pilih Kelas</option>
                {kelasOpts.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Deskripsi Tugas">
            <textarea
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              placeholder="Deskripsi tugas, instruksi, dll..."
              rows={3}
              style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </FormField>
          <FormField label="Deadline">
            <Input type="date" value={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} />
          </FormField>
          <FormField label="Link Tambahan (opsional)">
            <div style={{ position: "relative" }}>
              <Link size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
                style={{ width: "100%", padding: "0.625rem 0.875rem 0.625rem 2rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </FormField>
          <FormField label="Upload File Tugas (opsional)">
            <div style={{ border: "2px dashed #cbd5e1", borderRadius: 8, padding: "1rem", textAlign: "center", background: "#f8fafc", cursor: "pointer" }}>
              <Upload size={20} color="#94a3b8" style={{ margin: "0 auto 0.5rem" }} />
              <p style={{ color: "#64748b", fontSize: "0.8rem" }}>Klik atau drag file ke sini</p>
              <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>PDF, DOC, DOCX maks 10MB</p>
            </div>
          </FormField>
          <div className="flex gap-2 justify-end" style={{ marginTop: "0.5rem" }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Batal</Btn>
            <Btn onClick={() => setShowModal(false)}>Simpan Tugas</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

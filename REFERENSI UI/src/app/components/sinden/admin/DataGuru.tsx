import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { PageHeader, SearchBar, Btn, Table, Badge, Modal, FormField, Input, Card } from "../Layout";
import { guruDummy } from "../data";

export function DataGuru() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", nip: "", mapel: "", kelas: "", username: "", password: "" });

  const mapelOptions = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris", "PPKn", "PJOK", "Informatika"];

  const filtered = guruDummy.filter((g) =>
    g.nama.toLowerCase().includes(search.toLowerCase()) ||
    g.nip.includes(search) ||
    g.mapel.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filtered.map((g) => [
    g.id,
    <span style={{ fontWeight: 500 }}>{g.nama}</span>,
    <span style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{g.nip}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem" }}>{g.mapel}</span>,
    g.kelas,
    <Badge status={g.status} />,
    <div className="flex gap-1">
      <Btn variant="outline" size="sm"><Eye size={14} /></Btn>
      <Btn variant="secondary" size="sm"><Pencil size={14} /></Btn>
      <Btn variant="danger" size="sm"><Trash2 size={14} /></Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="Data Guru">
        <Btn onClick={() => setShowModal(true)}><Plus size={16} /> Tambah Guru</Btn>
      </PageHeader>

      <Card>
        <div style={{ marginBottom: "1.25rem" }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama, NIP, atau mapel..." />
        </div>
        <Table
          headers={["No", "Nama Guru", "NIP/NUPTK", "Mata Pelajaran", "Kelas Diampu", "Status", "Aksi"]}
          rows={rows}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", color: "#64748b", fontSize: "0.8rem" }}>
          <span>Menampilkan {filtered.length} dari {guruDummy.length} guru</span>
          <div className="flex gap-1">
            {[1, 2].map((p) => (
              <button key={p} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", background: p === 1 ? "#2563eb" : "white", color: p === 1 ? "white" : "#374151", cursor: "pointer", fontSize: "0.8rem" }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {showModal && (
        <Modal title="Tambah Guru Baru" onClose={() => setShowModal(false)}>
          <FormField label="Nama Guru">
            <Input value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Nama lengkap guru" />
          </FormField>
          <FormField label="NIP / NUPTK">
            <Input value={form.nip} onChange={(v) => setForm({ ...form, nip: v })} placeholder="Nomor Induk Pegawai" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Mata Pelajaran">
              <select value={form.mapel} onChange={(e) => setForm({ ...form, mapel: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}>
                <option value="">Pilih Mapel</option>
                {mapelOptions.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </FormField>
            <FormField label="Kelas yang Diajar">
              <Input value={form.kelas} onChange={(v) => setForm({ ...form, kelas: v })} placeholder="cth: 7A, 7B, 8A" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Username">
              <Input value={form.username} onChange={(v) => setForm({ ...form, username: v })} placeholder="Username login" />
            </FormField>
            <FormField label="Password">
              <Input type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="Password" />
            </FormField>
          </div>
          <div className="flex gap-2 justify-end" style={{ marginTop: "0.5rem" }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Batal</Btn>
            <Btn onClick={() => setShowModal(false)}>Simpan Guru</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

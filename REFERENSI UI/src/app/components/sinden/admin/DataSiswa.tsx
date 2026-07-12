import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { PageHeader, SearchBar, Select, Btn, Table, Badge, Modal, FormField, Input, Card } from "../Layout";
import { siswaDummy } from "../data";

export function DataSiswa() {
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", nis: "", nisn: "", kelas: "", jk: "L", username: "", password: "" });

  const kelasOptions = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map((k) => ({ value: k, label: k }));

  const filtered = siswaDummy.filter((s) => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search);
    const matchKelas = !filterKelas || s.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  const rows = filtered.map((s) => [
    s.id,
    <span style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{s.nis}</span>,
    <span style={{ fontWeight: 500 }}>{s.nama}</span>,
    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{s.kelas}</span>,
    s.jk === "L" ? "Laki-laki" : "Perempuan",
    <Badge status={s.status} />,
    <div className="flex gap-1">
      <Btn variant="outline" size="sm"><Eye size={14} /></Btn>
      <Btn variant="secondary" size="sm"><Pencil size={14} /></Btn>
      <Btn variant="danger" size="sm"><Trash2 size={14} /></Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="Data Siswa">
        <Btn onClick={() => setShowModal(true)}><Plus size={16} /> Tambah Siswa</Btn>
      </PageHeader>

      <Card>
        <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.25rem" }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama atau NIS..." />
          <Select value={filterKelas} onChange={setFilterKelas} options={kelasOptions} placeholder="Semua Kelas" />
        </div>
        <Table
          headers={["No", "NIS/NISN", "Nama Siswa", "Kelas", "Jenis Kelamin", "Status", "Aksi"]}
          rows={rows}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", color: "#64748b", fontSize: "0.8rem" }}>
          <span>Menampilkan {filtered.length} dari {siswaDummy.length} siswa</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", background: p === 1 ? "#2563eb" : "white", color: p === 1 ? "white" : "#374151", cursor: "pointer", fontSize: "0.8rem" }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {showModal && (
        <Modal title="Tambah Siswa Baru" onClose={() => setShowModal(false)}>
          <FormField label="Nama Siswa">
            <Input value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Nama lengkap siswa" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="NIS">
              <Input value={form.nis} onChange={(v) => setForm({ ...form, nis: v })} placeholder="Nomor Induk Siswa" />
            </FormField>
            <FormField label="NISN">
              <Input value={form.nisn} onChange={(v) => setForm({ ...form, nisn: v })} placeholder="NISN Nasional" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Kelas">
              <select value={form.kelas} onChange={(e) => setForm({ ...form, kelas: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
              </select>
            </FormField>
            <FormField label="Jenis Kelamin">
              <select value={form.jk} onChange={(e) => setForm({ ...form, jk: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none" }}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
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
            <Btn onClick={() => setShowModal(false)}>Simpan Siswa</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

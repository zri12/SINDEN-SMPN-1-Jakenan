import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { PageHeader, Card, FormField, Select, Alert } from "../Layout";
import { tugasDummy } from "../data";

export function UploadTugas() {
  const [selectedTugas, setSelectedTugas] = useState("");
  const [catatan, setCatatan] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const tugasOpts = tugasDummy.map((t) => ({ value: String(t.id), label: t.judul }));

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploaded(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  if (uploaded) {
    return (
      <div>
        <PageHeader title="Upload Tugas" />
        <Card>
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircle size={36} color="#16a34a" />
            </div>
            <h3 style={{ color: "#16a34a", marginBottom: "0.75rem" }}>Tugas Berhasil Dikumpulkan!</h3>
            <p style={{ color: "#64748b", marginBottom: "0.375rem" }}>
              {tugasDummy.find((t) => String(t.id) === selectedTugas)?.judul || "Tugas kamu"}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "2rem" }}>
              Dikumpulkan pada {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <button
              onClick={() => { setUploaded(false); setSelectedTugas(""); setCatatan(""); setFileName(""); }}
              style={{ padding: "0.625rem 1.5rem", borderRadius: 8, background: "#2563eb", color: "white", border: "none", cursor: "pointer", fontWeight: 500 }}
            >
              Upload Tugas Lain
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Upload Tugas" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <h3 style={{ color: "#1e293b", marginBottom: "1.5rem" }}>Form Pengumpulan Tugas</h3>
            <form onSubmit={handleUpload}>
              <FormField label="Pilih Tugas">
                <Select value={selectedTugas} onChange={setSelectedTugas} options={tugasOpts} placeholder="Pilih tugas yang akan dikumpulkan" />
              </FormField>

              {/* Auto-filled fields */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nama Siswa">
                  <input
                    type="text"
                    value="Ahmad Fauzan"
                    readOnly
                    style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f1f5f9", fontSize: "0.875rem", outline: "none", color: "#64748b", boxSizing: "border-box", cursor: "not-allowed" }}
                  />
                </FormField>
                <FormField label="Kelas">
                  <input
                    type="text"
                    value="7A"
                    readOnly
                    style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f1f5f9", fontSize: "0.875rem", outline: "none", color: "#64748b", boxSizing: "border-box", cursor: "not-allowed" }}
                  />
                </FormField>
              </div>

              <FormField label="Upload File Jawaban">
                <label style={{ display: "block" }}>
                  <div style={{ border: "2px dashed #cbd5e1", borderRadius: 10, padding: "2rem", textAlign: "center", background: fileName ? "#f0fdf4" : "#f8fafc", cursor: "pointer", transition: "border-color 0.15s, background 0.15s", borderColor: fileName ? "#86efac" : "#cbd5e1" }}>
                    {fileName ? (
                      <>
                        <CheckCircle size={32} color="#16a34a" style={{ margin: "0 auto 0.75rem" }} />
                        <p style={{ color: "#16a34a", fontWeight: 600, marginBottom: "0.25rem" }}>{fileName}</p>
                        <p style={{ color: "#86efac", fontSize: "0.8rem" }}>File siap diupload</p>
                      </>
                    ) : (
                      <>
                        <Upload size={32} color="#94a3b8" style={{ margin: "0 auto 0.75rem" }} />
                        <p style={{ color: "#374151", fontWeight: 500, marginBottom: "0.25rem" }}>Klik atau drag file ke sini</p>
                        <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>PDF, DOC, DOCX, JPG, PNG · Maks 10MB</p>
                      </>
                    )}
                  </div>
                  <input type="file" onChange={handleFileChange} style={{ display: "none" }} accept=".pdf,.doc,.docx,.jpg,.png" />
                </label>
              </FormField>

              <FormField label="Catatan (opsional)">
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tambahkan catatan untuk guru..."
                  rows={3}
                  style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: "0.875rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
              </FormField>

              <button
                type="submit"
                disabled={!selectedTugas || !fileName}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", borderRadius: 8,
                  background: selectedTugas && fileName ? "#2563eb" : "#e2e8f0",
                  color: selectedTugas && fileName ? "white" : "#94a3b8",
                  border: "none", cursor: selectedTugas && fileName ? "pointer" : "not-allowed", fontWeight: 500, fontSize: "0.9rem"
                }}
              >
                <Upload size={16} /> Kumpulkan Tugas
              </button>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Catatan Penting</h3>
            {[
              "Pastikan file yang diupload adalah jawaban yang sudah selesai",
              "Format file: PDF, DOC, DOCX, JPG, atau PNG",
              "Ukuran maksimal: 10MB per file",
              "Tugas yang sudah dikumpulkan tidak dapat diedit",
              "Keterlambatan dapat mempengaruhi penilaian",
            ].map((note, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: "0.75rem" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </div>
                <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.5 }}>{note}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

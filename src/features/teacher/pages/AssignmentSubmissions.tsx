import { ExternalLink, FileText, Image, Save } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Input } from "@/components/common/Input";
import { Loading } from "@/components/common/Loading";
import { Modal } from "@/components/common/Modal";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { SubmissionTable } from "@/components/tables/SubmissionTable";
import { useSubmissions } from "@/hooks/useSubmissions";
import type { Submission } from "@/types/submission";

export function AssignmentSubmissions() {
  const { submissions, isLoading, error } = useSubmissions();
  const [selected, setSelected] = useState<Submission | null>(null);
  const [scores, setScores] = useState<Record<string, { score: string; type: string; note: string }>>({});
  const currentScore = selected ? scores[selected.id] ?? { score: "", type: "tugas", note: "" } : { score: "", type: "tugas", note: "" };
  const canGrade = selected?.status === "submitted" || selected?.status === "late";

  const updateScore = (value: Partial<{ score: string; type: string; note: string }>) => {
    if (!selected) return;
    setScores((items) => ({
      ...items,
      [selected.id]: { ...currentScore, ...value }
    }));
  };

  return (
    <div>
      <PageHeader title="Pengumpulan Tugas" description="Lihat detail pengumpulan siswa lalu input nilai langsung dari halaman ini." />
      <Card>
        {isLoading ? <Loading /> : error ? <p className="text-sm text-red-600">{error}</p> : <SubmissionTable submissions={submissions} showActions onView={setSelected} />}
      </Card>

      {selected && (
        <Modal title="Detail Pengumpulan & Input Nilai" onClose={() => setSelected(null)}>
          <div className="space-y-5">
            <DetailGrid items={[
              { label: "Nama Siswa", value: selected.studentName },
              { label: "Kelas", value: selected.className },
              { label: "Judul Tugas", value: selected.assignmentTitle },
              { label: "Tanggal Upload", value: selected.submittedAt ?? "-" },
              { label: "Catatan Siswa", value: selected.note ?? "-" }
            ]} />

            <section className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">File / Link Pengumpulan</h3>
                  <p className="text-sm text-slate-500">Preview dummy untuk file, gambar, atau link jawaban siswa.</p>
                </div>
                <Badge status={selected.status} />
              </div>
              {selected.fileUrl ? (
                <SubmissionPreview value={selected.fileUrl} />
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                  Siswa belum mengumpulkan file/link.
                </div>
              )}
              {selected.linkUrl && selected.linkUrl !== selected.fileUrl && (
                <div className="mt-3">
                  <SubmissionPreview value={selected.linkUrl} />
                </div>
              )}
            </section>

            <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-blue-950">Input Nilai Tugas</h3>
                <p className="text-sm text-blue-800">Nilai disimpan sementara di tampilan dummy. Saat Supabase aktif, nilai ini masuk ke tabel grades.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Select
                  label="Jenis Nilai"
                  value={currentScore.type}
                  disabled={!canGrade}
                  options={[
                    { value: "tugas", label: "Tugas" },
                    { value: "praktik", label: "Praktik" },
                    { value: "remedial", label: "Remedial" }
                  ]}
                  onChange={(event) => updateScore({ type: event.target.value })}
                />
                <Input
                  label="Nilai"
                  type="number"
                  min={0}
                  max={100}
                  disabled={!canGrade}
                  value={currentScore.score}
                  onChange={(event) => updateScore({ score: event.target.value })}
                  placeholder="0-100"
                />
                <Input
                  label="Catatan Nilai"
                  disabled={!canGrade}
                  value={currentScore.note}
                  onChange={(event) => updateScore({ note: event.target.value })}
                  placeholder="Opsional"
                />
              </div>
              {!canGrade && <p className="mt-3 text-sm text-red-700">Nilai belum bisa diinput karena siswa belum mengumpulkan tugas.</p>}
              <div className="mt-4 flex justify-end">
                <Button disabled={!canGrade} onClick={() => setSelected(null)}><Save className="h-4 w-4" />Simpan Nilai</Button>
              </div>
            </section>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SubmissionPreview({ value }: { value: string }) {
  const lower = value.toLowerCase();
  const isImage = [".png", ".jpg", ".jpeg", ".webp", ".gif"].some((extension) => lower.includes(extension));
  const isLink = lower.startsWith("http://") || lower.startsWith("https://");

  if (isImage) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Image className="h-4 w-4 text-blue-600" />Gambar jawaban
        </div>
        <div className="flex h-40 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-700">
          Preview gambar: {value}
        </div>
      </div>
    );
  }

  if (isLink) {
    return (
      <a href={value} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-blue-700 hover:bg-blue-50">
        <ExternalLink className="h-4 w-4" />
        Buka link pengumpulan siswa
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
      <FileText className="h-5 w-5 text-blue-600" />
      <div>
        <p className="font-medium">File jawaban</p>
        <p className="text-slate-500">{value}</p>
      </div>
    </div>
  );
}

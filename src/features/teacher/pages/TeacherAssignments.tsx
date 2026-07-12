import { CalendarCheck, ExternalLink, FileUp, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { Input } from "@/components/common/Input";
import { Modal } from "@/components/common/Modal";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignmentTable } from "@/components/tables/AssignmentTable";
import { useAssignments } from "@/hooks/useAssignments";
import { useClasses } from "@/hooks/useClasses";
import { useSubjects } from "@/hooks/useSubjects";
import { uploadAssignmentFile } from "@/lib/storage";
import { createAssignment, deleteAssignment, updateAssignment } from "@/services/assignmentService";
import { getCurrentTeacherProfile } from "@/services/profileService";
import type { Assignment } from "@/types/assignment";
import { formatDate } from "@/utils/formatDate";

interface AssignmentDraft {
  title: string;
  description: string;
  classId: string;
  subjectId: string;
  publishAt: string;
  deadline: string;
  status: "active" | "closed";
  linkUrl: string;
  file: File | null;
}

const emptyDraft: AssignmentDraft = {
  title: "",
  description: "",
  classId: "",
  subjectId: "",
  publishAt: toDatetimeLocal(new Date().toISOString()),
  deadline: "",
  status: "active",
  linkUrl: "",
  file: null
};

export function TeacherAssignments() {
  const { assignments, refetch } = useAssignments();
  const { classes } = useClasses();
  const { subjects } = useSubjects();
  const [teacherId, setTeacherId] = useState("");
  const [draft, setDraft] = useState<AssignmentDraft>(emptyDraft);
  const [editing, setEditing] = useState<Assignment | null>(null);
  const [viewing, setViewing] = useState<Assignment | null>(null);
  const [deleting, setDeleting] = useState<Assignment | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void getCurrentTeacherProfile().then((profile) => setTeacherId(profile.teacherId)).catch(() => setTeacherId(""));
  }, []);

  const classOptions = useMemo(() => classes.map((item) => ({ value: item.id, label: item.name })), [classes]);
  const subjectOptions = useMemo(() => subjects.map((item) => ({ value: item.id, label: `${item.name} (KKM ${item.kkm})` })), [subjects]);

  const openCreate = () => {
    setDraft({
      ...emptyDraft,
      classId: classes[0]?.id ?? "",
      subjectId: subjects[0]?.id ?? ""
    });
    setEditing(null);
    setError("");
    setFormOpen(true);
  };

  const openEdit = (assignment: Assignment) => {
    setDraft({
      title: assignment.title,
      description: assignment.description,
      classId: assignment.classId,
      subjectId: assignment.subjectId,
      publishAt: toDatetimeLocal(assignment.publishAt ?? new Date().toISOString()),
      deadline: toDatetimeLocal(assignment.deadline),
      status: assignment.status === "closed" ? "closed" : "active",
      linkUrl: assignment.linkUrl ?? "",
      file: null
    });
    setEditing(assignment);
    setError("");
    setFormOpen(true);
  };

  const saveAssignment = async () => {
    if (!teacherId) {
      setError("Data guru belum terhubung. Jalankan seed SQL terbaru atau buka profile lalu simpan.");
      return;
    }
    if (!draft.title.trim() || !draft.classId || !draft.subjectId || !draft.publishAt || !draft.deadline) {
      setError("Judul, kelas, mata pelajaran, tanggal publish, dan deadline wajib diisi.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const baseAssignment: Assignment = {
        id: editing?.id ?? crypto.randomUUID(),
        teacherId,
        teacherName: editing?.teacherName ?? "",
        classId: draft.classId,
        className: classes.find((item) => item.id === draft.classId)?.name ?? "",
        subjectId: draft.subjectId,
        subjectName: subjects.find((item) => item.id === draft.subjectId)?.name ?? "",
        title: draft.title.trim(),
        description: draft.description.trim(),
        linkUrl: draft.linkUrl.trim() || undefined,
        fileUrl: editing?.fileUrl,
        filePath: editing?.filePath,
        publishAt: new Date(draft.publishAt).toISOString(),
        deadline: new Date(draft.deadline).toISOString(),
        status: draft.status,
        submittedCount: editing?.submittedCount ?? 0
      };

      const saved = editing ? await updateAssignment(editing.id, baseAssignment) : await createAssignment(baseAssignment);

      if (draft.file) {
        const uploaded = await uploadAssignmentFile(draft.file, teacherId, saved.id);
        await updateAssignment(saved.id, { fileUrl: uploaded.publicUrl, filePath: uploaded.path });
      }

      await refetch();
      setFormOpen(false);
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tugas gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteAssignment(deleting.id);
      await refetch();
      setDeleting(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tugas gagal dihapus.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Tugas"
        description="Buat tugas, jadwalkan publish, upload file tugas, atau tambahkan link."
        actions={<Button onClick={openCreate}><Plus className="h-4 w-4" />Buat Tugas</Button>}
      />
      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      <Card><AssignmentTable assignments={assignments} showActions onView={setViewing} onEdit={openEdit} onDelete={setDeleting} /></Card>

      {formOpen && (
        <Modal title={editing ? "Edit Tugas" : "Buat Tugas"} onClose={() => setFormOpen(false)}>
          <div className="space-y-4">
            <Input label="Judul Tugas" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Masukkan judul tugas" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Deskripsi Tugas</span>
              <textarea
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                className="min-h-28 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                placeholder="Tulis instruksi tugas"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Kelas" value={draft.classId} options={[{ value: "", label: "Pilih kelas" }, ...classOptions]} onChange={(event) => setDraft({ ...draft, classId: event.target.value })} />
              <Select label="Mata Pelajaran" value={draft.subjectId} options={[{ value: "", label: "Pilih mapel" }, ...subjectOptions]} onChange={(event) => setDraft({ ...draft, subjectId: event.target.value })} />
              <Input label="Tanggal & Jam Publish" type="datetime-local" value={draft.publishAt} onChange={(event) => setDraft({ ...draft, publishAt: event.target.value })} />
              <Input label="Deadline" type="datetime-local" value={draft.deadline} onChange={(event) => setDraft({ ...draft, deadline: event.target.value })} />
              <Select
                label="Status"
                value={draft.status}
                options={[
                  { value: "active", label: "Aktif" },
                  { value: "closed", label: "Ditutup" }
                ]}
                onChange={(event) => setDraft({ ...draft, status: event.target.value as "active" | "closed" })}
              />
            </div>
            <Input label="Link Tugas" value={draft.linkUrl} onChange={(event) => setDraft({ ...draft, linkUrl: event.target.value })} placeholder="Google Drive, YouTube, website, dll." />
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 hover:bg-slate-100">
              <FileUp className="h-5 w-5 shrink-0 text-blue-600" />
              <span className="min-w-0 truncate">{draft.file?.name || editing?.fileUrl || "Pilih PDF/gambar/file tugas"}</span>
              <input type="file" className="sr-only" onChange={(event) => setDraft({ ...draft, file: event.target.files?.[0] ?? null })} />
            </label>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={() => setFormOpen(false)} disabled={isSaving} className="w-full sm:w-auto">Batal</Button>
              <Button onClick={saveAssignment} disabled={isSaving} className="w-full sm:w-auto"><Save className="h-4 w-4" />{isSaving ? "Menyimpan..." : "Simpan"}</Button>
            </div>
          </div>
        </Modal>
      )}

      {viewing && (
        <Modal title="Detail Tugas" onClose={() => setViewing(null)}>
          <AssignmentDetail assignment={viewing} />
        </Modal>
      )}

      {deleting && (
        <Modal title="Hapus Tugas" onClose={() => setDeleting(null)}>
          <ConfirmDelete label={deleting.title} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />
        </Modal>
      )}
    </div>
  );
}

function AssignmentDetail({ assignment }: { assignment: Assignment }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900">{assignment.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{assignment.subjectName} - {assignment.className}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <DetailBox label="Guru" value={assignment.teacherName} />
        <DetailBox label="Status" value={<Badge status={assignment.status} />} />
        <DetailBox label="Publish" value={assignment.publishAt ? formatDate(assignment.publishAt) : "-"} />
        <DetailBox label="Deadline" value={formatDate(assignment.deadline)} />
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">Deskripsi</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{assignment.description || "-"}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {assignment.linkUrl && <OpenButton href={assignment.linkUrl} label="Buka Link" />}
        {assignment.fileUrl && <OpenButton href={assignment.fileUrl} label="Buka File" />}
      </div>
    </div>
  );
}

function DetailBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function OpenButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Button variant="outline" size="sm">
        <ExternalLink className="h-4 w-4" />{label}
      </Button>
    </a>
  );
}

function toDatetimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

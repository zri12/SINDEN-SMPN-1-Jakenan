import { ExternalLink, FileUp, Link, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { Loading } from "@/components/common/Loading";
import { Modal } from "@/components/common/Modal";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAssignments } from "@/hooks/useAssignments";
import { useSubmissions } from "@/hooks/useSubmissions";
import { uploadSubmissionFile } from "@/lib/storage";
import { createSubmission } from "@/services/submissionService";
import { getCurrentStudent } from "@/services/studentService";
import type { Assignment } from "@/types/assignment";
import type { Student } from "@/types/student";
import type { Submission } from "@/types/submission";
import { formatDate } from "@/utils/formatDate";

export function MyAssignments() {
  const { assignments: allAssignments, isLoading: assignmentsLoading, error: assignmentsError } = useAssignments();
  const { submissions, isLoading: submissionsLoading, error: submissionsError, refetch: refetchSubmissions } = useSubmissions();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [studentError, setStudentError] = useState("");
  const [selected, setSelected] = useState<Assignment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submission, setSubmission] = useState<{ file: File | null; link: string; note: string }>({ file: null, link: "", note: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    void getCurrentStudent()
      .then(setCurrentStudent)
      .catch((err) => setStudentError(err instanceof Error ? err.message : "Data siswa aktif gagal dimuat."));
  }, []);

  const assignments = useMemo(
    () => allAssignments.filter((item) => !currentStudent || item.classId === currentStudent.classId || item.className === currentStudent.className),
    [allAssignments, currentStudent]
  );

  const submissionsByAssignment = useMemo(() => {
    const map = new Map<string, Submission>();
    submissions.forEach((item) => map.set(item.assignmentId, item));
    return map;
  }, [submissions]);

  useEffect(() => {
    if (!selected && assignments.length > 0) {
      setSelected(assignments[0]);
      return;
    }
    if (selected && !assignments.some((item) => item.id === selected.id)) {
      setSelected(assignments[0] ?? null);
    }
  }, [assignments, selected]);

  const submitAssignment = async () => {
    if (!selected || !currentStudent) return;
    if (!submission.file && !submission.link.trim()) {
      setSubmitError("Tambahkan file/gambar atau link jawaban terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      let filePath: string | undefined;
      let fileUrl: string | undefined;

      if (submission.file) {
        const uploaded = await uploadSubmissionFile(submission.file, currentStudent.id, selected.id);
        filePath = uploaded.path;
        fileUrl = uploaded.publicUrl;
      }

      await createSubmission({
        id: submissionsByAssignment.get(selected.id)?.id ?? "",
        assignmentId: selected.id,
        assignmentTitle: selected.title,
        studentId: currentStudent.id,
        studentName: currentStudent.fullName,
        className: currentStudent.className,
        fileUrl,
        filePath,
        linkUrl: submission.link.trim() || undefined,
        note: submission.note.trim() || undefined,
        status: isLate(selected.deadline) ? "late" : "submitted",
        submittedAt: new Date().toISOString()
      });

      await refetchSubmissions();
      setModalOpen(false);
      setSubmission({ file: null, link: "", note: "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Pengumpulan tugas gagal dikirim.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageLoading = assignmentsLoading || submissionsLoading || !currentStudent;
  const pageError = assignmentsError || submissionsError || studentError;

  return (
    <div>
      <PageHeader title="Tugas Saya" description="Klik tugas untuk melihat detail dan mengumpulkan jawaban." />
      {pageLoading && !pageError && <Loading />}
      {pageError && <Card><p className="text-sm text-red-600">{pageError}</p></Card>}
      {!pageLoading && !pageError && (
        <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
          <div className="space-y-3">
            {assignments.map((assignment) => {
              const existingSubmission = submissionsByAssignment.get(assignment.id);
              const submitted = Boolean(existingSubmission);
              return (
                <button
                  key={assignment.id}
                  onClick={() => setSelected(assignment)}
                  className={`w-full rounded-xl border p-4 text-left shadow-soft transition ${selected?.id === assignment.id ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white hover:border-blue-100 hover:bg-slate-50"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{assignment.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{assignment.subjectName} - {assignment.teacherName}</p>
                    </div>
                    <Badge status={submitted ? existingSubmission?.status === "late" ? "Terlambat" : "Sudah Mengumpulkan" : assignment.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-white px-2.5 py-1">{assignment.className}</span>
                    <span className="rounded-full bg-white px-2.5 py-1">Deadline {formatDate(assignment.deadline)}</span>
                  </div>
                </button>
              );
            })}
            {assignments.length === 0 && (
              <Card>
                <p className="text-sm text-slate-500">Belum ada tugas untuk kelas {currentStudent?.className}.</p>
              </Card>
            )}
          </div>

          <Card>
            {selected ? (
              <AssignmentDetail
                assignment={selected}
                existingSubmission={submissionsByAssignment.get(selected.id)}
                onOpenSubmit={() => {
                  const existing = submissionsByAssignment.get(selected.id);
                  setSubmitError("");
                  setSubmission({ file: null, link: existing?.linkUrl ?? "", note: existing?.note ?? "" });
                  setModalOpen(true);
                }}
              />
            ) : (
              <p className="text-sm text-slate-500">Pilih tugas terlebih dahulu.</p>
            )}
          </Card>
        </div>
      )}

      {modalOpen && selected && (
        <Modal title="Kumpulkan Tugas" onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
              Pengumpulan untuk <strong>{selected.title}</strong>. Siswa boleh mengirim file/gambar, link, atau keduanya.
            </div>
            {submitError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 hover:bg-slate-100">
              <FileUp className="h-5 w-5 text-blue-600" />
              <span>{submission.file?.name || "Pilih file/gambar jawaban"}</span>
              <input type="file" className="sr-only" onChange={(event) => setSubmission({ ...submission, file: event.target.files?.[0] ?? null })} />
            </label>
            <Input label="Link Jawaban" value={submission.link} onChange={(event) => setSubmission({ ...submission, link: event.target.value })} placeholder="Google Drive, YouTube, website, dll." />
            <Input label="Catatan" value={submission.note} onChange={(event) => setSubmission({ ...submission, note: event.target.value })} placeholder="Catatan untuk guru" />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={isSubmitting}>Batal</Button>
              <Button onClick={submitAssignment} disabled={isSubmitting}><Link className="h-4 w-4" />{isSubmitting ? "Mengirim..." : "Kirim Pengumpulan"}</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AssignmentDetail({ assignment, existingSubmission, onOpenSubmit }: { assignment: Assignment; existingSubmission?: Submission; onOpenSubmit: () => void }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{assignment.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{assignment.subjectName} - {assignment.teacherName}</p>
        </div>
        <Badge status={existingSubmission ? existingSubmission.status === "late" ? "Terlambat" : "Sudah Mengumpulkan" : assignment.status} />
      </div>
      <dl className="grid gap-3 sm:grid-cols-3">
        <InfoBox label="Kelas" value={assignment.className} />
        <InfoBox label="Deadline" value={formatDate(assignment.deadline)} />
        <InfoBox label="Status" value={existingSubmission ? "Sudah Mengumpulkan" : "Belum Mengumpulkan"} />
      </dl>
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">Deskripsi Tugas</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{assignment.description}</p>
      </div>

      {existingSubmission && (
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
          <p className="font-semibold">Pengumpulan Anda</p>
          <p className="mt-1">Tanggal: {existingSubmission.submittedAt ? formatDate(existingSubmission.submittedAt) : "-"}</p>
          {existingSubmission.note && <p className="mt-1">Catatan: {existingSubmission.note}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {existingSubmission.fileUrl && <OpenButton href={existingSubmission.fileUrl} label="Buka File" />}
            {existingSubmission.linkUrl && <OpenButton href={existingSubmission.linkUrl} label="Buka Link" />}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {assignment.linkUrl && <OpenButton href={assignment.linkUrl} label="Buka Link Tugas" />}
        {assignment.fileUrl && <OpenButton href={assignment.fileUrl} label="Buka File Tugas" />}
        <Button onClick={onOpenSubmit}>
          <Upload className="h-4 w-4" />{existingSubmission ? "Ubah Pengumpulan" : "Kumpulkan Tugas"}
        </Button>
      </div>
    </div>
  );
}

function OpenButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Button variant="outline">
        <ExternalLink className="h-4 w-4" />{label}
      </Button>
    </a>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function isLate(deadline: string) {
  if (!deadline) return false;
  return new Date(deadline).getTime() < Date.now();
}

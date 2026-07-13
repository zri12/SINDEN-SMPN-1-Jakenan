import { ArrowLeft, CalendarCheck, Clock, ClipboardList, ExternalLink, FileUp, Link, Search, Send, Upload, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { Input } from "@/components/common/Input";
import { Loading } from "@/components/common/Loading";
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

type AssignmentTab = "todo" | "missed" | "submitted";

export function MyAssignments() {
  const { assignments: allAssignments, isLoading: assignmentsLoading, error: assignmentsError } = useAssignments();
  const { submissions, isLoading: submissionsLoading, error: submissionsError, refetch: refetchSubmissions } = useSubmissions();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [studentError, setStudentError] = useState("");
  const [selected, setSelected] = useState<Assignment | null>(null);
  const [activeTab, setActiveTab] = useState<AssignmentTab>("todo");
  const [search, setSearch] = useState("");
  const [submission, setSubmission] = useState<{ file: File | null; link: string; note: string }>({ file: null, link: "", note: "" });
  const [privateComment, setPrivateComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    void getCurrentStudent()
      .then(setCurrentStudent)
      .catch((err) => setStudentError(err instanceof Error ? err.message : "Data siswa aktif gagal dimuat."));
  }, []);

  const assignments = useMemo(
    () => allAssignments.filter((item) => isPublished(item.publishAt) && (!currentStudent || !currentStudent.classId || item.classId === currentStudent.classId || item.className === currentStudent.className)),
    [allAssignments, currentStudent]
  );

  const submissionsByAssignment = useMemo(() => {
    const map = new Map<string, Submission>();
    submissions.forEach((item) => map.set(item.assignmentId, item));
    return map;
  }, [submissions]);

  const grouped = useMemo(() => {
    const todo: Assignment[] = [];
    const missed: Assignment[] = [];
    const submitted: Assignment[] = [];

    assignments.forEach((assignment) => {
      if (submissionsByAssignment.has(assignment.id)) {
        submitted.push(assignment);
      } else if (isLate(assignment.deadline)) {
        missed.push(assignment);
      } else {
        todo.push(assignment);
      }
    });

    return { todo, missed, submitted };
  }, [assignments, submissionsByAssignment]);

  const visibleAssignments = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return grouped[activeTab].filter((assignment) => {
      if (!keyword) return true;
      return [assignment.title, assignment.subjectName, assignment.teacherName, assignment.className].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [activeTab, grouped, search]);

  const pageLoading = assignmentsLoading || submissionsLoading || !currentStudent;
  const pageError = assignmentsError || submissionsError || studentError;

  const openDetail = (assignment: Assignment) => {
    const existing = submissionsByAssignment.get(assignment.id);
    setSelected(assignment);
    setSubmitError("");
    setPrivateComment(existing?.note ?? "");
    setSubmission({ file: null, link: existing?.linkUrl ?? "", note: existing?.note ?? "" });
  };

  const submitAssignment = async () => {
    if (!selected || !currentStudent) return;
    if (!currentStudent.id || !currentStudent.classId) {
      setSubmitError("Data siswa belum terhubung ke kelas. Jalankan seed SQL terbaru atau perbaiki data siswa di admin.");
      return;
    }
    if (isLate(selected.deadline)) {
      setSubmitError("Deadline tugas sudah berakhir. Jawaban tidak bisa dikirim lagi.");
      return;
    }
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
        note: submission.note.trim() || privateComment.trim() || undefined,
        status: isLate(selected.deadline) ? "late" : "submitted",
        submittedAt: new Date().toISOString()
      });

      await refetchSubmissions();
      setSubmission({ file: null, link: "", note: "" });
      setPrivateComment("");
      setSelected(null);
      setActiveTab("submitted");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Pengumpulan tugas gagal dikirim.";
      setSubmitError(message.includes("row-level security") ? "Akses submit ditolak Supabase. Jalankan ulang migration final 004 sampai 009 sesuai README SQL." : message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selected) {
    return (
      <AssignmentDetailPage
        assignment={selected}
        existingSubmission={submissionsByAssignment.get(selected.id)}
        submission={submission}
        privateComment={privateComment}
        submitError={submitError}
        isSubmitting={isSubmitting}
        isDeadlineClosed={isLate(selected.deadline)}
        onBack={() => setSelected(null)}
        onChangeSubmission={setSubmission}
        onChangePrivateComment={setPrivateComment}
        onSubmit={submitAssignment}
      />
    );
  }

  return (
    <div>
      <PageHeader title="Tugas Saya" description="Daftar tugas yang perlu dikerjakan dan sudah dikumpulkan." />
      {pageLoading && !pageError && <Loading />}
      {pageError && <Card><p className="text-sm text-red-600">{pageError}</p></Card>}
      {!pageLoading && !pageError && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="max-w-xl flex-1">
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari judul, mapel, guru, atau kelas..." />
            </div>
            <Button className="w-full md:w-24"><Search className="h-4 w-4" /></Button>
          </div>

          <div className="border-b border-blue-300">
            <div className="flex flex-wrap gap-1">
              <AssignmentTabButton label="Todo" count={grouped.todo.length} active={activeTab === "todo"} onClick={() => setActiveTab("todo")} />
              <AssignmentTabButton label="Missed" count={grouped.missed.length} active={activeTab === "missed"} onClick={() => setActiveTab("missed")} />
              <AssignmentTabButton label="Submitted" count={grouped.submitted.length} active={activeTab === "submitted"} onClick={() => setActiveTab("submitted")} />
            </div>
          </div>

          {visibleAssignments.length === 0 ? (
            <EmptyState title="Belum ada tugas" description="Tugas akan muncul sesuai kelas dan status pengumpulan Anda." />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {visibleAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  tab={activeTab}
                  submitted={Boolean(submissionsByAssignment.get(assignment.id))}
                  onClick={() => openDetail(assignment)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AssignmentTabButton({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center gap-2 px-5 text-sm font-semibold transition ${active ? "rounded-t-lg bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"}`}
    >
      {label}
      <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${active ? "bg-red-400 text-white" : "bg-red-500 text-white"}`}>{count}</span>
    </button>
  );
}

function AssignmentCard({ assignment, tab, submitted, onClick }: { assignment: Assignment; tab: AssignmentTab; submitted: boolean; onClick: () => void }) {
  const tone = tab === "missed" ? "red" : submitted ? "blue" : "slate";

  return (
    <button type="button" onClick={onClick} className="w-full rounded-lg bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-blue-600">{assignment.title}</h3>
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">{assignment.subjectName || "Mata Pelajaran"} | {assignment.className}</p>
          <p className="mt-1 text-sm text-slate-500">Reguler | {assignment.className}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${tone === "red" ? "bg-red-100 text-red-500" : tone === "blue" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-700"}`}>
          <ClipboardList className="h-4 w-4" />Assignment
        </span>
      </div>
      <div className="my-5 border-t border-slate-100" />
      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
        <User className="h-4 w-4" />{assignment.teacherName || "-"}
      </div>
      <div className="my-5 border-t border-slate-100" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="text-sm text-slate-700">
          <p className="font-semibold text-slate-800">Start Date</p>
          <p className="mt-1">{formatDate(assignment.publishAt ?? assignment.deadline)}</p>
          <p>{formatTime(assignment.publishAt ?? assignment.deadline)}</p>
        </div>
        <div className="text-sm text-slate-700">
          <p className="flex items-center gap-2 font-semibold text-blue-600"><CalendarCheck className="h-4 w-4" />Due Date</p>
          <p className="mt-1">{assignment.deadline ? formatDate(assignment.deadline) : "No Due Date"}</p>
          {assignment.deadline && <p className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatTime(assignment.deadline)}</p>}
        </div>
      </div>
    </button>
  );
}

function AssignmentDetailPage({
  assignment,
  existingSubmission,
  submission,
  privateComment,
  submitError,
  isSubmitting,
  isDeadlineClosed,
  onBack,
  onChangeSubmission,
  onChangePrivateComment,
  onSubmit
}: {
  assignment: Assignment;
  existingSubmission?: Submission;
  submission: { file: File | null; link: string; note: string };
  privateComment: string;
  submitError: string;
  isSubmitting: boolean;
  isDeadlineClosed: boolean;
  onBack: () => void;
  onChangeSubmission: (value: { file: File | null; link: string; note: string }) => void;
  onChangePrivateComment: (value: string) => void;
  onSubmit: () => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(Boolean(submission.link));
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setShowLinkInput(Boolean(submission.link));
  }, [submission.link]);

  return (
    <div>
      <PageHeader
        title="Detail Tugas"
        description="Detail tugas dan pengumpulan jawaban."
        actions={<Button variant="secondary" onClick={onBack}><ArrowLeft className="h-4 w-4" />Kembali</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge status={isDeadlineClosed ? "closed" : assignment.status} />
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">{assignment.title}</h2>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-500">{assignment.subjectName} | {assignment.className}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                  <ClipboardList className="h-4 w-4" />Assignment
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{assignment.teacherName?.[0] ?? "G"}</span>
                <div>
                  <p className="font-semibold text-slate-800">{assignment.teacherName || "-"}</p>
                  <p className="text-sm text-slate-500">Dipublish {formatDate(assignment.publishAt ?? assignment.deadline)} pukul {formatTime(assignment.publishAt ?? assignment.deadline)}</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">Instruksi Tugas</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{assignment.description || "Tidak ada deskripsi tugas."}</p>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailItem icon={CalendarCheck} label="Start Date" value={formatDate(assignment.publishAt ?? assignment.deadline)} helper={formatTime(assignment.publishAt ?? assignment.deadline)} />
                <DetailItem icon={CalendarCheck} label="Due Date" value={assignment.deadline ? formatDate(assignment.deadline) : "no due date"} helper={assignment.deadline ? formatTime(assignment.deadline) : "-"} />
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {assignment.linkUrl && <OpenButton href={assignment.linkUrl} label="Buka Link Tugas" />}
                {assignment.fileUrl ? <OpenButton href={assignment.fileUrl} label="Buka File Tugas" /> : assignment.filePath ? <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">File belum bisa dibuka. Pastikan bucket assignment-files sudah dibuat di Supabase.</p> : null}
              </div>
            </div>
          </Card>

          <Card className="p-0">
            <div className="p-5">
              <h3 className="font-bold text-slate-800">Komentar</h3>
            </div>
            <div className="border-t border-slate-100 p-5">
              <div className="flex gap-2">
                <Input value={submission.note} onChange={(event) => onChangeSubmission({ ...submission, note: event.target.value })} placeholder="Add Comment here..." />
                <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="Kirim komentar">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold text-slate-800">Tugas Anda</h3>
            <p className="mt-1 text-sm text-slate-500">Upload tugas anda disini</p>
            {existingSubmission && (
              <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                <p className="font-semibold">Sudah dikumpulkan</p>
                <p className="mt-1">{existingSubmission.submittedAt ? formatDate(existingSubmission.submittedAt) : "-"}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {existingSubmission.fileUrl && <OpenButton href={existingSubmission.fileUrl} label="File" />}
                  {existingSubmission.linkUrl && <OpenButton href={existingSubmission.linkUrl} label="Link" />}
                </div>
              </div>
            )}
            {isDeadlineClosed && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Deadline sudah berakhir. Pengumpulan jawaban ditutup.</p>}
            {submitError && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>}
            <div className="relative mt-6">
              <button
                type="button"
                disabled={isDeadlineClosed}
                onClick={() => setAddOpen((value) => !value)}
                className="flex min-h-12 w-full items-center justify-center rounded border border-slate-400 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex min-w-0 items-center gap-2 truncate"><FileUp className="h-4 w-4" />{submission.file?.name || "+ Add"}</span>
              </button>
              {addOpen && (
                <div className="absolute left-0 right-0 top-full z-20 rounded-b-lg border border-slate-200 bg-white py-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setAddOpen(false);
                      fileInputRef.current?.click();
                    }}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-slate-700 hover:bg-blue-50"
                  >
                    <FileUp className="h-4 w-4" />File
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddOpen(false);
                      setShowLinkInput(true);
                    }}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-slate-700 hover:bg-blue-50"
                  >
                    <Link className="h-4 w-4" />Link
                  </button>
                </div>
              )}
              <input ref={fileInputRef} type="file" className="sr-only" disabled={isDeadlineClosed} onChange={(event) => onChangeSubmission({ ...submission, file: event.target.files?.[0] ?? null })} />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ekstensi file yang diizinkan: .jpg, .jpeg, .png, .pdf, .docx, .doc, .ppt, .pptx, .xls, .xlsx, .txt, .zip, .rar, .7zip
            </p>
            <p className="text-sm text-slate-500">Ukuran file yang diizinkan: 10 MB</p>
            {showLinkInput && (
              <Input className="mt-4" value={submission.link} disabled={isDeadlineClosed} onChange={(event) => onChangeSubmission({ ...submission, link: event.target.value })} placeholder="Link jawaban" />
            )}
            <Button onClick={onSubmit} disabled={isSubmitting || isDeadlineClosed} className="mt-5 w-full bg-slate-800 hover:bg-slate-900">
              <Upload className="h-4 w-4" />{isSubmitting ? "Mengirim..." : "Submit"}
            </Button>
          </Card>

          <Card className="p-0">
            <div className="p-5">
              <h3 className="font-bold text-slate-800">Komentar Pribadi</h3>
            </div>
            <div className="border-t border-slate-100 p-5">
              <div className="flex gap-2">
                <Input value={privateComment} onChange={(event) => onChangePrivateComment(event.target.value)} placeholder="Add Comment here..." />
                <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="Kirim komentar pribadi">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, helper }: { icon: typeof CalendarCheck; label: string; value: string; helper: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-700 shadow-sm">
      <p className="flex items-center gap-2 font-semibold text-slate-800"><Icon className="h-4 w-4 text-blue-600" />{label}</p>
      <p className="mt-4">{value}</p>
      <p className="mt-1 flex items-center gap-1 text-slate-500"><Clock className="h-3.5 w-3.5" />{helper}</p>
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

function isLate(deadline: string) {
  if (!deadline) return false;
  return new Date(deadline).getTime() < Date.now();
}

function isPublished(publishAt?: string) {
  if (!publishAt) return true;
  return new Date(publishAt).getTime() <= Date.now();
}

function formatTime(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date).replace(".", ":");
}

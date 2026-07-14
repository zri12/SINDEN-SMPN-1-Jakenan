import type { Submission } from "@/types/submission";
import { createSignedUrl } from "@/lib/storage";
import { clearDataCache, getSupabase, handleSupabaseError, omitUndefined, requireSupabase } from "./serviceUtils";

export async function getSubmissions() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("submissions")
    .select("*, assignments(title, teacher_id, class_id, subject_id, subjects(name, kkm)), students(full_name, class_id, classes(name))")
    .order("submitted_at", { ascending: false });
  if (error) handleSupabaseError(error, "Data pengumpulan gagal dimuat.");
  return Promise.all((data ?? []).map(mapSubmission));
}

export async function getSubmissionStatuses() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("teacher_submission_status_view")
    .select("*")
    .order("title", { ascending: true })
    .order("student_name", { ascending: true });
  if (error) handleSupabaseError(error, "Data status pengumpulan gagal dimuat.");
  return Promise.all((data ?? []).map(mapSubmissionStatus));
}

export async function createSubmission(submission: Submission) {
  const client = requireSupabase();

  const { data, error } = await client
    .from("submissions")
    .upsert(toSubmissionRow(submission), { onConflict: "assignment_id,student_id" })
    .select("*, assignments(title, teacher_id, class_id, subject_id, subjects(name, kkm)), students(full_name, class_id, classes(name))")
    .single();
  if (error) handleSupabaseError(error, "Pengumpulan tugas gagal disimpan.");
  clearDataCache();
  return mapSubmission(data);
}

export async function updateSubmission(id: string, submission: Partial<Submission>) {
  const client = requireSupabase();

  const { data, error } = await client.from("submissions").update(toSubmissionRow(submission)).eq("id", id).select("*, assignments(title, teacher_id, class_id, subject_id, subjects(name, kkm)), students(full_name, class_id, classes(name))").single();
  if (error) handleSupabaseError(error, "Pengumpulan tugas gagal diperbarui.");
  clearDataCache();
  return mapSubmission(data);
}

async function mapSubmission(row: any): Promise<Submission> {
  const filePath = row.submission_file_path ?? undefined;
  const signedFileUrl = filePath ? await getSafeSignedUrl(filePath) : undefined;

  return {
    id: row.id,
    assignmentId: row.assignment_id,
    assignmentTitle: row.assignments?.title ?? "-",
    teacherId: row.assignments?.teacher_id ?? undefined,
    classId: row.assignments?.class_id ?? row.students?.class_id ?? undefined,
    subjectId: row.assignments?.subject_id ?? undefined,
    subjectName: row.assignments?.subjects?.name ?? undefined,
    kkm: row.assignments?.subjects?.kkm ?? undefined,
    studentId: row.student_id,
    studentName: row.students?.full_name ?? "-",
    className: row.students?.classes?.name ?? "-",
    fileUrl: signedFileUrl ?? row.submission_file_url ?? row.submission_link_url ?? undefined,
    filePath,
    linkUrl: row.submission_link_url ?? undefined,
    note: row.note ?? undefined,
    status: row.status === "late" ? "late" : "submitted",
    submittedAt: row.submitted_at ?? undefined
  };
}

async function mapSubmissionStatus(row: any): Promise<Submission> {
  const filePath = row.submission_file_path ?? undefined;
  const signedFileUrl = filePath ? await getSafeSignedUrl(filePath) : undefined;
  const submissionId = row.submission_id ?? `${row.assignment_id}-${row.student_id}`;

  return {
    id: submissionId,
    assignmentId: row.assignment_id,
    assignmentTitle: row.title ?? "-",
    teacherId: row.teacher_id ?? undefined,
    classId: row.class_id ?? undefined,
    subjectId: row.subject_id ?? undefined,
    subjectName: row.subject_name ?? undefined,
    kkm: row.kkm ?? undefined,
    studentId: row.student_id,
    studentName: row.student_name ?? "-",
    className: row.class_name ?? "-",
    fileUrl: signedFileUrl ?? row.submission_file_url ?? row.submission_link_url ?? undefined,
    filePath,
    linkUrl: row.submission_link_url ?? undefined,
    note: row.note ?? undefined,
    status: mapSubmissionStatusValue(row.submission_status),
    submittedAt: row.submitted_at ?? undefined
  };
}

function mapSubmissionStatusValue(status?: string): Submission["status"] {
  if (status === "late") return "late";
  if (status === "submitted" || status === "reviewed") return "submitted";
  return "not_submitted";
}

function toSubmissionRow(submission: Partial<Submission>) {
  return omitUndefined({
    assignment_id: submission.assignmentId,
    student_id: submission.studentId,
    submission_file_url: submission.fileUrl && !submission.filePath ? submission.fileUrl : undefined,
    submission_file_path: submission.filePath,
    submission_link_url: submission.linkUrl,
    note: submission.note,
    status: submission.status === "not_submitted" ? "submitted" : submission.status
  });
}

async function getSafeSignedUrl(path: string) {
  try {
    return await createSignedUrl("submission-files", path, 60 * 60);
  } catch {
    return undefined;
  }
}

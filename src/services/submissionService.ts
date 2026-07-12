import { dummySubmissions } from "@/data/dummySubmissions";
import type { Submission } from "@/types/submission";
import { createSignedUrl } from "@/lib/storage";
import { getSupabase, handleSupabaseError, omitUndefined } from "./serviceUtils";

export async function getSubmissions() {
  const client = getSupabase();
  if (!client) return dummySubmissions;

  const { data, error } = await client
    .from("submissions")
    .select("*, assignments(title), students(full_name, classes(name))")
    .order("submitted_at", { ascending: false });
  if (error) handleSupabaseError(error, "Data pengumpulan gagal dimuat.");
  return Promise.all((data ?? []).map(mapSubmission));
}

export async function createSubmission(submission: Submission) {
  const client = getSupabase();
  if (!client) return submission;

  const { data, error } = await client
    .from("submissions")
    .upsert(toSubmissionRow(submission), { onConflict: "assignment_id,student_id" })
    .select("*, assignments(title), students(full_name, classes(name))")
    .single();
  if (error) handleSupabaseError(error, "Pengumpulan tugas gagal disimpan.");
  return mapSubmission(data);
}

export async function updateSubmission(id: string, submission: Partial<Submission>) {
  const client = getSupabase();
  if (!client) return { id, ...submission };

  const { data, error } = await client.from("submissions").update(toSubmissionRow(submission)).eq("id", id).select("*, assignments(title), students(full_name, classes(name))").single();
  if (error) handleSupabaseError(error, "Pengumpulan tugas gagal diperbarui.");
  return mapSubmission(data);
}

async function mapSubmission(row: any): Promise<Submission> {
  const filePath = row.submission_file_path ?? undefined;
  const signedFileUrl = filePath ? await getSafeSignedUrl(filePath) : undefined;

  return {
    id: row.id,
    assignmentId: row.assignment_id,
    assignmentTitle: row.assignments?.title ?? "-",
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

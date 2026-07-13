import type { Assignment } from "@/types/assignment";
import { createSignedUrl } from "@/lib/storage";
import { getSupabase, handleSupabaseError, omitUndefined } from "./serviceUtils";

export async function getAssignments() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("assignments")
    .select("*, teachers(full_name), classes(name), subjects(name)")
    .order("created_at", { ascending: false });
  if (error) handleSupabaseError(error, "Data tugas gagal dimuat.");
  return Promise.all((data ?? []).map(mapAssignment));
}

export async function createAssignment(assignment: Assignment) {
  const client = getSupabase();
  if (!client) return assignment;

  const { data, error } = await client.from("assignments").insert(toAssignmentRow(assignment)).select("*, teachers(full_name), classes(name), subjects(name)").single();
  if (error) handleSupabaseError(error, "Tugas gagal disimpan.");
  return mapAssignment(data);
}

export async function updateAssignment(id: string, assignment: Partial<Assignment>) {
  const client = getSupabase();
  if (!client) return { id, ...assignment };

  const { data, error } = await client.from("assignments").update(toAssignmentRow(assignment)).eq("id", id).select("*, teachers(full_name), classes(name), subjects(name)").single();
  if (error) handleSupabaseError(error, "Tugas gagal diperbarui.");
  return mapAssignment(data);
}

export async function deleteAssignment(id: string) {
  const client = getSupabase();
  if (!client) return { id };

  const { error } = await client.from("assignments").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Tugas gagal dihapus.");
  return { id };
}

async function mapAssignment(row: any): Promise<Assignment> {
  const filePath = row.assignment_file_path ?? undefined;
  const signedFileUrl = filePath ? await getSafeAssignmentFileUrl(filePath) : undefined;

  return {
    id: row.id,
    teacherId: row.teacher_id,
    teacherName: row.teachers?.full_name ?? "-",
    classId: row.class_id,
    className: row.classes?.name ?? "-",
    subjectId: row.subject_id,
    subjectName: row.subjects?.name ?? "-",
    title: row.title,
    description: row.description ?? "",
    fileUrl: signedFileUrl ?? row.assignment_file_url ?? undefined,
    filePath,
    linkUrl: row.assignment_link_url ?? undefined,
    publishAt: row.publish_at ?? row.created_at ?? undefined,
    deadline: row.deadline ?? "",
    status: row.status === "closed" ? "closed" : row.status === "archived" ? "closed" : "active",
    submittedCount: row.submitted_count ?? 0
  };
}

async function getSafeAssignmentFileUrl(path: string) {
  try {
    return await createSignedUrl("assignment-files", path, 60 * 60);
  } catch {
    return undefined;
  }
}

function toAssignmentRow(assignment: Partial<Assignment>) {
  return omitUndefined({
    teacher_id: assignment.teacherId,
    class_id: assignment.classId,
    subject_id: assignment.subjectId,
    title: assignment.title,
    description: assignment.description,
    assignment_file_url: assignment.fileUrl,
    assignment_file_path: assignment.filePath,
    assignment_link_url: assignment.linkUrl,
    publish_at: assignment.publishAt,
    deadline: assignment.deadline,
    status: assignment.status === "late" ? "active" : assignment.status
  });
}

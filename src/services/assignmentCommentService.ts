import { getCurrentStudent } from "@/services/studentService";
import { getSupabase, handleSupabaseError, requireSupabase } from "./serviceUtils";

export type AssignmentCommentVisibility = "public" | "private";

export interface AssignmentComment {
  id: string;
  assignmentId: string;
  studentId: string;
  text: string;
  visibility: AssignmentCommentVisibility;
  createdAt: string;
}

export async function getAssignmentComments(assignmentId: string) {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("assignment_comments")
    .select("*")
    .eq("assignment_id", assignmentId)
    .order("created_at", { ascending: true });
  if (error) handleSupabaseError(error, "Komentar tugas gagal dimuat.");
  return (data ?? []).map(mapComment);
}

export async function createAssignmentComment(assignmentId: string, text: string, visibility: AssignmentCommentVisibility) {
  const client = requireSupabase();

  const student = await getCurrentStudent();
  if (!student.id || !student.profileId) {
    throw new Error("Data siswa belum terhubung ke akun login.");
  }

  const { data, error } = await client
    .from("assignment_comments")
    .insert({
      assignment_id: assignmentId,
      student_id: student.id,
      profile_id: student.profileId,
      comment: text,
      visibility
    })
    .select()
    .single();
  if (error) handleSupabaseError(error, "Komentar gagal dikirim.");
  return mapComment(data);
}

function mapComment(row: any): AssignmentComment {
  return {
    id: row.id,
    assignmentId: row.assignment_id,
    studentId: row.student_id,
    text: row.comment,
    visibility: row.visibility === "private" ? "private" : "public",
    createdAt: row.created_at
  };
}

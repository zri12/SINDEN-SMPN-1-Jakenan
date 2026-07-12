import { supabase } from "./supabaseClient";
import { sanitizeFileName, validateFile } from "@/utils/validateFile";

type StorageBucket = "assignment-files" | "submission-files";

export async function uploadFile(bucket: StorageBucket, path: string, file: File) {
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi.");
  }

  const validationError = validateFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  return data;
}

function buildFilePath(ownerId: string, entityId: string, file: File) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${ownerId}/${entityId}/${timestamp}_${sanitizeFileName(file.name)}`;
}

export async function uploadAssignmentFile(file: File, teacherId: string, assignmentId: string) {
  const path = buildFilePath(teacherId, assignmentId, file);
  const data = await uploadFile("assignment-files", path, file);
  return { path: data.path, publicUrl: getPublicUrl("assignment-files", data.path) };
}

export async function uploadSubmissionFile(file: File, studentId: string, assignmentId: string) {
  const path = buildFilePath(studentId, assignmentId, file);
  const data = await uploadFile("submission-files", path, file);
  return { path: data.path, publicUrl: getPublicUrl("submission-files", data.path) };
}

export async function deleteFile(bucket: StorageBucket, path: string) {
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi.");
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export function getPublicUrl(bucket: StorageBucket, path: string) {
  if (!supabase) return "";
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function createSignedUrl(bucket: StorageBucket, path: string, expiresIn = 60 * 10) {
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi.");
  }

  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

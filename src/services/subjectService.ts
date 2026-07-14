import type { Subject } from "@/types/subject";
import { clearDataCache, getSupabase, handleSupabaseError, omitUndefined, requireSupabase } from "./serviceUtils";

export async function getSubjects() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("subjects").select("*").order("name");
  if (error) handleSupabaseError(error, "Data mata pelajaran gagal dimuat.");
  return (data ?? []).map(mapSubject);
}

export async function createSubject(subject: Subject) {
  const client = requireSupabase();

  const { data, error } = await client
    .from("subjects")
    .insert({ code: subject.code, name: subject.name, kkm: subject.kkm, is_active: subject.status === "active" })
    .select()
    .single();
  if (error) handleSupabaseError(error, "Mata pelajaran gagal disimpan.");
  clearDataCache();
  return mapSubject(data);
}

export async function updateSubject(id: string, subject: Partial<Subject>) {
  const client = requireSupabase();

  const { data, error } = await client
    .from("subjects")
    .update(omitUndefined({ code: subject.code, name: subject.name, kkm: subject.kkm, is_active: subject.status ? subject.status === "active" : undefined }))
    .eq("id", id)
    .select()
    .single();
  if (error) handleSupabaseError(error, "Mata pelajaran gagal diperbarui.");
  clearDataCache();
  return mapSubject(data);
}

export async function deleteSubject(id: string) {
  const client = requireSupabase();

  const { error } = await client.from("subjects").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Mata pelajaran gagal dihapus.");
  clearDataCache();
  return { id };
}

function mapSubject(row: any): Subject {
  return {
    id: row.id,
    code: row.code ?? "",
    name: row.name,
    kkm: row.kkm,
    status: row.is_active ? "active" : "inactive"
  };
}

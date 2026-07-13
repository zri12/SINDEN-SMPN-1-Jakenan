import type { ClassRoom } from "@/types/class";
import { getSupabase, handleSupabaseError, omitUndefined } from "./serviceUtils";

export async function getClasses() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("classes_with_student_count").select("*").order("grade_level").order("class_name");
  if (error) handleSupabaseError(error, "Data kelas gagal dimuat.");
  return (data ?? []).map(mapClass);
}

export async function createClass(classRoom: ClassRoom) {
  const client = getSupabase();
  if (!client) return classRoom;

  const { data, error } = await client
    .from("classes")
    .insert({ name: classRoom.name, grade_level: classRoom.gradeLevel, academic_year: classRoom.academicYear, is_active: true })
    .select()
    .single();
  if (error) handleSupabaseError(error, "Data kelas gagal disimpan.");
  return mapClass(data);
}

export async function updateClass(id: string, classRoom: Partial<ClassRoom>) {
  const client = getSupabase();
  if (!client) return { id, ...classRoom };

  const { data, error } = await client
    .from("classes")
    .update(omitUndefined({ name: classRoom.name, grade_level: classRoom.gradeLevel, academic_year: classRoom.academicYear }))
    .eq("id", id)
    .select()
    .single();
  if (error) handleSupabaseError(error, "Data kelas gagal diperbarui.");
  return mapClass(data);
}

export async function deleteClass(id: string) {
  const client = getSupabase();
  if (!client) return { id };

  const { error } = await client.from("classes").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Data kelas gagal dihapus.");
  return { id };
}

function mapClass(row: any): ClassRoom {
  return {
    id: row.id ?? row.class_id,
    name: row.name ?? row.class_name,
    gradeLevel: row.grade_level,
    academicYear: row.academic_year,
    studentCount: row.student_count ?? 0
  };
}

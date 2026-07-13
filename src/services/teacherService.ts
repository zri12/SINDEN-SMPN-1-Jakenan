import type { Teacher } from "@/types/teacher";
import { getSupabase, handleSupabaseError, omitUndefined, requireSupabase } from "./serviceUtils";

export async function getTeachers() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("teachers").select("*, profiles(username), teacher_classes(classes(id, name), subjects(id, name))").order("full_name");
  if (error) handleSupabaseError(error, "Data guru gagal dimuat.");
  return (data ?? []).map(mapTeacher);
}

export async function createTeacher(teacher: Teacher) {
  const client = requireSupabase();

  const { data, error } = await client.from("teachers").insert(toTeacherRow(teacher)).select("id").single();
  if (error) handleSupabaseError(error, "Data guru gagal disimpan.");
  await syncTeacherClasses(data.id, teacher);
  return getTeacherById(data.id);
}

export async function updateTeacher(id: string, teacher: Partial<Teacher>) {
  const client = requireSupabase();

  const { error } = await client.from("teachers").update(toTeacherRow(teacher)).eq("id", id);
  if (error) handleSupabaseError(error, "Data guru gagal diperbarui.");
  await syncTeacherClasses(id, teacher);
  return getTeacherById(id);
}

export async function deleteTeacher(id: string) {
  const client = requireSupabase();

  const { error } = await client.from("teachers").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Data guru gagal dihapus.");
  return { id };
}

function mapTeacher(row: any): Teacher {
  const relations = row.teacher_classes ?? [];
  const subjectNames = Array.from(new Set(relations.map((item: any) => item.subjects?.name).filter(Boolean)));
  const classNames = Array.from(new Set(relations.map((item: any) => item.classes?.name).filter(Boolean))) as string[];

  return {
    id: row.id,
    profileId: row.profile_id ?? undefined,
    nip: row.nip ?? "",
    nuptk: row.nuptk ?? "",
    fullName: row.full_name,
    subjectName: subjectNames.join(", ") || "-",
    classNames,
    username: row.profiles?.username ?? "",
    status: row.status === "active" ? "active" : "inactive"
  };
}

function toTeacherRow(teacher: Partial<Teacher>) {
  return omitUndefined({
    nip: teacher.nip,
    nuptk: teacher.nuptk,
    full_name: teacher.fullName,
    status: teacher.status
  });
}

async function getTeacherById(id: string) {
  const client = getSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const { data, error } = await client
    .from("teachers")
    .select("*, profiles(username), teacher_classes(classes(id, name), subjects(id, name))")
    .eq("id", id)
    .single();
  if (error) handleSupabaseError(error, "Data guru gagal dimuat.");
  return mapTeacher(data);
}

async function syncTeacherClasses(teacherId: string, teacher: Partial<Teacher>) {
  const client = getSupabase();
  if (!client || (!teacher.classNames && !teacher.subjectName)) return;

  const classNames = teacher.classNames ?? [];
  const subjectNames = splitNames(teacher.subjectName ?? "");

  const { error: deleteError } = await client.from("teacher_classes").delete().eq("teacher_id", teacherId);
  if (deleteError) handleSupabaseError(deleteError, "Relasi guru lama gagal dihapus.");
  if (classNames.length === 0 || subjectNames.length === 0) return;

  const [{ data: classes, error: classError }, { data: subjects, error: subjectError }] = await Promise.all([
    client.from("classes").select("id, name").in("name", classNames),
    client.from("subjects").select("id, name").in("name", subjectNames)
  ]);

  if (classError) handleSupabaseError(classError, "Relasi kelas guru gagal dimuat.");
  if (subjectError) handleSupabaseError(subjectError, "Relasi mapel guru gagal dimuat.");

  const rows = (classes ?? []).flatMap((classRoom: any) =>
    (subjects ?? []).map((subject: any) => ({
      teacher_id: teacherId,
      class_id: classRoom.id,
      subject_id: subject.id,
      academic_year: "2025/2026",
      semester: "genap"
    }))
  );

  if (rows.length === 0) return;
  const { error } = await client.from("teacher_classes").insert(rows);
  if (error) handleSupabaseError(error, "Relasi guru, kelas, dan mapel gagal disimpan.");
}

function splitNames(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

import type { Teacher } from "@/types/teacher";
import type { TeachingRelation } from "@/types/teachingRelation";
import { clearDataCache, getSupabase, handleSupabaseError, omitUndefined, requireSupabase } from "./serviceUtils";

export async function getTeachers() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("teachers").select("*, profiles(username, email), teacher_classes(id, class_id, subject_id, academic_year, semester, classes(id, name), subjects(id, name))").order("full_name");
  if (error) handleSupabaseError(error, "Data guru gagal dimuat.");
  const teachers = (data ?? []).map(mapTeacher);
  return withStudentCounts(teachers);
}

export async function getCurrentTeacher() {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) handleSupabaseError(authError, "Akun guru gagal dibaca.");
  if (!authData.user) throw new Error("Sesi login tidak ditemukan.");

  const { data, error } = await client
    .from("teachers")
    .select("*, profiles(username, email), teacher_classes(id, class_id, subject_id, academic_year, semester, classes(id, name), subjects(id, name))")
    .eq("profile_id", authData.user.id)
    .order("updated_at", { ascending: false })
    .limit(1);
  if (error) handleSupabaseError(error, "Data guru aktif gagal dimuat.");
  if (!data?.[0]) throw new Error("Data guru belum terhubung dengan akun login.");
  const [teacher] = await withStudentCounts([mapTeacher(data[0])]);
  return teacher;
}

export async function getTeacherTeachingRelations(teacherId: string) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("teacher_classes")
    .select("id, teacher_id, class_id, subject_id, academic_year, semester, classes(id, name), subjects(id, name)")
    .eq("teacher_id", teacherId)
    .order("academic_year", { ascending: false });
  if (error) handleSupabaseError(error, "Relasi mengajar guru gagal dimuat.");
  return withRelationStudentCounts((data ?? []).map(mapTeachingRelation));
}

export async function getCurrentTeacherTeachingRelations() {
  const teacher = await getCurrentTeacher();
  return teacher.teachingRelations ?? [];
}

export async function createTeacher(teacher: Teacher) {
  const client = requireSupabase();

  const { data, error } = await client.from("teachers").insert(toTeacherRow(teacher)).select("id").single();
  if (error) handleSupabaseError(error, "Data guru gagal disimpan.");
  await syncTeacherClasses(data.id, teacher);
  clearDataCache();
  return getTeacherById(data.id);
}

export async function updateTeacher(id: string, teacher: Partial<Teacher>) {
  const client = requireSupabase();

  await updateTeacherProfile(teacher);
  const { error } = await client.from("teachers").update(toTeacherRow(teacher)).eq("id", id);
  if (error) handleSupabaseError(error, "Data guru gagal diperbarui.");
  await syncTeacherClasses(id, teacher);
  clearDataCache();
  return getTeacherById(id);
}

export async function deleteTeacher(id: string) {
  const client = requireSupabase();

  const { error } = await client.from("teachers").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Data guru gagal dihapus.");
  clearDataCache();
  return { id };
}

function mapTeacher(row: any): Teacher {
  const relations = row.teacher_classes ?? [];
  const subjectNames = Array.from(new Set(relations.map((item: any) => item.subjects?.name).filter(Boolean)));
  const classNames = Array.from(new Set(relations.map((item: any) => item.classes?.name).filter(Boolean))) as string[];
  const teachingRelations = relations.map((item: any) => mapTeachingRelation({
    ...item,
    teacher_id: row.id
  }));

  return {
    id: row.id,
    profileId: row.profile_id ?? undefined,
    nip: row.nip ?? "",
    nuptk: row.nuptk ?? "",
    fullName: row.full_name,
    gender: row.gender ?? undefined,
    employmentStatus: row.employment_status ?? "",
    teacherType: row.teacher_type ?? "",
    phone: row.phone ?? "",
    email: row.profiles?.email ?? "",
    subjectName: subjectNames.join(", ") || "-",
    classNames,
    teachingRelations,
    username: row.profiles?.username ?? "",
    status: row.status === "active" ? "active" : "inactive"
  };
}

function toTeacherRow(teacher: Partial<Teacher>) {
  return omitUndefined({
    profile_id: teacher.profileId,
    nip: teacher.nip,
    nuptk: teacher.nuptk,
    full_name: teacher.fullName,
    gender: teacher.gender,
    employment_status: teacher.employmentStatus,
    teacher_type: teacher.teacherType,
    phone: teacher.phone,
    status: teacher.status
  });
}

async function updateTeacherProfile(teacher: Partial<Teacher>) {
  const client = requireSupabase();
  if (!teacher.profileId) {
    if (teacher.username?.trim()) throw new Error("Guru ini belum punya akun login. Tambahkan guru baru dengan username dan password, atau jalankan SQL reset data terbaru.");
    return;
  }

  const updates = omitUndefined({
    full_name: teacher.fullName?.trim(),
    username: teacher.username?.trim(),
    email: teacher.email?.trim(),
    phone: teacher.phone?.trim(),
    is_active: teacher.status ? teacher.status === "active" : undefined,
    updated_at: new Date().toISOString()
  });

  if (Object.keys(updates).length === 0) return;
  const { error } = await client.from("profiles").update(updates).eq("id", teacher.profileId);
  if (error) handleSupabaseError(error, "Profile akun guru gagal diperbarui.");
  clearDataCache();
}

async function getTeacherById(id: string) {
  const client = getSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const { data, error } = await client
    .from("teachers")
    .select("*, profiles(username, email), teacher_classes(id, class_id, subject_id, academic_year, semester, classes(id, name), subjects(id, name))")
    .eq("id", id)
    .single();
  if (error) handleSupabaseError(error, "Data guru gagal dimuat.");
  const [teacher] = await withStudentCounts([mapTeacher(data)]);
  return teacher;
}

async function syncTeacherClasses(teacherId: string, teacher: Partial<Teacher>) {
  const client = getSupabase();
  if (!client || (!teacher.teachingRelations && !teacher.classNames && !teacher.subjectName)) return;

  const { error: deleteError } = await client.from("teacher_classes").delete().eq("teacher_id", teacherId);
  if (deleteError) handleSupabaseError(deleteError, "Relasi guru lama gagal dihapus.");

  const relationRows = (teacher.teachingRelations ?? [])
    .filter((relation) => relation.classId && relation.subjectId)
    .map((relation) => ({
      teacher_id: teacherId,
      class_id: relation.classId,
      subject_id: relation.subjectId,
      academic_year: relation.academicYear || "2026/2027",
      semester: relation.semester || "ganjil"
    }));

  if (relationRows.length > 0) {
    const { error } = await client.from("teacher_classes").insert(relationRows);
    if (error) handleSupabaseError(error, "Relasi guru, kelas, dan mapel gagal disimpan.");
    clearDataCache();
    return;
  }

  const classNames = teacher.classNames ?? [];
  const subjectNames = splitNames(teacher.subjectName ?? "");
  if (classNames.length === 0 || subjectNames.length === 0) return;

  const [{ data: classes, error: classError }, { data: subjects, error: subjectError }] = await Promise.all([
    client.from("classes").select("id, name").in("name", classNames),
    client.from("subjects").select("id, name").in("name", subjectNames)
  ]);

  if (classError) handleSupabaseError(classError, "Relasi kelas guru gagal dimuat.");
  if (subjectError) handleSupabaseError(subjectError, "Relasi mapel guru gagal dimuat.");

  const rows = classNames.flatMap((className) => {
    const classRoom = (classes ?? []).find((item: any) => item.name === className);
    const subject = (subjects ?? []).find((item: any) => item.name === subjectNames[0]);
    if (!classRoom || !subject) return [];
    return [{
      teacher_id: teacherId,
      class_id: classRoom.id,
      subject_id: subject.id,
      academic_year: "2026/2027",
      semester: "ganjil"
    }];
  });

  if (rows.length === 0) return;
  const { error } = await client.from("teacher_classes").insert(rows);
  if (error) handleSupabaseError(error, "Relasi guru, kelas, dan mapel gagal disimpan.");
  clearDataCache();
}

function splitNames(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function mapTeachingRelation(row: any): TeachingRelation {
  return {
    id: row.id ?? undefined,
    teacherId: row.teacher_id ?? "",
    classId: row.class_id ?? "",
    className: row.classes?.name ?? "-",
    subjectId: row.subject_id ?? "",
    subjectName: row.subjects?.name ?? "-",
    academicYear: row.academic_year ?? "2026/2027",
    semester: row.semester === "genap" ? "genap" : "ganjil",
    studentCount: 0
  };
}

async function withStudentCounts(teachers: Teacher[]) {
  const relations = teachers.flatMap((teacher) => teacher.teachingRelations ?? []);
  const countedRelations = await withRelationStudentCounts(relations);
  const countByKey = new Map(countedRelations.map((relation) => [`${relation.teacherId}-${relation.classId}-${relation.subjectId}-${relation.academicYear}-${relation.semester}`, relation.studentCount]));
  return teachers.map((teacher) => ({
    ...teacher,
    teachingRelations: (teacher.teachingRelations ?? []).map((relation) => ({
      ...relation,
      studentCount: countByKey.get(`${relation.teacherId}-${relation.classId}-${relation.subjectId}-${relation.academicYear}-${relation.semester}`) ?? relation.studentCount
    }))
  }));
}

async function withRelationStudentCounts(relations: TeachingRelation[]) {
  const client = getSupabase();
  if (!client || relations.length === 0) return relations;
  const classIds = Array.from(new Set(relations.map((relation) => relation.classId).filter(Boolean)));
  const { data, error } = await client.from("students").select("class_id").eq("status", "active").in("class_id", classIds);
  if (error) handleSupabaseError(error, "Jumlah siswa kelas gagal dimuat.");
  const counts = (data ?? []).reduce<Record<string, number>>((totals, item: any) => {
    totals[item.class_id] = (totals[item.class_id] ?? 0) + 1;
    return totals;
  }, {});
  return relations.map((relation) => ({ ...relation, studentCount: counts[relation.classId] ?? 0 }));
}

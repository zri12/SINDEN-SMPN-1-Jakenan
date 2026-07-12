import { dummyGrades } from "@/data/dummyGrades";
import type { Grade } from "@/types/grade";
import { getSupabase, handleSupabaseError, omitUndefined } from "./serviceUtils";

export async function getGrades() {
  const client = getSupabase();
  if (!client) return dummyGrades;

  const { data, error } = await client
    .from("grades")
    .select("*, students(full_name), teachers(full_name), classes(name), subjects(name)")
    .order("created_at", { ascending: false });
  if (error) handleSupabaseError(error, "Data nilai gagal dimuat.");
  return (data ?? []).map(mapGrade);
}

export async function createGrade(grade: Grade) {
  const client = getSupabase();
  if (!client) return grade;

  const { data, error } = await client.from("grades").insert(toGradeRow(grade)).select("*, students(full_name), teachers(full_name), classes(name), subjects(name)").single();
  if (error) handleSupabaseError(error, "Nilai gagal disimpan.");
  return mapGrade(data);
}

export async function updateGrade(id: string, grade: Partial<Grade>) {
  const client = getSupabase();
  if (!client) return { id, ...grade };

  const { data, error } = await client.from("grades").update(toGradeRow(grade)).eq("id", id).select("*, students(full_name), teachers(full_name), classes(name), subjects(name)").single();
  if (error) handleSupabaseError(error, "Nilai gagal diperbarui.");
  return mapGrade(data);
}

export async function deleteGrade(id: string) {
  const client = getSupabase();
  if (!client) return { id };

  const { error } = await client.from("grades").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Nilai gagal dihapus.");
  return { id };
}

function mapGrade(row: any): Grade {
  return {
    id: row.id,
    studentId: row.student_id,
    studentName: row.students?.full_name ?? "-",
    teacherId: row.teacher_id ?? "",
    teacherName: row.teachers?.full_name ?? "-",
    classId: row.class_id ?? "",
    className: row.classes?.name ?? "-",
    subjectId: row.subject_id ?? "",
    subjectName: row.subjects?.name ?? "-",
    semester: mapSemesterFromDb(row.semester),
    gradeType: mapGradeTypeFromDb(row.grade_type),
    score: Number(row.score),
    kkm: row.kkm,
    note: row.note ?? undefined
  };
}

function toGradeRow(grade: Partial<Grade>) {
  return omitUndefined({
    student_id: grade.studentId,
    teacher_id: grade.teacherId,
    class_id: grade.classId,
    subject_id: grade.subjectId,
    grade_type: grade.gradeType ? mapGradeTypeToDb(grade.gradeType) : undefined,
    score: grade.score,
    kkm: grade.kkm,
    semester: grade.semester ? mapSemesterToDb(grade.semester) : undefined,
    academic_year: "2025/2026",
    note: grade.note
  });
}

function mapGradeTypeToDb(type: Grade["gradeType"]) {
  const map: Record<string, string> = {
    tugas: "assignment",
    ulangan_harian: "daily_test",
    pts: "midterm",
    pas: "final",
    praktik: "practice",
    remedial: "remedial",
    assignment: "assignment",
    daily_test: "daily_test",
    midterm: "midterm",
    final: "final",
    practice: "practice"
  };
  return map[type] ?? "assignment";
}

function mapGradeTypeFromDb(type: string): Grade["gradeType"] {
  const map: Record<string, Grade["gradeType"]> = {
    assignment: "tugas",
    daily_test: "ulangan_harian",
    midterm: "pts",
    final: "pas",
    practice: "praktik",
    remedial: "remedial"
  };
  return map[type] ?? "tugas";
}

function mapSemesterToDb(semester: string) {
  if (semester === "Semester 1") return "ganjil";
  if (semester === "Semester 2") return "genap";
  return semester;
}

function mapSemesterFromDb(semester: string) {
  if (semester === "ganjil") return "Semester 1";
  if (semester === "genap") return "Semester 2";
  return semester;
}

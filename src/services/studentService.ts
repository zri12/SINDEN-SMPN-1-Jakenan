import type { Student } from "@/types/student";
import { getSupabase, handleSupabaseError, omitUndefined } from "./serviceUtils";

export async function getStudents() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("students").select("*, profiles(username), classes(id, name)").order("full_name");
  if (error) handleSupabaseError(error, "Data siswa gagal dimuat.");
  return (data ?? []).map(mapStudent);
}

export async function getCurrentStudent() {
  const client = getSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) handleSupabaseError(authError, "Akun siswa gagal dibaca.");
  if (!authData.user) throw new Error("Sesi login tidak ditemukan.");

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("id, full_name, username, is_active")
    .eq("id", authData.user.id)
    .maybeSingle();
  if (profileError) handleSupabaseError(profileError, "Profile siswa gagal dimuat.");
  if (!profile) throw new Error("Profile pengguna belum dibuat.");

  const { data, error } = await client
    .from("students")
    .select("*, profiles(username), classes(id, name)")
    .eq("profile_id", authData.user.id)
    .order("updated_at", { ascending: false })
    .limit(1);
  if (error) handleSupabaseError(error, "Data siswa aktif gagal dimuat.");
  if (data?.[0]) return mapStudent(data[0]);

  return {
    id: "",
    profileId: profile.id,
    nis: "",
    nisn: "",
    fullName: profile.full_name,
    classId: "",
    className: "-",
    gender: "L",
    username: profile.username ?? "",
    status: profile.is_active ? "active" : "inactive"
  } satisfies Student;
}

export async function createStudent(student: Student) {
  const client = getSupabase();
  if (!client) return student;

  const { data, error } = await client.from("students").insert(toStudentRow(student)).select("*, profiles(username), classes(id, name)").single();
  if (error) handleSupabaseError(error, "Data siswa gagal disimpan.");
  return mapStudent(data);
}

export async function updateStudent(id: string, student: Partial<Student>) {
  const client = getSupabase();
  if (!client) return { id, ...student };

  const { data, error } = await client.from("students").update(toStudentRow(student)).eq("id", id).select("*, profiles(username), classes(id, name)").single();
  if (error) handleSupabaseError(error, "Data siswa gagal diperbarui.");
  return mapStudent(data);
}

export async function deleteStudent(id: string) {
  const client = getSupabase();
  if (!client) return { id };

  const { error } = await client.from("students").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Data siswa gagal dihapus.");
  return { id };
}

function mapStudent(row: any): Student {
  return {
    id: row.id,
    profileId: row.profile_id ?? undefined,
    nis: row.nis ?? "",
    nisn: row.nisn ?? "",
    fullName: row.full_name,
    classId: row.class_id ?? "",
    className: row.classes?.name ?? "-",
    gender: row.gender ?? "L",
    username: row.profiles?.username ?? "",
    status: row.status === "active" ? "active" : "inactive"
  };
}

function toStudentRow(student: Partial<Student>) {
  return omitUndefined({
    nis: student.nis,
    nisn: student.nisn,
    full_name: student.fullName,
    class_id: student.classId,
    gender: student.gender,
    status: student.status
  });
}

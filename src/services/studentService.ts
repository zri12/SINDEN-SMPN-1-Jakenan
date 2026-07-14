import type { Student } from "@/types/student";
import { clearDataCache, getSupabase, handleSupabaseError, omitUndefined, requireSupabase } from "./serviceUtils";

export async function getStudents() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("students").select("*, profiles(username, email), classes(id, name)").order("full_name");
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
    .select("id, full_name, username, email, is_active")
    .eq("id", authData.user.id)
    .maybeSingle();
  if (profileError) handleSupabaseError(profileError, "Profile siswa gagal dimuat.");
  if (!profile) throw new Error("Profile pengguna belum dibuat.");

  const { data, error } = await client
    .from("students")
    .select("*, profiles(username, email), classes(id, name)")
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
    email: profile.email ?? "",
    status: profile.is_active ? "active" : "inactive"
  } satisfies Student;
}

export async function createStudent(student: Student) {
  const client = requireSupabase();

  validateStudent(student);
  const { data, error } = await client.from("students").insert(toStudentRow(student)).select("*, profiles(username, email), classes(id, name)").single();
  if (error) handleSupabaseError(error, "Data siswa gagal disimpan.");
  clearDataCache();
  return mapStudent(data);
}

export async function updateStudent(id: string, student: Partial<Student>) {
  const client = requireSupabase();

  validateStudent(student);
  await updateStudentProfile(student);
  const { data, error } = await client.from("students").update(toStudentRow(student)).eq("id", id).select("*, profiles(username, email), classes(id, name)").single();
  if (error) handleSupabaseError(error, "Data siswa gagal diperbarui.");
  clearDataCache();
  return mapStudent(data);
}

export async function deleteStudent(id: string) {
  const client = requireSupabase();

  const { error } = await client.from("students").delete().eq("id", id);
  if (error) handleSupabaseError(error, "Data siswa gagal dihapus.");
  clearDataCache();
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
    birthPlace: row.birth_place ?? "",
    birthDate: row.birth_date ?? "",
    address: row.address ?? "",
    username: row.profiles?.username ?? "",
    email: row.profiles?.email ?? "",
    status: row.status === "graduated" ? "graduated" : row.status === "active" ? "active" : "inactive"
  };
}

function toStudentRow(student: Partial<Student>) {
  return omitUndefined({
    profile_id: student.profileId,
    nis: student.nis,
    nisn: student.nisn,
    full_name: student.fullName,
    class_id: student.classId,
    gender: student.gender,
    birth_place: student.birthPlace,
    birth_date: student.birthDate || undefined,
    address: student.address,
    status: student.status
  });
}

function validateStudent(student: Partial<Student>) {
  if ("fullName" in student && !student.fullName?.trim()) throw new Error("Nama siswa wajib diisi.");
  if ("nisn" in student && !student.nisn?.trim()) throw new Error("NISN wajib diisi.");
  if ("username" in student && !student.username?.trim()) throw new Error("Username wajib diisi.");
  if ("classId" in student && !student.classId) throw new Error("Kelas wajib dipilih.");
  if (student.birthDate) {
    const date = new Date(student.birthDate);
    if (Number.isNaN(date.getTime())) throw new Error("Tanggal lahir tidak valid.");
  }
}

async function updateStudentProfile(student: Partial<Student>) {
  const client = requireSupabase();
  if (!student.profileId) return;

  const updates = omitUndefined({
    full_name: student.fullName?.trim(),
    username: student.username?.trim(),
    is_active: student.status ? student.status === "active" : undefined,
    updated_at: new Date().toISOString()
  });

  if (Object.keys(updates).length === 0) return;
  const { error } = await client.from("profiles").update(updates).eq("id", student.profileId);
  if (error) handleSupabaseError(error, "Profile akun siswa gagal diperbarui.");
  clearDataCache();
}

import { setCurrentUser } from "@/features/auth/authService";
import type { AuthUser } from "@/types/auth";
import { getSupabase, handleSupabaseError } from "./serviceUtils";

export interface TeacherProfileData {
  teacherId: string;
  profileId: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  subjectIds: string[];
  subjectNames: string[];
  classIds: string[];
  classNames: string[];
  academicYear: string;
  semester: "ganjil" | "genap";
  isActive: boolean;
}

export interface TeacherProfileUpdate {
  fullName: string;
  username: string;
  phone: string;
  subjectIds: string[];
  classIds: string[];
  academicYear: string;
  semester: "ganjil" | "genap";
}

export async function getCurrentTeacherProfile(): Promise<TeacherProfileData> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) handleSupabaseError(authError, "Akun guru gagal dibaca.");
  if (!authData.user) throw new Error("Sesi login tidak ditemukan.");

  const { data, error } = await client
    .from("teachers")
    .select("id, profile_id, full_name, phone, status, profiles(id, full_name, username, phone, is_active), teacher_classes(class_id, subject_id, academic_year, semester, classes(id, name), subjects(id, name))")
    .eq("profile_id", authData.user.id)
    .single();

  if (error) handleSupabaseError(error, "Profile guru gagal dimuat.");

  const profile = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;
  const relations = data.teacher_classes ?? [];
  const classIds = unique(relations.map((item: any) => item.class_id).filter(Boolean));
  const subjectIds = unique(relations.map((item: any) => item.subject_id).filter(Boolean));
  const classNames = unique(relations.map((item: any) => item.classes?.name).filter(Boolean));
  const subjectNames = unique(relations.map((item: any) => item.subjects?.name).filter(Boolean));
  const firstRelation = relations[0];

  return {
    teacherId: data.id,
    profileId: data.profile_id,
    fullName: profile?.full_name ?? data.full_name,
    username: profile?.username ?? "",
    email: authData.user.email ?? "",
    phone: profile?.phone ?? data.phone ?? "",
    subjectIds,
    subjectNames,
    classIds,
    classNames,
    academicYear: firstRelation?.academic_year ?? "",
    semester: firstRelation?.semester === "ganjil" ? "ganjil" : "genap",
    isActive: Boolean(profile?.is_active ?? data.status === "active")
  };
}

export async function updateCurrentTeacherProfile(payload: TeacherProfileUpdate): Promise<TeacherProfileData> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const current = await getCurrentTeacherProfile();

  const { error: profileError } = await client
    .from("profiles")
    .update({
      full_name: payload.fullName,
      username: payload.username,
      phone: payload.phone,
      updated_at: new Date().toISOString()
    })
    .eq("id", current.profileId);
  if (profileError) handleSupabaseError(profileError, "Profile akun gagal diperbarui.");

  const { error: teacherError } = await client
    .from("teachers")
    .update({
      full_name: payload.fullName,
      phone: payload.phone,
      updated_at: new Date().toISOString()
    })
    .eq("id", current.teacherId);
  if (teacherError) handleSupabaseError(teacherError, "Data guru gagal diperbarui.");

  const { error: deleteError } = await client.from("teacher_classes").delete().eq("teacher_id", current.teacherId);
  if (deleteError) handleSupabaseError(deleteError, "Relasi kelas dan mapel lama gagal dihapus.");

  const rows = payload.classIds.flatMap((classId) =>
    payload.subjectIds.map((subjectId) => ({
      teacher_id: current.teacherId,
      class_id: classId,
      subject_id: subjectId,
      academic_year: payload.academicYear,
      semester: payload.semester
    }))
  );

  if (rows.length > 0) {
    const { error: insertError } = await client.from("teacher_classes").insert(rows);
    if (insertError) handleSupabaseError(insertError, "Relasi kelas dan mapel baru gagal disimpan.");
  }

  const updated = await getCurrentTeacherProfile();
  setCurrentUser({
    id: updated.profileId,
    fullName: updated.fullName,
    username: updated.username,
    email: updated.email,
    role: "teacher",
    isActive: updated.isActive
  } satisfies AuthUser);
  return updated;
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

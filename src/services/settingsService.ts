import { appConfig } from "@/constants/appConfig";
import type { AppSettings } from "@/types/user";
import { getSupabase, handleSupabaseError, omitUndefined } from "./serviceUtils";

const fallbackSettings: AppSettings = {
  id: "local-settings",
  appName: appConfig.appName,
  appSubtitle: appConfig.appFullName,
  appFullName: appConfig.appFullName,
  schoolName: appConfig.schoolName,
  academicYear: appConfig.defaultAcademicYear,
  semester: appConfig.defaultSemester,
  defaultKkm: 75
} as AppSettings & { appFullName: string };

export async function getSettings() {
  const client = getSupabase();
  if (!client) return fallbackSettings;

  const { data, error } = await client.from("settings").select("*").limit(1).maybeSingle();
  if (error) handleSupabaseError(error, "Pengaturan gagal dimuat.");
  if (!data) return fallbackSettings;
  return mapSettings(data);
}

export async function updateSettings(settings: Partial<AppSettings>) {
  const client = getSupabase();
  if (!client) return { ...fallbackSettings, ...settings };

  const payload = omitUndefined({
    app_name: settings.appName,
    app_full_name: settings.appSubtitle,
    school_name: settings.schoolName,
    academic_year: settings.academicYear,
    semester: settings.semester,
    default_kkm: settings.defaultKkm,
    logo_url: settings.logoUrl
  });

  const query = settings.id && settings.id !== "local-settings"
    ? client.from("settings").update(payload).eq("id", settings.id)
    : client.from("settings").insert(payload);

  const { data, error } = await query.select().single();
  if (error) handleSupabaseError(error, "Pengaturan gagal diperbarui.");
  return mapSettings(data);
}

function mapSettings(row: any): AppSettings {
  return {
    id: row.id,
    appName: row.app_name,
    appSubtitle: row.app_full_name,
    schoolName: row.school_name,
    academicYear: row.academic_year,
    semester: row.semester,
    defaultKkm: row.default_kkm,
    logoUrl: row.logo_url ?? undefined
  };
}

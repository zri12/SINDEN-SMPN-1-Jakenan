import { appConfig } from "@/constants/appConfig";
import { getSettings } from "@/services/settingsService";
import type { AppSettings } from "@/types/user";
import { useAsyncData } from "./useAsyncData";

const fallbackSettings: AppSettings = {
  id: "local-settings",
  appName: appConfig.appName,
  appSubtitle: appConfig.appFullName,
  schoolName: appConfig.schoolName,
  academicYear: appConfig.defaultAcademicYear,
  semester: appConfig.defaultSemester,
  defaultKkm: 75
};

export function useSettings() {
  const result = useAsyncData(getSettings, fallbackSettings);
  return { settings: result.data, setSettings: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

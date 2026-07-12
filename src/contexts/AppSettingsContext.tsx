import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { appConfig } from "@/constants/appConfig";
import { getSettings, updateSettings } from "@/services/settingsService";
import type { AppSettings } from "@/types/user";

const fallbackSettings: AppSettings = {
  id: "local-settings",
  appName: appConfig.appName,
  appSubtitle: appConfig.appFullName,
  schoolName: appConfig.schoolName,
  academicYear: appConfig.defaultAcademicYear,
  semester: "ganjil",
  defaultKkm: 75
};

const SETTINGS_CACHE_KEY = "sinden_app_settings";

interface AppSettingsContextValue {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
  saveSettings: (settings: Partial<AppSettings>) => Promise<AppSettings>;
}

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => getCachedSettings() ?? fallbackSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSettings();
      setSettings(result);
      cacheSettings(result);
      applyDocumentSettings(result);
    } catch (err) {
      const cached = getCachedSettings() ?? fallbackSettings;
      setError(err instanceof Error ? err.message : "Pengaturan gagal dimuat.");
      setSettings(cached);
      applyDocumentSettings(cached);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSettings = useCallback(async (payload: Partial<AppSettings>) => {
    const result = await updateSettings({ ...settings, ...payload });
    setSettings(result);
    cacheSettings(result);
    applyDocumentSettings(result);
    return result;
  }, [settings]);

  useEffect(() => {
    applyDocumentSettings(settings);
    void refreshSettings();
  }, [refreshSettings]);

  const value = useMemo(
    () => ({ settings, isLoading, error, refreshSettings, saveSettings }),
    [settings, isLoading, error, refreshSettings, saveSettings]
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

function getCachedSettings() {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(SETTINGS_CACHE_KEY);
    return raw ? (JSON.parse(raw) as AppSettings) : null;
  } catch {
    localStorage.removeItem(SETTINGS_CACHE_KEY);
    return null;
  }
}

function cacheSettings(settings: AppSettings) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(settings));
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings harus dipakai di dalam AppSettingsProvider.");
  }
  return context;
}

function applyDocumentSettings(settings: AppSettings) {
  if (typeof document === "undefined") return;

  document.title = `${settings.appName || appConfig.appName} | ${settings.schoolName || appConfig.schoolName}`;

  const description = `${settings.appName || appConfig.appName} - ${settings.appSubtitle || appConfig.appFullName} ${settings.schoolName || appConfig.schoolName}`;
  let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!icon) {
    icon = document.createElement("link");
    icon.rel = "icon";
    document.head.appendChild(icon);
  }
  icon.href = settings.logoUrl || "/favicon.ico";
}

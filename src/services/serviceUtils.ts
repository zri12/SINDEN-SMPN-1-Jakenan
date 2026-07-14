import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export function getSupabase() {
  return isSupabaseConfigured ? supabase : null;
}

export function requireSupabase() {
  const client = getSupabase();
  if (!client) {
    throw new Error("Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.");
  }
  return client;
}

export function handleSupabaseError(error: unknown, fallbackMessage: string): never {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: unknown }).message ?? fallbackMessage);
    const code = "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
    throw new Error(code ? `${message} (${code})` : message);
  }
  throw new Error(fallbackMessage);
}

export function omitUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as Partial<T>;
}

export function clearDataCache() {
  if (typeof window === "undefined") return;

  try {
    const keysToRemove: string[] = [];
    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index);
      if (key?.startsWith("sinden:data:")) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => window.sessionStorage.removeItem(key));
  } catch {
    // Cache cleanup is best-effort; CRUD operations must not fail because of it.
  }
}

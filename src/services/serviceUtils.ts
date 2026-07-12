import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export function getSupabase() {
  return isSupabaseConfigured ? supabase : null;
}

export function handleSupabaseError(error: unknown, fallbackMessage: string): never {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error(fallbackMessage);
}

export function omitUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as Partial<T>;
}

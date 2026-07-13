import { useCallback, useEffect, useState } from "react";

export function useAsyncData<T>(loader: () => Promise<T>, initialData: T) {
  const cacheKey = getCacheKey(loader);
  const [initialCachedData] = useState(() => readCache<T>(cacheKey));
  const hasInitialCache = initialCachedData !== null;
  const [data, setRawData] = useState<T>(initialCachedData ?? initialData);
  const [loading, setLoading] = useState(!hasInitialCache);
  const [error, setError] = useState<string | null>(null);

  const setData = useCallback((value: T | ((previous: T) => T)) => {
    setRawData((previous) => {
      const next = typeof value === "function" ? (value as (previous: T) => T)(previous) : value;
      writeCache(cacheKey, next);
      return next;
    });
  }, [cacheKey]);

  const refetch = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const result = await loader();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Data gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }, [loader, setData]);

  useEffect(() => {
    void refetch(!hasInitialCache);
  }, [hasInitialCache, refetch]);

  return { data, setData, loading, error, refetch };
}

function getCacheKey(loader: () => Promise<unknown>) {
  return `sinden:data:${getCurrentUserId()}:${loader.name || "loader"}`;
}

function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Cache is only a render optimization; failure should not affect data loading.
  }
}

function getCurrentUserId() {
  if (typeof window === "undefined") return "anonymous";
  try {
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (!key?.includes("auth-token")) continue;
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const id = parsed?.user?.id ?? parsed?.currentSession?.user?.id;
      if (id) return id;
    }
  } catch {
    return "anonymous";
  }
  return "anonymous";
}

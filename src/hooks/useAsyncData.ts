import { useCallback, useEffect, useState } from "react";

export function useAsyncData<T>(loader: () => Promise<T>, initialData: T) {
  const [data, setRawData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setData = useCallback((value: T | ((previous: T) => T)) => {
    setRawData((previous) => {
      return typeof value === "function" ? (value as (previous: T) => T)(previous) : value;
    });
  }, []);

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
    void refetch(true);
  }, [refetch]);

  return { data, setData, loading, error, refetch };
}

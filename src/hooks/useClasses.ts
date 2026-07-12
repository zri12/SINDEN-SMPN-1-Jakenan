import { getClasses } from "@/services/classService";
import type { ClassRoom } from "@/types/class";
import { useAsyncData } from "./useAsyncData";

export function useClasses() {
  const result = useAsyncData(getClasses, [] as ClassRoom[]);
  return { classes: result.data, setClasses: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

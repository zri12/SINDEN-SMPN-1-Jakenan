import { getTeachers } from "@/services/teacherService";
import type { Teacher } from "@/types/teacher";
import { useAsyncData } from "./useAsyncData";

export function useTeachers() {
  const result = useAsyncData(getTeachers, [] as Teacher[]);
  return { teachers: result.data, setTeachers: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

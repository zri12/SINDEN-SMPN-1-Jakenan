import { getGrades } from "@/services/gradeService";
import type { Grade } from "@/types/grade";
import { useAsyncData } from "./useAsyncData";

export function useGrades() {
  const result = useAsyncData(getGrades, [] as Grade[]);
  return { grades: result.data, setGrades: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

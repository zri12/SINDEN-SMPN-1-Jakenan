import { getGrades } from "@/services/gradeService";
import { dummyGrades } from "@/data/dummyGrades";
import { useAsyncData } from "./useAsyncData";

export function useGrades() {
  const result = useAsyncData(getGrades, dummyGrades);
  return { grades: result.data, setGrades: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

import { getTeachers } from "@/services/teacherService";
import { dummyTeachers } from "@/data/dummyTeachers";
import { useAsyncData } from "./useAsyncData";

export function useTeachers() {
  const result = useAsyncData(getTeachers, dummyTeachers);
  return { teachers: result.data, setTeachers: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

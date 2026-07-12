import { getStudents } from "@/services/studentService";
import type { Student } from "@/types/student";
import { useAsyncData } from "./useAsyncData";

export function useStudents() {
  const result = useAsyncData(getStudents, [] as Student[]);
  return { students: result.data, setStudents: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

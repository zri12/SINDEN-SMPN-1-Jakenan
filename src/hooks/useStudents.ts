import { getStudents } from "@/services/studentService";
import { dummyStudents } from "@/data/dummyStudents";
import { useAsyncData } from "./useAsyncData";

export function useStudents() {
  const result = useAsyncData(getStudents, dummyStudents);
  return { students: result.data, setStudents: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

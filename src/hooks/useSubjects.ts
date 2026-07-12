import { getSubjects } from "@/services/subjectService";
import type { Subject } from "@/types/subject";
import { useAsyncData } from "./useAsyncData";

export function useSubjects() {
  const result = useAsyncData(getSubjects, [] as Subject[]);
  return { subjects: result.data, setSubjects: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

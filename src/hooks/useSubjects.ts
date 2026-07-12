import { getSubjects } from "@/services/subjectService";
import { dummySubjects } from "@/data/dummySubjects";
import { useAsyncData } from "./useAsyncData";

export function useSubjects() {
  const result = useAsyncData(getSubjects, dummySubjects);
  return { subjects: result.data, setSubjects: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

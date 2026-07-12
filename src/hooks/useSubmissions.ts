import { getSubmissions } from "@/services/submissionService";
import type { Submission } from "@/types/submission";
import { useAsyncData } from "./useAsyncData";

export function useSubmissions() {
  const result = useAsyncData(getSubmissions, [] as Submission[]);
  return { submissions: result.data, setSubmissions: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

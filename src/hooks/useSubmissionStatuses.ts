import { getSubmissionStatuses } from "@/services/submissionService";
import type { Submission } from "@/types/submission";
import { useAsyncData } from "./useAsyncData";

export function useSubmissionStatuses() {
  const result = useAsyncData(getSubmissionStatuses, [] as Submission[]);
  return { submissions: result.data, setSubmissions: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

import { getSubmissions } from "@/services/submissionService";
import { dummySubmissions } from "@/data/dummySubmissions";
import { useAsyncData } from "./useAsyncData";

export function useSubmissions() {
  const result = useAsyncData(getSubmissions, dummySubmissions);
  return { submissions: result.data, setSubmissions: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

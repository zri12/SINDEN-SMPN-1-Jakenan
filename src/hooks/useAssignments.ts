import { getAssignments } from "@/services/assignmentService";
import type { Assignment } from "@/types/assignment";
import { useAsyncData } from "./useAsyncData";

export function useAssignments() {
  const result = useAsyncData(getAssignments, [] as Assignment[]);
  return { assignments: result.data, setAssignments: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

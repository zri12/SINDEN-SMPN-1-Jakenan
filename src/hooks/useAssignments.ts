import { getAssignments } from "@/services/assignmentService";
import { dummyAssignments } from "@/data/dummyAssignments";
import { useAsyncData } from "./useAsyncData";

export function useAssignments() {
  const result = useAsyncData(getAssignments, dummyAssignments);
  return { assignments: result.data, setAssignments: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

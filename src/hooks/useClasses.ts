import { getClasses } from "@/services/classService";
import { dummyClasses } from "@/data/dummyClasses";
import { useAsyncData } from "./useAsyncData";

export function useClasses() {
  const result = useAsyncData(getClasses, dummyClasses);
  return { classes: result.data, setClasses: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

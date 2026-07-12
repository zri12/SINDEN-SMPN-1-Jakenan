import { dummyAnnouncements } from "@/data/dummyAnnouncements";
import { getAnnouncements } from "@/services/announcementService";
import { useAsyncData } from "./useAsyncData";

export function useAnnouncements() {
  const result = useAsyncData(getAnnouncements, dummyAnnouncements);
  return { announcements: result.data, setAnnouncements: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

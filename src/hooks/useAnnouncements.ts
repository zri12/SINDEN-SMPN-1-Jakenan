import { getAnnouncements } from "@/services/announcementService";
import type { Announcement } from "@/types/submission";
import { useAsyncData } from "./useAsyncData";

export function useAnnouncements() {
  const result = useAsyncData(getAnnouncements, [] as Announcement[]);
  return { announcements: result.data, setAnnouncements: result.setData, isLoading: result.loading, error: result.error, refetch: result.refetch };
}

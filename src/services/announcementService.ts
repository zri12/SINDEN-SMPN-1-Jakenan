import type { Announcement } from "@/types/submission";
import { getSupabase, handleSupabaseError } from "./serviceUtils";

export async function getAnnouncements() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from("announcements").select("*").eq("is_active", true).order("created_at", { ascending: false });
  if (error) handleSupabaseError(error, "Informasi gagal dimuat.");
  return (data ?? []).map(mapAnnouncement);
}

export async function createAnnouncement(announcement: Announcement) {
  const client = getSupabase();
  if (!client) return announcement;

  const { data, error } = await client.from("announcements").insert({
    title: announcement.title,
    content: announcement.content,
    target_role: announcement.targetRole,
    is_active: true
  }).select().single();
  if (error) handleSupabaseError(error, "Informasi gagal disimpan.");
  return mapAnnouncement(data);
}

function mapAnnouncement(row: any): Announcement {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: "Info",
    targetRole: row.target_role,
    status: "Info",
    createdAt: row.created_at
  };
}

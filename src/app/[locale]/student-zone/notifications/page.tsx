import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import NotificationsClient from "./NotificationsClient";

export const metadata: Metadata = {
  title: "Latest Notifications | Dhyeya IAS Greater Noida",
  description:
    "Stay updated with the latest exam alerts, batch announcements, test schedules, and institute news from Dhyeya IAS Greater Noida.",
};

export interface NotifRow {
  id: string;
  title: string;
  description: string;
  date_label: string;
  is_new: boolean;
  created_at: string;
}

async function getAll(): Promise<NotifRow[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("notifications")
      .select("id, title, description, date_label, is_new, created_at")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    return (data ?? []) as NotifRow[];
  } catch {
    return [];
  }
}

export default async function NotificationsPage() {
  const notifications = await getAll();
  return <NotificationsClient notifications={notifications} />;
}

import dynamic from "next/dynamic";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// ISR: rebuild page every hour; data stays fresh without dynamic per-request rendering
export const revalidate = 3600;
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import StatsCounter from "@/components/home/StatsCounter";
import UdaanPromo from "@/components/home/UdaanPromo";
import CoursesSection from "@/components/home/CoursesSection";
import Notifications from "@/components/home/Notifications";

// Below-fold sections: split into separate JS chunks so the initial bundle
// only contains above-the-fold code. Hydration JS loads lazily on scroll.
const ToppersMarquee    = dynamic(() => import("@/components/home/ToppersMarquee"));
const TestSeriesSection = dynamic(() => import("@/components/home/TestSeriesSection"));
const WhyChooseUs       = dynamic(() => import("@/components/home/WhyChooseUs"));
const StudentZone       = dynamic(() => import("@/components/home/StudentZone"));
const DownloadApp       = dynamic(() => import("@/components/home/DownloadApp"));
const Testimonials      = dynamic(() => import("@/components/home/Testimonials"));
const CTASection        = dynamic(() => import("@/components/home/CTASection"));

const getNotifications = unstable_cache(
  async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase
        .from("notifications")
        .select("id, title, description, date_label, is_new, show_in_bar, sort_order, created_at")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      return data ?? [];
    } catch {
      return [];
    }
  },
  ["homepage-notifications"],
  { revalidate: 3600 }
);

export default async function HomePage() {
  const notifications = await getNotifications();

  return (
    <>
      <HeroSection />
      <StatsCounter />
      <WelcomeSection />
      <CoursesSection />
      <UdaanPromo />
      <ToppersMarquee />
      <Notifications initialItems={notifications} />
      <TestSeriesSection />
      <WhyChooseUs />
      <StudentZone />
      <DownloadApp />
      <Testimonials />
      <CTASection />
    </>
  );
}

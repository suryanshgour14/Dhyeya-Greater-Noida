import { createClient } from "@supabase/supabase-js";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import StatsCounter from "@/components/home/StatsCounter";
import ToppersMarquee from "@/components/home/ToppersMarquee";
import UdaanPromo from "@/components/home/UdaanPromo";
import CoursesSection from "@/components/home/CoursesSection";
import Notifications from "@/components/home/Notifications";
import TestSeriesSection from "@/components/home/TestSeriesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StudentZone from "@/components/home/StudentZone";
import DownloadApp from "@/components/home/DownloadApp";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

async function getNotifications() {
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
}

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

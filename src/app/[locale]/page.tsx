import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import StatsCounter from "@/components/home/StatsCounter";
import ToppersMarquee from "@/components/home/ToppersMarquee";
import UdaanPromo from "@/components/home/UdaanPromo";
import CoursesGrid from "@/components/home/CoursesGrid";
import Notifications from "@/components/home/Notifications";
import TestSeriesSection from "@/components/home/TestSeriesSection";
import ActiveBatches from "@/components/home/ActiveBatches";
import StudyMaterial from "@/components/home/StudyMaterial";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StudentZone from "@/components/home/StudentZone";
import DownloadApp from "@/components/home/DownloadApp";
import YouTubeSection from "@/components/home/YouTubeSection";
import DhyeyaStore from "@/components/home/DhyeyaStore";
import TeamSection from "@/components/home/TeamSection";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <WelcomeSection />
      <CoursesGrid />
      <UdaanPromo />
      <ToppersMarquee />
      <Notifications />
      <TestSeriesSection />
      <ActiveBatches />
      <StudyMaterial />
      <YouTubeSection />
      <WhyChooseUs />
      <TeamSection />
      <StudentZone />
      <DhyeyaStore />
      <DownloadApp />
      <Testimonials />
      <BlogSection />
      <CTASection />
    </>
  );
}

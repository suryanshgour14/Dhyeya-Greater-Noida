import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COURSES } from "@/lib/constants";
import CourseHero from "@/components/courses/CourseHero";
import CourseFeatureBento from "@/components/courses/CourseFeatureBento";
import CourseModules from "@/components/courses/CourseModules";
import CourseRoadmap from "@/components/courses/CourseRoadmap";
import WhoFor from "@/components/courses/WhoFor";
import CourseFAQ from "@/components/courses/CourseFAQ";
import StickyEnrollBar from "@/components/courses/StickyEnrollBar";
import EnquirySection from "@/components/courses/EnquirySection";

interface Props {
  params: { slug: string; locale: string };
}

export function generateStaticParams() {
  const locales = ["en", "hi"];
  return locales.flatMap((locale) =>
    COURSES.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = COURSES.find((c) => c.slug === params.slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | Dhyeya IAS Greater Noida`,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }: Props) {
  const course = COURSES.find((c) => c.slug === params.slug);
  if (!course) notFound();

  return (
    <>
      <CourseHero course={course} />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-4xl space-y-16">
            <CourseFeatureBento features={course.features} accentColor={course.accentColor} />
            {course.modules.length > 0 && (
              <CourseModules modules={course.modules} accentColor={course.accentColor} />
            )}
            {course.roadmap.length > 0 && (
              <CourseRoadmap roadmap={course.roadmap} accentColor={course.accentColor} />
            )}
            <WhoFor items={course.whoFor} accentColor={course.accentColor} />
            <CourseFAQ faqs={course.faqs} accentColor={course.accentColor} />
            <EnquirySection course={course} />
          </div>
        </div>
      </div>

      {/* Sticky bottom enroll bar */}
      <StickyEnrollBar
        title={course.title}
        fee={course.fee}
        accentColor={course.accentColor}
      />
    </>
  );
}

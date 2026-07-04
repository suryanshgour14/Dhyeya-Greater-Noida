import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COURSES } from "@/lib/constants";
import { createServerClient } from "@/lib/supabase/server";
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

export default async function CourseDetailPage({ params }: Props) {
  const course = COURSES.find((c) => c.slug === params.slug);
  if (!course) notFound();

  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Look up a payment product linked to this course slug
  const { data: product } = await supabase
    .from("products")
    .select("id, price_inr")
    .eq("type", "course")
    .eq("ref_slug", params.slug)
    .eq("is_active", true)
    .maybeSingle();

  // Check enrollment if user is logged in and a product exists
  let isEnrolled = false;
  if (user && product) {
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id, expires_at")
      .eq("student_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();
    isEnrolled = !!enrollment &&
      (enrollment.expires_at === null || new Date(enrollment.expires_at) > new Date());
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dhyeyagreaternoida.com";
  const courseUrl = `${siteUrl}/${params.locale}/courses/${params.slug}`;
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.title,
      description: course.description,
      url: courseUrl,
      provider: {
        "@type": "EducationalOrganization",
        name: "Dhyeya IAS Greater Noida",
        sameAs: siteUrl,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: product?.price_inr ?? course.fee,
        availability: "https://schema.org/InStock",
        url: courseUrl,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["Onsite", "Online"],
        location: {
          "@type": "Place",
          name: "Dhyeya IAS Greater Noida",
          address: "Greater Noida, Uttar Pradesh, India",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${params.locale}` },
        { "@type": "ListItem", position: 2, name: "Courses", item: `${siteUrl}/${params.locale}/courses` },
        { "@type": "ListItem", position: 3, name: course.title, item: courseUrl },
      ],
    },
  ];
  if (course.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: course.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseHero course={course} productId={product?.id} isEnrolled={isEnrolled} courseSlug={params.slug} />

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

      <StickyEnrollBar
        title={course.title}
        fee={course.fee}
        accentColor={course.accentColor}
        productId={product?.id}
        isEnrolled={isEnrolled}
        courseSlug={params.slug}
      />
    </>
  );
}

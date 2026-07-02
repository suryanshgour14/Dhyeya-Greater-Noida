import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEST_SERIES } from "@/lib/test-series";
import TestSeriesHero from "@/components/test-series/TestSeriesHero";
import TestSeriesSchedule from "@/components/test-series/TestSeriesSchedule";
import TestSeriesEnquiry from "@/components/test-series/TestSeriesEnquiry";

interface Props {
  params: { slug: string; locale: string };
}

export function generateStaticParams() {
  const locales = ["en", "hi"];
  return locales.flatMap((locale) =>
    TEST_SERIES.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = TEST_SERIES.find((s) => s.slug === params.slug);
  if (!series) return { title: "Test Series Not Found" };
  return {
    title: `${series.title} | Dhyeya IAS Greater Noida`,
    description: series.description,
  };
}

// Maps each test series to its Razorpay product (products seeded in Supabase).
const PRODUCT_IDS: Record<string, string> = {
  "ias-prelims": "dd000001-0000-0000-0000-000000000001",
  "ias-mains": "dd000001-0000-0000-0000-000000000002",
  "uppcs-prelims": "dd000001-0000-0000-0000-000000000003",
  "uppcs-mains": "dd000001-0000-0000-0000-000000000004",
  "ukpsc-prelims": "dd000001-0000-0000-0000-000000000005",
  "ukpcs-mains": "dd000001-0000-0000-0000-000000000006",
};

export default function TestSeriesDetailPage({ params }: Props) {
  const series = TEST_SERIES.find((s) => s.slug === params.slug);
  if (!series) notFound();

  return (
    <>
      <TestSeriesHero series={series} productId={PRODUCT_IDS[series.slug]} />
      <TestSeriesSchedule series={series} />
      <TestSeriesEnquiry series={series} />
    </>
  );
}

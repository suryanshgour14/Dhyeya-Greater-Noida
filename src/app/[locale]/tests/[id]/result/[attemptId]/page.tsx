import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import ResultClient from "@/components/result/ResultClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Result | Dhyeya IAS Greater Noida",
  robots: { index: false },
};

export default async function ResultPage({
  params,
}: {
  params: { locale: string; id: string; attemptId: string };
}) {
  const { locale, id, attemptId } = params;
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login`);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const cookie = (await import("next/headers")).cookies();
  const cookieHeader = cookie
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${baseUrl}/api/tests/result/${attemptId}`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) redirect(`/${locale}/tests`);

  const data = await res.json();

  return (
    <ResultClient
      attempt={data.attempt}
      test={data.test}
      sections={data.sections}
      sectionBreakdown={data.sectionBreakdown}
      review={data.review}
      rank={data.rank}
      percentile={data.percentile}
      totalTakers={data.totalTakers}
    />
  );
}

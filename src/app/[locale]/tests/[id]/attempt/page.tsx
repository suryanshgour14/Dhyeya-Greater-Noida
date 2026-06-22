import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import TestAttemptClient from "@/components/test-engine/TestAttemptClient";

export default async function AttemptPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login?next=/${locale}/tests/${id}/attempt`);

  // Call the start API (creates or resumes attempt, returns server deadlines)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const cookie = (await import("next/headers")).cookies();
  const cookieHeader = cookie
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${baseUrl}/api/tests/${id}/start`, {
    method: "POST",
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect(`/${locale}/tests`);
  }

  const data = await res.json();

  if (data.autoSubmitted) {
    redirect(`/${locale}/tests/${id}/result/${data.attempt.id}`);
  }

  return (
    <TestAttemptClient
      attempt={data.attempt}
      test={data.test}
      sections={data.sections}
      questions={data.questions}
      overallDeadline={data.overallDeadline}
      sectionDeadlines={data.sectionDeadlines}
      locale={locale}
    />
  );
}

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

  // Load test (must be published)
  const { data: test } = await supabase
    .from("tests")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!test) redirect(`/${locale}/tests`);

  // Enrollment gate for paid tests
  if (!test.is_free) {
    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("type", "test")
      .eq("ref_id", id)
      .eq("is_active", true)
      .maybeSingle();

    if (product) {
      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("id, expires_at")
        .eq("student_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      const active =
        enrollment &&
        (enrollment.expires_at === null ||
          new Date(enrollment.expires_at) > new Date());
      if (!active) redirect(`/${locale}/tests`);
    }
  }

  // Resume or create attempt
  const { data: existing } = await supabase
    .from("attempts")
    .select("*")
    .eq("student_id", user.id)
    .eq("test_id", id)
    .eq("status", "in_progress")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let attempt = existing;

  if (!attempt) {
    const { data: newAttempt, error } = await supabase
      .from("attempts")
      .insert({
        student_id: user.id,
        test_id:    id,
        progress:   { answers: {}, marked: [], visited: [], currentQ: null },
      })
      .select()
      .single();

    if (error || !newAttempt) redirect(`/${locale}/tests`);
    attempt = newAttempt;
  } else {
    // Auto-submit if deadline passed
    const deadlineSec = attempt.started_at
      ? new Date(attempt.started_at).getTime() / 1000 + test.total_duration_min * 60
      : null;
    if (deadlineSec && Date.now() / 1000 > deadlineSec) {
      await supabase.rpc("score_attempt", { p_attempt_id: attempt.id });
      redirect(`/${locale}/tests/${id}/result/${attempt.id}`);
    }
  }

  // Load sections + questions (correct field excluded — never sent to client)
  const [{ data: sections }, { data: questions }] = await Promise.all([
    supabase
      .from("test_sections")
      .select("*")
      .eq("test_id", id)
      .order("order_index"),
    supabase
      .from("questions")
      .select(
        "id, test_id, section_id, order_index, question_en, question_hi, option_a, option_b, option_c, option_d, created_at"
      )
      .eq("test_id", id)
      .order("section_id")
      .order("order_index"),
  ]);

  const startedAt       = new Date(attempt.started_at).getTime();
  const overallDeadline = new Date(
    startedAt + test.total_duration_min * 60 * 1000
  ).toISOString();

  let sectionDeadlines: Record<string, string> =
    attempt.progress?.sectionDeadlines ?? {};

  if (test.sectional_timing && sections?.length && !Object.keys(sectionDeadlines).length) {
    let cursor = startedAt;
    const map: Record<string, string> = {};
    for (const sec of sections) {
      const dur =
        sec.duration_min ??
        Math.floor(test.total_duration_min / sections.length);
      cursor += dur * 60 * 1000;
      map[sec.id] = new Date(cursor).toISOString();
    }
    sectionDeadlines = map;
    await supabase
      .from("attempts")
      .update({ progress: { ...attempt.progress, sectionDeadlines } })
      .eq("id", attempt.id);
  }

  return (
    <TestAttemptClient
      attempt={attempt}
      test={test}
      sections={sections ?? []}
      questions={questions ?? []}
      overallDeadline={overallDeadline}
      sectionDeadlines={sectionDeadlines}
      locale={locale}
    />
  );
}

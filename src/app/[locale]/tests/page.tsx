import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { Clock, Layers, Lock, ChevronRight, GraduationCap, CheckCircle2 } from "lucide-react";
import type { DBTest } from "@/lib/test-types";
import { cn } from "@/lib/utils";
import BuyButton from "@/components/payments/BuyButton";

interface TestWithCounts extends DBTest {
  test_sections: { count: number }[];
  questions: { count: number }[];
}
interface ProductRow { id: string; ref_id: string }
interface EnrollmentRow { product_id: string; expires_at: string | null }

export default async function TestsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login?next=/${locale}/tests`);

  // Independent reads — fetch in parallel (was 4 sequential round-trips).
  const [
    { data: tests },
    { data: inProgress },
    { data: submitted },
    { data: products },
    { data: seriesLinks },
  ] = await Promise.all([
    supabase
      .from("tests")
      .select("*, test_sections(count), questions(count)")
      .eq("status", "published")
      .order("created_at", { ascending: false }),
    supabase
      .from("attempts")
      .select("test_id")
      .eq("student_id", user.id)
      .eq("status", "in_progress"),
    supabase
      .from("attempts")
      .select("test_id, id")
      .eq("student_id", user.id)
      .in("status", ["submitted", "auto_submitted"])
      .order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("id, ref_id")
      .eq("type", "test")
      .eq("is_active", true),
    supabase
      .from("test_series_links")
      .select("test_id, series_product_id"),
  ]);

  const inProgressSet = new Set((inProgress ?? []).map((a) => a.test_id));

  // Track latest submitted attempt per test for "Result & Analysis" button,
  // and count completed attempts per test for the attempt-limit gate.
  const submittedAttemptMap = new Map<string, string>();
  const attemptCountMap = new Map<string, number>();
  for (const a of (submitted ?? [])) {
    if (!submittedAttemptMap.has(a.test_id)) {
      submittedAttemptMap.set(a.test_id, a.id);
    }
    attemptCountMap.set(a.test_id, (attemptCountMap.get(a.test_id) ?? 0) + 1);
  }

  // Products + enrollments for access gating
  const productByTestId = new Map<string, string>(
    (products as ProductRow[] ?? []).map((p) => [p.ref_id, p.id])
  );

  // Series a test belongs to → candidate products that unlock it
  const seriesByTestId = new Map<string, Set<string>>();
  for (const l of (seriesLinks as { test_id: string; series_product_id: string }[] ?? [])) {
    const set = seriesByTestId.get(l.test_id) ?? new Set<string>();
    set.add(l.series_product_id);
    seriesByTestId.set(l.test_id, set);
  }

  let enrolledProductIds = new Set<string>();
  if (products && products.length > 0) {
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("product_id, expires_at")
      .eq("student_id", user.id)
      .in("product_id", (products as ProductRow[]).map((p) => p.id));
    enrolledProductIds = new Set(
      (enrollments as EnrollmentRow[] ?? [])
        .filter((e) => e.expires_at === null || new Date(e.expires_at) > new Date())
        .map((e) => e.product_id)
    );
  }

  const EXAM_COLORS: Record<string, string> = {
    "UPSC Prelims": "from-blue-600 to-blue-800",
    "CSAT":         "from-sky-600 to-sky-800",
    "UPPSC":        "from-amber-600 to-amber-800",
    "UKPSC":        "from-orange-600 to-orange-800",
    "BPSC":         "from-green-600 to-green-800",
    "Current Affairs": "from-purple-600 to-purple-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <GraduationCap className="mx-auto mb-3 h-10 w-10 text-white/60" />
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {locale === "hi" ? "लाइव टेस्ट" : "Live Tests"}
          </h1>
          <p className="mt-2 text-white/65 text-sm md:text-base">
            {locale === "hi"
              ? "UPSC, UPPSC, UKPSC और BPSC के लिए अभ्यास मॉक टेस्ट।"
              : "Practice mock tests for UPSC, UPPSC, UKPSC and BPSC."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {!tests?.length ? (
          <div className="py-20 text-center text-slate-500">
            <p className="text-lg font-semibold">No tests published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(tests as TestWithCounts[]).map((test) => {
              const gradient         = EXAM_COLORS[test.exam_type ?? ""] ?? "from-slate-700 to-slate-900";
              const resumable        = inProgressSet.has(test.id);
              const submittedAttemptId = submittedAttemptMap.get(test.id);
              const isSubmitted      = !!submittedAttemptId;
              const qCount           = test.questions?.[0]?.count ?? 0;
              const sCount    = test.test_sections?.[0]?.count ?? 0;
              // Candidate products that unlock this test: its series + a legacy per-test product
              const directProductId = productByTestId.get(test.id);
              const candidateIds = new Set<string>(seriesByTestId.get(test.id) ?? []);
              if (directProductId) candidateIds.add(directProductId);
              const enrolled  = Array.from(candidateIds).some((id) => enrolledProductIds.has(id));
              // Legacy single-product buy button still works; series-locked tests point to /test-series
              const productId = directProductId;
              const canStart  = test.is_free || enrolled;

              // Attempt-limit gate
              const attemptsUsed = attemptCountMap.get(test.id) ?? 0;
              const maxAttempts  = test.max_attempts;
              const limited      = maxAttempts != null && maxAttempts > 0;
              const exhausted    = limited && attemptsUsed >= (maxAttempts as number);
              const attemptsLeft = limited ? Math.max(0, (maxAttempts as number) - attemptsUsed) : null;

              return (
                <div key={test.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className={`bg-gradient-to-r ${gradient} p-5 text-white`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                          {test.exam_type ?? "General"}
                        </span>
                        <h2 className="mt-1 text-base font-extrabold leading-tight">{test.title}</h2>
                        {test.title_hi && locale === "hi" && (
                          <p className="mt-0.5 text-sm text-white/75">{test.title_hi}</p>
                        )}
                      </div>
                      {!test.is_free && (enrolled
                        ? <CheckCircle2 className="h-4 w-4 text-green-300 shrink-0 ml-2" />
                        : <Lock className="h-4 w-4 text-white/50 shrink-0 ml-2" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 text-center">
                    {[
                      { label: "Questions", val: qCount },
                      { label: "Sections",  val: sCount },
                      { label: "Duration",  val: `${test.total_duration_min}m` },
                    ].map((s) => (
                      <div key={s.label} className="py-3">
                        <p className="text-base font-extrabold text-slate-800">{s.val}</p>
                        <p className="text-[10px] text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 p-4">
                    <div className="flex gap-2 flex-wrap">
                      {test.is_free && (
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">FREE</span>
                      )}
                      {!test.is_free && enrolled && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">ENROLLED</span>
                      )}
                      {isSubmitted && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">COMPLETED</span>
                      )}
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        <Clock className="h-3 w-3" />{test.total_duration_min} min
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        <Layers className="h-3 w-3" />{sCount} sections
                      </span>
                      {limited && (
                        <span className={cn(
                          "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold",
                          exhausted ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
                        )}>
                          {exhausted ? "No attempts left" : `${attemptsLeft} of ${maxAttempts} left`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      {resumable ? (
                        <Link
                          href={`/${locale}/tests/${test.id}/attempt`}
                          className="flex items-center gap-1 rounded-xl bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
                        >
                          Resume<ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : isSubmitted ? (
                        <>
                          <Link
                            href={`/${locale}/tests/${test.id}/result/${submittedAttemptId}`}
                            className="flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
                          >
                            Result &amp; Analysis<ChevronRight className="h-4 w-4" />
                          </Link>
                          {canStart && !exhausted && (
                            <Link
                              href={`/${locale}/tests/${test.id}/attempt`}
                              className="flex items-center gap-1 rounded-xl border border-brand-blue px-4 py-2 text-sm font-bold text-brand-blue hover:bg-blue-50 transition-colors"
                            >
                              Retest<ChevronRight className="h-4 w-4" />
                            </Link>
                          )}
                        </>
                      ) : canStart ? (
                        <Link
                          href={`/${locale}/tests/${test.id}/attempt`}
                          className="flex items-center gap-1 rounded-xl bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
                        >
                          Start<ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : productId ? (
                        <BuyButton
                          productId={productId}
                          isEnrolled={false}
                          redirectTo={`/tests/${test.id}/attempt`}
                          label="Buy"
                          size="sm"
                          variant="gold"
                          productTitle={test.title}
                        />
                      ) : candidateIds.size > 0 ? (
                        <Link
                          href={`/${locale}/test-series`}
                          className="flex items-center gap-1 rounded-xl bg-brand-gold px-4 py-2 text-sm font-bold text-brand-blue hover:opacity-90 transition-opacity"
                        >
                          <Lock className="h-3.5 w-3.5" /> Enrol via Series
                        </Link>
                      ) : (
                        <span className="flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400">
                          <Lock className="h-3.5 w-3.5" /> Paid
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

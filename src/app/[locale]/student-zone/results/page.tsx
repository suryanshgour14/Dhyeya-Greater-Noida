import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { Trophy, Clock, ChevronRight, FileText, TrendingUp } from "lucide-react";

export default async function TestResultsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login?next=/${locale}/student-zone/results`);

  // Fetch all submitted attempts with test info
  const { data: attempts } = await supabase
    .from("attempts")
    .select("id, test_id, score, total_correct, total_wrong, total_skipped, time_taken_sec, submitted_at, created_at, status")
    .eq("student_id", user.id)
    .in("status", ["submitted", "auto_submitted"])
    .order("submitted_at", { ascending: false });

  // Fetch test details for all attempt test_ids
  const testIds = Array.from(new Set((attempts ?? []).map((a) => a.test_id)));
  const { data: tests } = testIds.length
    ? await supabase.from("tests").select("id, title, exam_type, marks_per_q, total_duration_min").in("id", testIds)
    : { data: [] };

  const testMap = new Map((tests ?? []).map((t) => [t.id, t]));

  function fmtTime(sec: number | null) {
    if (!sec) return "—";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  }

  function fmtDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <Trophy className="mx-auto mb-3 h-10 w-10 text-brand-gold" />
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {locale === "hi" ? "मेरे टेस्ट परिणाम" : "My Test Results"}
          </h1>
          <p className="mt-2 text-white/65 text-sm">
            {locale === "hi"
              ? "आपके सभी पूर्ण परीक्षणों का इतिहास और विश्लेषण"
              : "History and analysis of all your completed tests"}
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-10">
        {!attempts?.length ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <FileText className="h-8 w-8 text-slate-300" />
            </div>
            <p className="text-lg font-semibold text-slate-600">No test results yet</p>
            <p className="mt-1 text-sm text-slate-400">Attempt a test to see your results here.</p>
            <Link
              href={`/${locale}/tests`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
            >
              Browse Tests <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-500">{attempts.length} test{attempts.length !== 1 ? "s" : ""} completed</p>
            {attempts.map((attempt) => {
              const test = testMap.get(attempt.test_id);
              const totalQ = (attempt.total_correct ?? 0) + (attempt.total_wrong ?? 0) + (attempt.total_skipped ?? 0);
              const maxMarks = totalQ * (test?.marks_per_q ?? 2);
              const pct = maxMarks > 0 ? Math.round(((attempt.score ?? 0) / maxMarks) * 100) : 0;
              const scoreColor = pct >= 60 ? "text-green-600" : pct >= 40 ? "text-amber-600" : "text-red-500";

              return (
                <div key={attempt.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                  {/* Left: test info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-bold text-slate-800 truncate">{test?.title ?? "Unknown Test"}</h2>
                      {test?.exam_type && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{test.exam_type}</span>
                      )}
                      {attempt.status === "auto_submitted" && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Auto-submitted</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{fmtDate(attempt.submitted_at ?? attempt.created_at)}</p>

                    {/* Stats row */}
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3.5 w-3.5 text-brand-gold" />
                        <span className={`font-bold text-sm ${scoreColor}`}>{attempt.score ?? 0}</span>
                        <span className="text-slate-400">/ {maxMarks}</span>
                        <span className={`ml-0.5 font-semibold ${scoreColor}`}>({pct}%)</span>
                      </span>
                      <span className="flex items-center gap-1 text-green-600 font-semibold">✓ {attempt.total_correct ?? 0} correct</span>
                      <span className="flex items-center gap-1 text-red-500 font-semibold">✗ {attempt.total_wrong ?? 0} wrong</span>
                      <span className="text-slate-400">— {attempt.total_skipped ?? 0} skipped</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="h-3.5 w-3.5" />{fmtTime(attempt.time_taken_sec)}
                      </span>
                    </div>
                  </div>

                  {/* Right: actions */}
                  <div className="flex gap-2 flex-wrap shrink-0">
                    <Link
                      href={`/${locale}/tests/${attempt.test_id}/result/${attempt.id}`}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Result &amp; Analysis
                    </Link>
                    <Link
                      href={`/${locale}/tests/${attempt.test_id}/attempt`}
                      className="flex items-center gap-1.5 rounded-xl border border-brand-blue px-4 py-2 text-sm font-bold text-brand-blue hover:bg-blue-50 transition-colors"
                    >
                      Retest <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { Clock, Layers, Lock, ChevronRight, GraduationCap } from "lucide-react";
import type { DBTest } from "@/lib/test-types";

interface TestWithCounts extends DBTest {
  test_sections: { count: number }[];
  questions: { count: number }[];
}

export default async function TestsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/tests`);
  }

  const { data: tests } = await supabase
    .from("tests")
    .select("*, test_sections(count), questions(count)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  // Check existing in-progress attempts
  const { data: inProgress } = await supabase
    .from("attempts")
    .select("test_id")
    .eq("student_id", user.id)
    .eq("status", "in_progress");

  const inProgressSet = new Set((inProgress ?? []).map((a) => a.test_id));

  const EXAM_COLORS: Record<string, string> = {
    "UPSC Prelims": "from-blue-600 to-blue-800",
    "CSAT": "from-sky-600 to-sky-800",
    "UPPSC": "from-amber-600 to-amber-800",
    "UKPSC": "from-orange-600 to-orange-800",
    "BPSC": "from-green-600 to-green-800",
    "Current Affairs": "from-purple-600 to-purple-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
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
              const gradient = EXAM_COLORS[test.exam_type ?? ""] ?? "from-slate-700 to-slate-900";
              const resumable = inProgressSet.has(test.id);
              const qCount = test.questions?.[0]?.count ?? 0;
              const sCount = test.test_sections?.[0]?.count ?? 0;

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
                      {!test.is_free && <Lock className="h-4 w-4 text-white/50 shrink-0 ml-2" />}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 text-center">
                    {[
                      { label: "Questions", val: qCount },
                      { label: "Sections", val: sCount },
                      { label: "Duration", val: `${test.total_duration_min}m` },
                    ].map((s) => (
                      <div key={s.label} className="py-3">
                        <p className="text-base font-extrabold text-slate-800">{s.val}</p>
                        <p className="text-[10px] text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <div className="flex gap-2 flex-wrap">
                      {test.is_free && (
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">FREE</span>
                      )}
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        <Clock className="h-3 w-3" />{test.total_duration_min} min
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        <Layers className="h-3 w-3" />{sCount} sections
                      </span>
                    </div>
                    <Link
                      href={`/${locale}/tests/${test.id}/attempt`}
                      className="flex items-center gap-1 rounded-xl bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
                    >
                      {resumable ? "Resume" : "Start"}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
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

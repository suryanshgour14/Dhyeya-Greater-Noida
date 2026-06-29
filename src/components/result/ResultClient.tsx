"use client";

import { useLocale } from "next-intl";
import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Clock, TrendingUp, ChevronRight, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy-load recharts to keep the initial bundle small
const PieChart = lazy(() => import("recharts").then((m) => ({ default: m.PieChart })));
const Pie = lazy(() => import("recharts").then((m) => ({ default: m.Pie })));
const Cell = lazy(() => import("recharts").then((m) => ({ default: m.Cell })));
const BarChart = lazy(() => import("recharts").then((m) => ({ default: m.BarChart })));
const Bar = lazy(() => import("recharts").then((m) => ({ default: m.Bar })));
const XAxis = lazy(() => import("recharts").then((m) => ({ default: m.XAxis })));
const YAxis = lazy(() => import("recharts").then((m) => ({ default: m.YAxis })));
const Tooltip = lazy(() => import("recharts").then((m) => ({ default: m.Tooltip })));
const ResponsiveContainer = lazy(() => import("recharts").then((m) => ({ default: m.ResponsiveContainer })));

interface SectionBreakdown {
  name: string;
  total: number;
  correct: number;
  wrong: number;
  skip: number;
}

interface ReviewQuestion {
  id: string;
  section_id: string;
  question_en: string;
  question_hi: string | null;
  option_a_en: string;
  option_b_en: string;
  option_c_en: string;
  option_d_en: string;
  option_a_hi: string | null;
  option_b_hi: string | null;
  option_c_hi: string | null;
  option_d_hi: string | null;
  explanation_en: string | null;
  explanation_hi: string | null;
  correct: string;
  selected: string | null;
  is_correct: boolean;
}

interface Props {
  attempt: {
    id: string;
    score: number;
    total_correct: number;
    total_wrong: number;
    total_skipped: number;
    time_taken_sec: number;
    status: string;
  };
  test: {
    id: string;
    title: string;
    marks_per_q: number;
    negative_marks: number;
  };
  sections: Array<{ id: string; name: string }>;
  sectionBreakdown: SectionBreakdown[];
  review: ReviewQuestion[];
  rank: number;
  percentile: number;
  totalTakers: number;
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

const DONUT_COLORS = ["#22c55e", "#ef4444", "#94a3b8"];

export default function ResultClient({ attempt, test, sectionBreakdown, review, rank, percentile, totalTakers }: Props) {
  const locale = useLocale();
  const lang = locale === "hi" ? "hi" : "en";
  const [reviewLang, setReviewLang] = useState<"en" | "hi">("en");
  const [showAll, setShowAll] = useState(false);

  const totalQ = attempt.total_correct + attempt.total_wrong + attempt.total_skipped;
  const maxMarks = totalQ * test.marks_per_q;
  const negDeducted = attempt.total_wrong * test.negative_marks;
  const pct = maxMarks > 0 ? Math.round((attempt.score / maxMarks) * 100) : 0;

  const donutData = [
    { name: "Correct", value: attempt.total_correct },
    { name: "Wrong", value: attempt.total_wrong },
    { name: "Skipped", value: attempt.total_skipped },
  ];

  const barData = sectionBreakdown.map((s) => ({
    name: s.name.length > 14 ? s.name.slice(0, 13) + "…" : s.name,
    Correct: s.correct,
    Wrong: s.wrong,
    Skipped: s.skip,
    Accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
  }));

  const visibleReview = showAll ? review : review.slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 pb-10 pt-12 text-white text-center">
        <Trophy className="mx-auto mb-3 h-10 w-10 text-brand-gold" />
        <h1 className="text-2xl font-extrabold md:text-3xl">
          {lang === "hi" ? "परीक्षा परिणाम" : "Test Result"}
        </h1>
        <p className="mt-1 text-white/60 text-sm">{test.title}</p>
      </section>

      <div className="container mx-auto max-w-5xl px-4 space-y-8 pt-8">
        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4"
        >
          <div className="text-center col-span-2 sm:col-span-1 sm:border-r border-slate-100">
            <p className="text-4xl font-extrabold text-brand-blue">
              {attempt.score % 1 === 0 ? attempt.score : attempt.score.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Score / {maxMarks}</p>
            <p className="mt-1 text-base font-bold text-slate-700">{pct}%</p>
          </div>
          {[
            { label: "Correct", val: attempt.total_correct, color: "text-green-600" },
            { label: "Wrong", val: attempt.total_wrong, color: "text-red-500" },
            { label: "Skipped", val: attempt.total_skipped, color: "text-slate-400" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={cn("text-3xl font-extrabold", s.color)}>{s.val}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Meta row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Clock, label: "Time Taken", val: fmtTime(attempt.time_taken_sec) },
            { icon: TrendingUp, label: "Negative Marks", val: `-${negDeducted % 1 === 0 ? negDeducted : negDeducted.toFixed(2)}` },
            { icon: Trophy, label: "Rank", val: `#${rank}` },
            { icon: TrendingUp, label: "Percentile", val: `Top ${100 - percentile}%` },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <Icon className="mx-auto mb-1 h-5 w-5 text-slate-400" />
              <p className="text-xl font-extrabold text-slate-800">{val}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Percentile banner */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-sm text-blue-800">
          <span className="font-bold">You scored better than {percentile}% of {totalTakers} test-taker{totalTakers !== 1 ? "s" : ""}.</span>
          {" "}Your rank is #{rank} overall.
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Donut */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-bold text-slate-700">Score Breakdown</p>
            <Suspense fallback={<div className="h-[200px] animate-pulse rounded-xl bg-slate-100" />}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                    {donutData.map((_, i) => (
                      <Cell key={i} fill={DONUT_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}`, n as string]} />
                </PieChart>
              </ResponsiveContainer>
            </Suspense>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              {donutData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: DONUT_COLORS[i] }} />
                  {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>

          {/* Section-wise bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-bold text-slate-700">Section-wise Accuracy (%)</p>
            <Suspense fallback={<div className="h-[200px] animate-pulse rounded-xl bg-slate-100" />}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v) => [`${v}%`, "Accuracy"]} />
                  <Bar dataKey="Accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Suspense>
          </div>
        </div>

        {/* Section breakdown table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-3.5 text-sm font-bold text-slate-700">
            Section-wise Breakdown
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Section</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-green-500">Correct</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-red-400">Wrong</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">Skipped</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {sectionBreakdown.map((s, i) => (
                  <tr key={i} className="border-b border-slate-100/70 last:border-0 hover:bg-slate-50/40">
                    <td className="px-5 py-3 font-medium text-slate-700">{s.name}</td>
                    <td className="px-5 py-3 text-center text-slate-600">{s.total}</td>
                    <td className="px-5 py-3 text-center font-bold text-green-600">{s.correct}</td>
                    <td className="px-5 py-3 text-center font-bold text-red-500">{s.wrong}</td>
                    <td className="px-5 py-3 text-center text-slate-400">{s.skip}</td>
                    <td className="px-5 py-3 text-center font-semibold text-slate-700">
                      {s.total > 0 ? `${Math.round((s.correct / s.total) * 100)}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Question review */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
            <p className="text-sm font-bold text-slate-700">Question-by-Question Review</p>
            <button
              onClick={() => setReviewLang((l) => l === "en" ? "hi" : "en")}
              className="rounded-lg border border-slate-200 px-3 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
            >
              {reviewLang === "en" ? "हिंदी में देखें" : "View in English"}
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {visibleReview.map((q, i) => {
              const displayQ = reviewLang === "hi" && q.question_hi ? q.question_hi : q.question_en;
              return (
                <div key={q.id} className={cn("p-5", !q.is_correct && q.selected ? "bg-red-50/40" : q.is_correct ? "bg-green-50/30" : "")}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[10px] font-bold text-slate-400 shrink-0">Q{i + 1}</span>
                    {q.is_correct
                      ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      : q.selected
                        ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        : <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 leading-relaxed">{displayQ}</p>
                      <div className="mt-2 grid grid-cols-2 gap-1.5">
                        {(["a","b","c","d"] as const).map((opt) => {
                          const hiKey = `option_${opt}_hi` as keyof ReviewQuestion;
                          const enKey = `option_${opt}_en` as keyof ReviewQuestion;
                          const text = (reviewLang === "hi" && q[hiKey])
                            ? q[hiKey] as string
                            : q[enKey] as string;
                          const isCorrect = q.correct === opt;
                          const isSelected = q.selected === opt;
                          return (
                            <div key={opt} className={cn(
                              "flex items-start gap-2 rounded-xl border px-3 py-2 text-xs",
                              isCorrect ? "border-green-300 bg-green-50 font-semibold text-green-800"
                                : isSelected ? "border-red-300 bg-red-50 text-red-700"
                                : "border-slate-100 bg-white text-slate-600"
                            )}>
                              <span className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold mt-0.5",
                                isCorrect ? "bg-green-500 text-white" : isSelected ? "bg-red-400 text-white" : "bg-slate-100 text-slate-500"
                              )}>{opt.toUpperCase()}</span>
                              <span>{text}</span>
                            </div>
                          );
                        })}
                      </div>
                      {!q.selected && (
                        <p className="mt-2 text-xs text-slate-400 italic">Skipped — Correct: ({q.correct.toUpperCase()})</p>
                      )}
                      {(q.explanation_en || q.explanation_hi) && (
                        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                          <span className="font-bold">Explanation: </span>
                          {reviewLang === "hi" && q.explanation_hi ? q.explanation_hi : q.explanation_en}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {review.length > 10 && (
            <div className="border-t border-slate-100 px-5 py-4 text-center">
              <button
                onClick={() => setShowAll((s) => !s)}
                className="flex items-center gap-1 mx-auto text-sm font-semibold text-brand-blue hover:underline"
              >
                {showAll ? "Show Less" : `Show All ${review.length} Questions`}
                <ChevronRight className={cn("h-4 w-4 transition-transform", showAll && "rotate-90")} />
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href={`/${locale}/tests`}
            className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Take Another Test
          </Link>
          <Link
            href={`/${locale}/courses`}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

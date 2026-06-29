"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Flag, X, Send, Menu, Globe,
  AlertTriangle,
} from "lucide-react";
import type { ClientQuestion, DBAttempt, DBTest, DBSection, AttemptProgress } from "@/lib/test-types";

// ─── Palette states ──────────────────────────────────────────────────────────
type QState = "not_visited" | "visited" | "answered" | "marked" | "answered_marked";

function getQState(id: string, progress: AttemptProgress): QState {
  const answered = !!progress.answers?.[id];
  const marked   = progress.marked?.includes(id) ?? false;
  const visited  = progress.visited?.includes(id) ?? false;
  if (answered && marked) return "answered_marked";
  if (marked)   return "marked";
  if (answered) return "answered";
  if (visited)  return "visited";
  return "not_visited";
}

const STATE_COLORS: Record<QState, string> = {
  not_visited:    "bg-white border-slate-200 text-slate-600",
  visited:        "bg-red-50 border-red-300 text-red-700",
  answered:       "bg-green-500 border-green-600 text-white",
  marked:         "bg-purple-500 border-purple-600 text-white",
  answered_marked:"bg-purple-500 border-purple-600 text-white ring-2 ring-green-400",
};

// ─── Timer ────────────────────────────────────────────────────────────────────
function useCountdown(deadlineISO: string, onExpire: () => void) {
  const [remaining, setRemaining] = useState(0);
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!deadlineISO) return;
    function tick() {
      const diff = Math.floor((new Date(deadlineISO).getTime() - Date.now()) / 1000);
      if (diff <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        setRemaining(0);
        onExpire();
        return;
      }
      setRemaining(Math.max(0, diff));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadlineISO, onExpire]);

  return remaining;
}

function fmtTime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  attempt: DBAttempt;
  test: DBTest;
  sections: DBSection[];
  questions: ClientQuestion[];
  overallDeadline: string;
  sectionDeadlines: Record<string, string>;
  locale: string;
}

export default function TestAttemptClient({
  attempt, test, sections, questions, overallDeadline, sectionDeadlines, locale,
}: Props) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [progress, setProgress] = useState<AttemptProgress>(
    attempt.progress ?? { answers: {}, marked: [], visited: [], currentQ: null }
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showPalette, setShowPalette] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [blurCount, setBlurCount] = useState(attempt.blur_count ?? 0);
  const [showBlurWarn, setShowBlurWarn] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockedSections = useRef<Set<string>>(new Set());

  // Restore current question from progress
  useEffect(() => {
    if (progress.currentQ) {
      const idx = questions.findIndex((q) => q.id === progress.currentQ);
      if (idx >= 0) setCurrentIdx(idx);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Anti-cheat: tab blur
  useEffect(() => {
    function onBlur() {
      setBlurCount((n) => n + 1);
      setShowBlurWarn(true);
      setTimeout(() => setShowBlurWarn(false), 3000);
    }
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  // Fullscreen on mount
  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    return () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // ─── Save progress (debounced) ──────────────────────────────────────────
  const saveProgress = useCallback(async (prog: AttemptProgress, blur?: number) => {
    await fetch(`/api/tests/${test.id}/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attemptId: attempt.id,
        progress: prog,
        blurCount: blur,
      }),
    }).then(async (r) => {
      const j = await r.json();
      if (j.autoSubmitted) {
        router.replace(`/${locale}/tests/${test.id}/result/${attempt.id}`);
      }
    });
  }, [attempt.id, test.id, locale, router]);

  function scheduleAutoSave(prog: AttemptProgress) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveProgress(prog, blurCount), 2000);
  }

  function updateProgress(update: Partial<AttemptProgress>) {
    setProgress((prev) => {
      const next = { ...prev, ...update };
      scheduleAutoSave(next);
      return next;
    });
  }

  // ─── Navigation ──────────────────────────────────────────────────────────
  const currentQ = questions[currentIdx];

  function goTo(idx: number) {
    const q = questions[idx];
    if (!q) return;
    if (lockedSections.current.has(q.section_id)) return; // locked section
    setProgress((prev) => {
      const visited = prev.visited.includes(currentQ.id)
        ? prev.visited : [...prev.visited, currentQ.id];
      const next = { ...prev, visited, currentQ: q.id };
      scheduleAutoSave(next);
      return next;
    });
    setCurrentIdx(idx);
  }

  function handleAnswer(option: string) {
    const qId = currentQ.id;
    if (lockedSections.current.has(currentQ.section_id)) return;
    updateProgress({
      answers: { ...progress.answers, [qId]: option },
      visited: progress.visited.includes(qId) ? progress.visited : [...progress.visited, qId],
      currentQ: qId,
    });
  }

  function handleMarkForReview() {
    const qId = currentQ.id;
    const marked = progress.marked.includes(qId)
      ? progress.marked.filter((id) => id !== qId)
      : [...progress.marked, qId];
    updateProgress({ marked, currentQ: qId });
    goTo(currentIdx + 1);
  }

  function handleClearResponse() {
    const qId = currentQ.id;
    const answers = { ...progress.answers };
    delete answers[qId];
    updateProgress({ answers, currentQ: qId });
  }

  function handleSaveNext() {
    updateProgress({ currentQ: currentQ.id });
    goTo(currentIdx + 1);
  }

  // ─── Submit ────────────────────────────────────────────────────────────
  async function doSubmit() {
    setSubmitting(true);
    await saveProgress(progress, blurCount);
    const res = await fetch(`/api/tests/${test.id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId: attempt.id }),
    });
    const json = await res.json();
    setSubmitting(false);
    if (res.ok) {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      router.replace(`/${locale}/tests/${test.id}/result/${attempt.id}`);
    } else {
      alert(json.error ?? "Submit failed. Try again.");
    }
  }

  // ─── Overall auto-submit ─────────────────────────────────────────────
  const handleOverallExpiry = useCallback(async () => {
    await saveProgress(progress, blurCount);
    await fetch(`/api/tests/${test.id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId: attempt.id }),
    });
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    router.replace(`/${locale}/tests/${test.id}/result/${attempt.id}`);
  }, [progress, blurCount, attempt.id, test.id, locale, router, saveProgress]);

  const overallRemaining = useCountdown(overallDeadline, handleOverallExpiry);

  // ─── Sectional auto-lock ─────────────────────────────────────────────
  useEffect(() => {
    if (!test.sectional_timing) return;
    const interval = setInterval(() => {
      for (const [secId, deadline] of Object.entries(sectionDeadlines)) {
        if (Date.now() > new Date(deadline).getTime()) {
          if (!lockedSections.current.has(secId)) {
            lockedSections.current.add(secId);
            // advance to first question of next unlocked section
            const nextIdx = questions.findIndex(
              (q) => !lockedSections.current.has(q.section_id)
            );
            if (nextIdx >= 0) goTo(nextIdx);
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sectionDeadlines, test.sectional_timing]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Stats for submit modal ───────────────────────────────────────────
  const totalQ = questions.length;
  const answeredCount = Object.keys(progress.answers).length;
  const markedCount = progress.marked.length;
  const notAnswered = totalQ - answeredCount;

  const currentSection = sections.find((s) => s.id === currentQ?.section_id);
  const isLocked = currentQ ? lockedSections.current.has(currentQ.section_id) : false;

  const displayQ = currentQ
    ? (lang === "hi" && currentQ.question_hi ? currentQ.question_hi : currentQ.question_en)
    : "";

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white overflow-hidden" style={{ userSelect: "none" }}>
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-900 px-3 py-2.5 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setShowPalette((p) => !p)}
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{test.title}</p>
            {currentSection && (
              <p className="text-[10px] text-white/55 truncate">{currentSection.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Lang toggle */}
          <button
            onClick={() => setLang((l) => l === "en" ? "hi" : "en")}
            className="flex items-center gap-1 rounded-lg border border-white/20 px-2.5 py-1 text-[11px] font-bold hover:bg-white/10"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "en" ? "हिं" : "EN"}
          </button>

          {/* Overall timer */}
          <div className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-mono font-bold tabular-nums",
            overallRemaining < 300 ? "bg-red-600 text-white animate-pulse" : "bg-white/10 text-white"
          )}>
            {fmtTime(overallRemaining)}
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-brand-gold px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500"
          >
            <Send className="h-3.5 w-3.5" />
            Submit
          </button>
        </div>
      </div>

      {/* ── Main area ── */}
      <div className="flex flex-1 min-h-0">
        {/* Question area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mx-auto w-full max-w-3xl"
            >
              {/* Question header */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  Q {currentIdx + 1} / {totalQ}
                </span>
                {currentSection && (
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {currentSection.name}
                  </span>
                )}
                {isLocked && (
                  <span className="rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                    Section Locked
                  </span>
                )}
              </div>

              {/* Question text */}
              <div className="mb-5 rounded-2xl bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-800 border border-slate-200">
                {displayQ}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {(["a", "b", "c", "d"] as const).map((opt) => {
                  const hiKey = `option_${opt}_hi` as keyof ClientQuestion;
                  const enKey = `option_${opt}_en` as keyof ClientQuestion;
                  const text = (lang === "hi" && currentQ?.[hiKey])
                    ? currentQ[hiKey] as string
                    : currentQ?.[enKey] as string;
                  const selected = progress.answers?.[currentQ?.id] === opt;
                  return (
                    <button
                      key={opt}
                      disabled={isLocked}
                      onClick={() => handleAnswer(opt)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition-all",
                        selected
                          ? "border-brand-blue bg-blue-50 text-brand-blue font-semibold shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:border-brand-blue/30 hover:bg-blue-50/30",
                        isLocked && "cursor-not-allowed opacity-60"
                      )}
                    >
                      <span className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                        selected ? "border-brand-blue bg-brand-blue text-white" : "border-slate-300 bg-slate-50 text-slate-500"
                      )}>
                        {opt.toUpperCase()}
                      </span>
                      <span className="flex-1 pt-0.5">{text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => goTo(currentIdx - 1)}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  onClick={handleClearResponse}
                  disabled={!progress.answers?.[currentQ?.id] || isLocked}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                >
                  Clear Response
                </button>
                <button
                  onClick={handleMarkForReview}
                  disabled={isLocked}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                    progress.marked.includes(currentQ?.id)
                      ? "border-purple-300 bg-purple-50 text-purple-700"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <Flag className="h-3.5 w-3.5" />
                  {progress.marked.includes(currentQ?.id) ? "Unmark" : "Mark for Review"}
                </button>
                <button
                  onClick={handleSaveNext}
                  className="ml-auto flex items-center gap-1 rounded-xl bg-brand-blue px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-40"
                  disabled={currentIdx === totalQ - 1}
                >
                  Save & Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Question Palette ── */}
        <aside className={cn(
          "flex flex-col border-l border-slate-200 bg-slate-50",
          "w-[260px] shrink-0",
          "hidden lg:flex",
          showPalette ? "!flex fixed inset-y-0 right-0 z-50 shadow-xl lg:relative lg:shadow-none" : "hidden"
        )}>
          <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Question Palette</p>
            <button onClick={() => setShowPalette(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-700">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Legend */}
          <div className="border-b border-slate-100 px-4 py-2.5 grid grid-cols-2 gap-1.5">
            {([
              { state: "not_visited",    label: "Not Visited" },
              { state: "visited",        label: "Visited" },
              { state: "answered",       label: "Answered" },
              { state: "marked",         label: "Marked" },
              { state: "answered_marked",label: "Ans+Marked" },
            ] as { state: QState; label: string }[]).map(({ state, label }) => (
              <div key={state} className="flex items-center gap-1.5">
                <span className={cn("h-4 w-4 shrink-0 rounded border text-[8px] flex items-center justify-center", STATE_COLORS[state])} />
                <span className="text-[10px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-b border-slate-100 px-4 py-2.5 grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div><p className="font-bold text-green-600">{answeredCount}</p><p className="text-slate-500">Ans</p></div>
            <div><p className="font-bold text-red-500">{notAnswered}</p><p className="text-slate-500">Not Ans</p></div>
            <div><p className="font-bold text-purple-600">{markedCount}</p><p className="text-slate-500">Marked</p></div>
          </div>

          {/* Grid per section */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
            {sections.map((sec) => {
              const secQs = questions.filter((q) => q.section_id === sec.id);
              const locked = lockedSections.current.has(sec.id);
              return (
                <div key={sec.id}>
                  <p className={cn("mb-2 text-[10px] font-bold uppercase tracking-widest", locked ? "text-red-400" : "text-slate-400")}>
                    {sec.name} {locked ? "(Locked)" : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {secQs.map((q, _) => {
                      const qIdx = questions.indexOf(q);
                      const state = getQState(q.id, progress);
                      return (
                        <button
                          key={q.id}
                          onClick={() => goTo(qIdx)}
                          disabled={locked}
                          className={cn(
                            "h-7 w-7 rounded-md border text-[11px] font-bold transition-all",
                            STATE_COLORS[state],
                            qIdx === currentIdx && "ring-2 ring-brand-gold",
                            locked && "cursor-not-allowed opacity-50"
                          )}
                        >
                          {qIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* ── Blur warning ── */}
      <AnimatePresence>
        {showBlurWarn && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-1/2 top-16 z-[10000] -translate-x-1/2 flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl"
          >
            <AlertTriangle className="h-4 w-4" />
            Tab switch detected ({blurCount}). Please stay on the exam.
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit modal ── */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-slate-800">Submit Test?</h3>
              <p className="mt-1 text-sm text-slate-500">
                You cannot change answers after submitting.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-green-50 py-3">
                  <p className="text-xl font-extrabold text-green-600">{answeredCount}</p>
                  <p className="text-xs text-slate-500">Answered</p>
                </div>
                <div className="rounded-xl bg-red-50 py-3">
                  <p className="text-xl font-extrabold text-red-500">{notAnswered}</p>
                  <p className="text-xs text-slate-500">Not Answered</p>
                </div>
                <div className="rounded-xl bg-purple-50 py-3">
                  <p className="text-xl font-extrabold text-purple-600">{markedCount}</p>
                  <p className="text-xs text-slate-500">Marked</p>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Continue Test
                </button>
                <button
                  onClick={doSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Submit Final
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

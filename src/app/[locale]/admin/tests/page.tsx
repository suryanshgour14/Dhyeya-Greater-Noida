"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Send, BookOpen, Loader2, CheckCircle2, XCircle,
  X, FileUp, Shield, Newspaper, FileText, Trash2, Star, Bell,
  Pencil, ChevronDown, ChevronUp, BarChart2, Trophy, Clock, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ExcelUpload from "@/components/admin/ExcelUpload";
import { cn } from "@/lib/utils";
import type { ParsedQuestion } from "@/lib/test-types";
import { format } from "date-fns";

// ── Types ──────────────────────────────────────────────────
interface TestRow {
  id: string; title: string; exam_type: string | null; status: string;
  total_duration_min: number; marks_per_q: number; negative_marks: number;
  sectional_timing: boolean; is_free: boolean; created_at: string;
  series_ids?: string[];
  test_sections: { count: number }[]; questions: { count: number }[];
}

interface SeriesOption { id: string; title: string; price_inr: number }

interface QuestionRow {
  id: string;
  order_index: number;
  question_en: string;
  question_hi: string | null;
  option_a_en: string; option_b_en: string; option_c_en: string; option_d_en: string;
  correct: string;
  test_sections: { name: string } | null;
}

interface CARow {
  id: string; title: string; slug: string; category: string;
  is_important: boolean; published_at: string;
}

interface MagRow {
  id: string; title: string; month: string; year: number;
  cover_image_url: string | null; pdf_url: string; is_free: boolean;
  topics: string[]; description: string | null; published_at: string;
}

// ── Constants ──────────────────────────────────────────────
const EXAM_TYPES = ["UPSC Prelims", "UPSC Mains", "CSAT", "UPPSC", "UKPSC", "BPSC", "Current Affairs"];
const CA_CATEGORIES = ["Economy", "Polity", "Science", "Environment", "International", "History", "Geography", "Social", "Security"];
const GS_OPTIONS = ["GS1", "GS2", "GS3", "GS4", "Prelims", "Essay"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const inputCls = "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-brand-gold/60 focus:bg-white/15 focus:ring-2 focus:ring-brand-gold/30 transition-all";
const selectCls = "w-full rounded-xl border border-white/10 bg-[#0d2050] px-4 py-2.5 text-sm text-white outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/30 transition-all";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      {children}
    </div>
  );
}

// Checkbox list of test series a test belongs to. `dark` matches the create
// modal's dark theme; the edit modal passes dark={false} for its light panel.
function SeriesPicker({
  seriesList, selected, onToggle, disabled = false, dark = true,
}: {
  seriesList: SeriesOption[];
  selected: string[];
  onToggle: (id: string) => void;
  disabled?: boolean;
  dark?: boolean;
}) {
  return (
    <div>
      <p className={cn("mb-1.5 text-xs font-semibold uppercase tracking-wider", dark ? "text-slate-400" : "text-slate-500")}>
        Accessible in Test Series {disabled && <span className="normal-case font-normal opacity-70">— (free test: open to all)</span>}
      </p>
      {seriesList.length === 0 ? (
        <p className={cn("text-xs", dark ? "text-white/40" : "text-slate-400")}>No test series found. Seed products first.</p>
      ) : (
        <div className={cn("grid grid-cols-1 gap-2 sm:grid-cols-2", disabled && "pointer-events-none opacity-40")}>
          {seriesList.map((s) => {
            const on = selected.includes(s.id);
            return (
              <label
                key={s.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all",
                  on
                    ? "border-brand-gold/50 bg-brand-gold/10 " + (dark ? "text-brand-gold" : "text-amber-700")
                    : dark
                      ? "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300",
                )}
              >
                <input type="checkbox" checked={on} onChange={() => onToggle(s.id)} className="h-4 w-4 accent-amber-400" />
                <span className="font-medium leading-tight">{s.title}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ══════════════════════════════════════════════════════════════
export default function AdminPage() {
  const locale = useLocale();
  const [tab, setTab] = useState<"tests" | "ca" | "magazine">("tests");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10">
            <Shield className="h-5 w-5 text-brand-blue" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Admin Panel</p>
            <h1 className="text-lg font-bold text-slate-800">Content Management</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {([
            { key: "tests", icon: FileText, label: "Test Series" },
            { key: "ca", icon: Newspaper, label: "Current Affairs" },
            { key: "magazine", icon: BookOpen, label: "Magazine" },
          ] as const).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                tab === key ? "bg-brand-blue text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
          <Link href={`/${locale}/admin/notifications`}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all">
            <Bell className="h-4 w-4" /> Notifications
          </Link>
        </div>
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className={cn("fixed right-5 top-5 z-[9999] flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-xl",
              toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white")}>
            {toast.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {tab === "tests"    && <TestsTab locale={locale} showToast={showToast} />}
      {tab === "ca"       && <CurrentAffairsTab showToast={showToast} />}
      {tab === "magazine" && <MagazineTab showToast={showToast} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 1 — Test Series
// ══════════════════════════════════════════════════════════════
function TestsTab({ locale, showToast }: { locale: string; showToast: (m: string, ok: boolean) => void }) {
  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editTest, setEditTest] = useState<TestRow | null>(null);
  const [reportTest, setReportTest] = useState<TestRow | null>(null);
  const [step, setStep] = useState<"form" | "questions">("form");
  const [draftId, setDraftId] = useState<string | null>(null);
  const [parsedQs, setParsedQs] = useState<ParsedQuestion[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", title_hi: "", exam_type: "", total_duration_min: "90", marks_per_q: "2", negative_marks: "0.66", sectional_timing: false, is_free: false, series_ids: [] as string[] });
  const [seriesList, setSeriesList] = useState<SeriesOption[]>([]);

  useEffect(() => {
    fetch("/api/admin/series")
      .then((r) => (r.ok ? r.json() : { series: [] }))
      .then((d) => setSeriesList(d.series ?? []))
      .catch(() => setSeriesList([]));
  }, []);

  const loadTests = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/tests");
    if (res.ok) { const { tests } = await res.json(); setTests(tests ?? []); }
    setLoading(false);
  }, []);

  useEffect(() => { loadTests(); }, [loadTests]);

  function resetAndClose() {
    setShowCreate(false); setStep("form"); setDraftId(null); setParsedQs([]);
    setForm({ title: "", title_hi: "", exam_type: "", total_duration_min: "90", marks_per_q: "2", negative_marks: "0.66", sectional_timing: false, is_free: false, series_ids: [] });
    loadTests();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault(); setCreating(true);
    const res = await fetch("/api/admin/tests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json(); setCreating(false);
    if (!res.ok) { showToast(json.error, false); return; }
    setDraftId(json.test.id); setStep("questions");
  }

  async function handleUpload(targetId?: string) {
    const id = targetId ?? draftId;
    if (!id || !parsedQs.length) return;
    if (parsedQs.some((q) => q.errors.length > 0)) { showToast("Fix all errors first", false); return; }
    setUploading(true);
    const res = await fetch(`/api/admin/tests/${id}/questions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ questions: parsedQs }) });
    const json = await res.json(); setUploading(false);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast(`${json.inserted} questions uploaded!`, true);
    loadTests();
  }

  async function handlePublish(id: string, unpublish = false) {
    setPublishing(id);
    const res = await fetch(`/api/admin/tests/${id}/publish`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ unpublish }) });
    const json = await res.json(); setPublishing(null);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast(unpublish ? "Unpublished" : "Published!", true); loadTests();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this test? All questions and attempts will be permanently removed.")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/tests/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) { showToast("Test deleted", true); loadTests(); }
    else { const j = await res.json(); showToast(j.error ?? "Delete failed", false); }
  }

  return (
    <div>
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700">All Tests ({tests.length})</h2>
        <div className="flex gap-2">
          <a href="/api/admin/tests/template" download>
            <Button variant="outline" size="sm" className="text-xs">Template</Button>
          </a>
          <Button onClick={() => setShowCreate(true)} size="sm" className="bg-brand-blue text-white hover:bg-brand-blue/90 text-xs">
            <Plus className="h-4 w-4 mr-1" /> New Test
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {loading
          ? <div className="py-20 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-300" /></div>
          : tests.length === 0
            ? <EmptyState icon={FileText} text="No tests yet. Create your first test." />
            : <div className="space-y-3">
              {tests.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 truncate">{t.title}</h3>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                        t.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                        {t.status}
                      </span>
                      {t.is_free && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">FREE</span>}
                    </div>
                    <p className="text-xs text-slate-400">
                      {t.exam_type || "—"} · {t.total_duration_min}min · {t.marks_per_q}m/Q · {t.questions?.[0]?.count ?? 0}Q
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {/* Edit */}
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setEditTest(t)}>
                      <Pencil className="h-3.5 w-3.5 mr-1" />Edit
                    </Button>
                    {/* Reports */}
                    {t.status === "published" && (
                      <Button variant="outline" size="sm" className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50" onClick={() => setReportTest(t)}>
                        <BarChart2 className="h-3.5 w-3.5 mr-1" />Reports
                      </Button>
                    )}
                    {/* Publish / Unpublish */}
                    <Button size="sm"
                      variant={t.status === "published" ? "outline" : "default"}
                      disabled={publishing === t.id}
                      onClick={() => handlePublish(t.id, t.status === "published")}
                      className={cn("text-xs", t.status !== "published" && "bg-brand-blue text-white hover:bg-brand-blue/90")}>
                      {publishing === t.id
                        ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                        : <Send className="h-3.5 w-3.5 mr-1" />}
                      {t.status === "published" ? "Unpublish" : "Publish"}
                    </Button>
                    {/* Delete */}
                    <Button size="sm" variant="outline" disabled={deleting === t.id}
                      onClick={() => handleDelete(t.id)}
                      className="text-xs border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300">
                      {deleting === t.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>}
      </div>

      {/* ── Create modal ── */}
      <AnimatePresence>
        {showCreate && (
          <Modal onClose={resetAndClose} title={step === "form" ? "Create New Test" : "Upload Questions"} step={step === "form" ? 1 : 2}>
            {step === "form" ? (
              <form onSubmit={handleCreate} className="p-7 space-y-5">
                <Field label="Test Title (English) *">
                  <input required className={inputCls} placeholder="e.g. UPSC Prelims Mock Test 1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </Field>
                <Field label="Title (Hindi) — optional">
                  <input className={inputCls} placeholder="हिंदी में शीर्षक" value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Exam Type">
                    <select className={selectCls} value={form.exam_type} onChange={(e) => setForm({ ...form, exam_type: e.target.value })}>
                      <option value="">Select...</option>{EXAM_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Duration (minutes) *">
                    <input type="number" required min="1" className={inputCls} value={form.total_duration_min} onChange={(e) => setForm({ ...form, total_duration_min: e.target.value })} />
                  </Field>
                  <Field label="Marks per Question">
                    <input type="number" step="0.1" className={inputCls} value={form.marks_per_q} onChange={(e) => setForm({ ...form, marks_per_q: e.target.value })} />
                  </Field>
                  <Field label="Negative Marks">
                    <input type="number" step="0.01" className={inputCls} value={form.negative_marks} onChange={(e) => setForm({ ...form, negative_marks: e.target.value })} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([["sectional", "Sectional Timing", "sectional_timing"], ["isfree", "Free Test", "is_free"]] as const).map(([id, label, key]) => (
                    <label key={id} htmlFor={id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                      form[key] ? "border-brand-gold/50 bg-brand-gold/10 text-brand-gold" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20")}>
                      <input type="checkbox" id={id} checked={form[key] as boolean} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="h-4 w-4 accent-amber-400" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Which test series can access this test (ignored for free tests) */}
                <SeriesPicker
                  seriesList={seriesList}
                  selected={form.series_ids}
                  disabled={form.is_free}
                  onToggle={(id) => setForm((f) => ({
                    ...f,
                    series_ids: f.series_ids.includes(id)
                      ? f.series_ids.filter((s) => s !== id)
                      : [...f.series_ids, id],
                  }))}
                />

                <ModalFooter onCancel={resetAndClose} submitLabel="Next: Upload Questions →" loading={creating} />
              </form>
            ) : (
              /* ── Questions upload step — scrollable content, sticky buttons ── */
              <div className="flex flex-col bg-slate-50" style={{ maxHeight: "65vh" }}>
                <div className="flex-1 overflow-y-auto p-7" data-lenis-prevent>
                  <ExcelUpload onParsed={setParsedQs} />
                </div>
                <div className="shrink-0 flex justify-end gap-3 border-t border-slate-200 bg-white px-7 py-4">
                  <Button variant="outline" onClick={resetAndClose}>Done / Close</Button>
                  <Button
                    onClick={() => handleUpload()}
                    disabled={uploading || !parsedQs.length || parsedQs.some((q) => q.errors.length > 0)}
                    className="bg-brand-blue text-white">
                    {uploading && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                    <FileUp className="h-4 w-4 mr-1" />
                    Upload {parsedQs.length > 0 ? `(${parsedQs.length} Qs)` : ""}
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>

      {/* ── Reports modal ── */}
      <AnimatePresence>
        {reportTest && (
          <ReportsModal test={reportTest} locale={locale} onClose={() => setReportTest(null)} />
        )}
      </AnimatePresence>

      {/* ── Edit modal ── */}
      <AnimatePresence>
        {editTest && (
          <EditTestModal
            test={editTest}
            seriesList={seriesList}
            onClose={() => { setEditTest(null); setParsedQs([]); loadTests(); }}
            showToast={showToast}
            parsedQs={parsedQs}
            setParsedQs={setParsedQs}
            onUpload={() => handleUpload(editTest.id)}
            uploading={uploading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Edit Test Modal ────────────────────────────────────────────
function EditTestModal({
  test, seriesList, onClose, showToast, parsedQs, setParsedQs, onUpload, uploading,
}: {
  test: TestRow;
  seriesList: SeriesOption[];
  onClose: () => void;
  showToast: (m: string, ok: boolean) => void;
  parsedQs: ParsedQuestion[];
  setParsedQs: (q: ParsedQuestion[]) => void;
  onUpload: () => void;
  uploading: boolean;
}) {
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [loadingQs, setLoadingQs] = useState(true);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [showReupload, setShowReupload] = useState(false);
  const [deletingQ, setDeletingQ] = useState<string | null>(null);

  // Access / series editing
  const [isFree, setIsFree] = useState(test.is_free);
  const [seriesIds, setSeriesIds] = useState<string[]>(test.series_ids ?? []);
  const [savingAccess, setSavingAccess] = useState(false);

  async function saveAccess() {
    setSavingAccess(true);
    const res = await fetch(`/api/admin/tests/${test.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_free: isFree, series_ids: isFree ? [] : seriesIds }),
    });
    setSavingAccess(false);
    showToast(res.ok ? "Access settings saved" : "Failed to save access", res.ok);
  }

  useEffect(() => {
    fetch(`/api/admin/tests/${test.id}/questions`)
      .then((r) => r.json())
      .then(({ questions }) => { setQuestions(questions ?? []); setLoadingQs(false); });
  }, [test.id]);

  async function handleDeleteQuestion(qId: string) {
    if (!confirm("Delete this question?")) return;
    setDeletingQ(qId);
    const res = await fetch(`/api/admin/tests/${test.id}/questions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: qId, _delete: true }),
    });
    setDeletingQ(null);
    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q.id !== qId));
      showToast("Question deleted", true);
    } else {
      showToast("Delete failed", false);
    }
  }

  // Group by section
  const bySection: Record<string, QuestionRow[]> = {};
  for (const q of questions) {
    const sec = q.test_sections?.name ?? "Unknown";
    if (!bySection[sec]) bySection[sec] = [];
    bySection[sec].push(q);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="shrink-0 bg-[#0B1C3D] px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80">Edit Test</p>
            <h2 className="text-lg font-bold text-white truncate max-w-md">{test.title}</h2>
            <p className="text-xs text-white/50 mt-0.5">
              {test.exam_type || "—"} · {test.total_duration_min}min · {questions.length} questions
            </p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Re-upload section toggle */}
        <div className="shrink-0 bg-[#0d2057] border-b border-white/10">
          <button
            onClick={() => setShowReupload((s) => !s)}
            className="flex w-full items-center justify-between px-7 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition-colors">
            <span className="flex items-center gap-2">
              <FileUp className="h-4 w-4 text-brand-gold" />
              Re-upload Questions (replaces all existing)
            </span>
            {showReupload ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          <AnimatePresence>
            {showReupload && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="bg-slate-50 px-7 py-5 max-h-72 overflow-y-auto" data-lenis-prevent>
                  <ExcelUpload onParsed={setParsedQs} />
                </div>
                <div className="flex justify-end gap-3 border-t border-slate-200 bg-white px-7 py-4">
                  <Button variant="outline" size="sm" onClick={() => { setShowReupload(false); setParsedQs([]); }}>Cancel</Button>
                  <Button size="sm"
                    onClick={() => { onUpload(); setShowReupload(false); setParsedQs([]); }}
                    disabled={uploading || !parsedQs.length || parsedQs.some((q) => q.errors.length > 0)}
                    className="bg-brand-blue text-white text-xs">
                    {uploading && <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />}
                    <FileUp className="h-3.5 w-3.5 mr-1" />
                    Upload {parsedQs.length > 0 ? `(${parsedQs.length} Qs)` : ""}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Access & Series */}
        <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-7 py-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Access & Series</span>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600">
                <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="h-4 w-4 accent-brand-blue" />
                Free (open to all)
              </label>
              <Button size="sm" onClick={saveAccess} disabled={savingAccess} className="bg-brand-blue text-white text-xs">
                {savingAccess && <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />}
                Save Access
              </Button>
            </div>
          </div>
          <SeriesPicker
            seriesList={seriesList}
            selected={seriesIds}
            disabled={isFree}
            dark={false}
            onToggle={(id) => setSeriesIds((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])}
          />
        </div>

        {/* Questions list */}
        <div className="flex-1 overflow-y-auto bg-white" data-lenis-prevent>
          {loadingQs ? (
            <div className="py-16 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-300" /></div>
          ) : questions.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">No questions yet. Use Re-upload above to add questions.</div>
          ) : (
            <div>
              {Object.entries(bySection).map(([secName, qs]) => (
                <div key={secName}>
                  <div className="sticky top-0 bg-slate-50 border-y border-slate-200 px-6 py-2 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{secName}</span>
                    <span className="ml-2 text-[10px] text-slate-400">({qs.length} questions)</span>
                  </div>
                  {qs.map((q, idx) => (
                    <div key={q.id} className="border-b border-slate-100 px-6 py-3 hover:bg-slate-50/60">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 text-[10px] font-mono text-slate-400 pt-0.5 w-6">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-800 leading-snug truncate">{q.question_en}</p>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {(["a","b","c","d"] as const).map((opt) => {
                              const text = q[`option_${opt}_en` as keyof QuestionRow] as string;
                              const isCorrect = q.correct === opt;
                              return (
                                <span key={opt} className={cn(
                                  "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                  isCorrect ? "bg-green-100 text-green-700 ring-1 ring-green-300" : "bg-slate-100 text-slate-500"
                                )}>
                                  ({opt.toUpperCase()}) {text?.slice(0, 30)}{text?.length > 30 ? "…" : ""}
                                </span>
                              );
                            })}
                          </div>
                          {q.question_hi && expandedQ === q.id && (
                            <p className="mt-1.5 text-xs text-slate-500 italic">{q.question_hi}</p>
                          )}
                        </div>
                        <div className="shrink-0 flex gap-1">
                          <button
                            onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}
                            className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                            title="Toggle Hindi">
                            {expandedQ === q.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            disabled={deletingQ === q.id}
                            className="rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                            title="Delete question">
                            {deletingQ === q.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex justify-end gap-2 border-t border-slate-200 bg-white px-7 py-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Reports Modal ─────────────────────────────────────────────
interface AttemptReport {
  rank: number; attemptId: string; studentId: string;
  name: string; email: string;
  score: number; pct: number;
  total_correct: number; total_wrong: number; total_skipped: number;
  time_taken_sec: number | null; submitted_at: string | null; status: string;
}
interface ReportData {
  test: { id: string; title: string; marks_per_q: number; total_duration_min: number };
  maxMarks: number; totalQ: number;
  attempts: AttemptReport[];
  stats: { total: number; avgScore: number; highest: number; lowest: number; passing: number; passingPct: number } | null;
}

function ReportsModal({ test, locale, onClose }: { test: TestRow; locale: string; onClose: () => void }) {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/tests/${test.id}/attempts`)
      .then((r) => r.json())
      .then((json) => { setData(json); setLoading(false); })
      .catch(() => { setError("Failed to load report"); setLoading(false); });
  }, [test.id]);

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
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="shrink-0 bg-[#0B1C3D] px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-300/80">Test Report</p>
            <h2 className="text-lg font-bold text-white truncate max-w-xl">{test.title}</h2>
            <p className="text-xs text-white/50 mt-0.5">{test.exam_type || "—"} · {test.total_duration_min} min</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-white" data-lenis-prevent>
          {loading && (
            <div className="py-24 text-center"><Loader2 className="mx-auto h-7 w-7 animate-spin text-slate-300" /></div>
          )}
          {error && (
            <div className="py-24 text-center text-red-500 text-sm">{error}</div>
          )}
          {!loading && !error && data && (
            <div className="p-6">
              {/* Summary Stats */}
              {data.stats ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                  {[
                    { icon: Users, label: "Total Attempts", value: data.stats.total, color: "text-blue-600" },
                    { icon: Trophy, label: "Highest Score", value: data.stats.highest, color: "text-amber-500" },
                    { icon: BarChart2, label: "Avg Score", value: data.stats.avgScore, color: "text-purple-600" },
                    { icon: BarChart2, label: "Lowest Score", value: data.stats.lowest, color: "text-red-500" },
                    { icon: CheckCircle2, label: "Passing (≥33%)", value: data.stats.passing, color: "text-green-600" },
                    { icon: Trophy, label: "Pass Rate", value: `${data.stats.passingPct}%`, color: "text-green-600" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                      <Icon className={cn("mx-auto mb-1.5 h-5 w-5", color)} />
                      <div className={cn("text-xl font-extrabold", color)}>{value}</div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 py-12 text-center text-slate-400 text-sm">
                  No attempts yet for this test.
                </div>
              )}

              {/* Attempts Table */}
              {data.attempts.length > 0 && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Rank</th>
                        <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Student</th>
                        <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Email</th>
                        <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Score</th>
                        <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">%</th>
                        <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">✓ / ✗ / —</th>
                        <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Time</th>
                        <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Date</th>
                        <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">Analysis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.attempts.map((a, idx) => {
                        const rowBg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                        const pctColor = a.pct >= 60 ? "text-green-600" : a.pct >= 33 ? "text-amber-600" : "text-red-500";
                        const rankBadge = a.rank === 1 ? "🥇" : a.rank === 2 ? "🥈" : a.rank === 3 ? "🥉" : `#${a.rank}`;
                        return (
                          <tr key={a.attemptId} className={cn("border-b border-slate-100 hover:bg-blue-50/30 transition-colors", rowBg)}>
                            <td className="px-4 py-3 font-bold text-slate-500 text-center">{rankBadge}</td>
                            <td className="px-4 py-3">
                              <span className="font-semibold text-slate-800">{a.name}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-400 max-w-[160px] truncate">{a.email}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-800">
                              {a.score}<span className="text-[10px] text-slate-400 font-normal">/{data.maxMarks}</span>
                            </td>
                            <td className={cn("px-4 py-3 text-right font-bold", pctColor)}>{a.pct}%</td>
                            <td className="px-4 py-3 text-center text-xs whitespace-nowrap">
                              <span className="text-green-600 font-semibold">{a.total_correct}</span>
                              <span className="text-slate-300 mx-0.5">/</span>
                              <span className="text-red-500 font-semibold">{a.total_wrong}</span>
                              <span className="text-slate-300 mx-0.5">/</span>
                              <span className="text-slate-400">{a.total_skipped}</span>
                            </td>
                            <td className="px-4 py-3 text-right text-xs text-slate-500 whitespace-nowrap">
                              <Clock className="inline h-3 w-3 mr-0.5 text-slate-300" />
                              {fmtTime(a.time_taken_sec)}
                            </td>
                            <td className="px-4 py-3 text-right text-xs text-slate-400 whitespace-nowrap">{fmtDate(a.submitted_at)}</td>
                            <td className="px-4 py-3 text-center">
                              <a
                                href={`/${locale}/tests/${test.id}/result/${a.attemptId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-purple-100 px-2.5 py-1 text-[10px] font-bold text-purple-700 hover:bg-purple-200 transition-colors">
                                View ↗
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex justify-between items-center border-t border-slate-200 bg-white px-7 py-4">
          <p className="text-xs text-slate-400">
            {data?.attempts.length ? `${data.attempts.length} student${data.attempts.length !== 1 ? "s" : ""} attempted this test` : ""}
          </p>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — Current Affairs
// ══════════════════════════════════════════════════════════════
function CurrentAffairsTab({ showToast }: { showToast: (m: string, ok: boolean) => void }) {
  const [articles, setArticles] = useState<CARow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "", title_hi: "", slug: "", excerpt: "", excerpt_hi: "",
    body: "", body_hi: "", category: "", gs_relevance: [] as string[],
    tags: "", is_important: false, image_url: "",
    published_at: new Date().toISOString().slice(0, 16),
  });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/current-affairs");
    if (res.ok) { const { articles } = await res.json(); setArticles(articles ?? []); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setForm({ title: "", title_hi: "", slug: "", excerpt: "", excerpt_hi: "", body: "", body_hi: "", category: "", gs_relevance: [], tags: "", is_important: false, image_url: "", published_at: new Date().toISOString().slice(0, 16) });
    setShowCreate(false);
  }

  function toggleGS(gs: string) {
    setForm((f) => ({ ...f, gs_relevance: f.gs_relevance.includes(gs) ? f.gs_relevance.filter((x) => x !== gs) : [...f.gs_relevance, gs] }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const res = await fetch("/api/admin/current-affairs", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean), published_at: new Date(form.published_at).toISOString() }),
    });
    const json = await res.json(); setSaving(false);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast("Article published!", true); resetForm(); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    setDeleting(id);
    const res = await fetch("/api/admin/current-affairs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setDeleting(null);
    if (res.ok) { showToast("Deleted", true); load(); } else { showToast("Delete failed", false); }
  }

  return (
    <div>
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700">Current Affairs ({articles.length})</h2>
        <Button onClick={() => setShowCreate(true)} size="sm" className="bg-brand-blue text-white hover:bg-brand-blue/90 text-xs">
          <Plus className="h-4 w-4 mr-1" /> Add Article
        </Button>
      </div>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {loading ? <div className="py-20 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-300" /></div>
          : articles.length === 0 ? <EmptyState icon={Newspaper} text="No articles yet. Add your first current affairs article." />
          : <div className="space-y-2">{articles.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {a.is_important && <Star className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  <p className="font-semibold text-slate-800 text-sm truncate">{a.title}</p>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{a.category}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{format(new Date(a.published_at), "dd MMM yyyy")} · /current-affairs/daily/{a.slug}</p>
              </div>
              <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id} className="shrink-0 rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                {deleting === a.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </button>
            </motion.div>
          ))}</div>}
      </div>

      <AnimatePresence>
        {showCreate && (
          <Modal onClose={resetForm} title="Add Current Affairs Article" step={1} totalSteps={1}>
            <form onSubmit={handleSave} className="p-7 space-y-5 max-h-[65vh] overflow-y-auto" data-lenis-prevent>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Title (English) *">
                  <input required className={inputCls} placeholder="e.g. RBI raises repo rate..." value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} />
                </Field>
                <Field label="Title (Hindi) — optional">
                  <input className={inputCls} placeholder="हिंदी में शीर्षक" value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Slug (auto-generated)">
                  <input required className={inputCls} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </Field>
                <Field label="Category *">
                  <select required className={selectCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select...</option>{CA_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Excerpt / Summary (English) *">
                <textarea required rows={2} className={inputCls} placeholder="Brief summary..." value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </Field>
              <Field label="Excerpt (Hindi) — optional">
                <textarea rows={2} className={inputCls} placeholder="हिंदी में सारांश..." value={form.excerpt_hi} onChange={(e) => setForm({ ...form, excerpt_hi: e.target.value })} />
              </Field>
              <Field label="Full Article Body (English)">
                <textarea rows={6} className={inputCls} placeholder="Write the full article here..." value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </Field>
              <Field label="Full Article (Hindi) — optional">
                <textarea rows={4} className={inputCls} placeholder="हिंदी में पूरा लेख..." value={form.body_hi} onChange={(e) => setForm({ ...form, body_hi: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Cover Image URL — optional">
                  <input className={inputCls} placeholder="https://..." value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                </Field>
                <Field label="Published At">
                  <input type="datetime-local" className={inputCls} value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} />
                </Field>
              </div>
              <Field label="Tags (comma-separated)">
                <input className={inputCls} placeholder="inflation, budget, RBI..." value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </Field>
              <Field label="GS Paper Relevance">
                <div className="flex flex-wrap gap-2 mt-1">
                  {GS_OPTIONS.map((gs) => (
                    <button type="button" key={gs} onClick={() => toggleGS(gs)}
                      className={cn("rounded-full border px-3 py-1 text-xs font-bold transition-all",
                        form.gs_relevance.includes(gs) ? "bg-brand-gold border-brand-gold text-brand-blue" : "border-white/20 text-white/60 hover:border-white/40")}>
                      {gs}
                    </button>
                  ))}
                </div>
              </Field>
              <label className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                form.is_important ? "border-amber-500/50 bg-amber-500/10 text-amber-400" : "border-white/10 bg-white/5 text-white/60")}>
                <input type="checkbox" checked={form.is_important} onChange={(e) => setForm({ ...form, is_important: e.target.checked })} className="h-4 w-4 accent-amber-400" />
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">Mark as Important</span>
              </label>
              <ModalFooter onCancel={resetForm} submitLabel="Publish Article" loading={saving} />
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — Magazine
// ══════════════════════════════════════════════════════════════
function MagazineTab({ showToast }: { showToast: (m: string, ok: boolean) => void }) {
  const [issues, setIssues] = useState<MagRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "", month: "", year: new Date().getFullYear().toString(),
    cover_image_url: "", description: "", topics: "", page_count: "", pdf_url: "", is_free: true,
  });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/magazine");
    if (res.ok) { const { issues } = await res.json(); setIssues(issues ?? []); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setForm({ title: "", month: "", year: new Date().getFullYear().toString(), cover_image_url: "", description: "", topics: "", page_count: "", pdf_url: "", is_free: true });
    setShowCreate(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const res = await fetch("/api/admin/magazine", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, topics: form.topics.split(",").map((t) => t.trim()).filter(Boolean) }),
    });
    const json = await res.json(); setSaving(false);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast("Issue uploaded!", true); resetForm(); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this issue?")) return;
    setDeleting(id);
    const res = await fetch("/api/admin/magazine", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setDeleting(null);
    if (res.ok) { showToast("Deleted", true); load(); } else { showToast("Delete failed", false); }
  }

  return (
    <div>
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700">Magazine Issues ({issues.length})</h2>
        <Button onClick={() => setShowCreate(true)} size="sm" className="bg-brand-blue text-white hover:bg-brand-blue/90 text-xs">
          <Plus className="h-4 w-4 mr-1" /> Upload Issue
        </Button>
      </div>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {loading ? <div className="py-20 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-300" /></div>
          : issues.length === 0 ? <EmptyState icon={BookOpen} text="No magazine issues yet. Upload your first issue." />
          : <div className="space-y-2">{issues.map((issue, i) => (
            <motion.div key={issue.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-800 text-sm truncate">{issue.title}</p>
                  <span className="shrink-0 rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-bold text-brand-blue">{issue.month} {issue.year}</span>
                  {issue.is_free && <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">FREE</span>}
                </div>
                <a href={issue.pdf_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-brand-blue hover:underline mt-0.5 inline-block truncate max-w-xs">
                  PDF Link ↗
                </a>
              </div>
              <button onClick={() => handleDelete(issue.id)} disabled={deleting === issue.id} className="shrink-0 rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                {deleting === issue.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </button>
            </motion.div>
          ))}</div>}
      </div>

      <AnimatePresence>
        {showCreate && (
          <Modal onClose={resetForm} title="Upload Magazine Issue" step={1} totalSteps={1}>
            <form onSubmit={handleSave} className="p-7 space-y-5 max-h-[65vh] overflow-y-auto" data-lenis-prevent>
              <Field label="Issue Title *">
                <input required className={inputCls} placeholder="e.g. Dhyeya IAS Monthly Magazine - June 2026" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Month *">
                  <select required className={selectCls} value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })}>
                    <option value="">Select month...</option>{MONTHS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Year *">
                  <input type="number" required min="2020" max="2035" className={inputCls} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                </Field>
              </div>
              <Field label="PDF URL * (Upload to Google Drive / Dropbox and paste the link)">
                <input required className={inputCls} placeholder="https://drive.google.com/..." value={form.pdf_url} onChange={(e) => setForm({ ...form, pdf_url: e.target.value })} />
              </Field>
              <Field label="Cover Image URL — optional">
                <input className={inputCls} placeholder="https://..." value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} />
              </Field>
              <Field label="Description — optional">
                <textarea rows={2} className={inputCls} placeholder="Brief description of this issue..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Key Topics (comma-separated)">
                  <input className={inputCls} placeholder="Economy, Budget, UN..." value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} />
                </Field>
                <Field label="Number of Pages">
                  <input type="number" className={inputCls} placeholder="120" value={form.page_count} onChange={(e) => setForm({ ...form, page_count: e.target.value })} />
                </Field>
              </div>
              <label className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                form.is_free ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-white/10 bg-white/5 text-white/60")}>
                <input type="checkbox" checked={form.is_free} onChange={(e) => setForm({ ...form, is_free: e.target.checked })} className="h-4 w-4 accent-green-400" />
                <span className="text-sm font-medium">Free Download (anyone can download)</span>
              </label>
              <ModalFooter onCancel={resetForm} submitLabel="Upload Issue" loading={saving} />
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// Shared UI
// ══════════════════════════════════════════════════════════════
function Modal({ children, onClose, title, step, totalSteps = 2 }: {
  children: React.ReactNode; onClose: () => void;
  title: string; step: number; totalSteps?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#0B1C3D] px-7 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80">
                {totalSteps > 1 ? `Step ${step} of ${totalSteps}` : "Admin Panel"}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        {totalSteps > 1 && (
          <div className="flex bg-[#0d2050]">
            {["Test Details", "Upload Questions"].map((label, idx) => (
              <div key={label} className={cn("flex-1 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider transition-colors",
                idx + 1 === step ? "border-b-2 border-brand-gold text-brand-gold" : "text-slate-500")}>
                {label}
              </div>
            ))}
          </div>
        )}
        <div className="bg-[#0f2257]">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function ModalFooter({ onCancel, submitLabel, loading }: { onCancel: () => void; submitLabel: string; loading: boolean }) {
  return (
    <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
      <button type="button" onClick={onCancel} className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors">Cancel</button>
      <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-blue hover:opacity-90 disabled:opacity-60 transition-opacity">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}{submitLabel}
      </button>
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="py-24 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <Icon className="h-8 w-8 text-slate-300" />
      </div>
      <p className="text-slate-400 text-sm">{text}</p>
    </div>
  );
}

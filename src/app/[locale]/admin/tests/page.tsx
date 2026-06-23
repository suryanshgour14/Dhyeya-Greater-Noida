"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Eye, Send, BookOpen, Loader2, CheckCircle2, XCircle,
  X, FileUp, Shield, Newspaper, ExternalLink, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ExcelUpload from "@/components/admin/ExcelUpload";
import { cn } from "@/lib/utils";
import type { ParsedQuestion } from "@/lib/test-types";

interface TestRow {
  id: string;
  title: string;
  exam_type: string | null;
  status: string;
  total_duration_min: number;
  marks_per_q: number;
  negative_marks: number;
  sectional_timing: boolean;
  is_free: boolean;
  created_at: string;
  test_sections: { count: number }[];
  questions: { count: number }[];
}

const EXAM_TYPES = ["UPSC Prelims", "UPSC Mains", "CSAT", "UPPSC", "UKPSC", "BPSC", "Current Affairs"];

const inputCls = "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none ring-offset-0 focus:border-brand-gold/60 focus:bg-white/15 focus:ring-2 focus:ring-brand-gold/30 transition-all";
const selectCls = "w-full rounded-xl border border-white/10 bg-[#0d2050] px-4 py-2.5 text-sm text-white outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/30 transition-all";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      {children}
    </div>
  );
}

export default function AdminTestsPage() {
  const locale = useLocale();
  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [form, setForm] = useState({
    title: "", title_hi: "", exam_type: "", total_duration_min: "90",
    marks_per_q: "2", negative_marks: "0.66", sectional_timing: false, is_free: false,
  });

  const [draftId, setDraftId] = useState<string | null>(null);
  const [parsedQs, setParsedQs] = useState<ParsedQuestion[]>([]);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "questions">("form");
  const [showCreate, setShowCreate] = useState(false);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  async function loadTests() {
    setLoading(true);
    const res = await fetch("/api/admin/tests");
    if (res.ok) {
      const { tests } = await res.json();
      setTests(tests ?? []);
    }
    setLoading(false);
  }

  useEffect(() => { loadTests(); }, []);

  async function handleCreateTest(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setCreating(false);
    if (!res.ok) { showToast(json.error, false); return; }
    setDraftId(json.test.id);
    setStep("questions");
  }

  async function handleUploadQuestions() {
    if (!draftId || !parsedQs.length) return;
    const hasErrors = parsedQs.some((q) => q.errors.length > 0);
    if (hasErrors) { showToast("Fix all errors before uploading", false); return; }
    setUploading(true);
    const res = await fetch(`/api/admin/tests/${draftId}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions: parsedQs }),
    });
    const json = await res.json();
    setUploading(false);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast(`${json.inserted} questions uploaded across ${json.sections} sections.`, true);
  }

  async function handlePublish(id: string, unpublish = false) {
    setPublishing(id);
    const res = await fetch(`/api/admin/tests/${id}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unpublish }),
    });
    const json = await res.json();
    setPublishing(null);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast(unpublish ? "Unpublished" : "Published successfully!", true);
    loadTests();
  }

  function resetAndClose() {
    setShowCreate(false);
    setStep("form");
    setDraftId(null);
    setParsedQs([]);
    setForm({ title: "", title_hi: "", exam_type: "", total_duration_min: "90", marks_per_q: "2", negative_marks: "0.66", sectional_timing: false, is_free: false });
    loadTests();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page header ── */}
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10">
              <Shield className="h-5 w-5 text-brand-blue" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Admin Panel</p>
              <h1 className="text-lg font-bold text-slate-800">Content Management</h1>
            </div>
          </div>
        </div>
        {/* Quick links to CMS sections */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: FileText, label: "Test Series", sub: "Create & publish tests", active: true, onClick: () => {} },
            { icon: Newspaper, label: "Current Affairs", sub: "Add daily articles", href: "/studio/desk/currentAffairs" },
            { icon: BookOpen, label: "Magazine", sub: "Upload monthly issues", href: "/studio/desk/magazine" },
            { icon: ExternalLink, label: "Sanity Studio", sub: "All content types", href: "/studio" },
          ].map(({ icon: Icon, label, sub, active, onClick, href }) => (
            href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("/studio") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all group"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-brand-blue/20">
                  <Icon className="h-4 w-4 text-slate-500 group-hover:text-brand-blue" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-700 text-xs">{label}</p>
                  <p className="text-[10px] text-slate-400 truncate">{sub}</p>
                </div>
              </a>
            ) : (
              <button
                key={label}
                onClick={onClick}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all text-left",
                  active ? "border-brand-blue/30 bg-brand-blue/5" : "border-slate-200 bg-slate-50 hover:border-brand-blue/30 hover:bg-brand-blue/5"
                )}
              >
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border", active ? "bg-brand-blue border-brand-blue" : "bg-white border-slate-200")}>
                  <Icon className={cn("h-4 w-4", active ? "text-white" : "text-slate-500")} />
                </div>
                <div className="min-w-0">
                  <p className={cn("font-semibold text-xs", active ? "text-brand-blue" : "text-slate-700")}>
                    {label} {active && <span className="text-[9px] text-brand-gold ml-1">ACTIVE</span>}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{sub}</p>
                </div>
              </button>
            )
          ))}
        </div>
      </div>

      {/* ── Test section sub-header ── */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700">Test Series</h2>
        <div className="flex gap-2">
          <a href="/api/admin/tests/template" download>
            <Button variant="outline" size="sm" className="text-xs">Download Template</Button>
          </a>
          <Button
            onClick={() => setShowCreate(true)}
            size="sm"
            className="bg-brand-blue text-white hover:bg-brand-blue/90 text-xs"
          >
            <Plus className="h-4 w-4 mr-1" /> New Test
          </Button>
        </div>
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={cn(
              "fixed right-5 top-5 z-[9999] flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-xl",
              toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"
            )}
          >
            {toast.ok ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tests list ── */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : tests.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <BookOpen className="h-8 w-8 text-slate-300" />
            </div>
            <p className="font-semibold text-slate-600">No tests yet.</p>
            <p className="mt-1 text-sm text-slate-400">Create your first test using the button above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 truncate">{t.title}</h3>
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      t.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>{t.status}</span>
                    {t.is_free && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">FREE</span>}
                  </div>
                  <p className="text-xs text-slate-400">
                    {t.exam_type || "—"} · {t.total_duration_min} min · {t.marks_per_q}m/Q · -{t.negative_marks} neg
                    · <span className="font-medium text-slate-500">{t.questions?.[0]?.count ?? 0} questions</span>
                    · {t.test_sections?.[0]?.count ?? 0} sections
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/${locale}/tests/${t.id}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant={t.status === "published" ? "outline" : "default"}
                    disabled={publishing === t.id}
                    onClick={() => handlePublish(t.id, t.status === "published")}
                    className={cn("text-xs", t.status !== "published" && "bg-brand-blue text-white hover:bg-brand-blue/90")}
                  >
                    {publishing === t.id
                      ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                      : <Send className="h-3.5 w-3.5 mr-1" />}
                    {t.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Create Test Modal ── */}
      <AnimatePresence>
        {showCreate && (
          <>
            {/* Backdrop — also acts as the flex centering container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={resetAndClose}
            >
            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
              style={{ maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Navy blue header ── */}
              <div className="bg-[#0B1C3D] px-7 py-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80">
                      {step === "form" ? "Step 1 of 2" : "Step 2 of 2"}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    {step === "form" ? "Create New Test" : `Upload Questions`}
                  </h2>
                  {step === "questions" && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">{form.title}</p>
                  )}
                </div>
                <button
                  onClick={resetAndClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex bg-[#0d2050]">
                {["Test Details", "Upload Questions"].map((label, idx) => (
                  <div key={label} className={cn(
                    "flex-1 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider transition-colors",
                    (idx === 0 && step === "form") || (idx === 1 && step === "questions")
                      ? "border-b-2 border-brand-gold text-brand-gold"
                      : "text-slate-500"
                  )}>
                    {label}
                  </div>
                ))}
              </div>

              {/* ── Body ── */}
              <div className="overflow-y-auto bg-[#0f2257]" style={{ maxHeight: "calc(90vh - 140px)" }}>

                {/* Step 1 — form */}
                {step === "form" && (
                  <form onSubmit={handleCreateTest} className="p-7 space-y-5">
                    <Field label="Test Title (English) *">
                      <input
                        required
                        className={inputCls}
                        placeholder="e.g. UPSC Prelims Mock Test 1"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                      />
                    </Field>

                    <Field label="Title (Hindi) — optional">
                      <input
                        className={inputCls}
                        placeholder="हिंदी में शीर्षक"
                        value={form.title_hi}
                        onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Exam Type">
                        <select
                          className={selectCls}
                          value={form.exam_type}
                          onChange={(e) => setForm({ ...form, exam_type: e.target.value })}
                        >
                          <option value="">Select...</option>
                          {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </Field>

                      <Field label="Total Duration (minutes) *">
                        <input
                          type="number"
                          required
                          min="1"
                          className={inputCls}
                          value={form.total_duration_min}
                          onChange={(e) => setForm({ ...form, total_duration_min: e.target.value })}
                        />
                      </Field>

                      <Field label="Marks per Question">
                        <input
                          type="number"
                          step="0.1"
                          className={inputCls}
                          value={form.marks_per_q}
                          onChange={(e) => setForm({ ...form, marks_per_q: e.target.value })}
                        />
                      </Field>

                      <Field label="Negative Marks">
                        <input
                          type="number"
                          step="0.01"
                          className={inputCls}
                          value={form.negative_marks}
                          onChange={(e) => setForm({ ...form, negative_marks: e.target.value })}
                        />
                      </Field>
                    </div>

                    {/* Toggles */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "sectional", label: "Sectional Timing", key: "sectional_timing" as const },
                        { id: "isfree",    label: "Free Test",        key: "is_free"          as const },
                      ].map(({ id, label, key }) => (
                        <label
                          key={id}
                          htmlFor={id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                            form[key]
                              ? "border-brand-gold/50 bg-brand-gold/10 text-brand-gold"
                              : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                          )}
                        >
                          <input
                            type="checkbox"
                            id={id}
                            checked={form[key] as boolean}
                            onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                            className="h-4 w-4 accent-amber-400"
                          />
                          <span className="text-sm font-medium">{label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={creating}
                        className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-blue transition-opacity hover:opacity-90 disabled:opacity-60"
                      >
                        {creating && <Loader2 className="h-4 w-4 animate-spin" />}
                        Next: Upload Questions →
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2 — upload */}
                {step === "questions" && (
                  <div className="bg-slate-50 p-7 space-y-5">
                    <ExcelUpload onParsed={setParsedQs} />
                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
                      <Button variant="outline" onClick={resetAndClose} className="text-sm">
                        Done / Close
                      </Button>
                      <Button
                        onClick={handleUploadQuestions}
                        disabled={uploading || !parsedQs.length || parsedQs.some((q) => q.errors.length > 0)}
                        className="bg-brand-blue text-white hover:bg-brand-blue/90 text-sm"
                      >
                        {uploading && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                        <FileUp className="h-4 w-4 mr-1" />
                        Upload {parsedQs.length > 0 ? `(${parsedQs.length} questions)` : "Questions"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

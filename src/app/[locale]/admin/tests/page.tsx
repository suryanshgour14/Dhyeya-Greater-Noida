"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Plus, Eye, Trash2, Send, BookOpen, Loader2, CheckCircle2, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

export default function AdminTestsPage() {
  const locale = useLocale();
  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // New test form state
  const [form, setForm] = useState({
    title: "", title_hi: "", exam_type: "", total_duration_min: "90",
    marks_per_q: "2", negative_marks: "0.66", sectional_timing: false, is_free: false,
  });

  // Questions for current draft
  const [draftId, setDraftId] = useState<string | null>(null);
  const [parsedQs, setParsedQs] = useState<ParsedQuestion[]>([]);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
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
    setPublishing(true);
    const res = await fetch(`/api/admin/tests/${id}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unpublish }),
    });
    const json = await res.json();
    setPublishing(false);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast(unpublish ? "Unpublished" : "Published!", true);
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
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
          <h1 className="text-xl font-bold text-slate-800">Test Management</h1>
        </div>
        <div className="flex gap-2">
          <a href="/api/admin/tests/template" download>
            <Button variant="outline" size="sm">Download Template</Button>
          </a>
          <Button onClick={() => setShowCreate(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> New Test
          </Button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={cn(
          "fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg",
          toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"
        )}>
          {toast.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      {/* Tests list */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : tests.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="font-semibold">No tests yet.</p>
            <p className="text-sm">Create your first test using the button above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-800 truncate">{t.title}</h3>
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      t.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>{t.status}</span>
                    {t.is_free && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">FREE</span>}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {t.exam_type} · {t.total_duration_min} min · {t.marks_per_q}m per Q · -{t.negative_marks} negative
                    · {t.questions?.[0]?.count ?? 0} questions · {t.test_sections?.[0]?.count ?? 0} sections
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/${locale}/tests/${t.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3.5 w-3.5 mr-1" /> View
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant={t.status === "published" ? "outline" : "default"}
                    disabled={publishing}
                    onClick={() => handlePublish(t.id, t.status === "published")}
                  >
                    <Send className="h-3.5 w-3.5 mr-1" />
                    {t.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create test dialog */}
      <Dialog open={showCreate} onOpenChange={(o) => { if (!o) resetAndClose(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {step === "form" ? "Create New Test" : `Upload Questions — ${form.title}`}
            </DialogTitle>
          </DialogHeader>

          {step === "form" && (
            <form onSubmit={handleCreateTest} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>Test Title (English) *</Label>
                  <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. UPSC Prelims Mock Test 1" />
                </div>
                <div className="col-span-2">
                  <Label>Title (Hindi) — optional</Label>
                  <Input value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} placeholder="हिंदी में शीर्षक" />
                </div>
                <div>
                  <Label>Exam Type</Label>
                  <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.exam_type} onChange={(e) => setForm({ ...form, exam_type: e.target.value })}>
                    <option value="">Select…</option>
                    {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Total Duration (minutes) *</Label>
                  <Input type="number" required min="1" value={form.total_duration_min} onChange={(e) => setForm({ ...form, total_duration_min: e.target.value })} />
                </div>
                <div>
                  <Label>Marks per Question</Label>
                  <Input type="number" step="0.1" value={form.marks_per_q} onChange={(e) => setForm({ ...form, marks_per_q: e.target.value })} />
                </div>
                <div>
                  <Label>Negative Marks</Label>
                  <Input type="number" step="0.01" value={form.negative_marks} onChange={(e) => setForm({ ...form, negative_marks: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sectional" checked={form.sectional_timing} onChange={(e) => setForm({ ...form, sectional_timing: e.target.checked })} className="h-4 w-4 rounded" />
                  <Label htmlFor="sectional" className="cursor-pointer">Sectional Timing</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isfree" checked={form.is_free} onChange={(e) => setForm({ ...form, is_free: e.target.checked })} className="h-4 w-4 rounded" />
                  <Label htmlFor="isfree" className="cursor-pointer">Free Test</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={resetAndClose}>Cancel</Button>
                <Button type="submit" disabled={creating}>
                  {creating && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                  Next: Upload Questions
                </Button>
              </div>
            </form>
          )}

          {step === "questions" && (
            <div className="space-y-4">
              <ExcelUpload onParsed={setParsedQs} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetAndClose}>Done / Close</Button>
                <Button
                  onClick={handleUploadQuestions}
                  disabled={uploading || !parsedQs.length || parsedQs.some((q) => q.errors.length > 0)}
                >
                  {uploading && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                  Upload {parsedQs.length > 0 ? `(${parsedQs.length} questions)` : ""}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

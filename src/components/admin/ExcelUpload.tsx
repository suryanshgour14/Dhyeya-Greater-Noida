"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Upload, AlertTriangle, CheckCircle2, Edit2, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ParsedQuestion } from "@/lib/test-types";

const VALID_CORRECT = ["a", "b", "c", "d"];
const REQUIRED_COLS = ["section", "question_en", "option_a", "option_b", "option_c", "option_d", "correct"];

function validateRow(row: Record<string, string>, rowNum: number): ParsedQuestion {
  const errors: string[] = [];
  const get = (k: string) => (row[k] ?? "").toString().trim();

  for (const col of REQUIRED_COLS) {
    if (!get(col)) errors.push(`Missing: ${col}`);
  }
  const correct = get("correct").toLowerCase();
  if (correct && !VALID_CORRECT.includes(correct)) {
    errors.push(`'correct' must be a/b/c/d — got '${correct}'`);
  }

  return {
    rowNum,
    section: get("section"),
    question_en: get("question_en"),
    option_a: get("option_a"),
    option_b: get("option_b"),
    option_c: get("option_c"),
    option_d: get("option_d"),
    correct: correct,
    question_hi: get("question_hi"),
    errors,
  };
}

interface Props {
  onParsed: (questions: ParsedQuestion[]) => void;
}

export default function ExcelUpload({ onParsed }: Props) {
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<ParsedQuestion | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasErrors = questions.some((q) => q.errors.length > 0);
  const errorCount = questions.filter((q) => q.errors.length > 0).length;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = new Uint8Array(ev.target!.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
        defval: "",
        raw: false,
      });

      // Normalize header keys to lowercase trimmed
      const rows = raw.map((r) =>
        Object.fromEntries(Object.entries(r).map(([k, v]) => [k.toLowerCase().trim(), v]))
      );

      const parsed = rows.map((r, i) => validateRow(r, i + 2)); // +2 for header row
      setQuestions(parsed);
      onParsed(parsed);
    };
    reader.readAsArrayBuffer(file);
  }

  function openEdit(idx: number) {
    setEditIdx(idx);
    setEditDraft({ ...questions[idx] });
  }

  function saveEdit() {
    if (editIdx === null || !editDraft) return;
    const updated = validateRow(editDraft as unknown as Record<string, string>, editDraft.rowNum);
    const next = [...questions];
    next[editIdx] = updated;
    setQuestions(next);
    onParsed(next);
    setEditIdx(null);
    setEditDraft(null);
  }

  const sections = Array.from(new Set(questions.map((q) => q.section)));

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition-colors hover:border-brand-blue/40 hover:bg-blue-50/30 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mb-3 h-9 w-9 text-slate-400" />
        <p className="font-semibold text-slate-700">Click to upload .xlsx file</p>
        <p className="mt-1 text-sm text-slate-500">Excel file with the required column format</p>
        <input ref={inputRef} type="file" accept=".xlsx" className="hidden" onChange={handleFile} />
      </div>

      {/* Download template */}
      <div className="flex gap-2">
        <a
          href="/api/admin/tests/template"
          download
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Download className="h-4 w-4 text-slate-400" />
          Download Template
        </a>
      </div>

      {/* Validation summary */}
      {questions.length > 0 && (
        <div className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold",
          hasErrors
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-700"
        )}>
          {hasErrors
            ? <AlertTriangle className="h-5 w-5 shrink-0" />
            : <CheckCircle2 className="h-5 w-5 shrink-0" />}
          {hasErrors
            ? `${errorCount} row(s) have errors. Fix them before publishing.`
            : `${questions.length} questions parsed across ${sections.length} section(s). Ready to upload.`}
        </div>
      )}

      {/* Preview table grouped by section */}
      {questions.length > 0 && sections.map((sec) => (
        <div key={sec} className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Section:</span>
            <span className="ml-2 font-semibold text-slate-700">{sec}</span>
            <span className="ml-2 text-xs text-slate-400">
              ({questions.filter((q) => q.section === sec).length} questions)
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Row</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Question (EN)</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">A</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">B</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">C</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">D</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Correct</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">HI</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Edit</th>
                </tr>
              </thead>
              <tbody>
                {questions
                  .map((q, idx) => ({ q, idx }))
                  .filter(({ q }) => q.section === sec)
                  .map(({ q, idx }) => (
                    <tr
                      key={idx}
                      className={cn(
                        "border-b border-slate-100/70 last:border-0",
                        q.errors.length > 0 ? "bg-red-50" : "hover:bg-slate-50/50"
                      )}
                    >
                      <td className="px-3 py-2 text-xs font-mono text-slate-500">{q.rowNum}</td>
                      <td className="max-w-[200px] truncate px-3 py-2 text-xs text-slate-700" title={q.question_en}>
                        {q.errors.length > 0 && (
                          <span className="mb-0.5 block text-[10px] text-red-600">{q.errors.join("; ")}</span>
                        )}
                        {q.question_en || <span className="italic text-red-400">missing</span>}
                      </td>
                      <td className="max-w-[80px] truncate px-3 py-2 text-xs text-slate-600">{q.option_a}</td>
                      <td className="max-w-[80px] truncate px-3 py-2 text-xs text-slate-600">{q.option_b}</td>
                      <td className="max-w-[80px] truncate px-3 py-2 text-xs text-slate-600">{q.option_c}</td>
                      <td className="max-w-[80px] truncate px-3 py-2 text-xs text-slate-600">{q.option_d}</td>
                      <td className="px-3 py-2 text-xs font-bold uppercase text-green-700">{q.correct || "—"}</td>
                      <td className="px-3 py-2 text-xs text-slate-400">{q.question_hi ? "✓" : "—"}</td>
                      <td className="px-3 py-2">
                        <button onClick={() => openEdit(idx)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Edit dialog */}
      <Dialog open={editIdx !== null} onOpenChange={(o) => { if (!o) { setEditIdx(null); setEditDraft(null); } }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Question (Row {editDraft?.rowNum})
            </DialogTitle>
          </DialogHeader>
          {editDraft && (
            <div className="space-y-3">
              <div>
                <Label>Section</Label>
                <Input value={editDraft.section} onChange={(e) => setEditDraft({ ...editDraft, section: e.target.value })} />
              </div>
              <div>
                <Label>Question (English) *</Label>
                <textarea
                  className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
                  rows={3}
                  value={editDraft.question_en}
                  onChange={(e) => setEditDraft({ ...editDraft, question_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["a","b","c","d"] as const).map((opt) => (
                  <div key={opt}>
                    <Label>Option {opt.toUpperCase()} *</Label>
                    <Input
                      value={editDraft[`option_${opt}` as keyof ParsedQuestion] as string}
                      onChange={(e) => setEditDraft({ ...editDraft, [`option_${opt}`]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Label>Correct Answer *</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={editDraft.correct}
                  onChange={(e) => setEditDraft({ ...editDraft, correct: e.target.value })}
                >
                  <option value="">Select...</option>
                  {["a","b","c","d"].map((o) => (
                    <option key={o} value={o}>({o.toUpperCase()}) {editDraft[`option_${o}` as keyof ParsedQuestion]}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Question (Hindi) — optional</Label>
                <textarea
                  className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
                  rows={2}
                  value={editDraft.question_hi}
                  onChange={(e) => setEditDraft({ ...editDraft, question_hi: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setEditIdx(null); setEditDraft(null); }}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button onClick={saveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

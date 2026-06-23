"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, BookOpen, FileText, Lock, Star, Calendar, ChevronDown } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

interface MagazineIssue {
  _id: string;
  title: string;
  slug?: { current: string };
  month: string;
  year: number;
  issueNumber?: number;
  coverImage?: object;
  description?: string;
  topics?: string[];
  pageCount?: number;
  pdfFile?: { asset: { url: string } };
  isFree: boolean;
  publishedAt: string;
}

const YEARS = ["All", "2026", "2025", "2024", "2023"];

export default function MagazineClient({ issues }: { issues: MagazineIssue[] }) {
  const [activeYear, setActiveYear] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeYear === "All"
    ? issues
    : issues.filter((i) => String(i.year) === activeYear);

  const latestIssue = issues[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <div className="bg-[#0B1C3D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#F59E0B18,transparent_55%)]" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,#1a3a7a,transparent_70%)]" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-bold text-brand-gold">
                  Monthly Publication
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Dhyeya IAS<br />
                <span className="text-brand-gold">Monthly Magazine</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Comprehensive current affairs compilation for UPSC & state PCS exams.
                Expert analysis, GS topic mapping, and exam-ready insights — every month.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <BookOpen className="h-4 w-4 text-brand-gold" />
                  <span>100+ pages per issue</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Star className="h-4 w-4 text-brand-gold" />
                  <span>Expert faculty authored</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <FileText className="h-4 w-4 text-brand-gold" />
                  <span>Free PDF download</span>
                </div>
              </div>
            </div>

            {/* Latest issue preview */}
            {latestIssue && (
              <div className="flex justify-center md:justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div className="absolute -inset-3 rounded-3xl bg-brand-gold/20 blur-xl" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-52">
                    {latestIssue.coverImage ? (
                      <Image
                        src={urlFor(latestIssue.coverImage).width(400).height(560).url()}
                        alt={latestIssue.title}
                        width={208}
                        height={290}
                        className="w-full object-cover"
                      />
                    ) : (
                      <div className="h-72 bg-gradient-to-b from-brand-blue to-[#0B1C3D] flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-white/20" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-[10px] font-bold text-brand-gold">LATEST ISSUE</p>
                      <p className="text-xs font-bold text-white">{latestIssue.month} {latestIssue.year}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex divide-x">
            {[
              { label: "Total Issues", value: issues.length },
              { label: "Free Downloads", value: issues.filter((i) => i.isFree).length },
              { label: "Years Published", value: new Set(issues.map((i) => i.year)).size },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 py-4 text-center">
                <p className="text-xl font-extrabold text-brand-blue">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Year filter ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Filter by Year:</span>
          <div className="flex gap-1.5 flex-wrap">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                  activeYear === y
                    ? "bg-[#0B1C3D] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-brand-blue/30"
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-200" />
            <p className="font-semibold text-slate-400">No issues found for this year</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((issue, i) => (
              <motion.div
                key={issue._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all">
                  {/* Cover */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    {issue.coverImage ? (
                      <Image
                        src={urlFor(issue.coverImage).width(300).height(400).url()}
                        alt={issue.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-brand-blue/10 to-brand-blue/5 p-4">
                        <BookOpen className="h-10 w-10 text-brand-blue/30 mb-2" />
                        <p className="text-xs font-bold text-brand-blue/50 text-center">{issue.month}<br />{issue.year}</p>
                      </div>
                    )}
                    {!issue.isFree && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white/80" />
                      </div>
                    )}
                    {issue.isFree && (
                      <span className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-0.5 text-[9px] font-bold text-white">
                        FREE
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{issue.month} {issue.year}</p>
                    {issue.pageCount && (
                      <p className="text-[10px] text-slate-400 mt-0.5">{issue.pageCount} pages</p>
                    )}

                    {/* Expand for topics */}
                    {issue.topics && issue.topics.length > 0 && (
                      <button
                        onClick={() => setExpanded(expanded === issue._id ? null : issue._id)}
                        className="mt-2 flex w-full items-center justify-between text-[10px] font-semibold text-slate-500 hover:text-brand-blue"
                      >
                        Topics <ChevronDown className={cn("h-3 w-3 transition-transform", expanded === issue._id ? "rotate-180" : "")} />
                      </button>
                    )}
                    {expanded === issue._id && issue.topics && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 flex flex-wrap gap-1"
                      >
                        {issue.topics.map((t) => (
                          <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] text-slate-600">{t}</span>
                        ))}
                      </motion.div>
                    )}

                    {/* Download button */}
                    {issue.pdfFile?.asset?.url ? (
                      <a
                        href={issue.pdfFile.asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-blue py-2 text-[11px] font-bold text-white hover:bg-brand-blue/90 transition-colors"
                      >
                        <Download className="h-3 w-3" /> Download PDF
                      </a>
                    ) : (
                      <div className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2 text-[11px] font-bold text-slate-400">
                        <FileText className="h-3 w-3" /> Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#0B1C3D] mt-12">
        <div className="container mx-auto px-4 py-12 text-center">
          <Calendar className="mx-auto mb-4 h-10 w-10 text-brand-gold/60" />
          <h2 className="text-xl font-extrabold text-white mb-2">Never Miss an Issue</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Join our Telegram channel to get the magazine delivered to you every month, free.
          </p>
          <a
            href="https://t.me/dhyeyaiasgreaternoida"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-blue hover:opacity-90 transition-opacity"
          >
            Join Telegram Channel →
          </a>
        </div>
      </div>
    </div>
  );
}

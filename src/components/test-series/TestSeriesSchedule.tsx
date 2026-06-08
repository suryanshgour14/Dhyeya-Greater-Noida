"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TestSeries } from "@/lib/test-series";

const themes = {
  blue: {
    sectionHeader: "bg-brand-blue/5 border-brand-blue/15 text-brand-blue",
    badge: (type: string) => {
      if (type.includes("Full Length") || type.includes("FLT")) return "bg-brand-blue text-white";
      if (type.includes("CSAT")) return "bg-blue-100 text-blue-700";
      if (type.includes("Current Affairs")) return "bg-sky-100 text-sky-700";
      if (type.includes("Strategy")) return "bg-slate-100 text-slate-500";
      return "bg-blue-50 text-brand-blue border border-blue-100";
    },
    rowHover: "hover:bg-blue-50/40",
    dot: "bg-brand-blue",
  },
  gold: {
    sectionHeader: "bg-amber-50 border-amber-200/50 text-amber-700",
    badge: (type: string) => {
      if (type.includes("Full Length") || type.includes("FLT")) return "bg-amber-600 text-white";
      if (type.includes("CSAT")) return "bg-amber-100 text-amber-700";
      if (type.includes("UK Special") || type.includes("UP Special")) return "bg-orange-100 text-orange-700";
      if (type.includes("Strategy")) return "bg-slate-100 text-slate-500";
      return "bg-amber-50 text-amber-700 border border-amber-200";
    },
    rowHover: "hover:bg-amber-50/40",
    dot: "bg-amber-600",
  },
  orange: {
    sectionHeader: "bg-orange-50 border-orange-200/50 text-orange-700",
    badge: (type: string) => {
      if (type.includes("Full Length") || type.includes("FLT")) return "bg-brand-orange text-white";
      if (type.includes("CSAT")) return "bg-orange-100 text-orange-700";
      if (type.includes("UK Special") || type.includes("UP Special")) return "bg-amber-100 text-amber-700";
      if (type.includes("Strategy")) return "bg-slate-100 text-slate-500";
      return "bg-orange-50 text-orange-700 border border-orange-200";
    },
    rowHover: "hover:bg-orange-50/40",
    dot: "bg-brand-orange",
  },
};

interface Props {
  series: TestSeries;
}

function SectionAccordion({
  section,
  index,
  t,
  defaultOpen,
}: {
  section: TestSeries["sections"][number];
  index: number;
  t: (typeof themes)[keyof typeof themes];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      {/* Section header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex w-full items-center justify-between gap-4 border-b px-6 py-4 text-left transition-colors",
          open ? t.sectionHeader : "border-transparent bg-slate-50/50 hover:bg-slate-50",
        )}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">Phase {index + 1}</p>
          <h3 className="mt-0.5 text-base font-bold leading-snug text-slate-800">{section.title}</h3>
          {section.description && (
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">{section.description}</p>
          )}
        </div>
        <ChevronDown
          className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Schedule table */}
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Test ID
                </th>
                {section.schedule.some((r) => r.date) && (
                  <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Date
                  </th>
                )}
                {section.schedule.some((r) => r.time) && (
                  <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Time
                  </th>
                )}
                <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Type
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Topic
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Syllabus Focus
                </th>
                {section.schedule.some((r) => r.marks) && (
                  <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Marks
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {section.schedule.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-slate-100/70 transition-colors last:border-0",
                    t.rowHover,
                    row.type === "Strategy Break" && "opacity-60",
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-bold text-slate-700">
                    {row.id}
                  </td>
                  {section.schedule.some((r) => r.date) && (
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                      {row.date ? (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          {row.date}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  )}
                  {section.schedule.some((r) => r.time) && (
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                      {row.time ?? <span className="text-slate-300">—</span>}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        t.badge(row.type),
                      )}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700">{row.topic}</td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-slate-500">
                    <span>{row.syllabus}</span>
                    {row.syllabusHindi && (
                      <span className="mt-1 block text-[11px] leading-relaxed text-slate-400">
                        {row.syllabusHindi}
                      </span>
                    )}
                  </td>
                  {section.schedule.some((r) => r.marks) && (
                    <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-slate-600">
                      {row.marks ?? <span className="text-slate-300">—</span>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default function TestSeriesSchedule({ series }: Props) {
  const t = themes[series.accentColor];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl space-y-8">

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6"
          >
            <p className="text-sm leading-relaxed text-slate-600">{series.description}</p>
          </motion.div>

          {/* Schedule sections */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Complete Test Schedule
            </h2>
            <div className="space-y-4">
              {series.sections.map((section, i) => (
                <SectionAccordion
                  key={section.title}
                  section={section}
                  index={i}
                  t={t}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </div>

          {/* Execution notes */}
          {series.executionNotes && series.executionNotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-slate-200/60 bg-slate-50 p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                <FileText className="h-4 w-4" />
                Strategic Execution Notes
              </h3>
              <ol className="space-y-3">
                {series.executionNotes.map((note, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

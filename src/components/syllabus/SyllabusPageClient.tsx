"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExamSyllabus, SyllabusPaper, PatternStage } from "@/lib/syllabus-data";

// ─── Colour maps ──────────────────────────────────────────────────────────────
const COLOR = {
  blue: {
    hero: "from-slate-900 via-blue-950 to-slate-800",
    badge: "bg-blue-100 text-blue-700",
    tab: "text-blue-700 border-blue-600",
    tabInactive: "hover:text-blue-700",
    accent: "bg-blue-600",
    accentText: "text-blue-700",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    icon: "text-blue-600",
    ring: "ring-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  gold: {
    hero: "from-slate-900 via-blue-950 to-slate-800",
    badge: "bg-blue-100 text-blue-700",
    tab: "text-blue-700 border-blue-600",
    tabInactive: "hover:text-blue-700",
    accent: "bg-blue-600",
    accentText: "text-blue-700",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    icon: "text-blue-600",
    ring: "ring-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  orange: {
    hero: "from-slate-900 via-blue-950 to-slate-800",
    badge: "bg-blue-100 text-blue-700",
    tab: "text-blue-700 border-blue-600",
    tabInactive: "hover:text-blue-700",
    accent: "bg-blue-600",
    accentText: "text-blue-700",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    icon: "text-blue-600",
    ring: "ring-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  green: {
    hero: "from-slate-900 via-blue-950 to-slate-800",
    badge: "bg-blue-100 text-blue-700",
    tab: "text-blue-700 border-blue-600",
    tabInactive: "hover:text-blue-700",
    accent: "bg-blue-600",
    accentText: "text-blue-700",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    icon: "text-blue-600",
    ring: "ring-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
};

// ─── Exam switcher bar ────────────────────────────────────────────────────────
const EXAMS = [
  { id: "ias",   label: "IAS / UPSC",  href: "/syllabus/ias" },
  { id: "uppsc", label: "UPPSC",        href: "/syllabus/uppsc" },
  { id: "ukpsc", label: "UKPSC",        href: "/syllabus/ukpsc" },
  { id: "bpsc",  label: "BPSC",         href: "/syllabus/bpsc" },
];

function ExamSwitcher({ currentId }: { currentId: string }) {
  const locale = useLocale();
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container mx-auto flex overflow-x-auto px-4">
        {EXAMS.map((e) => (
          <Link
            key={e.id}
            href={`/${locale}${e.href}`}
            className={cn(
              "shrink-0 px-5 py-3.5 text-sm font-semibold transition-colors",
              e.id === currentId
                ? "border-b-2 border-brand-blue text-brand-blue"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            {e.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Single paper accordion ───────────────────────────────────────────────────
function PaperAccordion({
  paper,
  index,
  color,
}: {
  paper: SyllabusPaper;
  index: number;
  color: keyof typeof COLOR;
}) {
  const [open, setOpen] = useState(index === 0);
  const c = COLOR[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.32, delay: index * 0.06 }}
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex w-full items-start justify-between gap-4 border-b px-6 py-4 text-left transition-colors",
          open ? `${c.accentBg} ${c.accentBorder} border-b` : "border-transparent bg-slate-50/60 hover:bg-slate-50"
        )}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-bold leading-snug text-slate-800">{paper.title}</h3>
            {paper.badge && (
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", c.badge)}>
                {paper.badge}
              </span>
            )}
          </div>
          {paper.intro && <p className="mt-1 text-xs leading-relaxed text-slate-500">{paper.intro}</p>}
        </div>
        <ChevronDown
          className={cn("mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="divide-y divide-slate-100 px-6 py-2">
              {paper.points.map((pt, i) => (
                <li key={i} className="flex gap-3 py-2.5 text-sm leading-relaxed text-slate-700">
                  <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", c.accent)} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Pattern stage card ───────────────────────────────────────────────────────
function PatternCard({ stage, index, color }: { stage: PatternStage; index: number; color: keyof typeof COLOR }) {
  const c = COLOR[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, delay: index * 0.07 }}
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      <div className={cn("border-b px-6 py-4", c.accentBg, c.accentBorder)}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Stage {index + 1}</p>
        <h3 className="mt-0.5 text-base font-bold text-slate-800">{stage.title}</h3>
        {stage.description && <p className="mt-1 text-xs leading-relaxed text-slate-600">{stage.description}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Paper / Component</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Marks</th>
              {stage.rows.some(r => r.questions) && (
                <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Questions</th>
              )}
              {stage.rows.some(r => r.duration) && (
                <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</th>
              )}
              <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Nature</th>
            </tr>
          </thead>
          <tbody>
            {stage.rows.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "border-b border-slate-100/70 transition-colors last:border-0 hover:bg-slate-50/50",
                  i === stage.rows.length - 1 && "font-semibold bg-slate-50/70"
                )}
              >
                <td className="px-4 py-3 text-xs font-medium text-slate-700">{row.paper}</td>
                <td className={cn("px-4 py-3 text-xs font-bold", c.accentText)}>{row.marks}</td>
                {stage.rows.some(r => r.questions) && (
                  <td className="px-4 py-3 text-xs text-slate-600">{row.questions ?? "—"}</td>
                )}
                {stage.rows.some(r => r.duration) && (
                  <td className="px-4 py-3 text-xs text-slate-600">{row.duration ?? "—"}</td>
                )}
                <td className="px-4 py-3 text-xs text-slate-500">{row.nature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {stage.note && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3 text-xs text-slate-500">
          {stage.note}
        </div>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
type Tab = "prelims" | "mains" | "pattern";

export default function SyllabusPageClient({ exam }: { exam: ExamSyllabus }) {
  const locale = useLocale();
  const lang = locale === "hi" ? "hi" : "en";
  const [tab, setTab] = useState<Tab>("prelims");
  const c = COLOR[exam.color];

  const TABS: { id: Tab; label: { en: string; hi: string }; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "prelims", label: { en: "Prelims Syllabus", hi: "प्रारंभिक पाठ्यक्रम" }, icon: BookOpen },
    { id: "mains",   label: { en: "Mains Syllabus",   hi: "मुख्य परीक्षा पाठ्यक्रम" }, icon: FileText },
    { id: "pattern", label: { en: "Exam Pattern",     hi: "परीक्षा पैटर्न" }, icon: BarChart3 },
  ];

  const prelims = exam.preliminary[lang];
  const mains   = exam.mains[lang];
  const pattern = exam.pattern[lang];

  return (
    <>
      {/* Hero */}
      <section className={cn("bg-gradient-to-br text-white", c.hero)}>
        <div className="container mx-auto px-4 py-14 md:py-20">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/60">
            {locale === "hi" ? "पाठ्यक्रम" : "Syllabus"}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl"
          >
            {exam.fullName[lang]}
          </motion.h1>
          <p className="mt-2 text-base text-white/70 md:text-lg">{exam.tagline[lang]}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">{exam.description[lang]}</p>
        </div>
      </section>

      {/* Exam switcher */}
      <ExamSwitcher currentId={exam.id} />

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto flex overflow-x-auto px-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-semibold transition-colors",
                  active ? `border-current ${c.tab}` : `border-transparent text-slate-500 ${c.tabInactive}`
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-5">

            {tab === "prelims" && (
              <>
                <div className={cn("rounded-2xl border p-5 text-sm leading-relaxed", c.accentBg, c.accentBorder, c.accentText)}>
                  <span className="font-bold">
                    {locale === "hi" ? "नोट:" : "Note:"}
                  </span>
                  {locale === "hi"
                    ? " प्रारंभिक परीक्षा एक स्क्रीनिंग परीक्षा है। अंतिम मेरिट में प्रारंभिक के अंक नहीं जुड़ते।"
                    : " The Preliminary exam is a screening test. Marks scored here do not count toward final merit."}
                </div>
                {prelims.map((paper, i) => (
                  <PaperAccordion key={i} paper={paper} index={i} color={exam.color} />
                ))}
              </>
            )}

            {tab === "mains" && (
              <>
                <div className={cn("rounded-2xl border p-5 text-sm leading-relaxed", c.accentBg, c.accentBorder, c.accentText)}>
                  <span className="font-bold">
                    {locale === "hi" ? "नोट:" : "Note:"}
                  </span>
                  {locale === "hi"
                    ? " मुख्य परीक्षा वर्णनात्मक (descriptive) प्रकृति की होती है। इसके अंक अंतिम मेरिट में जुड़ते हैं।"
                    : " The Main exam is descriptive in nature. Marks scored here count toward the final merit list."}
                </div>
                {mains.map((paper, i) => (
                  <PaperAccordion key={i} paper={paper} index={i} color={exam.color} />
                ))}
              </>
            )}

            {tab === "pattern" && (
              <>
                {pattern.stages.map((stage, i) => (
                  <PatternCard key={i} stage={stage} index={i} color={exam.color} />
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className={cn("rounded-2xl border p-6 text-center", c.accentBg, c.accentBorder)}
                >
                  <p className={cn("text-base font-bold", c.accentText)}>{pattern.finalMerit}</p>
                </motion.div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-white py-10 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            {locale === "hi" ? "अभी शुरू करें — हम आपकी तैयारी में मदद करेंगे" : "Start Your Preparation Today"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {locale === "hi"
              ? "Dhyeya IAS Greater Noida में विशेषज्ञ मार्गदर्शन, टेस्ट सीरीज और अध्ययन सामग्री प्राप्त करें।"
              : "Expert guidance, test series and study material at Dhyeya IAS Greater Noida."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/courses`}
              className={cn("rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors", c.button)}
            >
              {locale === "hi" ? "हमारे कोर्स देखें" : "View Our Courses"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              {locale === "hi" ? "हमसे संपर्क करें" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

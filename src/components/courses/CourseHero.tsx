"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Users, ChevronRight, Home, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/constants";

const themes = {
  blue: {
    section:       "bg-gradient-to-br from-white via-blue-50/50 to-sky-50/40",
    blob1:         "bg-blue-200/25",
    blob2:         "bg-sky-200/20",
    breadcrumb:    "text-slate-400 hover:text-brand-blue transition-colors",
    breadcrumbCur: "text-brand-blue font-medium",
    catBadge:      "bg-brand-blue/10 text-brand-blue border border-brand-blue/20",
    featBadge:     "bg-amber-100 text-amber-700 border border-amber-200",
    newBadge:      "bg-emerald-100 text-emerald-700 border border-emerald-200",
    title:         "text-brand-blue",
    subtitle:      "text-slate-500",
    desc:          "text-slate-600",
    chip:          "bg-white border border-blue-200 text-slate-600 shadow-sm",
    chipIcon:      "text-brand-blue",
    card:          "bg-white border border-blue-100 shadow-2xl shadow-blue-900/6",
    cardTop:       "bg-gradient-to-r from-brand-blue to-blue-500",
    price:         "text-brand-blue",
    emi:           "text-slate-400",
    hl:            "bg-blue-50 border border-blue-100",
    hlVal:         "text-brand-blue",
    hlLbl:         "text-slate-400",
    btnEnroll:     "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20",
    btnEnquire:    "border border-blue-200 text-brand-blue hover:bg-blue-50",
    mobEnroll:     "bg-brand-blue text-white hover:bg-brand-blue/90",
    mobLearn:      "border border-blue-200 text-brand-blue hover:bg-blue-50",
  },
  gold: {
    section:       "bg-gradient-to-br from-amber-50/80 via-yellow-50/50 to-white",
    blob1:         "bg-amber-200/25",
    blob2:         "bg-yellow-200/20",
    breadcrumb:    "text-amber-400/80 hover:text-amber-700 transition-colors",
    breadcrumbCur: "text-amber-700 font-medium",
    catBadge:      "bg-amber-100 text-amber-800 border border-amber-200",
    featBadge:     "bg-amber-200/60 text-amber-900 border border-amber-300",
    newBadge:      "bg-emerald-100 text-emerald-700 border border-emerald-200",
    title:         "text-amber-900",
    subtitle:      "text-amber-700/70",
    desc:          "text-amber-950/70",
    chip:          "bg-white border border-amber-200 text-amber-900 shadow-sm",
    chipIcon:      "text-amber-600",
    card:          "bg-white border border-amber-100 shadow-2xl shadow-amber-900/6",
    cardTop:       "bg-gradient-to-r from-amber-500 to-yellow-400",
    price:         "text-amber-900",
    emi:           "text-amber-600/60",
    hl:            "bg-amber-50 border border-amber-100",
    hlVal:         "text-amber-800",
    hlLbl:         "text-amber-500",
    btnEnroll:     "bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-600/20",
    btnEnquire:    "border border-amber-200 text-amber-800 hover:bg-amber-50",
    mobEnroll:     "bg-amber-600 text-white hover:bg-amber-700",
    mobLearn:      "border border-amber-200 text-amber-800 hover:bg-amber-50",
  },
  orange: {
    section:       "bg-gradient-to-br from-orange-50/80 via-rose-50/40 to-white",
    blob1:         "bg-orange-200/25",
    blob2:         "bg-rose-200/20",
    breadcrumb:    "text-orange-400/80 hover:text-orange-700 transition-colors",
    breadcrumbCur: "text-orange-700 font-medium",
    catBadge:      "bg-orange-100 text-orange-800 border border-orange-200",
    featBadge:     "bg-orange-200/60 text-orange-900 border border-orange-300",
    newBadge:      "bg-emerald-100 text-emerald-700 border border-emerald-200",
    title:         "text-orange-900",
    subtitle:      "text-orange-700/70",
    desc:          "text-orange-950/70",
    chip:          "bg-white border border-orange-200 text-orange-900 shadow-sm",
    chipIcon:      "text-brand-orange",
    card:          "bg-white border border-orange-100 shadow-2xl shadow-orange-900/6",
    cardTop:       "bg-gradient-to-r from-brand-orange to-orange-400",
    price:         "text-orange-900",
    emi:           "text-orange-600/60",
    hl:            "bg-orange-50 border border-orange-100",
    hlVal:         "text-orange-800",
    hlLbl:         "text-orange-500",
    btnEnroll:     "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-md shadow-orange-600/20",
    btnEnquire:    "border border-orange-200 text-orange-800 hover:bg-orange-50",
    mobEnroll:     "bg-brand-orange text-white hover:bg-brand-orange/90",
    mobLearn:      "border border-orange-200 text-orange-800 hover:bg-orange-50",
  },
};

export default function CourseHero({ course }: { course: Course }) {
  const locale = useLocale();
  const t = themes[course.accentColor];

  return (
    <section className={cn("relative overflow-hidden", t.section)}>
      {/* Decorative blobs */}
      <div className={cn("pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full blur-3xl", t.blob1)} />
      <div className={cn("pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full blur-3xl", t.blob2)} />

      <div className="relative container mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs">
          <Link href={`/${locale}`} className={cn("flex items-center gap-1", t.breadcrumb)}>
            <Home className="h-3 w-3" /> Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href={`/${locale}/courses`} className={t.breadcrumb}>Courses</Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className={t.breadcrumbCur}>{course.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-start">
          {/* ── LEFT ─────────────────────────────────── */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider", t.catBadge)}>
                {course.category}
              </span>
              {course.badge && (
                <span className={cn("rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider", t.featBadge)}>
                  {course.badge}
                </span>
              )}
              {course.isNew && (
                <span className={cn("rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider", t.newBadge)}>
                  New
                </span>
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn("mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl", t.title)}
            >
              {course.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className={cn("mt-2 text-base font-medium", t.subtitle)}
            >
              {course.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className={cn("mt-4 max-w-2xl text-[15px] leading-relaxed", t.desc)}
            >
              {course.description}
            </motion.p>

            {/* Meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              <span className={cn("flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium", t.chip)}>
                <Clock className={cn("h-3.5 w-3.5", t.chipIcon)} /> {course.duration}
              </span>
              <span className={cn("flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium", t.chip)}>
                <Users className={cn("h-3.5 w-3.5", t.chipIcon)} /> {course.seats} seats
              </span>
              {course.batchStart && (
                <span className={cn("flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium", t.chip)}>
                  <Calendar className={cn("h-3.5 w-3.5", t.chipIcon)} /> Next Batch: {course.batchStart}
                </span>
              )}
            </motion.div>

            {/* Mobile CTA */}
            <div className="mt-7 flex gap-3 lg:hidden">
              <a href="#enroll" className={cn("flex-1 rounded-xl px-5 py-3 text-center text-sm font-bold transition-colors", t.mobEnroll)}>
                Enroll Now
              </a>
              <a href="#overview" className={cn("flex-1 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-colors", t.mobLearn)}>
                Learn More
              </a>
            </div>
          </div>

          {/* ── RIGHT — Fee card ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className={cn("hidden lg:block rounded-2xl overflow-hidden", t.card)}
          >
            {/* Coloured top accent strip */}
            <div className={cn("h-1.5 w-full", t.cardTop)} />

            {/* Price area */}
            <div className="px-6 pt-5 pb-4 border-b border-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Programme Fee</p>
              <p className={cn("mt-1.5 text-4xl font-extrabold", t.price)}>
                ₹{course.fee.toLocaleString("en-IN")}
              </p>
              {course.emi && (
                <p className={cn("mt-0.5 text-sm", t.emi)}>or {course.emi}</p>
              )}
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-2.5 p-4">
              {course.highlights.map((h) => (
                <div key={h.label} className={cn("rounded-xl p-3.5", t.hl)}>
                  <div className={cn("text-[15px] font-extrabold", t.hlVal)}>{h.value}</div>
                  <div className={cn("mt-0.5 text-[11px]", t.hlLbl)}>{h.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="space-y-2.5 px-4 pb-5">
              <a
                href="#enroll"
                className={cn("flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition-all duration-200", t.btnEnroll)}
              >
                Enroll Now
              </a>
              <a
                href="#enquiry"
                className={cn("flex w-full items-center justify-center rounded-xl border py-3 text-sm font-semibold transition-colors", t.btnEnquire)}
              >
                Enquire / Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

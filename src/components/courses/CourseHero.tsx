"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Users, ChevronRight, Home, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/constants";

const unified = {
  section:       "bg-gradient-to-br from-white via-slate-50/60 to-blue-50/25",
  blob1:         "bg-blue-300/10",
  blob2:         "bg-indigo-200/10",
  breadcrumb:    "text-slate-400 hover:text-blue-700 transition-colors",
  breadcrumbCur: "text-blue-700 font-medium",
  catBadge:      "bg-blue-50 text-blue-700 border border-blue-200/60",
  featBadge:     "bg-slate-100 text-slate-600 border border-slate-200",
  newBadge:      "bg-teal-50 text-teal-700 border border-teal-200",
  title:         "text-slate-900",
  subtitle:      "text-slate-500",
  desc:          "text-slate-600",
  chip:          "bg-white border border-slate-200 text-slate-600 shadow-sm",
  chipIcon:      "text-blue-600",
  card:          "bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/6",
  cardTop:       "bg-gradient-to-r from-slate-800 to-blue-700",
  price:         "text-slate-900",
  emi:           "text-slate-400",
  hl:            "bg-slate-50 border border-slate-200/60",
  hlVal:         "text-slate-800",
  hlLbl:         "text-slate-400",
  btnEnroll:     "bg-blue-700 text-white hover:bg-blue-800 shadow-md shadow-blue-700/20",
  btnEnquire:    "border border-slate-200 text-slate-700 hover:bg-slate-50",
  mobEnroll:     "bg-blue-700 text-white hover:bg-blue-800",
  mobLearn:      "border border-slate-200 text-slate-700 hover:bg-slate-50",
};

const themes = {
  blue:   unified,
  gold:   unified,
  orange: unified,
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

          {/* ── RIGHT - Fee card ──────────────────────── */}
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

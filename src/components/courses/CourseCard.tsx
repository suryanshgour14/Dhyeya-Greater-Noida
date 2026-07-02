"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Users, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/constants";

const unified = {
  bar:       "bg-gradient-to-r from-slate-800 to-blue-700",
  catBadge:  "bg-blue-50 text-blue-700",
  specBadge: "bg-slate-100 text-slate-600 border border-slate-200",
  chip:      "bg-slate-50 text-slate-600 border border-slate-200/70",
  price:     "text-slate-900",
  hl:        "bg-slate-50/80",
  hlVal:     "text-slate-800",
  hlLbl:     "text-slate-400",
  btn:       "bg-blue-700 hover:bg-blue-800 text-white shadow-sm shadow-blue-700/20",
  card:      "border-slate-200/80 hover:border-blue-200/60 hover:shadow-lg hover:shadow-slate-900/6",
};

const themes = {
  blue:   unified,
  gold:   unified,
  orange: unified,
};

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const locale = useLocale();
  const t = themes[course.accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        t.card
      )}
    >
      {/* Top accent bar */}
      <div className={cn("h-1 w-full", t.bar)} />

      <div className="flex flex-1 flex-col p-5">
        {/* Category + badge row */}
        <div className="flex items-center justify-between gap-2">
          <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest", t.catBadge)}>
            {course.category}
          </span>
          {(course.badge || course.isNew || course.isFeatured) && (
            <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest", t.specBadge)}>
              {course.isNew ? "New" : course.badge ?? "Featured"}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-[15px] font-bold leading-snug text-slate-800 group-hover:text-brand-blue transition-colors">
          {course.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">{course.subtitle}</p>

        {/* Tagline */}
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {course.tagline}
        </p>

        {/* Meta chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <span className={cn("flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium", t.chip)}>
            <Clock className="h-3 w-3" /> {course.duration}
          </span>
          <span className={cn("flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium", t.chip)}>
            <Users className="h-3 w-3" /> {course.seats} seats
          </span>
          {course.batchStart && (
            <span className={cn("flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium", t.chip)}>
              <CalendarDays className="h-3 w-3" /> {course.batchStart}
            </span>
          )}
        </div>

        {/* Fee */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className={cn("text-2xl font-extrabold", t.price)}>
            ₹{course.fee.toLocaleString("en-IN")}
          </span>
          {course.emi && (
            <span className="text-xs text-slate-400">or {course.emi}</span>
          )}
        </div>

        {/* Highlights */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {course.highlights.slice(0, 2).map((h) => (
            <div key={h.label} className={cn("rounded-xl px-3 py-2.5", t.hl)}>
              <div className={cn("text-sm font-bold", t.hlVal)}>{h.value}</div>
              <div className={cn("text-[10px]", t.hlLbl)}>{h.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={`/${locale}/courses/${course.slug}`}
            className={cn(
              "flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
              t.btn
            )}
          >
            Enroll Now <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/${locale}/courses/${course.slug}`}
            className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

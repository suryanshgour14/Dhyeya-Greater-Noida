"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Users, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/constants";

const themes = {
  blue: {
    bar:       "bg-gradient-to-r from-brand-blue to-blue-400",
    catBadge:  "bg-brand-blue/8 text-brand-blue",
    specBadge: "bg-amber-50 text-amber-700 border border-amber-200",
    chip:      "bg-blue-50/70 text-brand-blue border border-blue-100",
    price:     "text-brand-blue",
    hl:        "bg-blue-50/60",
    hlVal:     "text-brand-blue",
    hlLbl:     "text-slate-400",
    btn:       "bg-brand-blue hover:bg-brand-blue/90 text-white shadow-sm shadow-brand-blue/20",
    card:      "border-slate-200/80 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/6",
  },
  gold: {
    bar:       "bg-gradient-to-r from-amber-500 to-yellow-400",
    catBadge:  "bg-amber-50 text-amber-700",
    specBadge: "bg-amber-100 text-amber-800 border border-amber-200",
    chip:      "bg-amber-50/70 text-amber-700 border border-amber-100",
    price:     "text-amber-800",
    hl:        "bg-amber-50/60",
    hlVal:     "text-amber-700",
    hlLbl:     "text-slate-400",
    btn:       "bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-600/20",
    card:      "border-slate-200/80 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/6",
  },
  orange: {
    bar:       "bg-gradient-to-r from-brand-orange to-orange-400",
    catBadge:  "bg-orange-50 text-brand-orange",
    specBadge: "bg-orange-100 text-orange-800 border border-orange-200",
    chip:      "bg-orange-50/70 text-orange-700 border border-orange-100",
    price:     "text-orange-800",
    hl:        "bg-orange-50/60",
    hlVal:     "text-orange-700",
    hlLbl:     "text-slate-400",
    btn:       "bg-brand-orange hover:bg-brand-orange/90 text-white shadow-sm shadow-orange-600/20",
    card:      "border-slate-200/80 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-900/6",
  },
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
        <div className="mt-auto pt-4">
          <Link
            href={`/${locale}/courses/${course.slug}`}
            className={cn(
              "flex w-full items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
              t.btn
            )}
          >
            View Details <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

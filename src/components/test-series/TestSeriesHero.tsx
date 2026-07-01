"use client";

import { motion } from "framer-motion";
import { CalendarDays, FileText, IndianRupee, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestSeries } from "@/lib/test-series";

const themes = {
  blue: {
    badge: "border-blue-200/60 bg-blue-50 text-brand-blue",
    accent: "text-brand-blue",
    highlight: "bg-blue-50/70 border-blue-100",
    hlVal: "text-brand-blue",
    pill: "bg-brand-blue/10 text-brand-blue",
    fee: "bg-brand-blue text-white",
    gradient: "from-slate-800 to-brand-blue",
  },
  gold: {
    badge: "border-blue-200/60 bg-blue-50 text-brand-blue",
    accent: "text-brand-blue",
    highlight: "bg-blue-50/70 border-blue-100",
    hlVal: "text-brand-blue",
    pill: "bg-brand-blue/10 text-brand-blue",
    fee: "bg-brand-blue text-white",
    gradient: "from-slate-800 to-brand-blue",
  },
  orange: {
    badge: "border-blue-200/60 bg-blue-50 text-brand-blue",
    accent: "text-brand-blue",
    highlight: "bg-blue-50/70 border-blue-100",
    hlVal: "text-brand-blue",
    pill: "bg-brand-blue/10 text-brand-blue",
    fee: "bg-brand-blue text-white",
    gradient: "from-slate-800 to-brand-blue",
  },
};

interface Props {
  series: TestSeries;
}

function FeeBlock({ fee, t }: { fee: TestSeries["fee"]; t: (typeof themes)[keyof typeof themes] }) {
  if (!fee) return null;
  if (typeof fee === "number") {
    return (
      <div className={cn("flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold", t.fee)}>
        <IndianRupee className="h-4 w-4" />
        {fee.toLocaleString("en-IN")}
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">Offline</span>
        <span className={cn("text-lg font-extrabold", t.hlVal)}>₹{fee.offline.toLocaleString("en-IN")}</span>
      </div>
      <div className={cn("rounded-xl px-4 py-2 text-sm", t.fee)}>
        <span className="block text-[10px] font-semibold uppercase tracking-widest opacity-75">Online</span>
        <span className="text-lg font-extrabold">₹{fee.online.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

export default function TestSeriesHero({ series }: Props) {
  const t = themes[series.accentColor];

  return (
    <section className={cn("bg-gradient-to-br", t.gradient, "py-16 text-white")}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          {/* Badge */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
            <FileText className="h-3 w-3" />
            Test Series
          </span>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {series.title}
          </h1>
          <p className="mb-2 text-base font-medium text-white/70">{series.subtitle}</p>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/60">{series.tagline}</p>

          {/* Highlights row */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {series.highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
                <div className="text-xl font-extrabold text-white">{h.value}</div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-white/50">{h.label}</div>
              </div>
            ))}
          </div>

          {/* Fee + start date row */}
          <div className="flex flex-wrap items-center gap-3">
            {series.fee && <FeeBlock fee={series.fee} t={t} />}
            {series.startDate && (
              <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <CalendarDays className="h-4 w-4 opacity-70" />
                Starts: {series.startDate}
              </div>
            )}
            {series.duration && (
              <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <Clock className="h-4 w-4 opacity-70" />
                {series.duration}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

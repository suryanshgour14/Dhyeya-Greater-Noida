"use client";

import { motion } from "framer-motion";
import { CalendarDays, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestSeries } from "@/lib/test-series";
import BuyButton from "@/components/payments/BuyButton";

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
    badge: "border-amber-200/60 bg-amber-50 text-amber-700",
    accent: "text-amber-700",
    highlight: "bg-amber-50/70 border-amber-100",
    hlVal: "text-amber-700",
    pill: "bg-amber-100/60 text-amber-700",
    fee: "bg-amber-600 text-white",
    gradient: "from-slate-800 to-amber-700",
  },
  orange: {
    badge: "border-orange-200/60 bg-orange-50 text-brand-orange",
    accent: "text-brand-orange",
    highlight: "bg-orange-50/70 border-orange-100",
    hlVal: "text-orange-700",
    pill: "bg-orange-100/60 text-orange-700",
    fee: "bg-brand-orange text-white",
    gradient: "from-slate-800 to-orange-700",
  },
};

interface Props {
  series: TestSeries;
  productId?: string;
}

function FeeBlock({ fee }: { fee: TestSeries["fee"] }) {
  if (!fee) return null;
  const off =
    fee.original > fee.discounted
      ? Math.round(((fee.original - fee.discounted) / fee.original) * 100)
      : 0;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-white">₹{fee.discounted.toLocaleString("en-IN")}</span>
        {off > 0 && (
          <span className="text-sm font-medium text-white/50 line-through">
            ₹{fee.original.toLocaleString("en-IN")}
          </span>
        )}
      </div>
      {off > 0 && (
        <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
          {off}% OFF
        </span>
      )}
    </div>
  );
}

export default function TestSeriesHero({ series, productId }: Props) {
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
            {series.fee && <FeeBlock fee={series.fee} />}
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

          {productId && (
            <div className="mt-7">
              <BuyButton
                productId={productId}
                redirectTo="/tests"
                label="Enroll Now"
                size="lg"
                variant="gold"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

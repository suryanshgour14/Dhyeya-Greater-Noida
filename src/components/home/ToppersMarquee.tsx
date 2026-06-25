"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import { Trophy, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TOPPERS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Split into two rows
const ROW_1 = TOPPERS.slice(0, 14);
const ROW_2 = TOPPERS.slice(14);

// ─── Single topper card ───────────────────────────────────────────────────────

function TopperCard({ topper }: { topper: (typeof TOPPERS)[number] }) {
  const isTopRank = parseInt(topper.rank.replace("AIR ", "")) <= 10;

  return (
    <div
      className={`group relative w-[188px] shrink-0 overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1.5 ${
        isTopRank
          ? "shadow-[0_2px_16px_-4px_rgba(201,161,59,0.3)] ring-1 ring-brand-gold/40"
          : "shadow-md ring-1 ring-slate-200/80"
      } hover:shadow-[0_20px_48px_-8px_rgba(11,28,61,0.28)]`}
    >
      {/* ── Photo ── */}
      <div className="relative h-[230px] overflow-hidden bg-slate-100">
        <img
          src={topper.photo}
          alt={topper.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />

        {/* Soft bottom gradient so info panel blends */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/40 to-transparent" />

        {/* AIR 01 crown */}
        {topper.rank === "AIR 01" && (
          <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold shadow-lg shadow-brand-gold/40">
            <Star className="h-3.5 w-3.5 fill-brand-blue text-brand-blue" />
          </div>
        )}
      </div>

      {/* ── Info panel ── */}
      <div className="px-4 pb-4 pt-2">
        {/* Rank row */}
        <div className="flex items-center gap-1.5">
          <Trophy
            className={`h-3.5 w-3.5 shrink-0 ${
              isTopRank ? "text-brand-gold" : "text-slate-400"
            }`}
          />
          <span
            className={`text-[13px] font-extrabold tracking-tight ${
              isTopRank ? "text-brand-gold" : "text-slate-500"
            }`}
          >
            {topper.rank}
          </span>
        </div>

        {/* Name */}
        <p className="mt-1 text-[13px] font-bold leading-snug text-brand-blue">
          {topper.name}
        </p>

        {/* Exam label */}
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {topper.exam}
        </p>
      </div>
    </div>
  );
}

// ─── Infinite marquee row ─────────────────────────────────────────────────────

function MarqueeRow({
  toppers,
  direction,
  speed,
}: {
  toppers: (typeof TOPPERS)[number][];
  direction: "left" | "right";
  speed: number;
}) {
  const doubled = [...toppers, ...toppers];
  const from = direction === "left" ? "0%" : "-50%";
  const to   = direction === "left" ? "-50%" : "0%";

  return (
    <div className="relative overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#060e1b] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#060e1b] to-transparent" />

      <motion.div
        className="flex gap-4 px-4 will-change-transform"
        animate={{ x: [from, to] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((topper, i) => (
          <TopperCard key={`${topper.id}-${i}`} topper={topper} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const locale = useLocale();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="container mx-auto mb-12 px-4 text-center"
    >
      {/* Overline */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-brand-gold/40" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          Hall of Fame
        </span>
        <div className="h-px w-12 bg-brand-gold/40" />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-white md:text-4xl">
        Our{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-brand-gold">Toppers</span>
          {/* Underline accent */}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-gold/40"
          />
        </span>
      </h2>

      <p className="mt-4 text-sm text-slate-400 md:text-base">
        Proud achievements of our students — from AIR 01 to hundreds of selections
        across UPSC Civil Services.
      </p>

      {/* Stats strip */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {[
          { value: "500+", label: "UPSC Selections" },
          { value: "AIR 01", label: "All India Rank 1" },
          { value: "12 yrs", label: "Consistent Results" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-extrabold text-brand-gold">{value}</p>
            <p className="text-[11px] font-medium text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function ToppersMarquee() {
  const locale = useLocale();

  return (
    <section className="overflow-hidden bg-[#060e1b] py-20">
      <SectionHeader />

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <MarqueeRow toppers={ROW_1} direction="left" speed={36} />
      </div>

      {/* Row 2 — scrolls right */}
      <MarqueeRow toppers={ROW_2} direction="right" speed={32} />

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <Link
          href={`/${locale}/results`}
          className="group inline-flex items-center gap-2.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-6 py-2.5 text-sm font-semibold text-brand-gold transition-all duration-200 hover:bg-brand-gold hover:text-brand-blue"
        >
          View All Toppers
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

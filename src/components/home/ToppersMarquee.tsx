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
  const airNum = parseInt(topper.rank.replace("AIR ", ""));
  const isTopRank = airNum <= 10;
  const isFirst   = airNum === 1;

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 18px 40px -8px rgba(11,28,61,0.32)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`relative flex w-[160px] shrink-0 flex-col items-center rounded-2xl px-4 pb-5 pt-6 ${
        isFirst
          ? "bg-gradient-to-b from-[#0e1f40] to-[#0a1628] ring-1 ring-brand-gold/50"
          : "bg-[#0c1730] ring-1 ring-white/[0.06]"
      }`}
    >
      {/* AIR 01 glow halo */}
      {isFirst && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-gold/[0.04]" />
      )}

      {/* ── Circular photo ── */}
      <div className="relative mb-4" style={{ width: 80, height: 80 }}>
        {/* Outer glow ring for top rankers */}
        {isTopRank && (
          <div
            className="absolute -inset-1 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(201,161,59,0.6) 0%, rgba(201,161,59,0.05) 60%, rgba(201,161,59,0.6) 100%)",
            }}
          />
        )}

        {/* Photo ring layers: white gap → shadow → photo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: isFirst
              ? "0 0 0 2px #fff, 0 0 0 4px rgba(201,161,59,0.55), 0 6px 20px -4px rgba(201,161,59,0.3)"
              : "0 0 0 2px #fff, 0 0 0 4px rgba(11,28,61,0.4), 0 6px 16px -4px rgba(0,0,0,0.4)",
          }}
        />

        <img
          src={topper.photo}
          alt={topper.name}
          width={80}
          height={80}
          className="relative h-full w-full rounded-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />

        {/* Gold inset ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${isTopRank ? "rgba(201,161,59,0.45)" : "rgba(255,255,255,0.08)"}`,
          }}
        />

        {/* AIR 01 star */}
        {isFirst && (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold shadow-md shadow-brand-gold/40">
            <Star className="h-3 w-3 fill-brand-blue text-brand-blue" />
          </div>
        )}
      </div>

      {/* ── Rank ── */}
      <div className="flex items-center gap-1">
        <Trophy
          className={`h-3 w-3 shrink-0 ${isTopRank ? "text-brand-gold" : "text-slate-500"}`}
        />
        <span
          className={`text-[13px] font-extrabold tracking-tight ${
            isTopRank ? "text-brand-gold" : "text-slate-400"
          }`}
        >
          {topper.rank}
        </span>
      </div>

      {/* Gold hairline */}
      <div className={`my-2 h-px w-8 ${isTopRank ? "bg-brand-gold/60" : "bg-white/10"}`} />

      {/* ── Name ── */}
      <p className="text-center text-[12px] font-bold leading-snug text-white">
        {topper.name}
      </p>

      {/* ── Exam ── */}
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {topper.exam}
      </p>
    </motion.div>
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

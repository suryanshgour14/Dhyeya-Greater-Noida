"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import { Trophy, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TOPPERS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// AIR 01 centred in row 1 — surround with others on each side
const ROW_1 = [
  ...TOPPERS.slice(1, 7),   // AIR 03–14  (6 cards left of centre)
  TOPPERS[0],               // AIR 01     (centre spotlight)
  ...TOPPERS.slice(7, 14),  // AIR 15–24  (7 cards right of centre)
];
const ROW_2 = TOPPERS.slice(14);

// ─── Card ─────────────────────────────────────────────────────────────────────

function TopperCard({ topper }: { topper: (typeof TOPPERS)[number] }) {
  const airNum    = parseInt(topper.rank.replace("AIR ", ""));
  const isTopRank = airNum <= 10;
  const isFirst   = airNum === 1;

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 44px -8px rgba(11,28,61,0.22)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative flex w-[158px] shrink-0 flex-col items-center rounded-2xl px-4 pb-5 pt-6 shadow-sm ${
        isFirst
          ? "bg-gradient-to-b from-[#0e1f40] to-[#0a1628] ring-1 ring-brand-gold/50"
          : "bg-[#0c1730] ring-1 ring-white/[0.07]"
      }`}
    >
      {isFirst && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-gold/[0.03]" />
      )}

      {/* Circular photo */}
      <div className="relative mb-4 shrink-0" style={{ width: 78, height: 78 }}>
        {isTopRank && (
          <div
            className="absolute -inset-[3px] rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg,rgba(201,161,59,0.7) 0%,rgba(201,161,59,0.05) 55%,rgba(201,161,59,0.7) 100%)",
            }}
          />
        )}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: isFirst
              ? "0 0 0 2px #fff,0 0 0 4px rgba(201,161,59,0.6),0 6px 18px -4px rgba(201,161,59,0.25)"
              : "0 0 0 2px #1e2d47,0 0 0 3.5px rgba(255,255,255,0.1),0 4px 14px -4px rgba(0,0,0,0.5)",
          }}
        />
        <Image
          src={topper.photo}
          alt={topper.name}
          width={78}
          height={78}
          className="relative h-full w-full rounded-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${isTopRank ? "rgba(201,161,59,0.4)" : "rgba(255,255,255,0.06)"}`,
          }}
        />
        {isFirst && (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold shadow-md shadow-brand-gold/40">
            <Star className="h-3 w-3 fill-brand-blue text-brand-blue" />
          </div>
        )}
      </div>

      {/* Rank */}
      <div className="flex items-center gap-1">
        <Trophy className={`h-3 w-3 shrink-0 ${isTopRank ? "text-brand-gold" : "text-slate-600"}`} />
        <span className={`text-[13px] font-extrabold ${isTopRank ? "text-brand-gold" : "text-slate-400"}`}>
          {topper.rank}
        </span>
      </div>

      <div className={`my-2 h-px w-8 ${isTopRank ? "bg-brand-gold/50" : "bg-white/[0.08]"}`} />

      <p className="text-center text-[12px] font-bold leading-snug text-white">{topper.name}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300">{topper.exam}</p>
    </motion.div>
  );
}

// ─── CSS-based seamless marquee row ───────────────────────────────────────────

function MarqueeRow({
  toppers,
  direction,
  duration,
}: {
  toppers: (typeof TOPPERS)[number][];
  direction: "left" | "right";
  duration: number;
}) {
  // Double the items — translateX(-50%) loops back seamlessly
  const items = [...toppers, ...toppers];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-4 px-4"
        style={{
          width: "max-content",
          animation: `marquee-${direction} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((topper, i) => (
          <TopperCard key={`${topper.id}-${i}`} topper={topper} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function SectionHeader() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="container mx-auto mb-12 px-4 text-center"
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-10 bg-brand-gold/50" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          Hall of Fame
        </span>
        <div className="h-px w-10 bg-brand-gold/50" />
      </div>

      <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
        Our{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-brand-gold">Toppers</span>
          <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-gold/35" />
        </span>
      </h2>

      <p className="mt-3 text-sm text-slate-500 md:text-base">
        Proud achievements of our students — AIR 01 to thousands of IAS/PCS selections.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {[
          { value: "5000+", label: "Selections in IAS / PCS" },
          { value: "AIR 01", label: "All India Rank 1" },
          { value: "20 yrs", label: "Consistent Results" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-extrabold text-brand-blue">{value}</p>
            <p className="text-[11px] font-medium text-slate-600">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ToppersMarquee() {
  const locale = useLocale();

  return (
    <section className="overflow-x-hidden bg-white py-20">
      <SectionHeader />

      <div className="mb-4">
        <MarqueeRow toppers={ROW_1} direction="left" duration={60} />
      </div>
      <MarqueeRow toppers={ROW_2} direction="right" duration={54} />

      <div className="mt-12 flex justify-center">
        <Link
          href={`/${locale}/results`}
          className="group inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-6 py-2.5 text-sm font-semibold text-brand-blue transition-all duration-200 hover:bg-brand-blue hover:text-white"
        >
          View All Toppers
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

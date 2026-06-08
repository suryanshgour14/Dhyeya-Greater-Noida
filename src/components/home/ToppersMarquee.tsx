"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { TOPPERS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function TopperCard({ topper }: { topper: (typeof TOPPERS)[number] }) {
  return (
    <div className="group relative flex w-60 shrink-0 flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
      {/* Avatar */}
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xl">
        {topper.name.charAt(0)}
      </div>

      {/* Rank badge */}
      <div className="mb-2 flex items-center justify-center gap-1">
        <Trophy className="h-4 w-4 text-brand-gold" />
        <span className="text-sm font-bold text-brand-gold">{topper.rank}</span>
      </div>

      {/* Name + meta */}
      <p className="text-center text-sm font-semibold text-foreground">{topper.name}</p>
      <p className="text-center text-xs text-muted-foreground">{topper.exam} · {topper.year}</p>
      {topper.service && (
        <p className="mt-1 text-center text-xs font-medium text-brand-blue">{topper.service}</p>
      )}

      {/* Quote */}
      <p className="mt-3 line-clamp-2 text-center text-xs italic text-muted-foreground">
        &ldquo;{topper.quote}&rdquo;
      </p>
    </div>
  );
}

export default function ToppersMarquee() {
  const t = useTranslations("home");
  const [row1, row2] = [TOPPERS.slice(0, 6), TOPPERS.slice(6)];

  return (
    <section className="overflow-hidden bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 text-center"
        >
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
            Hall of Fame
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            {t("toppers.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("toppers.subtitle")}</p>
        </motion.div>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />
        <motion.div
          className="flex gap-5 px-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...row1, ...row1].map((topper, i) => (
            <TopperCard key={`r1-${i}`} topper={topper} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />
        <motion.div
          className="flex gap-5 px-5"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...row2, ...row2].map((topper, i) => (
            <TopperCard key={`r2-${i}`} topper={topper} />
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/results"
          className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-white px-5 py-2 text-sm font-semibold text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white"
        >
          View All Toppers
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

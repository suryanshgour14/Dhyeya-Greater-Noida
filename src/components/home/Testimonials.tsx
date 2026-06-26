"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FEATURED = TESTIMONIALS.filter((t) => t.featured);

// ─── Single glass testimonial card ────────────────────────────────────────────
function TestimonialCard({
  item,
}: {
  item: (typeof TESTIMONIALS)[number];
}) {
  return (
    <div className="group/card relative w-[330px] shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-7 shadow-[0_8px_30px_rgba(11,28,61,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(11,28,61,0.16)] sm:w-[370px]">
      {/* Faint background quote mark */}
      <Quote className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 rotate-180 text-brand-blue/[0.05]" />

      {/* Stars */}
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="relative mb-6 text-[15px] leading-relaxed text-slate-700">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="border-t border-slate-200/70 pt-4">
        <p className="text-sm font-bold text-brand-blue">{item.name}</p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-brand-orange">
          {item.achievement}
        </p>
      </div>
    </div>
  );
}

// ─── Auto-scrolling row (CSS marquee, pauses on hover) ─────────────────────────
function CarouselRow() {
  // Triple the list so the loop seam is never visible
  const items = [...FEATURED, ...FEATURED, ...FEATURED];

  return (
    <div className="group relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-28" />

      <div
        className="flex w-max gap-5 px-4 py-3 group-hover:[animation-play-state:paused]"
        style={{ animation: "testimonials-scroll 48s linear infinite", willChange: "transform" }}
      >
        {items.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>

      <style>{`
        @keyframes testimonials-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
      `}</style>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20">
      {/* Decorative blurred blobs (give the glass cards something to refract) */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="container relative mx-auto mb-12 px-4 text-center"
      >
        <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
          Student Stories
        </span>
        <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
          What Our Toppers Say
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Real words from real achievers - students who cracked UPSC &amp; UPPCS with Dhyeya IAS.
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative"
      >
        <CarouselRow />
      </motion.div>

      {/* CTA */}
      <div className="relative mt-12 flex justify-center px-4">
        <Link
          href={`/${locale}/success-stories`}
          className="group inline-flex items-center gap-2.5 rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
        >
          View All Success Stories
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

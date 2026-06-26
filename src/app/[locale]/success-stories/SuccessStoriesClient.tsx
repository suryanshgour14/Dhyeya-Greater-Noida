"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, Trophy, Sparkles } from "lucide-react";
import { TESTIMONIALS, ACHIEVER_VISITS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Text-only testimonial card ───────────────────────────────────────────────
function StoryCard({ item }: { item: (typeof TESTIMONIALS)[number] }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <Quote className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 rotate-180 text-brand-blue/[0.05]" />

      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
        ))}
      </div>

      <p className="mb-6 flex-1 text-[15px] leading-relaxed text-slate-700">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="border-t border-slate-200/70 pt-4">
        <p className="text-sm font-bold text-brand-blue">{item.name}</p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-brand-orange">
          {item.achievement}
        </p>
      </div>
    </motion.div>
  );
}

export default function SuccessStoriesClient() {
  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-brand-gold/50" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Student Stories
            </span>
            <div className="h-px w-10 bg-brand-gold/50" />
          </div>
          <h1 className="text-4xl font-extrabold md:text-5xl">Success Stories</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
            Real words from real achievers - students who cracked UPSC &amp; UPPCS with the
            mentorship, discipline, and structured guidance of Dhyeya IAS.
          </p>
        </div>
      </section>

      {/* ── Testimonial grid ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-brand-gold/5 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="container relative mx-auto grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((item) => (
            <StoryCard key={item.id} item={item} />
          ))}
        </motion.div>
      </section>

      {/* ── Featured Alumni Visits (real photos) ───────────────────────────── */}
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12 text-center"
          >
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Alumni Visits
            </span>
            <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
              Our Achievers at Dhyeya IAS
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Toppers who returned to their roots - mentoring aspirants and sharing their journey
              with the Dhyeya IAS family.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ACHIEVER_VISITS.map((a) => (
              <motion.figure
                key={a.id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={a.photo}
                    alt={`${a.name} at Dhyeya IAS`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-bold text-brand-blue shadow">
                    <Trophy className="h-3 w-3" />
                    {a.achievement}
                  </span>
                </div>
                <figcaption className="p-5">
                  <p className="text-base font-bold text-brand-blue">{a.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate-400">
            Photographs are of actual Dhyeya IAS achievers during their visits to the institute.
          </p>
        </div>
      </section>
    </div>
  );
}

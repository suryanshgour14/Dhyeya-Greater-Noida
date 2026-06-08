"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Smartphone, Star } from "lucide-react";
import { APP_FEATURES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DownloadApp() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-20">
      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
      />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5">
              <Smartphone className="h-4 w-4 text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Mobile App
              </span>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl leading-tight">
              Learn Anywhere,{" "}
              <span className="text-brand-gold">Anytime</span>
            </h2>

            <p className="mb-8 text-base leading-relaxed text-slate-300">
              Carry your UPSC preparation in your pocket. Access lectures, mock tests, current affairs, and doubt sessions — all from the Dhyeya IAS app.
            </p>

            <ul className="mb-10 space-y-3">
              {APP_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Store buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {/* Google Play icon */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                  <path d="M3.18 23.76c.31.17.68.18 1.03-.02l12.1-6.93-2.84-2.86L3.18 23.76zM.5 1.4C.19 1.73 0 2.24 0 2.9v18.2c0 .66.19 1.17.5 1.5l.08.08 10.2-10.2v-.24L.58 1.32.5 1.4zm19.5 8.76-3.28-1.88-3.16 3.16 3.16 3.16 3.29-1.89c.94-.54.94-1.41-.01-1.95zm-16.64 12.6 2.84-2.86 2.84 2.84-2.84 2.85-2.84-2.83z" />
                </svg>
                <div>
                  <p className="text-[10px] text-slate-300">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {/* Apple icon */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <p className="text-[10px] text-slate-300">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ── Right — app mockup card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex justify-center"
          >
            <div className="relative w-64">
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] border-4 border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
                {/* Screen */}
                <div className="overflow-hidden rounded-[1.75rem] bg-slate-900">
                  {/* Status bar */}
                  <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
                    <span className="text-[10px] text-slate-400">9:41</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((b) => (
                        <div key={b} className={`h-1.5 w-1.5 rounded-full bg-slate-400 opacity-${b * 30 + 40}`} />
                      ))}
                    </div>
                  </div>

                  {/* App header */}
                  <div className="bg-brand-blue px-4 py-3">
                    <p className="text-xs font-bold text-white">Dhyeya IAS</p>
                    <p className="text-[10px] text-slate-300">Good morning, Aspirant!</p>
                  </div>

                  {/* App content */}
                  <div className="space-y-2 p-3">
                    {[
                      { label: "Today's MCQs", sub: "25 questions · 15 min", color: "bg-brand-blue" },
                      { label: "Current Affairs", sub: "November 13 · New", color: "bg-brand-gold" },
                      { label: "Live Class", sub: "Polity · 11:00 AM", color: "bg-emerald-500" },
                    ].map(({ label, sub, color }) => (
                      <div key={label} className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                        <div>
                          <p className="text-[11px] font-semibold text-white">{label}</p>
                          <p className="text-[9px] text-slate-400">{sub}</p>
                        </div>
                      </div>
                    ))}

                    {/* Streak */}
                    <div className="mt-1 rounded-xl bg-brand-gold/20 p-3 text-center">
                      <p className="text-[10px] font-bold text-brand-gold">🔥 14-day streak!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating rating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-8 rounded-2xl bg-white px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  <span className="text-sm font-bold text-slate-800">4.8</span>
                </div>
                <p className="text-[9px] text-slate-500">10K+ reviews</p>
              </motion.div>

              {/* Floating download badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 bottom-12 rounded-2xl bg-white px-3 py-2 shadow-lg"
              >
                <p className="text-[10px] font-bold text-slate-800">50K+</p>
                <p className="text-[9px] text-slate-500">Downloads</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

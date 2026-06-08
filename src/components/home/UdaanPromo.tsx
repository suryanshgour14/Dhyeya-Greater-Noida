"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  Calendar,
  Users,
  Zap,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FEATURES = [
  { icon: IndianRupee, text: "Scholarship up to ₹2 Lakh — merit-based waiver" },
  { icon: Users, text: "Small batch size — maximum personal attention" },
  { icon: Zap, text: "IAS officer faculty for all GS papers" },
  { icon: Calendar, text: "Integrated Prelims + Mains + Interview prep" },
];

const BENEFITS = [
  "All India Rank 1–500 in our Scholarship Test get full/partial fee waiver",
  "Dedicated mentorship from IAS toppers",
  "Unlimited mock tests & answer evaluation",
  "Free study material worth ₹15,000+",
];

export default function UdaanPromo() {
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-brand-blue py-20">
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl"
      />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5">
              <Image
                src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708897/udaan_logo.jpg_gyk7ew.jpg"
                alt="UDAAN Scholarship Programme"
                width={28}
                height={28}
                className="rounded-full object-contain"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Flagship Programme
              </span>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-tight">
              Dhyeya IAS{" "}
              <span className="text-brand-gold">UDAAN</span>
              <br />
              Scholarship Programme
            </h2>

            <p className="mb-6 text-base leading-relaxed text-slate-300">
              UDAAN is our flagship initiative to make quality UPSC coaching
              accessible to every deserving aspirant — regardless of financial
              background. Get up to <strong className="text-white">₹2 Lakh scholarship</strong> waiver
              based on your performance in the Dhyeya Scholarship Test.
            </p>

            <ul className="mb-8 space-y-3">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20">
                    <Icon className="h-4 w-4 text-brand-gold" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-brand-gold text-brand-blue font-bold hover:bg-brand-gold/90"
              >
                <Link href={`/${locale}/courses/udaan`}>
                  Apply for UDAAN
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-brand-blue"
              >
                <Link href={`/${locale}/contact`}>Know More</Link>
              </Button>
            </div>
          </motion.div>

          {/* ── Right — benefits card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <h3 className="mb-5 text-lg font-bold text-white">
                What You Get with UDAAN
              </h3>

              <ul className="mb-6 space-y-3.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Scholarship tiers */}
              <div className="space-y-2">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Scholarship Slabs
                </p>
                {[
                  { rank: "Rank 1–10", slab: "100% Fee Waiver", color: "text-brand-gold" },
                  { rank: "Rank 11–50", slab: "75% Fee Waiver", color: "text-sky-400" },
                  { rank: "Rank 51–200", slab: "50% Fee Waiver", color: "text-emerald-400" },
                  { rank: "Rank 201–500", slab: "25% Fee Waiver", color: "text-violet-400" },
                ].map(({ rank, slab, color }) => (
                  <div
                    key={rank}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5"
                  >
                    <span className="text-sm text-slate-300">{rank}</span>
                    <span className={`text-sm font-bold ${color}`}>{slab}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                * Next scholarship test: <span className="text-white font-medium">December 15, 2024</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

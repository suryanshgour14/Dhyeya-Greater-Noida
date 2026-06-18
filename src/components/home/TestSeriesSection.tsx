"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Edit3,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Trophy,
  BarChart3,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TEST_SERIES = [
  {
    id: "prelims",
    label: "Prelims",
    title: "All India Prelims Test Series 2025",
    desc: "50 full-length mock tests - GS Paper I + CSAT - with detailed solutions, rank analysis, and subject-wise performance reports.",
    icon: ClipboardList,
    color: "blue",
    features: ["50 Full Mocks", "All India Rank", "Detailed Solutions", "Previous Year Papers"],
    price: "₹3,999",
    badge: "Most Popular",
    href: "/test-series/prelims",
  },
  {
    id: "mains",
    label: "Mains",
    title: "GS Mains Answer Writing Programme",
    desc: "Structured answer writing practice for all 4 GS papers with expert evaluation, model answers, and personalised feedback.",
    icon: Edit3,
    color: "gold",
    features: ["360 Questions", "Expert Evaluation", "Model Answers", "1-on-1 Feedback"],
    price: "₹5,999",
    badge: "Highest Rated",
    href: "/test-series/mains",
  },
  {
    id: "integrated",
    label: "Integrated",
    title: "Integrated Prelims + Mains Series",
    desc: "Complete package covering Prelims GS + CSAT and all Mains GS papers - best value for serious aspirants.",
    icon: Target,
    color: "orange",
    features: ["50 Prelims Mocks", "360 Mains Questions", "Interview Guidance", "All India Rank"],
    price: "₹8,999",
    badge: "Best Value",
    href: "/test-series/integrated",
  },
];

const WHY_TEST = [
  { icon: BarChart3, title: "All India Ranking", desc: "Compare your performance with 10,000+ aspirants across India" },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Detailed subject-wise, topic-wise analysis to fix weak areas" },
  { icon: Users, title: "Expert Evaluation", desc: "Mains answers evaluated by IAS officers and subject experts" },
  { icon: Trophy, title: "Topper Benchmark", desc: "See how toppers answered the same questions to improve your approach" },
];

const COLOR_MAP = {
  blue: {
    accent: "bg-brand-blue",
    badge: "bg-brand-blue/10 text-brand-blue",
    icon: "bg-brand-blue/10 text-brand-blue",
    ring: "ring-brand-blue/30",
    cta: "bg-brand-blue hover:bg-brand-blue/90",
  },
  gold: {
    accent: "bg-brand-gold",
    badge: "bg-brand-gold/10 text-amber-700",
    icon: "bg-brand-gold/10 text-brand-gold",
    ring: "ring-brand-gold/30",
    cta: "bg-brand-gold text-brand-blue hover:bg-brand-gold/90",
  },
  orange: {
    accent: "bg-brand-orange",
    badge: "bg-brand-orange/10 text-brand-orange",
    icon: "bg-brand-orange/10 text-brand-orange",
    ring: "ring-brand-orange/30",
    cta: "bg-brand-orange hover:bg-brand-orange/90",
  },
} as const;

export default function TestSeriesSection() {
  const locale = useLocale();

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
            Practice & Perform
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            UPSC Test Series 2025
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Exam-like practice with All India ranking, expert evaluation, and deep performance analytics - everything you need to crack UPSC.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 grid gap-6 md:grid-cols-3"
        >
          {TEST_SERIES.map((series) => {
            const colors = COLOR_MAP[series.color as keyof typeof COLOR_MAP];
            const Icon = series.icon;

            return (
              <motion.div
                key={series.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                }}
                className={`group relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-transparent transition-all hover:shadow-lg hover:ring-2 ${colors.ring}`}
              >
                {/* Accent top bar */}
                <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${colors.accent}`} />

                {/* Badge */}
                <span className={`mb-4 self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold ${colors.badge}`}>
                  {series.badge}
                </span>

                {/* Icon + label */}
                <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${colors.icon}`}>
                  <Icon className="h-5 w-5" />
                </span>

                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {series.label}
                </p>
                <h3 className="mb-3 text-base font-bold text-foreground leading-snug">
                  {series.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {series.desc}
                </p>

                {/* Features */}
                <ul className="mb-5 flex-1 space-y-1.5">
                  {series.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="text-xl font-bold text-foreground">{series.price}</p>
                  </div>
                  <Button asChild size="sm" className={`text-white ${colors.cta}`}>
                    <Link href={`/${locale}${series.href}`}>
                      Enroll
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Why test series strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl bg-brand-blue p-8"
        >
          <h3 className="mb-6 text-center text-lg font-bold text-white">
            Why Test Series Makes All the Difference
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_TEST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </span>
                <p className="mb-1 text-sm font-semibold text-white">{title}</p>
                <p className="text-xs leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

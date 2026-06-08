"use client";

import { motion } from "framer-motion";
import { Users, Trophy, GraduationCap, Star } from "lucide-react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { STATS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ICON_MAP = {
  "Students Trained": Users,
  "UPSC Selections": Trophy,
  "Expert Faculty": GraduationCap,
  "Years of Excellence": Star,
} as const;

const COLOR_MAP = [
  { bg: "bg-sky-400/15", text: "text-sky-400" },
  { bg: "bg-brand-gold/15", text: "text-brand-gold" },
  { bg: "bg-emerald-400/15", text: "text-emerald-400" },
  { bg: "bg-violet-400/15", text: "text-violet-400" },
];

export default function StatsCounter() {
  return (
    <section className="bg-brand-blue py-14">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => {
            const Icon =
              ICON_MAP[stat.label as keyof typeof ICON_MAP] ?? Star;
            const { bg, text } = COLOR_MAP[i % COLOR_MAP.length];

            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <span
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
                >
                  <Icon className={`h-6 w-6 ${text}`} />
                </span>

                <span className="text-4xl font-bold text-white sm:text-5xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </span>

                <span className="mt-2 text-sm font-medium text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

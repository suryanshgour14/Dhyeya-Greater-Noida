"use client";

import { motion } from "framer-motion";
import { CheckCircle, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseRoadmapPhase } from "@/lib/constants";

interface CourseRoadmapProps {
  roadmap: CourseRoadmapPhase[];
  accentColor: "blue" | "gold" | "orange";
}

const themes = {
  blue: {
    heading:  "text-brand-blue",
    iconWrap: "bg-brand-blue/10 text-brand-blue",
    dot:      "bg-brand-blue border-4 border-white ring-2 ring-brand-blue/20",
    line:     "bg-gradient-to-b from-brand-blue/30 to-blue-100",
    period:   "text-brand-blue",
    card:     "bg-white border border-blue-100 shadow-sm hover:shadow-md",
    cardAcct: "border-l-4 border-brand-blue",
    title:    "text-slate-800",
    check:    "text-brand-blue/70",
    item:     "text-slate-500",
    stepNum:  "bg-brand-blue/10 text-brand-blue",
  },
  gold: {
    heading:  "text-amber-900",
    iconWrap: "bg-amber-100 text-amber-600",
    dot:      "bg-amber-500 border-4 border-white ring-2 ring-amber-200",
    line:     "bg-gradient-to-b from-amber-400/30 to-amber-100",
    period:   "text-amber-600",
    card:     "bg-white border border-amber-100 shadow-sm hover:shadow-md",
    cardAcct: "border-l-4 border-amber-400",
    title:    "text-slate-800",
    check:    "text-amber-500",
    item:     "text-slate-500",
    stepNum:  "bg-amber-50 text-amber-700",
  },
  orange: {
    heading:  "text-orange-900",
    iconWrap: "bg-orange-100 text-brand-orange",
    dot:      "bg-brand-orange border-4 border-white ring-2 ring-orange-200",
    line:     "bg-gradient-to-b from-orange-400/30 to-orange-100",
    period:   "text-brand-orange",
    card:     "bg-white border border-orange-100 shadow-sm hover:shadow-md",
    cardAcct: "border-l-4 border-brand-orange",
    title:    "text-slate-800",
    check:    "text-orange-400",
    item:     "text-slate-500",
    stepNum:  "bg-orange-50 text-orange-700",
  },
};

export default function CourseRoadmap({ roadmap, accentColor }: CourseRoadmapProps) {
  const t = themes[accentColor];

  return (
    <div id="roadmap" className="scroll-mt-24">
      <div className="mb-8 flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.iconWrap)}>
          <Route className="h-4 w-4" />
        </div>
        <h2 className={cn("text-2xl font-bold", t.heading)}>Learning Roadmap</h2>
      </div>

      <div className="relative pl-12 md:pl-14">
        {/* Vertical line */}
        <div className={cn("absolute left-4 top-2 bottom-2 w-0.5 md:left-5", t.line)} />

        <div className="space-y-5">
          {roadmap.map((phase, i) => (
            <motion.div
              key={phase.period}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-12 top-5 flex items-center justify-center md:-left-14">
                <div className={cn("h-4 w-4 rounded-full md:h-5 md:w-5", t.dot)} />
              </div>

              {/* Phase card */}
              <div className={cn("rounded-2xl transition-shadow duration-200", t.card, t.cardAcct)}>
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest", t.period)}>
                        {phase.period}
                      </span>
                      <h3 className={cn("mt-0.5 text-base font-semibold", t.title)}>{phase.title}</h3>
                    </div>
                    <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold", t.stepNum)}>
                      Phase {i + 1}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className={cn("mt-0.5 h-4 w-4 shrink-0", t.check)} />
                        <span className={cn("text-sm leading-relaxed", t.item)}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

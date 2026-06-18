"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseModule } from "@/lib/constants";

interface CourseModulesProps {
  modules: CourseModule[];
  accentColor: "blue" | "gold" | "orange";
}

const unified = {
  heading:     "text-slate-800",
  iconWrap:    "bg-blue-50 text-blue-600",
  activeCard:  "border-blue-200/50 bg-blue-50/30 shadow-sm",
  inactiveCard:"border-slate-200/80 bg-white hover:border-blue-200/50 hover:shadow-sm",
  chevron:     "text-blue-600",
  chevronOff:  "text-slate-400",
  countText:   "text-slate-400",
  bullet:      "bg-blue-500/40",
  topic:       "text-slate-600",
  sectionBg:   "bg-slate-50/60 border-t border-slate-200/40",
  numBadge:    "bg-slate-800 text-white",
};

const themes = {
  blue:   unified,
  gold:   unified,
  orange: unified,
};

export default function CourseModules({ modules, accentColor }: CourseModulesProps) {
  const [open, setOpen] = useState<number | null>(0);
  const t = themes[accentColor];

  return (
    <div id="modules" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.iconWrap)}>
          <BookOpen className="h-4.5 w-4.5 h-4 w-4" />
        </div>
        <h2 className={cn("text-2xl font-bold", t.heading)}>What You&apos;ll Cover</h2>
      </div>

      <div className="space-y-2.5">
        {modules.map((mod, i) => {
          const isOpen = open === i;
          return (
            <div
              key={mod.name}
              className={cn(
                "rounded-2xl border transition-all duration-200",
                isOpen ? t.activeCard : t.inactiveCard
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold", t.numBadge)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block font-semibold text-slate-800 leading-snug">{mod.name}</span>
                  <span className={cn("text-xs", t.countText)}>{mod.topics.length} topics</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isOpen ? t.chevron : t.chevronOff,
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={cn("mx-5 mb-4 rounded-xl p-4", t.sectionBg)}>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5">
                            <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", t.bullet)} />
                            <span className={cn("text-sm leading-relaxed", t.topic)}>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

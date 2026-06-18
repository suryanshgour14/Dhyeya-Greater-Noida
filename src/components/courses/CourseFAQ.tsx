"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  q: string;
  a: string;
}

interface CourseFAQProps {
  faqs: FAQ[];
  accentColor?: "blue" | "gold" | "orange";
}

const unified = {
  heading:     "text-slate-800",
  iconWrap:    "bg-blue-50 text-blue-600",
  activeCard:  "border-blue-200/40 bg-blue-50/20",
  inactiveCard:"border-slate-200/80 bg-white hover:border-blue-200/50",
  question:    "text-slate-800",
  answer:      "text-slate-500",
  chevron:     "text-blue-600",
  chevronOff:  "text-slate-400",
  divider:     "border-slate-200/60",
  num:         "text-slate-400/50",
};

const themes = {
  blue:   unified,
  gold:   unified,
  orange: unified,
};

export default function CourseFAQ({ faqs, accentColor = "blue" }: CourseFAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  const t = themes[accentColor];

  return (
    <div id="faq" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.iconWrap)}>
          <HelpCircle className="h-4 w-4" />
        </div>
        <h2 className={cn("text-2xl font-bold", t.heading)}>Frequently Asked Questions</h2>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border transition-all duration-200",
                isOpen ? t.activeCard : t.inactiveCard
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className={cn("shrink-0 text-sm font-bold tabular-nums", t.num)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("flex-1 text-sm font-semibold leading-snug", t.question)}>{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isOpen ? [t.chevron, "rotate-180"] : t.chevronOff
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={cn("mx-5 mb-4 border-t pt-3", t.divider)}>
                      <p className={cn("pl-9 text-sm leading-relaxed", t.answer)}>{faq.a}</p>
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

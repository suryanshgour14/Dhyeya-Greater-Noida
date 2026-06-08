"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhoForProps {
  items: string[];
  accentColor: "blue" | "gold" | "orange";
}

const themes = {
  blue: {
    heading:  "text-brand-blue",
    iconWrap: "bg-brand-blue/10 text-brand-blue",
    card:     "bg-blue-50/40 border border-blue-100 hover:border-blue-200 hover:bg-blue-50/70",
    check:    "text-brand-blue",
    text:     "text-slate-700",
  },
  gold: {
    heading:  "text-amber-900",
    iconWrap: "bg-amber-100 text-amber-600",
    card:     "bg-amber-50/50 border border-amber-100 hover:border-amber-200 hover:bg-amber-50",
    check:    "text-amber-500",
    text:     "text-amber-950/80",
  },
  orange: {
    heading:  "text-orange-900",
    iconWrap: "bg-orange-100 text-brand-orange",
    card:     "bg-orange-50/50 border border-orange-100 hover:border-orange-200 hover:bg-orange-50",
    check:    "text-brand-orange",
    text:     "text-orange-950/80",
  },
};

export default function WhoFor({ items, accentColor }: WhoForProps) {
  const t = themes[accentColor];

  return (
    <div id="who-for" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.iconWrap)}>
          <Users className="h-4 w-4" />
        </div>
        <h2 className={cn("text-2xl font-bold", t.heading)}>Who Is This For?</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className={cn("flex items-start gap-3 rounded-2xl p-4 transition-all duration-200", t.card)}
          >
            <CheckCircle className={cn("mt-0.5 h-5 w-5 shrink-0", t.check)} />
            <span className={cn("text-sm leading-relaxed font-medium", t.text)}>{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

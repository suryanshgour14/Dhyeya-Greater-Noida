"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

interface Props {
  items: string[];
}

export default function AnnouncementBar({ items }: Props) {
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  if (!items.length) return null;

  const repeated = [...items, ...items];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-50 overflow-hidden bg-brand-blue"
        >
          <div className="flex items-stretch">
            <span className="flex shrink-0 items-center bg-brand-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-blue">
              Latest
            </span>

            <div
              className="relative flex-1 overflow-hidden py-1.5"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div
                className="flex gap-12 whitespace-nowrap will-change-transform"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ animationPlayState: paused ? "paused" : "running" }}
              >
                {repeated.map((text, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs text-white/90"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 text-brand-gold" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>

            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss announcement"
              className="shrink-0 px-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

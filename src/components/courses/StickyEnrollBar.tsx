"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";

interface StickyEnrollBarProps {
  title: string;
  fee: number;
  accentColor: "blue" | "gold" | "orange";
}

const themes = {
  blue:   { btn: "bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md shadow-brand-blue/25" },
  gold:   { btn: "bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/25" },
  orange: { btn: "bg-brand-orange hover:bg-brand-orange/90 text-white shadow-md shadow-orange-600/25" },
};

export default function StickyEnrollBar({ title, fee, accentColor }: StickyEnrollBarProps) {
  const [visible, setVisible] = useState(false);
  const t = themes[accentColor];

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          id="enroll"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/60 bg-white/96 shadow-2xl backdrop-blur-sm"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
            <div className="hidden sm:block">
              <p className="text-xs text-slate-400 font-medium line-clamp-1">{title}</p>
              <p className="text-lg font-extrabold text-slate-800">
                ₹{fee.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex flex-1 justify-end gap-2">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <button
                onClick={() => {
                  document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold transition-all duration-200",
                  t.btn
                )}
              >
                Enroll Now <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

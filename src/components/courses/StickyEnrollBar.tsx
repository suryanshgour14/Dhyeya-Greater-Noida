"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import BuyButton from "@/components/payments/BuyButton";

interface StickyEnrollBarProps {
  title: string;
  fee: number;
  accentColor: "blue" | "gold" | "orange";
  productId?: string;
  isEnrolled?: boolean;
  courseSlug?: string;
}

export default function StickyEnrollBar({
  title, fee, productId, isEnrolled = false, courseSlug,
}: StickyEnrollBarProps) {
  const [visible, setVisible] = useState(false);

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
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/60 bg-white/96 shadow-2xl backdrop-blur-sm"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
            <div className="hidden sm:block">
              <p className="text-xs text-slate-400 font-medium line-clamp-1">{title}</p>
              <p className="text-lg font-extrabold text-slate-800">
                {productId ? `₹${fee.toLocaleString("en-IN")}` : "Enquire for fee"}
              </p>
            </div>

            <div className="flex flex-1 justify-end gap-2 flex-wrap">
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

              {productId ? (
                <BuyButton
                  productId={productId}
                  isEnrolled={isEnrolled}
                  redirectTo={`/courses/${courseSlug}`}
                  label="Enroll Now"
                  enrolledLabel="Go to Course"
                  size="md"
                  variant="gold"
                  productTitle={title}
                  priceLabel={`₹${fee.toLocaleString("en-IN")}`}
                />
              ) : (
                <button
                  onClick={() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-700 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800 transition-colors shadow-md shadow-blue-700/25"
                >
                  Enroll Now <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

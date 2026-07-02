"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/lib/constants";

interface SearchEntry {
  label: string;
  href: string;
  description?: string;
  group: string;
}

// Flatten NAV_ITEMS (+ a couple of standalone pages) into a search index.
function buildIndex(): SearchEntry[] {
  const seen = new Set<string>();
  const out: SearchEntry[] = [];
  const push = (e: SearchEntry) => {
    if (!e.href || seen.has(e.href)) return;
    seen.add(e.href);
    out.push(e);
  };

  for (const item of NAV_ITEMS as NavItem[]) {
    push({ label: item.label, href: item.href, group: "Pages" });
    for (const child of item.children ?? []) {
      if (child.isHeader || !child.href) continue;
      push({ label: child.label, href: child.href, description: child.description, group: item.label });
      for (const sub of child.subLinks ?? []) {
        push({ label: `${child.label} — ${sub.label}`, href: sub.href, group: item.label });
      }
    }
  }

  // Standalone destinations not always present in the nav
  push({ label: "Home", href: "/", group: "Pages" });
  push({ label: "Contact Us", href: "/contact", group: "Pages" });
  push({ label: "Results & Selections", href: "/results", group: "Pages" });

  return out;
}

export default function SearchDialog({
  open, onClose, locale,
}: { open: boolean; onClose: () => void; locale: string }) {
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return index
      .filter(
        (e) =>
          e.label.toLowerCase().includes(query) ||
          e.description?.toLowerCase().includes(query) ||
          e.group.toLowerCase().includes(query),
      )
      .slice(0, 12);
  }, [q, index]);

  // Popular quick-links shown before the user types
  const popular = useMemo(
    () =>
      index.filter((e) =>
        ["/courses", "/test-series", "/tests", "/results", "/contact"].includes(e.href),
      ),
    [index],
  );

  // Reset + focus each time it opens; Escape to close; lock body scroll
  useEffect(() => {
    if (!open) return;
    setQ("");
    const id = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const list = q.trim() ? results : popular;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses, test series, pages…"
                className="w-full bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={onClose}
                className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2" data-lenis-prevent>
              {!q.trim() && (
                <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Popular
                </p>
              )}

              {q.trim() && results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-slate-400">
                  No results for “{q.trim()}”. Try “courses”, “prelims”, or “results”.
                </p>
              ) : (
                list.map((e) => (
                  <Link
                    key={e.href}
                    href={`/${locale}${e.href}`}
                    onClick={onClose}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-blue/5"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-800">{e.label}</span>
                      {e.description && (
                        <span className="block truncate text-xs text-slate-400">{e.description}</span>
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-blue" />
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

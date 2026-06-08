"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ClipboardList, FileText, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { NOTIFICATIONS_DATA } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TABS = [
  { key: "tests" as const, label: "Test Schedule", icon: ClipboardList },
  { key: "exams" as const, label: "Exam Alerts", icon: FileText },
  { key: "whatsNew" as const, label: "What's New", icon: Sparkles },
];

export default function Notifications() {
  const locale = useLocale();
  const [active, setActive] = useState<"tests" | "exams" | "whatsNew">("tests");
  const items = NOTIFICATIONS_DATA[active];

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* ── Left — notification board ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-8"
            >
              <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
                <Bell className="h-3.5 w-3.5" />
                Notice Board
              </span>
              <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
                Latest Notifications
              </h2>
              <p className="mt-2 text-muted-foreground">
                Stay updated with test schedules, exam alerts, and institute news.
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-xl border bg-white p-1 shadow-sm">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active === key
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === key && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-brand-blue"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10 hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Items */}
            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="group flex items-start gap-4 rounded-xl border border-transparent bg-white p-4 shadow-sm transition-all hover:border-brand-blue/20 hover:shadow-md"
                  >
                    {/* Date badge */}
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-blue/5 text-center">
                      <span className="text-[11px] font-bold leading-none text-brand-blue">
                        {item.date.split(" ")[0]}
                      </span>
                      <span className="mt-0.5 text-[10px] text-muted-foreground">
                        {item.date.split(" ")[1] ?? ""}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <p className="flex-1 text-sm font-semibold text-foreground leading-snug">
                          {item.title}
                        </p>
                        {item.isNew && (
                          <span className="shrink-0 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                    </div>

                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-blue" />
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className="mt-6">
              <Link
                href={`/${locale}/student-zone/notifications`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
              >
                View All Notifications
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* ── Right — quick access cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-brand-blue">Quick Access</h3>

            {[
              {
                title: "Download Brochure",
                desc: "Course details, fee structure & batch schedule",
                href: "/student-zone/brochure",
                bg: "bg-brand-blue",
                emoji: "📄",
              },
              {
                title: "Admission Enquiry",
                desc: "Talk to our counsellors — free consultation",
                href: "/contact",
                bg: "bg-brand-orange",
                emoji: "📞",
              },
              {
                title: "Free Demo Class",
                desc: "Every Saturday at 10:00 AM — walk in welcome",
                href: "/demo",
                bg: "bg-emerald-600",
                emoji: "🎓",
              },
              {
                title: "Test Series Registration",
                desc: "Register for All India Prelims Mock Test #8",
                href: "/test-series",
                bg: "bg-violet-600",
                emoji: "✍️",
              },
            ].map(({ title, desc, href, bg, emoji }) => (
              <Link
                key={title}
                href={`/${locale}${href}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} text-xl`}>
                  {emoji}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-blue" />
              </Link>
            ))}

            {/* Admission open banner */}
            <div className="rounded-xl bg-brand-gold/10 border border-brand-gold/30 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Admissions Open
              </p>
              <p className="mt-1 text-lg font-bold text-brand-blue">2025 Batches</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Foundation · Prelims · Mains · Interview
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:underline"
              >
                Enroll Now <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

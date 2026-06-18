"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import { FACULTY_MEMBERS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CATEGORIES = [
  { key: "directors" as const, label: "Directors" },
  { key: "faculty" as const, label: "Core Faculty" },
  { key: "interview" as const, label: "Interview Panel" },
];

export default function TeamSection() {
  const locale = useLocale();
  const [active, setActive] = useState<"directors" | "faculty" | "interview">("directors");
  const members = FACULTY_MEMBERS.filter((m) => m.category === active);

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 text-center"
        >
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
            Our Team
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            Meet the Faculty
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Experienced IAS/IPS officers, subject experts, and interview specialists - all committed to your success.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-10 flex justify-center">
          <div className="flex gap-1 rounded-xl border bg-white p-1 shadow-sm">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
                  active === key ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === key && (
                  <motion.span
                    layoutId="team-tab"
                    className="absolute inset-0 rounded-lg bg-brand-blue"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: EASE }}
                className="group flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Avatar */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-2xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="mb-0.5 text-sm font-bold text-foreground">{member.name}</h3>
                <p className="text-xs font-medium text-brand-orange">{member.designation}</p>
                <p className="mt-1 text-xs text-muted-foreground">{member.subject}</p>
                <div className="mt-3 rounded-full bg-brand-blue/5 px-3 py-1">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-brand-blue">
                    <GraduationCap className="h-3 w-3" />
                    {member.experience}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/faculty`}
            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white"
          >
            Meet All Faculty Members
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

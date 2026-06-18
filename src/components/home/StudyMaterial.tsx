"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { STUDY_MATERIALS_DATA } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COLOR_MAP = {
  blue: {
    icon: "bg-brand-blue/10 text-brand-blue",
    tag: "bg-brand-blue/10 text-brand-blue",
    hover: "hover:border-brand-blue/30",
  },
  gold: {
    icon: "bg-brand-gold/10 text-amber-600",
    tag: "bg-brand-gold/10 text-amber-700",
    hover: "hover:border-brand-gold/30",
  },
  orange: {
    icon: "bg-brand-orange/10 text-brand-orange",
    tag: "bg-brand-orange/10 text-brand-orange",
    hover: "hover:border-brand-orange/30",
  },
} as const;

const TAG_COLOR: Record<string, string> = {
  Daily: "bg-emerald-50 text-emerald-700",
  Weekly: "bg-sky-50 text-sky-700",
  Monthly: "bg-violet-50 text-violet-700",
};

export default function StudyMaterial() {
  const locale = useLocale();

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
            Free Resources
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            Study Material & Resources
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Curated, regularly updated study material - from daily current affairs to monthly magazine gists - all free for students.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STUDY_MATERIALS_DATA.map((item) => {
            const colors = COLOR_MAP[item.color as keyof typeof COLOR_MAP];
            const Icon = item.Icon;
            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                }}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  className={`group flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${colors.hover}`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-foreground leading-snug truncate">
                        {item.title}
                      </p>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${TAG_COLOR[item.tag] ?? "bg-slate-100 text-slate-600"}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Free access · Updated regularly</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-blue" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all link */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/student-zone/resources`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
          >
            Browse All Study Material
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

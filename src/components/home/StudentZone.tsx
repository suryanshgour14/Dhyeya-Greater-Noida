"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { STUDENT_ZONE_ITEMS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COLOR_MAP = {
  blue: {
    icon: "bg-brand-blue/10 text-brand-blue",
    border: "hover:border-brand-blue/30 group-hover:text-brand-blue",
  },
  gold: {
    icon: "bg-brand-gold/10 text-amber-600",
    border: "hover:border-brand-gold/30 group-hover:text-amber-600",
  },
  orange: {
    icon: "bg-brand-orange/10 text-brand-orange",
    border: "hover:border-brand-orange/30 group-hover:text-brand-orange",
  },
} as const;

export default function StudentZone() {
  const locale = useLocale();

  return (
    <section className="bg-white py-20">
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
            Student Portal
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            Student Zone
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Everything a Dhyeya IAS student needs - resources, schedules, exam info, and more - all in one place.
          </p>
        </motion.div>

        {/* 8-card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="mx-auto grid max-w-5xl gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
        >
          {STUDENT_ZONE_ITEMS.map((item) => {
            const colors = COLOR_MAP[item.color as keyof typeof COLOR_MAP];
            const Icon = item.Icon;
            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 16 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                }}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  className={`group flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${colors.border.split(" ")[0]}`}
                >
                  <span className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.icon} transition-colors`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                  <ArrowRight className={`mt-2 h-4 w-4 text-muted-foreground/30 transition-all ${colors.border.split(" ")[1]}`} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Login prompt */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-10 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 p-6 text-center"
        >
          <p className="text-sm font-semibold text-brand-blue">
            Already enrolled?{" "}
            <Link
              href={`/${locale}/login`}
              className="underline underline-offset-2 hover:text-brand-blue/80"
            >
              Log in to your student portal
            </Link>{" "}
            to access all your materials, test results, and live sessions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

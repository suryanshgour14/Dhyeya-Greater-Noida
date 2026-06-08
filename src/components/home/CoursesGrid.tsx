"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HOME_COURSES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COLOR_MAP = {
  blue: {
    icon: "bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white",
    badge: "bg-brand-blue/10 text-brand-blue",
    cta: "text-brand-blue hover:text-brand-blue/80",
    border: "group-hover:border-brand-blue/40",
  },
  gold: {
    icon: "bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-white",
    badge: "bg-brand-gold/10 text-amber-700",
    cta: "text-brand-gold hover:text-brand-gold/80",
    border: "group-hover:border-brand-gold/40",
  },
  orange: {
    icon: "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white",
    badge: "bg-brand-orange/10 text-brand-orange",
    cta: "text-brand-orange hover:text-brand-orange/80",
    border: "group-hover:border-brand-orange/40",
  },
} as const;

export default function CoursesGrid() {
  const t = useTranslations("home");
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
            Our Programmes
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            {t("courses.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("courses.subtitle")}</p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {HOME_COURSES.map((course) => {
            const colors = COLOR_MAP[course.color as keyof typeof COLOR_MAP] ?? COLOR_MAP.blue;
            const Icon = course.Icon;

            return (
              <motion.div
                key={course.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                }}
                className={`group relative flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md ${colors.border}`}
              >
                {/* Badge */}
                {course.badge && (
                  <span className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${colors.badge}`}>
                    {course.badge}
                  </span>
                )}

                {/* Icon */}
                <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${colors.icon}`}>
                  <Icon className="h-6 w-6" />
                </span>

                {/* Content */}
                <h3 className="mb-2 text-base font-bold text-foreground">{course.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

                {/* Features */}
                <ul className="mb-5 flex-1 space-y-1.5">
                  {course.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/${locale}${course.href}`}
                  className={`mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-colors ${colors.cta}`}
                >
                  Know More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
            <Link href={`/${locale}/courses`}>
              {t("courses.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

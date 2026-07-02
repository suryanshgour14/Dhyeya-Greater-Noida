"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const QUICK_STATS = [
  { value: "12+", labelKey: "welcome.yearsLabel" },
  { value: "500+", labelKey: "welcome.selectionsLabel" },
  { value: "25+", labelKey: "welcome.facultyLabel" },
  { value: "4.3★", labelKey: "welcome.ratingLabel" },
] as const;

export default function WelcomeSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  const features = [
    t("welcome.feature1"),
    t("welcome.feature2"),
    t("welcome.feature3"),
    t("welcome.feature4"),
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left - text ── */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeUp}
              className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange"
            >
              {t("welcome.label")}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mb-5 text-3xl font-bold leading-tight text-brand-blue sm:text-4xl"
            >
              {t("welcome.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mb-7 text-base leading-relaxed text-muted-foreground"
            >
              {t("welcome.description")}
            </motion.p>

            <motion.ul variants={staggerChildren} className="mb-8 space-y-3">
              {features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <Button
                asChild
                className="bg-brand-blue text-white hover:bg-brand-blue/90"
              >
                <Link href={`/${locale}/about`}>
                  {t("welcome.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right - visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative overflow-hidden rounded-2xl bg-brand-blue p-8 text-white shadow-2xl">
              {/* Pattern */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-blue font-bold text-sm">
                    D
                  </div>
                  <div>
                    <p className="text-sm font-bold">Dhyeya IAS</p>
                    <p className="text-xs text-slate-400">Greater Noida</p>
                  </div>
                </div>

                {/* Quick stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {QUICK_STATS.map(({ value, labelKey }) => (
                    <div
                      key={labelKey}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-brand-gold">{value}</p>
                      <p className="mt-0.5 text-xs text-slate-300">{t(labelKey)}</p>
                    </div>
                  ))}
                </div>

                {/* Rating row */}
                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-400">Student Satisfaction</p>
                    <p className="text-sm font-bold text-white">Rated #1 in Greater Noida</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Phone,
  Star,
  CheckCircle2,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE },
});

const HERO_FEATURES = [
  "Classroom & Online Batches",
  "Hindi & English Medium",
  "IAS Officer Faculty",
];

const CAROUSEL_SLIDES = [
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776709339/ae1e7289-c7f5-42a9-baca-b3b9407652c7.png", alt: "UPSC Toppers — Dhyeya IAS Greater Noida" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776709075/637846ab-4412-400b-a2aa-d1179bcffff9.png", alt: "All Toppers — Dhyeya IAS" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776709087/adbdba8a-207b-4a8d-8f8c-9e1e26953f1b.png", alt: "Topper Batch — Dhyeya IAS Greater Noida" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776769812/ChatGPT_Image_Apr_21_2026_04_37_12_PM_wxbzuz.png", alt: "Digital Library — Dhyeya IAS" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776769804/PhotoshopExtension_Image_4_tnss7q.png", alt: "UDAAN Scholarship Programme" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776769795/ChatGPT_Image_Apr_21_2026_03_38_45_AM_cp0psc.png", alt: "Current Affairs Session — Dhyeya IAS" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776769779/ChatGPT_Image_Apr_21_2026_04_30_24_PM_mep9pe.png", alt: "DLP Study Notes — Dhyeya IAS" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776769787/ChatGPT_Image_Apr_21_2026_04_10_20_PM_s85d2y.png", alt: "UDAAN Office — Dhyeya IAS" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776707894/WhatsApp_Image_2026-04-19_at_20.44.18_zx8x6d.jpg", alt: "Faculty — Dhyeya IAS Greater Noida" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776707889/WhatsApp_Image_2026-04-19_at_20.44.17_ip6wdx.jpg", alt: "Admissions Open — Dhyeya IAS 2025" },
  { src: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776713290/WhatsApp_Image_2026-04-19_at_20.47.35_gjkqgd.jpg", alt: "Dhyeya IAS Greater Noida Building" },
];

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = CAROUSEL_SLIDES.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Infinite auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-brand-blue">
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1d4ed820_0%,_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,_#0f2d5e40_0%,_transparent_70%)]"
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative mx-auto grid min-h-[92vh] items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16">
        {/* ── Left column ── */}
        <div className="flex flex-col items-start">
          <motion.div {...fadeUp(0)}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mb-5 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="mb-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Feature pills */}
          <motion.div {...fadeUp(0.22)} className="mb-8 flex flex-wrap gap-2">
            {HERO_FEATURES.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold" />
                {f}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.28)}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="h-12 bg-brand-gold px-6 text-brand-blue font-semibold hover:bg-brand-gold/90"
            >
              <Link href={`/${locale}/courses`}>
                {t("hero.cta")}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/30 px-6 text-white hover:bg-white hover:text-brand-blue"
            >
              <Link href={`/${locale}/contact`}>
                <Phone className="mr-2 h-4 w-4" />
                {t("hero.secondaryCta")}
              </Link>
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.p
            {...fadeUp(0.35)}
            className="mt-7 text-xs text-slate-400"
          >
            {t("hero.trustLine")}
          </motion.p>
        </div>

        {/* ── Right column — image carousel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-lg lg:mx-0"
        >
          {/* Carousel — full-bleed images, arrow buttons */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0a1628]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={CAROUSEL_SLIDES[current].src}
                  alt={CAROUSEL_SLIDES[current].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 512px"
                  priority={current < 3}
                  quality={90}
                />
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          aria-hidden
        >
          <path
            d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

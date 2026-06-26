'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-20 text-white">
      {/* Decorative accents */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold sm:text-4xl"
        >
          {t('cta.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-9 max-w-xl text-white/75"
        >
          {t('cta.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={`/${locale}/courses`}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange/90 hover:shadow-xl sm:w-auto"
          >
            {t('cta.primary')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-blue sm:w-auto"
          >
            {t('cta.secondary')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

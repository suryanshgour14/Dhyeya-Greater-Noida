'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="bg-primary py-20 text-white">
      <div className="container mx-auto px-4 text-center">
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
          className="mb-8 text-white/80"
        >
          {t('cta.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90" asChild>
            <Link href={`/${locale}/courses`}>{t('cta.primary')}</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
            <Link href={`/${locale}/contact`}>{t('cta.secondary')}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

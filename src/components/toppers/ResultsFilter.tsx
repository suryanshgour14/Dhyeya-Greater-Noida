'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const exams = ['all', 'upsc', 'uppcs', 'other'] as const;

export default function ResultsFilter() {
  const t = useTranslations('results');
  const [active, setActive] = useState('all');

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {exams.map((exam) => (
        <button
          key={exam}
          onClick={() => setActive(exam)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            active === exam
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-primary/10 hover:text-primary'
          )}
        >
          {t(`filter.${exam}` as Parameters<typeof t>[0])}
        </button>
      ))}
    </div>
  );
}

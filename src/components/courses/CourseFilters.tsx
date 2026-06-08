'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const filters = [
  'all',
  'foundation',
  'prelims',
  'mains',
  'interview',
  'optional',
] as const;

export default function CourseFilters() {
  const t = useTranslations('courses');
  const [active, setActive] = useState<string>('all');

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            active === f
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-primary/10 hover:text-primary'
          )}
        >
          {t(`filters.${f}` as Parameters<typeof t>[0])}
        </button>
      ))}
    </div>
  );
}

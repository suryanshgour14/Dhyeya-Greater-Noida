'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Economy', 'Polity', 'Science', 'Environment', 'International'];

export default function CategoryFilter() {
  const [active, setActive] = useState('All');

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            active === cat
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-primary/10 hover:text-primary'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

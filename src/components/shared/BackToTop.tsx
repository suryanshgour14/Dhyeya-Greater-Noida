'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/30 ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-brand-blue/90"
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}

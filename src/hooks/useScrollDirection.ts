'use client';

import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [prevY, setPrevY] = useState(0);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      setDirection(currentY > prevY ? 'down' : 'up');
      setPrevY(currentY);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [prevY]);

  return direction;
}

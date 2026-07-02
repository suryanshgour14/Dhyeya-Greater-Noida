'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let rafId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any;

    async function init() {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({ lerp: 0.15, duration: 1.2, smoothWheel: true });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    // Defer until browser is idle so Lenis never blocks first paint
    const id =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? requestIdleCallback(init)
        : setTimeout(init, 200);

    return () => {
      if ('cancelIdleCallback' in window) cancelIdleCallback(id as number);
      else clearTimeout(id as number);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

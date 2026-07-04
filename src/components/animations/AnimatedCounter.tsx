'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  // `null` until the count-up animation runs. Rendering `target` by default
  // means the server-side HTML (and no-JS / crawler view) always shows the real
  // number, and it can never get stuck on 0 if the in-view trigger misfires.
  const [value, setValue] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  // Trigger slightly before the element is visible so the count-up starts
  // off-screen (avoids a flash from the real number down to 0).
  const isInView = useInView(ref, { once: true, margin: '200px' });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      if (p < 1) {
        setValue(Math.round(target * eased));
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  const display = value === null ? target : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

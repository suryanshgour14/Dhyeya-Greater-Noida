'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    {/* lerp controls scroll smoothing — higher = snappier/less lag, lower = floatier.
        0.1 felt laggy; 0.15 keeps it smooth but more responsive. (0.2 = snappier, 1 = native.)
        This only changes scroll FEEL, not any layout/visuals. */}
    <ReactLenis root options={{ lerp: 0.15, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

// New brand lockups (crest + "DHYEYA SANSATHANAM · GREATER NOIDA").
// Files live in /public/images/ — save the provided artwork with these names.
//   light = dark navy text  → use on light / white backgrounds (navbar)
//   dark  = white text      → use on dark navy backgrounds (footer)
const LOGOS = {
  light: "/images/logo-horizontal-light.png",
  dark:  "/images/logo-horizontal-dark.png",
} as const;

interface DhyeyaLogoProps {
  background?: "light" | "dark";
  /** CSS height class e.g. "h-9", "h-10", "h-12" - width scales automatically */
  heightClass?: string;
  className?: string;
  /** Preload + eager-load. Use only for the above-the-fold (LCP) logo. */
  priority?: boolean;
}

export default function DhyeyaLogo({
  background = "light",
  heightClass = "h-10",
  className = "",
  priority = false,
}: DhyeyaLogoProps) {
  const locale = useLocale();
  const src = LOGOS[background];
  const alt =
    locale === "hi"
      ? "ध्येय संस्थानम् ग्रेटर नोएडा - सर्वश्रेष्ठ UPSC कोचिंग"
      : "Dhyeya Sansathanam Greater Noida - Best UPSC Coaching";

  return (
    <Image
      src={src}
      alt={alt}
      width={320}
      height={80}
      priority={priority}
      className={`w-auto object-contain ${heightClass} ${className}`}
    />
  );
}

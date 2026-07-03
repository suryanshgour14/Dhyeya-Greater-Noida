"use client";

import Image from "next/image";

// Original Dhyeya IAS (parent) logo lockup — hosted on Cloudinary (verified working).
//   light = navy logo  → use on light / white backgrounds (navbar)
//   dark  = white logo → use on dark navy backgrounds
const LOGOS = {
  light: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708127/DHYEYA_LOGO_ENGLISH_BLUE.jpg_pa8b8v.jpg",
  dark:  "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708202/DHYEYA_LOGO_ENGLISHWHITE.jpg_gs7mee.jpg",
} as const;

interface DhyeyaIasLogoProps {
  background?: "light" | "dark";
  /** CSS height class e.g. "h-9", "h-10", "h-12" - width scales automatically */
  heightClass?: string;
  className?: string;
  priority?: boolean;
}

export default function DhyeyaIasLogo({
  background = "light",
  heightClass = "h-10",
  className = "",
  priority = false,
}: DhyeyaIasLogoProps) {
  return (
    <Image
      src={LOGOS[background]}
      alt="Dhyeya IAS Greater Noida"
      width={240}
      height={70}
      priority={priority}
      className={`w-auto object-contain ${heightClass} ${className}`}
    />
  );
}

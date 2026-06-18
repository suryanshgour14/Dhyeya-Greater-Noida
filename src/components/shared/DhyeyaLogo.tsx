"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const LOGOS = {
  en: {
    light: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708127/DHYEYA_LOGO_ENGLISH_BLUE.jpg_pa8b8v.jpg",
    dark:  "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708202/DHYEYA_LOGO_ENGLISHWHITE.jpg_gs7mee.jpg",
  },
  hi: {
    light: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708273/DHYEYA_LOGO_HINDI_BLUE.jpg_owqcgf.jpg",
    dark:  "https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708324/DHYEYA_LOGO_HINDI_WHITE.jpg_huiqjf.jpg",
  },
} as const;

interface DhyeyaLogoProps {
  background?: "light" | "dark";
  /** CSS height class e.g. "h-9", "h-10", "h-12" - width scales automatically */
  heightClass?: string;
  className?: string;
}

export default function DhyeyaLogo({
  background = "light",
  heightClass = "h-10",
  className = "",
}: DhyeyaLogoProps) {
  const locale = useLocale();
  const lang = locale === "hi" ? "hi" : "en";
  const src = LOGOS[lang][background];
  const alt =
    locale === "hi"
      ? "ध्येय IAS ग्रेटर नोएडा - सर्वश्रेष्ठ UPSC कोचिंग"
      : "Dhyeya IAS Greater Noida - Best UPSC Coaching";

  return (
    <Image
      src={src}
      alt={alt}
      width={240}
      height={70}
      priority
      className={`w-auto object-contain ${heightClass} ${className}`}
    />
  );
}

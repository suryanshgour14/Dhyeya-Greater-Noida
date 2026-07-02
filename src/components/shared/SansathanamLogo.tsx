import Image from "next/image";
import { cn } from "@/lib/utils";

interface SansathanamLogoProps {
  /** "light" = navy text (for light backgrounds), "dark" = white text (for dark backgrounds) */
  variant?: "light" | "dark";
  /** Overall scale */
  size?: "md" | "lg";
  className?: string;
  priority?: boolean;
}

const SIZES = {
  md: {
    emblem: "h-9 w-9 sm:h-10 sm:w-10",
    name: "text-[13px] sm:text-[17px]",
    city: "text-[7.5px] sm:text-[9.5px]",
  },
  lg: {
    emblem: "h-10 w-10 sm:h-12 sm:w-12",
    name: "text-[15px] sm:text-[20px]",
    city: "text-[8px] sm:text-[10.5px]",
  },
} as const;

// Greater Noida branch logo (Dhyeya Sansathanam): circular emblem + wordmark.
// Built from the emblem PNG + live text so it stays crisp and theme-aware.
export default function SansathanamLogo({
  variant = "light",
  size = "md",
  className = "",
  priority = false,
}: SansathanamLogoProps) {
  const nameColor = variant === "dark" ? "text-white" : "text-brand-blue";
  const s = SIZES[size];

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo/sansathanam-emblem.png"
        alt="Dhyeya Sansathanam Greater Noida"
        width={96}
        height={96}
        priority={priority}
        className={cn("w-auto shrink-0 object-contain", s.emblem)}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn("font-bold leading-tight", s.name, nameColor)}
          style={{ fontFamily: 'var(--font-newsreader, Georgia, serif)', letterSpacing: "0.005em" }}
        >
          Dhyeya Sansathanam
        </span>
        <span
          className={cn("mt-1 font-semibold uppercase leading-none", s.city)}
          style={{ color: "#C9A13B", letterSpacing: "0.24em" }}
        >
          Greater Noida
        </span>
      </span>
    </span>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CourseCategory, CoursePhase } from "@/lib/constants";

export type FilterCategory = CourseCategory | "All";
export type FilterPhase = CoursePhase | "All";

const CATEGORIES: FilterCategory[] = ["All", "IAS", "PCS", "IAS+PCS"];
const PHASES: FilterPhase[] = ["All", "Foundation", "Prelims", "Mains", "Interview", "All Phases"];

interface CourseFilterBarProps {
  activeCategory: FilterCategory;
  activePhase: FilterPhase;
  onCategoryChange: (c: FilterCategory) => void;
  onPhaseChange: (p: FilterPhase) => void;
  counts: { category: Record<string, number>; phase: Record<string, number> };
}

function FilterPill({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "text-white"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {active && (
        <motion.span
          layoutId="filter-active"
          className="absolute inset-0 rounded-full bg-brand-blue"
          transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
        />
      )}
      <span className="relative">
        {label}
        {count !== undefined && (
          <span className={cn("ml-1.5 text-xs", active ? "opacity-70" : "opacity-50")}>
            {count}
          </span>
        )}
      </span>
    </button>
  );
}

export default function CourseFilterBar({
  activeCategory,
  activePhase,
  onCategoryChange,
  onPhaseChange,
  counts,
}: CourseFilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Category row */}
      <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-muted/40 p-1.5">
        <span className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Exam
        </span>
        {CATEGORIES.map((cat) => (
          <FilterPill
            key={cat}
            label={cat}
            active={activeCategory === cat}
            count={counts.category[cat]}
            onClick={() => onCategoryChange(cat)}
          />
        ))}
      </div>

      {/* Phase row */}
      <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-muted/40 p-1.5">
        <span className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Phase
        </span>
        {PHASES.map((phase) => (
          <FilterPill
            key={phase}
            label={phase}
            active={activePhase === phase}
            count={counts.phase[phase]}
            onClick={() => onPhaseChange(phase)}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CourseFeature } from "@/lib/constants";
import {
  GraduationCap, BookOpen, ClipboardList, Edit, Users, Video,
  Target, Book, TrendingUp, Mic, Brain, FileCheck, Zap,
  MessageSquare, ListChecks, Globe, Clock, PenLine, Shield,
  Star, Trophy, Layers, Award, Newspaper, Sparkles, type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, ClipboardList, Edit, Users, Video,
  Target, Book, TrendingUp, Mic, Brain, FileCheck, Zap,
  MessageSquare, ListChecks, Globe, Clock, PenLine, Shield,
  Star, Trophy, Layers, Award, Newspaper,
};

interface CourseFeatureBentoProps {
  features: CourseFeature[];
  accentColor: "blue" | "gold" | "orange";
}

const themes = {
  blue: {
    heading:  "text-brand-blue",
    iconWrap: "bg-brand-blue/10 text-brand-blue",
    iconBg:   "bg-blue-50/60 text-brand-blue",
    card:     "bg-white border border-blue-100/80 hover:border-blue-200 hover:shadow-md",
    title:    "text-slate-800",
    desc:     "text-slate-500",
    headerIcon: "bg-brand-blue/10 text-brand-blue",
  },
  gold: {
    heading:  "text-amber-900",
    iconWrap: "bg-amber-100 text-amber-600",
    iconBg:   "bg-amber-50 text-amber-600",
    card:     "bg-white border border-amber-100/80 hover:border-amber-200 hover:shadow-md",
    title:    "text-slate-800",
    desc:     "text-slate-500",
    headerIcon: "bg-amber-100 text-amber-600",
  },
  orange: {
    heading:  "text-orange-900",
    iconWrap: "bg-orange-100 text-brand-orange",
    iconBg:   "bg-orange-50 text-brand-orange",
    card:     "bg-white border border-orange-100/80 hover:border-orange-200 hover:shadow-md",
    title:    "text-slate-800",
    desc:     "text-slate-500",
    headerIcon: "bg-orange-100 text-brand-orange",
  },
};

export default function CourseFeatureBento({ features, accentColor }: CourseFeatureBentoProps) {
  const t = themes[accentColor];

  return (
    <div id="features" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.headerIcon)}>
          <Sparkles className="h-4 w-4" />
        </div>
        <h2 className={cn("text-2xl font-bold", t.heading)}>What&apos;s Included</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feat, i) => {
          const Icon = ICON_MAP[feat.iconName] ?? Star;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn("group rounded-2xl border p-5 transition-all duration-200 shadow-sm", t.card)}
            >
              <div className={cn("mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl transition-colors", t.iconBg)}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className={cn("font-semibold", t.title)}>{feat.title}</h3>
              <p className={cn("mt-1.5 text-sm leading-relaxed", t.desc)}>{feat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

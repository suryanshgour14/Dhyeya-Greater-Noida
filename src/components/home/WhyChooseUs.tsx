"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  GraduationCap, Trophy, BookOpen,
  Users, Building2, IndianRupee,
} from "lucide-react";

const T = {
  paper2:   "#ffffff",
  paper:    "#fafaf8",
  paperHov: "#ffffff",
  ink:      "#0B1C3D",
  inkSoft:  "#41506b",
  gold:     "#B6862C",
  saffron:  "#E0651A",
  line:     "#e8eef7",
  serif:    `var(--font-newsreader, "Newsreader"), Georgia, "Times New Roman", serif`,
  sans:     `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`,
} as const;

interface WhyItem { title: string; desc: string; Icon: LucideIcon; }

const WHY_ITEMS: WhyItem[] = [
  {
    title: "Expert Faculty",
    desc:  "Learn directly from IAS / IPS officers and subject specialists with decades of examination and administrative experience.",
    Icon:  GraduationCap,
  },
  {
    title: "Proven Results",
    desc:  "5000+ selections in IAS/PCS across 20 years. Our results are public record — not a marketing claim.",
    Icon:  Trophy,
  },
  {
    title: "Comprehensive Material",
    desc:  "Regularly updated bilingual study notes and question banks covering every paper in the UPSC & State PCS syllabus.",
    Icon:  BookOpen,
  },
  {
    title: "Personal Mentorship",
    desc:  "One-on-one guidance built around your specific gaps — not a group lecture repeated for every student.",
    Icon:  Users,
  },
  {
    title: "Modern Infrastructure",
    desc:  "Smart classrooms, a digital library, and a focused residential-quality environment built for deep, distraction-free preparation.",
    Icon:  Building2,
  },
  {
    title: "Affordable Fees",
    desc:  "Transparent, all-inclusive pricing with EMI options and merit scholarships of up to ₹2 Lakh for deserving candidates.",
    Icon:  IndianRupee,
  },
];

const STATS = [
  { value: "5000+", label: "Selections in IAS / PCS" },
  { value: "20+",   label: "Years of Experience" },
  { value: "4.3 ★", label: "Google Rating" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const leftVariants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function WhyChooseUs() {
  return (
    <section style={{
      padding: "96px 0",
      background: T.paper2,
      borderTop: `1px solid ${T.line}`,
      fontFamily: T.sans,
      overflow: "hidden",
    }}>
      <div className="px-5 sm:px-10" style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">

          {/* ── Left sticky column ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={leftVariants}
            className="lg:sticky lg:top-[120px]"
          >
            {/* Number tag + rule */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <span style={{ fontFamily: T.serif, fontSize: 15, color: T.ink, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                04 —
              </span>
              <div style={{ flex: 1, height: 1, background: T.line }} />
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: T.serif, fontWeight: 400,
              fontSize: "clamp(28px, 3.4vw, 42px)",
              lineHeight: 1.06, letterSpacing: "-0.015em",
              color: T.ink, margin: "0 0 22px",
            }}>
              Why aspirants{" "}
              <em style={{ fontStyle: "italic", color: T.gold }}>choose us</em>
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.65, color: T.inkSoft, margin: "0 0 30px", maxWidth: "26em" }}>
              Experienced faculty, proven methods, and personal mentorship — the
              three things that turn preparation into selection.
            </p>

            <ArrowLink href="/contact">Talk to a counsellor</ArrowLink>

            {/* Stats */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${T.line}`, display: "flex", flexDirection: "column", gap: 20 }}>
              {STATS.map(({ value, label }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ display: "flex", alignItems: "baseline", gap: 12 }}
                >
                  <span style={{ fontFamily: T.serif, fontSize: 32, lineHeight: 1, color: T.ink, fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {value}
                  </span>
                  <span style={{ fontSize: 13, color: T.inkSoft }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right 2×3 grid ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={gridVariants}
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{
              gap: 1,
              background: T.line,
              border: `1px solid ${T.line}`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {WHY_ITEMS.map((item, i) => (
              <WhyCard key={item.title} item={item} index={i} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function WhyCard({ item, index }: { item: WhyItem; index: number }) {
  const [hov, setHov] = useState(false);
  const { Icon } = item;

  return (
    <motion.article
      variants={cardVariants}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.paperHov : T.paper,
        padding: "28px 26px",
        transition: "background .22s",
        cursor: "default",
      }}
    >
      <span style={{ fontFamily: T.serif, fontSize: 14, color: T.ink, display: "block", marginBottom: 14 }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div
        animate={hov ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14, color: T.ink }}
      >
        <Icon size={26} strokeWidth={1.4} />
      </motion.div>

      <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontSize: 20, lineHeight: 1.15, color: T.ink, margin: "0 0 9px" }}>
        {item.title}
      </h3>

      <p style={{ fontSize: 14, lineHeight: 1.6, color: T.inkSoft, margin: 0 }}>
        {item.desc}
      </p>
    </motion.article>
  );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        gap: hov ? 12 : 7,
        fontWeight: 600, fontSize: 14.5,
        color: hov ? T.saffron : T.ink,
        borderBottom: `1.5px solid ${T.gold}`,
        paddingBottom: 2, textDecoration: "none",
        transition: "gap .18s, color .18s",
        fontFamily: T.sans,
      }}
    >
      {children}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

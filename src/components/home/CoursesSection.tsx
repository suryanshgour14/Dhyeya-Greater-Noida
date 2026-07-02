"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import BuyButton from "@/components/payments/BuyButton";

// ── Design tokens ──────────────────────────────────────────────────────────────
const T = {
  section:  "#ffffff",          // white section bg
  card:     "#FDFAF5",          // very light cream card
  cardHov:  "#ffffff",          // white on hover
  ink:      "#0B1C3D",
  inkSoft:  "#41506b",
  inkFaint: "#596d85",
  gold:     "#B6862C",
  saffron:  "#E0651A",
  line:     "#e4d9c4",
  lineSoft: "#ede6d6",
  shadow:   "0 1px 0 #ddd0b8, 0 4px 8px -2px rgba(11,28,61,0.06), 0 12px 28px -6px rgba(11,28,61,0.09)",
  shadowHov:"0 2px 0 #c9b898, 0 8px 24px -4px rgba(11,28,61,0.14), 0 28px 48px -10px rgba(11,28,61,0.10)",
  serif:    `var(--font-newsreader, "Newsreader"), Georgia, "Times New Roman", serif`,
  sans:     `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`,
} as const;

// ── Types ─────────────────────────────────────────────────────────────────────
type CourseCat = "IAS" | "PCS" | "IAS+PCS";
type BadgeColor = "blue" | "gold" | "orange";

interface Course {
  title: string;
  sub: string;
  cat: CourseCat;
  dur: string;
  seats: number;
  fee: number;
  originalFee?: number;
  badge?: string;
  bc: BadgeColor;
  desc: string;
  href: string;
  productId: string;
}

// ── Course data ────────────────────────────────────────────────────────────────
const COURSES: Course[] = [
  {
    title: "15-Month GS Foundation",
    sub: "UPSC Civil Services",
    cat: "IAS",
    dur: "15 Months",
    seats: 60,
    fee: 110000,
    originalFee: 120000,
    badge: "Bestseller",
    bc: "blue",
    desc: "Concept to AIR — NCERT basics through evaluated Mains answer writing and interview readiness.",
    href: "/courses/upsc-ias-foundation",
    productId: "cc000001-0000-0000-0000-000000000001",
  },
  {
    title: "1-Year UPPSC PCS Comprehensive",
    sub: "UP Provincial Civil Services",
    cat: "PCS",
    dur: "12 Months",
    seats: 60,
    fee: 81000,
    originalFee: 90000,
    badge: "Popular",
    bc: "gold",
    desc: "Complete SA syllabus, UP Special Papers 5 & 6, General Hindi and answer writing — taught bilingually.",
    href: "/courses/uppsc-pcs-comprehensive",
    productId: "cc000001-0000-0000-0000-000000000002",
  },
  {
    title: "3-Year Integrated UDAAN",
    sub: "UPSC CSE + UPPSC PCS",
    cat: "IAS+PCS",
    dur: "36 Months",
    seats: 30,
    fee: 253700,
    originalFee: 299999,
    badge: "Flagship",
    bc: "orange",
    desc: "Flagship scholarship programme synchronised with your college year — multiple services, one track.",
    href: "/courses/udaan-3-year-integrated",
    productId: "cc000001-0000-0000-0000-000000000003",
  },
  {
    title: "6-Month UPSC CSE Mentorship",
    sub: "Personalised Guidance",
    cat: "IAS",
    dur: "6 Months",
    seats: 20,
    fee: 45000,
    originalFee: 51000,
    bc: "blue",
    desc: "One-on-one mentoring, micro-targeted schedules and granular answer evaluation built around your gaps.",
    href: "/courses/upsc-ias-mentorship",
    productId: "cc000001-0000-0000-0000-000000000004",
  },
  {
    title: "4-Month CSAT Mastery",
    sub: "UPSC & UPPSC Paper II",
    cat: "IAS+PCS",
    dur: "4 Months",
    seats: 80,
    fee: 22000,
    originalFee: 25000,
    badge: "New",
    bc: "orange",
    desc: "Turn CSAT from a qualifying barrier into a scoring advantage — non-math-background friendly.",
    href: "/courses/csat-mastery",
    productId: "cc000001-0000-0000-0000-000000000005",
  },
  {
    title: "4-Month UPPCS Prelims Crash",
    sub: "UPPSC Preliminary",
    cat: "PCS",
    dur: "4 Months",
    seats: 80,
    fee: 25000,
    originalFee: 30000,
    badge: "Exam-Ready",
    bc: "gold",
    desc: "Last-mile prelims preparation reverse-engineered from the UPPSC paper — 15 full-length simulators.",
    href: "/courses/uppsc-prelims-crash-course",
    productId: "cc000001-0000-0000-0000-000000000006",
  },
  {
    title: "UP Special Paper 5 & 6",
    sub: "UPPSC Mains Exclusive",
    cat: "PCS",
    dur: "4 Months",
    seats: 60,
    fee: 25000,
    originalFee: 30000,
    bc: "gold",
    desc: "Master the 400-mark UP-exclusive papers that define your UPPSC merit rank — data-rich answer drills.",
    href: "/courses/up-special-paper-5-6",
    productId: "cc000001-0000-0000-0000-000000000007",
  },
  {
    title: "BPSC CCE Complete Prep",
    sub: "Bihar PSC — CCE",
    cat: "PCS",
    dur: "12 Months",
    seats: 60,
    fee: 95000,
    badge: "New",
    bc: "orange",
    desc: "End-to-end Bihar PCS preparation — Prelims to Personality Test, with Bihar-specific content integration.",
    href: "/courses/bpsc-cce-prep",
    productId: "cc000001-0000-0000-0000-000000000008",
  },
  {
    title: "120-Day Mains Answer Writing",
    sub: "UPPSC Evaluated Writing",
    cat: "PCS",
    dur: "120 Days",
    seats: 60,
    fee: 15000,
    originalFee: 16000,
    bc: "gold",
    desc: "Write to the rank — five evaluated answers a day with overnight faculty feedback and model answers.",
    href: "/courses/uppsc-mains-answer-writing",
    productId: "cc000001-0000-0000-0000-000000000009",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const BADGE_STYLES: Record<BadgeColor, { bg: string; color: string }> = {
  blue:   { bg: "rgba(11,28,61,.09)",   color: "#0B1C3D" },
  gold:   { bg: "rgba(245,158,11,.16)", color: "#9a6a08" },
  orange: { bg: "rgba(224,101,26,.13)", color: "#E0651A" },
};

type Tab = "all" | CourseCat;

const TABS: { cat: Tab; label: string }[] = [
  { cat: "all",     label: "All Programmes" },
  { cat: "IAS",     label: "UPSC / IAS" },
  { cat: "PCS",     label: "State PCS" },
  { cat: "IAS+PCS", label: "Integrated" },
];

// ── Single course card ─────────────────────────────────────────────────────────
function CourseCard({ course, index, locale }: { course: Course; index: number; locale: string }) {
  const [hovered, setHovered] = useState(false);
  const [dHover, setDHover] = useState(false);
  const badge = course.badge ? BADGE_STYLES[course.bc] : null;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[85%] shrink-0 snap-center sm:w-auto sm:shrink"
      style={{
        background: hovered ? T.cardHov : T.card,
        padding: "30px 28px 26px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 16,
        border: `1px solid ${T.lineSoft}`,
        boxShadow: hovered ? T.shadowHov : T.shadow,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "background .22s, box-shadow .28s cubic-bezier(.22,1,.36,1), transform .28s cubic-bezier(.22,1,.36,1)",
        minHeight: 320,
        /* Gold top-edge accent */
        borderTop: `2.5px solid ${hovered ? T.gold : T.lineSoft}`,
      }}
    >
      {/* Subtle inner top glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: 16,
        background: "linear-gradient(160deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />
      {/* Badge */}
      {badge && course.badge && (
        <span
          style={{
            position: "absolute",
            top: 22,
            right: 24,
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 9px",
            borderRadius: 2,
            background: badge.bg,
            color: badge.color,
          }}
        >
          {course.badge}
        </span>
      )}

      {/* Index */}
      <span style={{ fontFamily: T.serif, fontSize: 14, color: T.gold }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: T.serif,
          fontWeight: 500,
          fontSize: 22,
          lineHeight: 1.13,
          marginTop: 12,
          marginBottom: 0,
          letterSpacing: "-0.01em",
          color: T.ink,
        }}
      >
        {course.title}
      </h3>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 11.5,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: T.inkFaint,
          marginTop: 6,
          fontFamily: T.sans,
        }}
      >
        {course.sub}
      </div>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 18,
          paddingTop: 18,
          borderTop: `1px solid ${T.lineSoft}`,
        }}
      >
        {[
          { big: course.dur.split(" ")[0], small: course.dur.split(" ").slice(1).join(" ") },
          { big: String(course.seats), small: "seats / batch" },
        ].map(({ big, small }) => (
          <div key={small} style={{ fontSize: 12.5, color: T.inkSoft, fontFamily: T.sans }}>
            <span
              style={{
                display: "block",
                fontFamily: T.serif,
                fontSize: 20,
                color: T.ink,
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {big}
            </span>
            {small}
          </div>
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          marginTop: 16,
          fontSize: 14,
          lineHeight: 1.65,
          color: T.inkSoft,
          flex: 1,
          fontFamily: T.sans,
        }}
      >
        {course.desc}
      </p>

      {/* Footer */}
      <div
        style={{
          marginTop: 22,
          paddingTop: 20,
          borderTop: `1px solid ${T.lineSoft}`,
        }}
      >
        {/* Price row */}
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.ink, lineHeight: 1, marginBottom: 16 }}>
          {course.originalFee && (
            <s
              style={{
                display: "block",
                fontFamily: T.sans,
                fontSize: 11.5,
                color: T.inkFaint,
                marginBottom: 3,
                textDecoration: "line-through",
              }}
            >
              {fmt(course.originalFee)}
            </s>
          )}
          {fmt(course.fee)}
        </div>

        {/* Action row */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <BuyButton
            productId={course.productId}
            redirectTo={course.href}
            label="Enroll Now"
            size="sm"
            variant="navy"
            className="flex-1 !rounded-lg"
            productTitle={course.title}
            priceLabel={fmt(course.fee)}
          />
          <Link
            href={`/${locale}${course.href}`}
            onMouseEnter={() => setDHover(true)}
            onMouseLeave={() => setDHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontWeight: 700,
              fontSize: 12,
              color: dHover ? "#ffffff" : T.ink,
              textDecoration: "none",
              fontFamily: T.sans,
              whiteSpace: "nowrap",
              padding: "8px 18px",
              borderRadius: 8,
              border: `1.5px solid ${dHover ? T.ink : "rgba(11,28,61,0.22)"}`,
              background: dHover ? T.ink : "transparent",
              transition: "background .18s, color .18s, border-color .18s",
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function CoursesSection() {
  const [active, setActive] = useState<Tab>("all");
  const locale = useLocale();

  const visible = active === "all" ? COURSES : COURSES.filter((c) => c.cat === active);
  const count = (cat: Tab) =>
    cat === "all" ? COURSES.length : COURSES.filter((c) => c.cat === cat).length;

  return (
    <section
      style={{
        padding: "96px 0",
        background: T.section,
        borderTop: `1px solid #f0ece4`,
        borderBottom: `1px solid #f0ece4`,
        fontFamily: T.sans,
      }}
    >
      <div className="px-5 sm:px-10" style={{ width: "100%", maxWidth: 1240, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            marginBottom: 36,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: T.serif,
              fontSize: 15,
              color: T.ink,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              paddingTop: 6,
            }}
          >
            02 —
          </span>
          <h2
            style={{
              fontFamily: T.serif,
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: T.ink,
              margin: 0,
              flex: 1,
              minWidth: 200,
            }}
          >
            Programmes &amp;{" "}
            <em style={{ fontStyle: "italic", color: T.gold }}>prospectus</em>
          </h2>
          <p
            style={{
              maxWidth: 300,
              fontSize: 15,
              color: T.inkSoft,
              lineHeight: 1.55,
              paddingTop: 4,
              margin: 0,
            }}
          >
            Structured batches for every exam and every stage — from a 3-year integrated
            track to focused crash courses.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            flexWrap: "wrap",
            marginBottom: 0,
            borderBottom: `1px solid ${T.line}`,
          }}
        >
          {TABS.map(({ cat, label }) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                border: 0,
                background: "transparent",
                position: "relative",
                fontFamily: T.sans,
                fontWeight: 600,
                fontSize: 14,
                color: active === cat ? T.ink : T.inkSoft,
                padding: "12px 20px",
                cursor: "pointer",
                transition: "color .18s",
              }}
            >
              {label}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 19,
                  height: 18,
                  padding: "0 5px",
                  marginLeft: 7,
                  fontSize: 11,
                  borderRadius: 9,
                  background: active === cat ? T.saffron : "#ede6d6",
                  color: active === cat ? "#fff" : T.inkFaint,
                  transition: "background .18s, color .18s",
                }}
              >
                {count(cat)}
              </span>
              {/* active underline */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -1,
                  height: 2,
                  background: T.saffron,
                  transform: active === cat ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform .22s cubic-bezier(.22,1,.36,1)",
                  transformOrigin: "left",
                }}
              />
            </button>
          ))}
        </div>

        {/* Grid — swipeable carousel on phones, grid on larger screens */}
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:gap-[22px] sm:overflow-visible sm:pb-0 lg:grid-cols-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ marginTop: 34 }}
        >
          {visible.map((course, i) => (
            <CourseCard key={course.href} course={course} index={i} locale={locale as string} />
          ))}
        </div>
        {/* Swipe hint (phones only) */}
        <p className="mt-3 text-center text-xs text-slate-600 sm:hidden">← swipe to see more →</p>

        {/* CTA */}
        <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
          <ViewAllButton locale={locale} />
        </div>
      </div>
    </section>
  );
}

// ── View all button ────────────────────────────────────────────────────────────
function ViewAllButton({ locale }: { locale: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/${locale}/courses`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`,
        fontWeight: 600,
        fontSize: 15,
        padding: "14px 28px",
        borderRadius: 2,
        border: `1.5px solid ${T.ink}`,
        color: hovered ? "#ffffff" : T.ink,
        textDecoration: "none",
        background: hovered ? T.ink : "transparent",
        transition: "background .2s, color .2s",
      }}
    >
      View the full prospectus
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={17} height={17}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

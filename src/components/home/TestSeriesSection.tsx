"use client";

import { motion } from "framer-motion";
import { ClipboardList, Edit3, Target } from "lucide-react";
import BuyButton from "@/components/payments/BuyButton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const serif = `var(--font-newsreader, "Newsreader"), Georgia, serif`;
const sans  = `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`;

const SERIES = [
  {
    id: "ias-prelims",
    category: "Prelims",
    exam: "IAS",
    title: "All India IAS Prelims Test Series 2026",
    short: "GS Paper I + CSAT mock tests",
    features: ["50 Full Mocks", "All India Rank"],
    price: "₹2,999",
    originalPrice: "₹4,999",
    icon: ClipboardList,
    accent: "#1e3a6e",
    pill: "#e8eef7",
    pillText: "#1e3a6e",
    productId: "dd000001-0000-0000-0000-000000000001",
  },
  {
    id: "ias-mains",
    category: "Mains",
    exam: "IAS",
    title: "GS Mains Answer Writing Programme 2026",
    short: "Answer writing mock tests",
    features: ["360 Questions", "Expert Evaluation"],
    price: "₹8,999",
    originalPrice: "₹15,999",
    icon: Edit3,
    accent: "#C9A13B",
    pill: "#fdf6e4",
    pillText: "#92710e",
    productId: "dd000001-0000-0000-0000-000000000002",
  },
  {
    id: "uppcs-prelims",
    category: "Prelims",
    exam: "UPPCS",
    title: "UPPCS Prelims Test Series 2026",
    short: "UP PCS prelims mock tests",
    features: ["30 Full Mocks", "UP Special Papers"],
    price: "₹1,499",
    originalPrice: "₹2,999",
    icon: ClipboardList,
    accent: "#ea580c",
    pill: "#fff3ed",
    pillText: "#c2410c",
    productId: "dd000001-0000-0000-0000-000000000003",
  },
  {
    id: "uppcs-mains",
    category: "Mains",
    exam: "UPPCS",
    title: "UPPCS Mains Test Series 2026",
    short: "UP PCS mains answer practice",
    features: ["18 Tests", "Papers 5 & 6 Included"],
    price: "₹6,999",
    originalPrice: "₹9,999",
    icon: Edit3,
    accent: "#7c3aed",
    pill: "#f5f0ff",
    pillText: "#6d28d9",
    productId: "dd000001-0000-0000-0000-000000000004",
  },
  {
    id: "ukpsc-prelims",
    category: "Prelims",
    exam: "UKPCS",
    title: "UKPCS Prelims Test Series 2026",
    short: "Uttarakhand prelims series",
    features: ["20 Full Mocks", "UK GK Coverage"],
    price: "₹1,499",
    originalPrice: "₹1,999",
    icon: ClipboardList,
    accent: "#0891b2",
    pill: "#e0f7fa",
    pillText: "#0e7490",
    productId: "dd000001-0000-0000-0000-000000000005",
  },
  {
    id: "ukpsc-mains",
    category: "Mains",
    exam: "UKPCS",
    title: "UKPCS Mains Test Series 2026",
    short: "Uttarakhand mains series",
    features: ["12 Tests", "UK Special Papers"],
    price: "₹4,999",
    originalPrice: "₹8,999",
    icon: Edit3,
    accent: "#059669",
    pill: "#ecfdf5",
    pillText: "#047857",
    productId: "dd000001-0000-0000-0000-000000000006",
  },
  {
    id: "integrated",
    category: "Integrated",
    exam: "UPSC",
    title: "Integrated Prelims + Mains Series 2026",
    short: "Complete package — best value",
    features: ["50 Prelims + 360 Mains", "Interview Guidance"],
    price: "₹8,999",
    originalPrice: "",
    icon: Target,
    accent: "#be123c",
    pill: "#fff1f3",
    pillText: "#9f1239",
    productId: "dd000001-0000-0000-0000-000000000007",
  },
];

// Triple for seamless loop
const TRACK = [...SERIES, ...SERIES, ...SERIES];

const marqueeKeyframes = `
@keyframes ts-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.3333%); }
}
`;

export default function TestSeriesSection() {

  return (
    <section style={{ background: "#fff", padding: "80px 0", fontFamily: sans, overflow: "hidden" }}>
      <style>{marqueeKeyframes}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}
      >
        <span style={{
          display: "inline-block", marginBottom: 10,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
          textTransform: "uppercase", color: "#ea580c",
        }}>
          Practice &amp; Perform
        </span>
        <h2 style={{
          fontFamily: serif,
          fontSize: "clamp(28px, 4vw, 46px)",
          fontWeight: 400, lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#0B1C3D", margin: "0 0 12px",
        }}>
          Upcoming{" "}
          <em style={{ fontStyle: "italic", color: "#C9A13B" }}>2026</em>{" "}
          Test Series
        </h2>
        <p style={{ fontSize: 15, color: "#64748b", margin: 0, maxWidth: 480, marginInline: "auto" }}>
          All India ranking · Expert evaluation · Deep performance analytics
        </p>
      </motion.div>

      {/* Scrolling track */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: 20,
            width: "max-content",
            animation: "ts-scroll 40s linear infinite",
            willChange: "transform",
          }}
        >
          {TRACK.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={`${s.id}-${idx}`}
                style={{
                  width: 270,
                  flexShrink: 0,
                  background: "#fff",
                  borderRadius: 16,
                  border: "1.5px solid #e8eef7",
                  padding: "22px 20px 18px",
                  boxShadow: "0 2px 12px rgba(30,58,110,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent top */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: 3, background: s.accent, borderRadius: "14px 14px 0 0",
                }} />

                {/* Category pill */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{
                    background: s.pill, color: s.pillText,
                    borderRadius: 999, fontSize: 10.5, fontWeight: 700,
                    padding: "3px 10px", letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}>
                    {s.exam}
                  </span>
                  <span style={{
                    background: "#f8fafc", color: "#64748b",
                    borderRadius: 999, fontSize: 10.5, fontWeight: 600,
                    padding: "3px 9px",
                  }}>
                    {s.category}
                  </span>
                </div>

                {/* Icon */}
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: s.pill,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12,
                }}>
                  <Icon size={18} color={s.accent} />
                </div>

                {/* Title */}
                <p style={{
                  fontSize: 13.5, fontWeight: 700, color: "#0f172a",
                  lineHeight: 1.4, margin: "0 0 4px",
                }}>
                  {s.title}
                </p>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 12px", lineHeight: 1.5 }}>
                  {s.short}
                </p>

                {/* Features */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                  {s.features.map((f) => (
                    <span key={f} style={{
                      fontSize: 10.5, fontWeight: 600,
                      color: "#475569",
                      background: "#f1f5f9",
                      borderRadius: 6, padding: "3px 8px",
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{
                  marginTop: "auto",
                  paddingTop: 14,
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>Starting from</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#0B1C3D", lineHeight: 1.2 }}>{s.price}</span>
                      {s.originalPrice && (
                        <span style={{ fontSize: 12, color: "#94a3b8", textDecoration: "line-through" }}>{s.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <BuyButton
                    productId={s.productId}
                    redirectTo="/student-zone"
                    label="Enroll Now"
                    size="sm"
                    variant="navy"
                    className="!rounded-lg !text-[11px]"
                    productTitle={s.title}
                    priceLabel={s.price}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

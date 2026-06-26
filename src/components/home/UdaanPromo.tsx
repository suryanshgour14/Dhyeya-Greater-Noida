"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const serif = `var(--font-newsreader, "Newsreader"), Georgia, "Times New Roman", serif`;
const sans  = `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`;

export default function UdaanPromo() {
  const locale = useLocale();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{
      background: "#0B1C3D",
      position: "relative",
      overflow: "hidden",
      padding: "88px 0",
      fontFamily: sans,
    }}>
      {/* Dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        pointerEvents: "none",
      }} />
      {/* Gold glow */}
      <div aria-hidden style={{
        position: "absolute", top: -140, right: -140,
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,161,59,0.11) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", position: "relative" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Overline */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <span style={{ fontFamily: serif, fontSize: 14, color: "#C9A13B", letterSpacing: "0.04em" }}>03 —</span>
            <span style={{
              fontFamily: sans, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(201,161,59,0.75)",
              borderLeft: "1px solid rgba(201,161,59,0.3)", paddingLeft: 14,
            }}>
              3-Year Integrated Batch · For Undergraduate Students
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            margin: "0 0 32px",
            fontFamily: serif,
            fontWeight: 400,
            fontSize: "clamp(44px, 6.5vw, 82px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "#fff",
          }}>
            Dhyeya IAS{" "}
            <em style={{ fontStyle: "italic", color: "#C9A13B" }}>UDAAN</em>
          </h2>

          {/* Two-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start" }}>

            {/* Left: description + chip + CTA */}
            <div>
              <p style={{
                fontSize: 16, lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 20px", maxWidth: 560,
              }}>
                A premium 3-year academic ecosystem for undergraduate students.
                Instead of juggling college exams and competitive coaching separately,
                UDAAN aligns with your graduation timeline — transforming you into a
                highly competitive candidate across{" "}
                <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                  UPSC IAS, UPPSC PCS, and 4 other premier examinations.
                </strong>
              </p>

              {/* Eligibility pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 999, marginBottom: 28,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}>
                <GraduationCap size={13} color="rgba(201,161,59,0.85)" />
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", fontFamily: sans }}>
                  Open to BA / BSc / BCom / BTech / LLB students in Year 1 or Year 2
                </span>
              </div>

              {/* CTA */}
              <div>
                <Link
                  href={`/${locale}/courses/udaan-3-year-integrated`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    padding: "13px 26px", borderRadius: 8,
                    background: "#C9A13B", color: "#0B1C3D",
                    fontFamily: sans, fontWeight: 700, fontSize: 14.5,
                    textDecoration: "none", letterSpacing: "0.01em",
                  }}
                >
                  Explore UDAAN
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right: stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: 1, background: "rgba(255,255,255,0.06)",
              borderRadius: 14, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              minWidth: 300,
            }}>
              {[
                { val: "36", unit: "Months", label: "Full programme" },
                { val: "6+", unit: "Exams", label: "In one track" },
                { val: "3",  unit: "Years",  label: "Progressive arc" },
              ].map(({ val, unit, label }, i) => (
                <div key={label} style={{
                  padding: "24px 16px", textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{ fontFamily: serif, fontSize: 36, color: "#C9A13B", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: "#fff", marginTop: 5, letterSpacing: "0.05em" }}>{unit}</div>
                  <div style={{ fontFamily: sans, fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

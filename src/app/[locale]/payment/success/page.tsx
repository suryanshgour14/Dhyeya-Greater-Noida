"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, ArrowRight, Download } from "lucide-react";
import { Suspense } from "react";

const serif = `var(--font-newsreader, "Newsreader"), Georgia, serif`;
const sans  = `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SuccessContent() {
  const params  = useSearchParams();
  const locale  = useLocale();
  const ref     = params.get("ref")     ?? "—";
  const product = params.get("product") ?? "your course";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #061530 0%, #0a1f45 50%, #0f2d6b 100%)",
      fontFamily: sans,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,161,59,0.12) 0%, transparent 70%)",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          position: "relative", zIndex: 1,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          backdropFilter: "blur(20px)",
          padding: "52px 48px",
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 32px 64px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,161,59,0.15)",
        }}
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(201,161,59,0.2), rgba(201,161,59,0.05))",
            border: "2px solid rgba(201,161,59,0.4)",
            marginBottom: 28,
          }}
        >
          <CheckCircle2 size={40} color="#C9A13B" strokeWidth={1.5} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          style={{
            fontFamily: serif, fontWeight: 400,
            fontSize: "clamp(26px, 4vw, 34px)",
            lineHeight: 1.1, color: "#ffffff",
            margin: "0 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          Enrollment{" "}
          <em style={{ color: "#C9A13B", fontStyle: "italic" }}>Confirmed!</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", lineHeight: 1.6 }}
        >
          You are now enrolled in{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>{decodeURIComponent(product)}</span>.
          Our team will contact you shortly with batch details.
        </motion.p>

        {/* Reference box */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            background: "rgba(201,161,59,0.08)",
            border: "1px solid rgba(201,161,59,0.25)",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 36,
          }}
        >
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Payment Reference
          </p>
          <p style={{ fontSize: 13, color: "#C9A13B", fontWeight: 700, letterSpacing: "0.04em", margin: 0, wordBreak: "break-all" }}>
            {ref}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Link
            href={`/${locale}/student-zone`}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "#C9A13B",
              color: "#0B1C3D",
              borderRadius: 12,
              padding: "14px 28px",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              transition: "opacity .15s",
            }}
          >
            <BookOpen size={16} />
            Go to Student Zone
            <ArrowRight size={15} />
          </Link>

          <Link
            href={`/${locale}/courses`}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: "13px 28px",
              fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}
          >
            <Download size={15} />
            Explore More Courses
          </Link>
        </motion.div>

        {/* Support note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: 32, fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}
        >
          Need help? Call us at <span style={{ color: "rgba(255,255,255,0.55)" }}>+91-XXXXXXXXXX</span>{" "}
          or save your reference number above for support queries.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#061530", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#C9A13B", fontFamily: sans }}>Loading…</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

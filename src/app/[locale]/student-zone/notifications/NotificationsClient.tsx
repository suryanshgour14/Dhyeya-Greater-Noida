"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Bell, ArrowLeft, Search, Calendar,
  ChevronRight, Megaphone, Sparkles,
} from "lucide-react";
import type { NotifRow } from "./page";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sans  = `var(--font-plus-jakarta, "Plus Jakarta Sans"), system-ui, sans-serif`;
const serif = `var(--font-newsreader, "Newsreader"), Georgia, serif`;

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function NotificationsClient({ notifications }: { notifications: NotifRow[] }) {
  const locale = useLocale();
  const [query, setQuery] = useState("");

  const filtered = notifications.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.description.toLowerCase().includes(query.toLowerCase())
  );

  const newCount = notifications.filter((n) => n.is_new).length;

  return (
    <div style={{ fontFamily: sans, background: "#F8F7F4", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "#0B1C3D",
        position: "relative",
        overflow: "hidden",
        paddingBottom: 56,
      }}>
        {/* Dot grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />
        {/* Background watermark */}
        <div aria-hidden style={{
          position: "absolute", right: -40, top: -20,
          fontFamily: serif, fontSize: "clamp(100px, 18vw, 200px)",
          fontWeight: 400, color: "rgba(255,255,255,0.025)",
          letterSpacing: "-0.04em", userSelect: "none", lineHeight: 1,
          pointerEvents: "none",
        }}>
          NOTICE
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 0" }}>
          {/* Back link */}
          <Link
            href={`/${locale}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12.5, color: "rgba(255,255,255,0.45)",
              textDecoration: "none", marginBottom: 32,
              fontWeight: 600, letterSpacing: "0.01em",
            }}
          >
            <ArrowLeft size={13} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "#C9A13B",
              }}>
                <Megaphone size={12} />
                Notice Board
              </span>
              {newCount > 0 && (
                <span style={{
                  background: "rgba(234,88,12,0.15)",
                  border: "1px solid rgba(234,88,12,0.3)",
                  color: "#fb923c", borderRadius: 999,
                  fontSize: 10.5, fontWeight: 700,
                  padding: "2px 9px",
                }}>
                  {newCount} new
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(34px, 5vw, 58px)",
              fontWeight: 400, lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fff", margin: "0 0 14px",
            }}>
              Latest{" "}
              <em style={{ fontStyle: "italic", color: "#C9A13B" }}>Notifications</em>
            </h1>

            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: 480 }}>
              Exam alerts, batch updates, test schedules, and institute announcements — all in one place.
            </p>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div style={{ maxWidth: 900, margin: "28px auto 0", padding: "0 24px" }}>
          <div style={{
            display: "flex", gap: 1,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            width: "fit-content",
          }}>
            {[
              { val: notifications.length, label: "Total notices" },
              { val: newCount, label: "New this week" },
            ].map(({ val, label }, i) => (
              <div key={label} style={{
                padding: "12px 22px", textAlign: "center",
                borderRight: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <div style={{ fontFamily: serif, fontSize: 22, color: "#C9A13B", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginTop: 3, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search + List ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
          style={{
            position: "relative",
            margin: "32px 0 28px",
          }}
        >
          <Search size={15} style={{
            position: "absolute", left: 16, top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8", pointerEvents: "none",
          }} />
          <input
            type="text"
            placeholder="Search notifications…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              paddingLeft: 44, paddingRight: 16, paddingTop: 13, paddingBottom: 13,
              borderRadius: 12,
              border: "1.5px solid #e2e8f0",
              background: "#fff",
              fontSize: 14, fontFamily: sans,
              color: "#0f172a", outline: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#1e3a6e"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
          />
        </motion.div>

        {/* Result count */}
        {query && (
          <p style={{ fontSize: 12.5, color: "#94a3b8", marginBottom: 16, fontWeight: 500 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "64px 24px",
            background: "#fff", borderRadius: 16,
            border: "1.5px dashed #e2e8f0",
          }}>
            <Bell size={32} color="#cbd5e1" style={{ marginBottom: 12 }} />
            <p style={{ fontSize: 15, color: "#94a3b8", margin: 0 }}>
              {query ? "No notifications match your search." : "No notifications at the moment."}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
              >
                <NotifCard item={item} isLast={i === filtered.length - 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NotifCard({ item, isLast }: { item: NotifRow; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "stretch", gap: 0,
        borderBottom: isLast ? "none" : "1px solid #f1f5f9",
      }}
    >
      {/* Timeline line + dot */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", paddingTop: 28, paddingBottom: isLast ? 0 : 0,
        width: 40, flexShrink: 0,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: hovered ? "#1e3a6e" : (item.is_new ? "#C9A13B" : "#cbd5e1"),
          border: "2px solid " + (hovered ? "#1e3a6e" : (item.is_new ? "#C9A13B" : "#e2e8f0")),
          flexShrink: 0, transition: "all 0.2s",
          zIndex: 1,
        }} />
        {!isLast && (
          <div style={{
            flex: 1, width: 1.5,
            background: "#e2e8f0",
            marginTop: 6,
          }} />
        )}
      </div>

      {/* Card content */}
      <div style={{
        flex: 1,
        background: hovered ? "#fff" : "transparent",
        borderRadius: 14,
        padding: "20px 20px 20px 16px",
        margin: "8px 0 8px 0",
        cursor: "pointer",
        transition: "background 0.15s, box-shadow 0.15s",
        boxShadow: hovered ? "0 2px 16px rgba(30,58,110,0.07)" : "none",
        border: hovered ? "1.5px solid #e8eef7" : "1.5px solid transparent",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>

          {/* Date badge */}
          {item.date_label ? (
            <div style={{
              flexShrink: 0,
              background: hovered ? "#0B1C3D" : "#f1f5f9",
              borderRadius: 8,
              padding: "8px 12px",
              textAlign: "center",
              minWidth: 52,
              transition: "background 0.2s",
            }}>
              <div style={{
                fontSize: 16, fontWeight: 700, lineHeight: 1,
                color: hovered ? "#C9A13B" : "#1e3a6e",
                fontFamily: `var(--font-newsreader, "Newsreader"), Georgia, serif`,
                transition: "color 0.2s",
              }}>
                {item.date_label.split(" ")[0]}
              </div>
              <div style={{
                fontSize: 9.5, fontWeight: 600, marginTop: 2,
                color: hovered ? "rgba(255,255,255,0.55)" : "#94a3b8",
                textTransform: "uppercase", letterSpacing: "0.06em",
                transition: "color 0.2s",
              }}>
                {item.date_label.split(" ")[1] ?? ""}
              </div>
            </div>
          ) : (
            <div style={{
              flexShrink: 0, width: 40, height: 40,
              background: hovered ? "#0B1C3D" : "#f1f5f9",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}>
              <Calendar size={16} color={hovered ? "#C9A13B" : "#94a3b8"} />
            </div>
          )}

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
              <p style={{
                flex: 1, margin: 0,
                fontSize: 15, fontWeight: 600, lineHeight: 1.45,
                color: hovered ? "#0B1C3D" : "#1e293b",
                transition: "color 0.2s",
              }}>
                {item.title}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                {item.is_new && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 3,
                    background: "rgba(234,88,12,0.09)",
                    border: "1px solid rgba(234,88,12,0.2)",
                    color: "#ea580c", borderRadius: 999,
                    fontSize: 10, fontWeight: 700, padding: "2px 8px",
                    letterSpacing: "0.05em",
                  }}>
                    <Sparkles size={9} />
                    NEW
                  </span>
                )}
                <ChevronRight
                  size={15}
                  color={hovered ? "#1e3a6e" : "#cbd5e1"}
                  style={{ transition: "color 0.2s, transform 0.2s", transform: hovered ? "translateX(2px)" : "none" }}
                />
              </div>
            </div>

            {item.description && (
              <p style={{
                margin: "4px 0 0",
                fontSize: 13, lineHeight: 1.6,
                color: "#64748b",
              }}>
                {item.description}
              </p>
            )}

            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              marginTop: 8,
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#C9A13B", flexShrink: 0,
              }} />
              <span style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 500 }}>
                Dhyeya IAS Greater Noida
              </span>
              <span style={{ fontSize: 11.5, color: "#cbd5e1" }}>·</span>
              <span style={{ fontSize: 11.5, color: "#94a3b8" }}>
                {timeAgo(item.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    // Minimum display: 1.4s so the animation breathes; then wait for page load
    let minTimer: ReturnType<typeof setTimeout>;
    let minDone = false;
    let pageDone = false;

    function tryExit() {
      if (minDone && pageDone) {
        setPhase("out");
        setTimeout(() => setPhase("done"), 650);
      }
    }

    minTimer = setTimeout(() => {
      minDone = true;
      tryExit();
    }, 1400);

    function onLoad() {
      pageDone = true;
      tryExit();
    }

    if (document.readyState === "complete") {
      pageDone = true;
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`loading-screen ${phase === "out" ? "loading-screen--out" : ""}`}
      aria-hidden="true"
    >
      {/* Radial gradient backdrop */}
      <div className="loading-bg" />

      {/* Floating orbs */}
      <div className="loading-orb loading-orb--1" />
      <div className="loading-orb loading-orb--2" />
      <div className="loading-orb loading-orb--3" />

      {/* Centre stage */}
      <div className="loading-stage">

        {/* Logo card */}
        <div className="loading-disc">
          <div className="loading-shine" />
          <Image
            src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708202/DHYEYA_LOGO_ENGLISHWHITE.jpg_gs7mee.jpg"
            alt="Dhyeya IAS Greater Noida - most trusted since 2003"
            fill
            sizes="280px"
            className="object-contain"
            priority
          />
        </div>

        {/* Brand name (logo already shows "Dhyeya IAS", so only the location here) */}
        <div className="loading-brand">
          <p className="loading-brand__sub">GREATER NOIDA</p>
        </div>

        {/* Progress bar */}
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>

        {/* Dots */}
        <div className="loading-dots">
          <span className="loading-dot loading-dot--1" />
          <span className="loading-dot loading-dot--2" />
          <span className="loading-dot loading-dot--3" />
        </div>
      </div>
    </div>
  );
}

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

        {/* Pulsing rings */}
        <div className="loading-rings">
          <span className="loading-ring loading-ring--1" />
          <span className="loading-ring loading-ring--2" />
          <span className="loading-ring loading-ring--3" />

          {/* Logo disc */}
          <div className="loading-disc">
            <div className="loading-shine" />
            <Image
              src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1783031036/ChatGPT_Image_Jul_1_2026_11_27_58_PM_jnzqbu.png"
              alt="Dhyeya IAS Greater Noida"
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="loading-brand">
          <p className="loading-brand__name">Dhyeya IAS</p>
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

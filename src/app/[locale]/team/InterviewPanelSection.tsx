"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PANELISTS = [
  {
    name: "MR. VINAY SINGH",
    designation: "CEO and Founder",
    image: "https://www.dhyeyaias.com/storage/media/1_team.jpg",
  },
  {
    name: "MR. Q H KHAN",
    designation: "Managing Director",
    image: "https://www.dhyeyaias.com/storage/media/2_team.jpg",
  },
  {
    name: "Mr. Noor Mohammed",
    designation: "Ex. Secretary, Govt. of India",
    image: "https://www.dhyeyaias.com/storage/media/6_team.jpg",
  },
  {
    name: "Mr. Manjeet Singh",
    designation: "Ex. Secretary Home & Finance",
    image: "https://www.dhyeyaias.com/storage/media/7_team.jpg",
  },
  {
    name: "Mr. Vibhuti Narain Rai",
    designation: "Retd. IPS – Ex. DGP (UP)",
    image: "https://www.dhyeyaias.com/storage/media/8_team.jpg",
  },
  {
    name: "Mr. A. H. K. Ghauri",
    designation: "Retd. IRS – Ex. Governance Advisor, British High Commission",
    image: "https://www.dhyeyaias.com/storage/media/10_team.jpg",
  },
  {
    name: "Mr. S K Mishra",
    designation: "Retd. IRS – Ex. Member Revenue Board, Ex. Member CBEC (now CBIC)",
    image: "https://www.dhyeyaias.com/storage/media/11_team.jpg",
  },
  {
    name: "Mr. T H K Ghauri",
    designation: "Retd. IRS – Ex. Chief Commissioner Custom & Excise",
    image: "https://www.dhyeyaias.com/storage/media/12_team.jpg",
  },
  {
    name: "Mr. Qurban Ali",
    designation: "Ex. Director – Rajya Sabha TV",
    image: "https://www.dhyeyaias.com/storage/media/14_team.jpg",
  },
  {
    name: "MD A Usmani",
    designation: "Distinguished Professor",
    image: "https://www.dhyeyaias.com/storage/media/25_team.jpg",
  },
  {
    name: "Professor G Kumar",
    designation: "Distinguished Professor – Ex. UPSC Board Member",
    image: "https://www.dhyeyaias.com/storage/media/26_team.jpg",
  },
];

const FEATURED_IMAGE =
  "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782418236/ChatGPT_Image_Jun_26_2026_01_40_11_AM_xqmtda.png";

// ─── Panelist Card ────────────────────────────────────────────────────────────

function PanelistCard({
  name,
  designation,
  image,
  index,
}: {
  name: string;
  designation: string;
  image: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: EASE }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 44px -8px rgba(11,28,61,0.14)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex h-full flex-col items-center rounded-[20px] border border-slate-200 bg-white px-6 py-8 text-center shadow-sm"
      >
        {/* Circular photo */}
        <div className="relative mb-5 shrink-0" style={{ width: 120, height: 120 }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "0 0 0 3px #fff, 0 0 0 5px rgba(11,28,61,0.10), 0 8px 20px -4px rgba(11,28,61,0.18)",
            }}
          />
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="h-full w-full rounded-full object-cover object-top"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: "inset 0 0 0 2px rgba(201,161,59,0.25)" }}
          />
        </div>

        <h4 className="text-[13px] font-extrabold uppercase tracking-wide text-brand-blue leading-snug">
          {name}
        </h4>
        <div className="mx-auto my-3 h-px w-8 bg-brand-gold" />
        <p className="text-[12px] leading-relaxed text-slate-500">{designation}</p>
      </motion.div>
    </motion.article>
  );
}

// ─── Featured Interview Card ──────────────────────────────────────────────────

function FeaturedCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      // On mobile: full width. sm: spans 2 cols. lg: spans 2 cols × 2 rows.
      className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
    >
      <div className="relative h-full min-h-[380px] overflow-hidden rounded-[20px] shadow-xl">
        <Image
          src={FEATURED_IMAGE}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt="UPSC Mock Interview session at Dhyeya IAS Greater Noida"
          className="object-cover object-center"
        />

        {/* Gradient: transparent top → dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c3d] via-[#0b1c3d]/50 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
          <h3 className="mb-3 text-xl font-extrabold leading-snug text-white md:text-[1.35rem]">
            Experience a Real UPSC Mock Interview
          </h3>
          <p className="mb-5 text-[13px] leading-[1.7] text-slate-300">
            Experience realistic UPSC Personality Test simulations with our distinguished
            interview panel. Receive detailed feedback, improve confidence, and prepare in
            an environment that closely mirrors the actual UPSC interview.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-blue transition-colors duration-200 hover:bg-amber-400"
          >
            Book Mock Interview
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="mb-14 text-center"
    >
      <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
        Expert Interview Panel
      </span>

      <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl lg:text-5xl">
        Meet Our Interview Panelists
      </h2>

      <p className="mt-4 mx-auto max-w-2xl text-base text-slate-500">
        Learn from distinguished former bureaucrats, academicians, and subject experts who
        bring decades of experience to guide your UPSC interview preparation.
      </p>

      {/* Accent divider */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="h-px w-14 bg-brand-gold/35" />
        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
        <div className="h-px w-14 bg-brand-gold/35" />
      </div>
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function InterviewPanelSection() {
  return (
    <section
      id="interview-panel"
      aria-label="Interview Panelists"
      className="border-t border-slate-100 bg-[#f9f9f7] py-20"
    >
      <div className="container mx-auto px-4">
        <SectionHeader />

        {/*
          4-column CSS Grid on desktop.
          Items 0–4: auto-placed into row 1 (cols 1–4) and row 2 col 1.
          FeaturedCard: col-span-2 + row-span-2 → fills row 2–3 cols 2–3.
          Items 5–12: auto-placed into remaining cells (row 2 col 4, row 3 cols 1 & 4, row 4, row 5).
        */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* First 5 panelists */}
          {PANELISTS.slice(0, 5).map((p, i) => (
            <PanelistCard key={p.name} {...p} index={i} />
          ))}

          {/* Featured card — col 2-3 / row 2-3 on desktop */}
          <FeaturedCard />

          {/* Remaining 8 panelists */}
          {PANELISTS.slice(5).map((p, i) => (
            <PanelistCard key={p.name} {...p} index={i + 5} />
          ))}
        </div>
      </div>
    </section>
  );
}

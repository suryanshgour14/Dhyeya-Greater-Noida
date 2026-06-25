"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown } from "lucide-react";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0, y: 32 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Directors data ───────────────────────────────────────────────────────────

const DIRECTORS = [
  {
    name: "Mr. Vinay Singh",
    role: "CEO & Founder",
    image:
      "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782413925/7bf60d6e-b0f1-4c89-aac0-a3390671bb0c.png",
    message:
      "The guiding philosophy of the institute has always been the creation of knowledge. The objectives of imparting education — combined with creation, dissemination, and application of knowledge — are being met in an integrated form to create a synergetic impact. The institute fosters and nurtures leaders capable of making a real difference. It inculcates human values and professional ethics in students so that the decisions they make are good not only for themselves, but for society, the nation, and the world as a whole.",
  },
  {
    name: "Mr. Q. H. Khan",
    role: "Managing Director",
    image:
      "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782413887/WhatsApp_Image_2026-04-28_at_13.50.32_meo740.jpg",
    message:
      "Dhyeya IAS is an institution that aims at the complete development of each student. Our faculty are hand-picked and highly qualified to ensure that every aspirant receives every possible support in all their academic endeavours. It is a multidisciplinary institution — students have ready access to a wide range of academic material. Our brand of education does not have narrow horizons; we believe in exposure. Students are encouraged to widen their knowledge base and study well beyond the confines of the syllabus.",
  },
  {
    name: "Mr. Iqbal Ahmed",
    role: "Director, Dhyeya IAS — Greater Noida",
    image:
      "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782414079/12f08302-4b32-4703-a558-4d99419e34fb.png",
    message:
      "Our core mission is transforming aspirants into future leaders by bridging academic knowledge with real-world governance. We move beyond rote learning to cultivate analytical thinking, administrative ethics, and a deep understanding of public policy. Through strategic mentorship, conceptual clarity, and psychological resilience, we provide a rigorous ecosystem for success — dedicated to nurturing competent, empathetic officers who will serve our nation with absolute integrity and excellence.",
  },
];

// ─── Directors section ────────────────────────────────────────────────────────

function DirectorsSection() {
  return (
    <section id="directors" className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <FadeIn direction="up" className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            <Crown className="h-3.5 w-3.5" />
            Leadership
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
            Our Directors
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-base text-slate-500">
            The vision, experience, and conviction that have shaped every batch,
            every result, and every officer this institute has produced.
          </p>
        </FadeIn>

        {/* Director rows — alternating */}
        <div className="space-y-0 divide-y divide-slate-100">
          {DIRECTORS.map(({ name, role, image, message }, i) => {
            const imageRight = i % 2 !== 0;
            return (
              <div
                key={name}
                className={`grid items-center gap-0 py-0 md:grid-cols-2 ${
                  i === 0 ? "" : ""
                }`}
              >
                {/* Photo side */}
                <FadeIn
                  direction={imageRight ? "right" : "left"}
                  delay={0.05}
                  className={`order-1 ${imageRight ? "md:order-2" : "md:order-1"}`}
                >
                  <div
                    className={`flex items-end justify-center px-6 pb-0 pt-8 ${
                      imageRight ? "bg-brand-blue/5" : "bg-slate-100"
                    }`}
                  >
                    <div className="relative w-full max-w-[320px]">
                      <img
                        src={image}
                        alt={name}
                        className="block w-full object-contain object-bottom"
                        style={{ maxHeight: "420px" }}
                      />
                      {/* Role chip */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <span className="rounded-full bg-brand-gold px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-blue shadow-md">
                          {role}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Content side */}
                <FadeIn
                  direction={imageRight ? "left" : "right"}
                  delay={0.12}
                  className={`order-2 ${imageRight ? "md:order-1" : "md:order-2"}`}
                >
                  <div
                    className={`flex h-full flex-col justify-center px-8 py-12 md:px-14 md:py-16 ${
                      imageRight ? "bg-brand-blue" : "bg-slate-50"
                    }`}
                  >
                    {/* Name */}
                    <h3
                      className={`mb-1 text-2xl font-extrabold leading-tight md:text-3xl ${
                        imageRight ? "text-white" : "text-brand-blue"
                      }`}
                    >
                      {name}
                    </h3>
                    {/* Gold rule */}
                    <div className="mb-6 mt-3 h-0.5 w-12 bg-brand-gold" />

                    {/* Message */}
                    <div className="relative">
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -left-1 -top-6 select-none font-serif text-7xl leading-none ${
                          imageRight ? "text-white/10" : "text-brand-blue/8"
                        }`}
                      >
                        "
                      </span>
                      <p
                        className={`relative z-10 text-sm leading-[1.85] md:text-[0.95rem] ${
                          imageRight ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {message}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Coming soon placeholder ──────────────────────────────────────────────────

function ComingSoonSection({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section id={id} className="border-t border-slate-100 bg-slate-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">
            Coming Soon
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-brand-blue">{title}</h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Page hero ────────────────────────────────────────────────────────────────

function TeamHero() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1d4ed820_0%,_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container relative mx-auto px-4 text-center">
        <FadeIn direction="up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            The People Behind the Mission
          </span>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Meet Our <span className="text-brand-gold">Team</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            Every officer this institute has produced is a reflection of the
            people who guide, teach, and believe in them every single day.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function TeamClient() {
  return (
    <main>
      <TeamHero />
      <DirectorsSection />
      <ComingSoonSection
        id="advisory"
        title="Advisory Board"
        subtitle="IAS officers and subject experts who shape our curriculum and strategy."
      />
      <ComingSoonSection
        id="faculty"
        title="Our Faculty"
        subtitle="Hand-picked educators and specialists who deliver every class."
      />
      <ComingSoonSection
        id="admin"
        title="Administration"
        subtitle="The operations and support team keeping everything running smoothly."
      />
    </main>
  );
}

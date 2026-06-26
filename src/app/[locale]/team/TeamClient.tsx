"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Users2 } from "lucide-react";
import InterviewPanelSection from "./InterviewPanelSection";

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

// ─── Advisory Board data ──────────────────────────────────────────────────────

const ADVISORY = [
  { name: "Mr. N C Saxena",         designation: "Ex. Secretary, Govt. of India",                                       image: "https://www.dhyeyaias.com/storage/media/3_team.jpg" },
  { name: "Mr. Shashank",           designation: "Ex. Foreign Secretary",                                               image: "https://www.dhyeyaias.com/storage/media/4_team.jpg" },
  { name: "Mr. S Y Quraishi",       designation: "Ex. Chief Election Commissioner",                                     image: "https://www.dhyeyaias.com/storage/media/5_team.jpg" },
  { name: "Mr. Noor Mohammed",      designation: "Ex. Secretary, Govt. of India",                                       image: "https://www.dhyeyaias.com/storage/media/6_team.jpg" },
  { name: "Mr. Manjeet Singh",      designation: "Ex. Secretary Home & Finance",                                        image: "https://www.dhyeyaias.com/storage/media/7_team.jpg" },
  { name: "Mr. Vibhuti Narain Rai", designation: "Retd. IPS — Ex. DGP (UP)",                                           image: "https://www.dhyeyaias.com/storage/media/8_team.jpg" },
  { name: "Mr. Vikram Singh",       designation: "Retd. IPS — Ex. DGP (UP)",                                           image: "https://www.dhyeyaias.com/storage/media/9_team.jpg" },
  { name: "Mr. A. H. K. Ghauri",   designation: "Retd. IRS — Ex. Governance Advisor, British High Commission",         image: "https://www.dhyeyaias.com/storage/media/10_team.jpg" },
  { name: "Mr. S K Mishra",         designation: "Retd. IRS — Ex. Member Revenue Board, Ex. Member CBIC",              image: "https://www.dhyeyaias.com/storage/media/11_team.jpg" },
  { name: "Mr. T H K Ghauri",       designation: "Retd. IRS — Ex. Chief Commissioner Custom & Excise",                 image: "https://www.dhyeyaias.com/storage/media/12_team.jpg" },
  { name: "Mr. Qurban Ali",         designation: "Ex. Director, Rajya Sabha TV",                                       image: "https://www.dhyeyaias.com/storage/media/14_team.jpg" },
  { name: "Mr. S. N. Ali",          designation: "Senior Journalist",                                                  image: "https://www.dhyeyaias.com/storage/media/15_team.jpg" },
  { name: "Mr. Gaurav Bansal",      designation: "IRTS",                                                               image: "https://www.dhyeyaias.com/storage/media/16_team.jpg" },
  { name: "Mr. Saurabh Rao",        designation: "IAS",                                                                image: "https://www.dhyeyaias.com/storage/media/18_team.jpg" },
  { name: "Mr. Arshi",              designation: "IPS",                                                                image: "https://www.dhyeyaias.com/storage/media/20_team.jpg" },
];

// ─── Advisory card ────────────────────────────────────────────────────────────

function AdvisoryCard({
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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 5) * 0.07, ease: EASE }}
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(11,28,61,0.14)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-5 py-7 text-center shadow-sm"
      >
        {/* Circular photo */}
        <div
          className="relative mb-5 shrink-0"
          style={{ width: 96, height: 96 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "0 0 0 3px #fff, 0 0 0 5px rgba(11,28,61,0.12), 0 8px 24px -4px rgba(11,28,61,0.18)",
            }}
          />
          <img
            src={image}
            alt={name}
            width={96}
            height={96}
            className="h-full w-full rounded-full object-cover object-top"
            style={{ imageRendering: "auto" }}
            loading="lazy"
          />
          {/* Gold ring accent */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: "inset 0 0 0 2px rgba(201,161,59,0.35)",
            }}
          />
        </div>

        {/* Name */}
        <h4 className="text-sm font-bold leading-snug text-brand-blue">
          {name}
        </h4>

        {/* Gold rule */}
        <div className="mx-auto my-2.5 h-px w-8 bg-brand-gold" />

        {/* Designation */}
        <p className="text-[11px] leading-relaxed text-slate-500">
          {designation}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Advisory Board section ───────────────────────────────────────────────────

function AdvisorySection() {
  return (
    <section id="advisory" className="border-t border-slate-100 bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn direction="up" className="mb-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            <Users2 className="h-3.5 w-3.5" />
            Advisory Board
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
            Our Advisory Board
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-slate-500">
            Distinguished IAS, IPS, and IRS officers, senior journalists, and
            governance experts who shape the academic and strategic direction of
            Dhyeya IAS.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {ADVISORY.map((member, i) => (
            <AdvisoryCard key={member.name} {...member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Administration data ──────────────────────────────────────────────────────

const ADMIN_TEAM = [
  {
    name: "Mr. Abhishek Singh",
    role: "Centre Head",
    tag: "Greater Noida",
    image:
      "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782416590/0bb87933-eb14-4856-af43-57eb38d93c65.png",
    quote:
      "Every great officer was once an aspirant who chose to persist. At Dhyeya IAS Greater Noida, my commitment to each one of you is personal — we walk this journey together, every single step of the way.",
  },
  {
    name: "Neha Ma'am",
    role: "Administrative Head",
    tag: "Greater Noida",
    image:
      "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782416560/6ff48502-bba4-4c38-88bb-1d9b0ecaa572.png",
    quote:
      "Success in UPSC is built on consistency, the right environment, and knowing that someone genuinely believes in you. I am here to make sure you never feel alone in this pursuit.",
  },
  {
    name: "Arif Ghauri Sir",
    role: "Mentor",
    tag: "Ex-IRS",
    image:
      "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782416653/WhatsApp_Image_2026-04-19_at_20.43.16_gmfgu8.jpg",
    quote:
      "The civil services path is demanding by design — it selects those with resilience, character, and true purpose. I have walked this road. I am here to illuminate yours.",
  },
];

const TEAM_PHOTOS = [
  "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782416815/IMG_4898.JPG_rha5lp.jpg",
  "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782416821/DSC05053-2.jpg_uusuix.jpg",
];

// ─── Admin person card ────────────────────────────────────────────────────────

function AdminCard({
  name,
  role,
  tag,
  image,
  quote,
  index,
}: {
  name: string;
  role: string;
  tag: string;
  image: string;
  quote: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(11,28,61,0.16)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Photo — fixed height so all cards align */}
        <div className="relative h-80 w-full shrink-0 overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain object-bottom transition-transform duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Role overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-10">
            <span className="inline-block rounded-full bg-brand-gold px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-blue">
              {role} · {tag}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-extrabold text-brand-blue">{name}</h3>
          <div className="mb-4 mt-2 h-px w-10 bg-brand-gold" />
          <p className="relative text-[0.82rem] italic leading-relaxed text-slate-500">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1 -top-3 select-none font-serif text-5xl leading-none text-brand-blue/10"
            >
              "
            </span>
            {quote}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Administration section ───────────────────────────────────────────────────

function AdministrationSection() {
  const photosRef = useRef(null);
  const photosInView = useInView(photosRef, { once: true, margin: "-60px" });

  return (
    <section id="admin" className="border-t border-slate-100 bg-[#f8f7f4] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn direction="up" className="mb-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            <Users2 className="h-3.5 w-3.5" />
            Administration
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
            The People Who Run It All
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-slate-500">
            Behind every successful aspirant is a team that keeps the campus
            running, the doors open, and the spirit alive.
          </p>
        </FadeIn>

        {/* Three person cards */}
        <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ADMIN_TEAM.map((person, i) => (
            <AdminCard key={person.name} {...person} index={i} />
          ))}
        </div>

        {/* Whole-team photos */}
        <motion.div
          ref={photosRef}
          initial={{ opacity: 0, y: 40 }}
          animate={photosInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-16"
        >
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Our Team
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEAM_PHOTOS.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-slate-200 shadow-md"
                style={{ aspectRatio: "16/10" }}
              >
                <img
                  src={src}
                  alt={`Dhyeya IAS Greater Noida team ${i + 1}`}
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
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
      <AdvisorySection />
      <InterviewPanelSection />
      <AdministrationSection />
    </main>
  );
}

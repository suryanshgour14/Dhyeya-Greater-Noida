"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import {
  Target, BookOpen, Users, Award, Lightbulb, HeartHandshake,
  ClipboardCheck, Newspaper, MonitorPlay, PenLine, CheckCircle2,
  XCircle, MinusCircle, ChevronRight, GraduationCap, Sparkles,
  Brain, Star, Network,
} from "lucide-react";

// ─── fade-up helper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section 1 - Mission ──────────────────────────────────────────────────────
function MissionSection() {
  const stats = [
    { value: "10+", label: "Years of Legacy" },
    { value: "5000+", label: "Successful Officers" },
    { value: "50+", label: "Expert Faculty" },
    { value: "Pan-India", label: "Network" },
  ];

  return (
    <section id="mission" className="relative overflow-hidden bg-brand-blue py-20">
      {/* background rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-gold/5 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left - text */}
          <div>
            <FadeUp>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                Our Mission
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Shaping Tomorrow's Civil Servants,{" "}
                <span className="text-brand-gold">One Aspirant at a Time</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-300 md:text-base">
                Empowering UPSC and State PCS aspirants in Greater Noida with disciplined mentorship, structured learning, and a result-driven approach.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                <p>
                  At <strong className="text-white">Dhyeya IAS Greater Noida</strong>, our mission is simple yet profound - to nurture a competitive temperament in every aspirant who walks through our doors and equip them with the knowledge, strategy, and confidence to crack India's most demanding examinations.
                </p>
                <p>
                  We firmly believe that <em className="text-brand-gold font-semibold">"Geniuses are made, not born."</em> Behind every successful IAS, IPS, or PCS officer lies years of consistent effort, sharp guidance, and an unwavering commitment to growth.
                </p>
                <p>
                  As an authorized franchise of Dhyeya IAS - one of India's most trusted names in civil services preparation for over a decade - we bring the same proven methodology, premium study material, and academic rigor right here to Greater Noida. <strong className="text-white">No more travelling to Delhi or Mukherjee Nagar.</strong> World-class UPSC coaching is now in your neighbourhood.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right - stats grid */}
          <FadeUp delay={0.3} className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-extrabold text-brand-gold">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-300">{label}</p>
              </motion.div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2 - Aims & Objectives ───────────────────────────────────────────
const AIMS = [
  {
    icon: Target,
    title: "Crafting a Personalised Examination Strategy",
    body: "Every aspirant is different - different strengths, different challenges. Our faculty helps each student frame a personalised, level-wise strategy for the Preliminary Examination, Mains Examination, and Personality Test - because there is no one-size-fits-all path to success.",
  },
  {
    icon: BookOpen,
    title: "Building Conceptual Clarity Through Classroom Programmes",
    body: "Our classroom programmes are conducted by subject experts with years of teaching and exam experience. The focus is always on building clarity of fundamentals first - because deep understanding always outperforms rote memorization.",
  },
  {
    icon: HeartHandshake,
    title: "Empowering Aspirants from Weaker Sections of Society",
    body: "We are deeply committed to inclusivity. A meaningful share of our seats and special scholarship support is reserved for aspirants from economically and socially weaker sections - because talent should never be limited by circumstance.",
  },
  {
    icon: Award,
    title: "Providing Economic Assistance to Deserving Candidates",
    body: "We offer fee concessions, scholarships, and flexible payment options for students who demonstrate merit and need. Your dream of becoming an officer should never be held back by financial constraints.",
  },
  {
    icon: Users,
    title: "Mentoring Beyond the Classroom",
    body: "Each student at Dhyeya IAS Greater Noida is assigned a personal mentor who tracks progress, addresses doubts, and offers one-on-one guidance throughout the preparation journey.",
  },
];

function AimsSection() {
  return (
    <section id="aims" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <FadeUp className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Aims & Objectives
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">Our Aims & Objectives</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Building a generation of civil servants from every section of society - driven, disciplined, and dedicated.
          </p>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AIMS.map(({ icon: Icon, title, body }, i) => (
            <FadeUp key={title} delay={0.07 * i}>
              <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-gold">0{i + 1}</span>
                  <h3 className="text-sm font-bold text-brand-blue">{title}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </FadeUp>
          ))}

          {/* Filler card - quote */}
          <FadeUp delay={0.07 * AIMS.length}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-brand-gold/30 bg-brand-blue p-6 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-brand-gold" />
              <p className="text-base font-bold italic text-white leading-snug">
                "Don't study to earn,<br />rather study to learn."
              </p>
              <p className="mt-3 text-xs text-slate-400">- Dhyeya IAS Philosophy</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 - Methodology ──────────────────────────────────────────────────
const METHODOLOGY = [
  {
    icon: Lightbulb,
    title: "Personalised Counselling",
    body: "Every preparation journey begins with one-on-one counselling - understanding the aspirant's background, strengths, weaknesses, and target. A personalised roadmap is built before classes even begin.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    icon: GraduationCap,
    title: "Structured Classroom Training",
    body: "Our Pre-cum-Mains integrated programme covers the entire UPSC and State PCS syllabus in a structured, time-bound manner - with dedicated revision modules of 45 days for Prelims and 60 days for Mains.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    icon: ClipboardCheck,
    title: "Test Evaluation Programme",
    body: "Our All India Test Series for Prelims and Mains simulates the real exam environment, and every answer sheet is personally evaluated with detailed feedback - not just a score.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Newspaper,
    title: "Quality Study Material",
    body: "Our concise, well-researched, and continuously updated study material is the result of years of refinement. We also publish PERFECT-7, our flagship monthly current affairs magazine, alongside Daily News Analysis and Infopedia.",
    color: "bg-purple-50 text-purple-700 border-purple-100",
  },
  {
    icon: Users,
    title: "Administrative Support & HR Development",
    body: "A dedicated administrative team ensures that every aspirant gets the academic, emotional, and logistical support they need throughout the preparation cycle.",
    color: "bg-rose-50 text-rose-700 border-rose-100",
  },
  {
    icon: MonitorPlay,
    title: "Distance Learning & Online Programmes",
    body: "For students who cannot attend physical classes, our online learning platform delivers the same quality content, live classes, and test series - anytime, anywhere.",
    color: "bg-cyan-50 text-cyan-700 border-cyan-100",
  },
];

function MethodologySection() {
  return (
    <section id="methodology" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <FadeUp className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Our Methodology
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
            A Proven Methodology Backed by a Decade of Results
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground">
            A complete, integrated learning ecosystem - where every component is engineered to convert effort into results.
          </p>
        </FadeUp>

        {/* 6-pillar grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {METHODOLOGY.map(({ icon: Icon, title, body, color }, i) => (
            <FadeUp key={title} delay={0.07 * i}>
              <div className={`group h-full rounded-2xl border p-6 transition-shadow hover:shadow-md ${color}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-extrabold opacity-20">0{i + 1}</span>
                </div>
                <h3 className="mb-2 text-sm font-bold">{title}</h3>
                <p className="text-xs leading-relaxed opacity-80">{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Answer writing highlight */}
        <FadeUp delay={0.1} className="mt-10">
          <div className="rounded-2xl border border-brand-gold/30 bg-gradient-to-r from-brand-blue to-brand-blue/90 p-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20">
                <PenLine className="h-6 w-6 text-brand-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Mains Answer Writing Programme</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  Knowledge alone doesn't clear the Mains exam - presentation does. Our daily answer writing practice and evaluation programme trains aspirants in the art of crafting structured, analytical, and high-scoring answers.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 4 - Why Choose Us ────────────────────────────────────────────────
const COMPARISON = [
  { feature: "Integrated Pre-cum-Mains Programme",                  us: "yes",     others: "yes"     },
  { feature: "Dedicated Revision Programme (45 days Prelims + 60 days Mains)", us: "yes", others: "no" },
  { feature: "All India Test Series (Prelims + Mains)",             us: "yes",     others: "limited" },
  { feature: "PERFECT-7 Monthly Current Affairs Magazine",          us: "yes",     others: "no"      },
  { feature: "Interview Guidance Programme",                        us: "yes",     others: "limited" },
  { feature: "Concise, Comprehensive & Exclusive Study Material",   us: "yes",     others: "limited" },
  { feature: "PMI (Prelims-Mains-Interview) Integrated Programme",  us: "yes",     others: "no"      },
  { feature: "Dhyeya IAS App - Daily Answer Writing & Evaluation",  us: "yes",     others: "no"      },
  { feature: "Personal Mentor for Every Student",                   us: "yes",     others: "limited" },
  { feature: "Performance Tracking via Class Tests",                us: "yes",     others: "limited" },
  { feature: "Continuous Interaction with UPSC Toppers",            us: "yes",     others: "limited" },
  { feature: "Smart Classrooms",                                    us: "yes",     others: "limited" },
  { feature: "Online Class Availability",                           us: "yes",     others: "limited" },
  { feature: "Daily News Analysis, Pre-Pair, Infopedia & Static MCQs", us: "yes", others: "no"      },
];

const PILLARS = [
  {
    icon: Star,
    title: "Lead by Example",
    body: "Dhyeya IAS has been consistently delivering top-ranking results for over a decade. Our Greater Noida centre carries forward this legacy of commitment, competitiveness, and consistency.",
  },
  {
    icon: Sparkles,
    title: "Nurturing and Shaping Talent",
    body: "Talent decides what you can do. Motivation decides how much. But attitude decides how well. We help you master the balance of ATM - Attitude, Talent, Motivation - through structured mentoring.",
  },
  {
    icon: Brain,
    title: "Enhancing Capacity, Building Capability",
    body: "Our faculty expands your knowledge base while building analytical thinking, writing skills, and emotional intelligence - what the UPSC examination truly tests.",
  },
  {
    icon: BookOpen,
    title: "Best-in-Class Study Material",
    body: "Our guiding principle: Don't study to earn, rather study to learn. Our material is concise, exam-focused, and continuously updated based on evolving UPSC and State PCS patterns.",
  },
  {
    icon: Network,
    title: "Dedicated Academic Associates",
    body: "Round-the-clock academic support from past UPSC Mains and Interview candidates. No significant learning happens without a significant relationship - we've built that into the curriculum.",
  },
];

function StatusIcon({ value }: { value: string }) {
  if (value === "yes") return <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" />;
  if (value === "no") return <XCircle className="mx-auto h-5 w-5 text-red-400" />;
  return <MinusCircle className="mx-auto h-5 w-5 text-amber-400" />;
}

function WhySection({ locale }: { locale: string }) {
  return (
    <section id="why" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <FadeUp className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
            Why Choose Dhyeya IAS Greater Noida?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground">
            When you choose a coaching institute, you're not just choosing a classroom - you're choosing a partner for one of the most important journeys of your life.
          </p>
        </FadeUp>

        {/* Comparison Table */}
        <FadeUp delay={0.1} className="mb-16 overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-blue text-white">
                  <th className="px-5 py-4 text-left font-semibold">What We Offer</th>
                  <th className="px-5 py-4 text-center font-semibold w-40">
                    <span className="text-brand-gold">Dhyeya IAS</span>
                    <br />
                    <span className="text-xs font-normal text-slate-300">Greater Noida</span>
                  </th>
                  <th className="px-5 py-4 text-center font-semibold w-36 text-slate-300">
                    Other Institutes
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ feature, us, others }, i) => (
                  <tr
                    key={feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="px-5 py-3 text-xs font-medium text-foreground">{feature}</td>
                    <td className="px-5 py-3 text-center"><StatusIcon value={us} /></td>
                    <td className="px-5 py-3 text-center"><StatusIcon value={others} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-4 border-t bg-white px-5 py-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Available</span>
            <span className="flex items-center gap-1"><MinusCircle className="h-3.5 w-3.5 text-amber-400" /> Limited (select institutes only)</span>
            <span className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-400" /> Not available</span>
          </div>
        </FadeUp>

        {/* 5 Pillars */}
        <FadeUp className="mb-10 text-center">
          <h3 className="text-2xl font-extrabold text-brand-blue">The 5 Pillars That Make the Difference</h3>
        </FadeUp>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <FadeUp key={title} delay={0.07 * i}>
              <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mb-2 text-sm font-bold text-brand-blue">{title}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </FadeUp>
          ))}

          {/* Pan-India Network card */}
          <FadeUp delay={0.07 * PILLARS.length}>
            <div className="h-full rounded-2xl border border-brand-gold/30 bg-brand-blue p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/20">
                <Network className="h-5 w-5 text-brand-gold" />
              </div>
              <h4 className="mb-2 text-sm font-bold text-white">Pan-India Network</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                As part of the Dhyeya IAS family, our Greater Noida students benefit from resources, faculty, and toppers' insights from centres across India - a network no standalone local institute can match.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* CTA */}
        <FadeUp delay={0.1} className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-brand-blue to-brand-blue/90 p-10">
            <h3 className="mb-3 text-2xl font-extrabold text-white">
              Your dream deserves the right institute.
            </h3>
            <p className="mb-6 text-sm text-slate-300">
              Dhyeya IAS Greater Noida is here to make that dream a structured, achievable reality.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-7 py-3 text-sm font-bold text-brand-blue shadow-lg transition-all hover:bg-brand-gold/90 hover:shadow-xl"
            >
              Book a Free Counselling Session
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 5 - Leadership ───────────────────────────────────────────────────

const DIRECTORS = [
  {
    name: "Mr. Vinay Singh",
    role: "CEO & Founder",
    image: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782413925/7bf60d6e-b0f1-4c89-aac0-a3390671bb0c.png",
    message:
      "The guiding philosophy of the institute has been the creation of knowledge. The objectives of imparting education, combined with creation, dissemination and application of knowledge, are being met in an integrated form to create a synergetic impact. The institute fosters and nurtures leaders capable of making a difference — inculcating human values and professional ethics so that students make decisions that are good not just for them, but for society, the nation, and the world as a whole.",
  },
  {
    name: "Mr. Q. H. Khan",
    role: "Managing Director",
    image: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782413887/WhatsApp_Image_2026-04-28_at_13.50.32_meo740.jpg",
    message:
      "Dhyeya IAS aims at the complete development of every student. Our faculty are hand-picked and highly qualified to ensure each aspirant receives every possible support in their academic journey. We are a multidisciplinary institution — students have ready access to a wide range of academic material. Our brand of education does not have narrow horizons; we believe in exposure. Our students are encouraged to widen their knowledge base well beyond the confines of the syllabus.",
  },
  {
    name: "Mr. Iqbal Ahmed",
    role: "Director, Greater Noida",
    image: "https://res.cloudinary.com/dl9t48lyt/image/upload/v1782414079/12f08302-4b32-4703-a558-4d99419e34fb.png",
    message:
      "Our core mission is transforming aspirants into future leaders by bridging academic knowledge with real-world governance. We move beyond rote learning to cultivate analytical thinking, administrative ethics, and a deep understanding of public policy. Through strategic mentorship, conceptual clarity, and psychological resilience, we provide a rigorous ecosystem for success — dedicated to nurturing competent, empathetic officers who will serve our nation with absolute integrity and excellence.",
  },
];

function LeadershipSection() {
  return (
    <section id="leadership" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <FadeUp className="mb-14 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Leadership
          </span>
          <h2 className="text-3xl font-extrabold text-brand-blue md:text-4xl">
            Voices That Guide Us
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-muted-foreground">
            The people whose vision, dedication, and experience have shaped every aspirant's journey at Dhyeya IAS.
          </p>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-3">
          {DIRECTORS.map(({ name, role, image, message }, i) => (
            <FadeUp key={name} delay={0.1 * i}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                {/* Photo */}
                <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Gold overlay strip at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                      {role}
                    </p>
                    <h3 className="mt-0.5 text-lg font-extrabold leading-tight text-brand-blue">
                      {name}
                    </h3>
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1 border-l-2 border-brand-gold/40 pl-4">
                    <span
                      aria-hidden
                      className="absolute -left-3 -top-2 text-5xl font-serif leading-none text-brand-gold/25 select-none"
                    >
                      "
                    </span>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Root client component ────────────────────────────────────────────────────
export default function AboutClient() {
  const locale = useLocale();
  return (
    <main>
      <MissionSection />
      <AimsSection />
      <MethodologySection />
      <LeadershipSection />
      <WhySection locale={locale} />
    </main>
  );
}

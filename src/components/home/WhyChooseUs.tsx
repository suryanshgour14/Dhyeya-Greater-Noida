"use client";

import { motion } from "framer-motion";
import { WHY_US_FEATURES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COLOR_VARIANTS = [
  { icon: "bg-brand-blue/10 text-brand-blue", border: "hover:border-brand-blue/30" },
  { icon: "bg-brand-gold/10 text-brand-gold", border: "hover:border-brand-gold/30" },
  { icon: "bg-brand-orange/10 text-brand-orange", border: "hover:border-brand-orange/30" },
  { icon: "bg-emerald-50 text-emerald-600", border: "hover:border-emerald-200" },
  { icon: "bg-violet-50 text-violet-600", border: "hover:border-violet-200" },
  { icon: "bg-sky-50 text-sky-600", border: "hover:border-sky-200" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
            Our Advantage
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            Why Choose Dhyeya IAS?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Greater Noida&apos;s most trusted UPSC coaching - combining experienced faculty, proven methods, and personal mentorship.
          </p>
        </motion.div>

        {/* 6-card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_US_FEATURES.map((feat, i) => {
            const colors = COLOR_VARIANTS[i % COLOR_VARIANTS.length];
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                }}
                className={`group relative flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-lg ${colors.border}`}
              >
                <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-base font-bold text-foreground">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-14 grid grid-cols-2 divide-x divide-border rounded-2xl border border-border bg-slate-50 sm:grid-cols-4"
        >
          {[
            { value: "12+", label: "Years of Excellence" },
            { value: "500+", label: "UPSC Selections" },
            { value: "15,000+", label: "Aspirants Trained" },
            { value: "4.9★", label: "Google Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-6 text-center">
              <span className="text-2xl font-bold text-brand-blue">{value}</span>
              <span className="mt-1 text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

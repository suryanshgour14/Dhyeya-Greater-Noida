"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Testimonials() {
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
            Student Stories
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            What Our Toppers Say
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Real words from real achievers — students who cracked UPSC with Dhyeya IAS.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS_DATA.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className={`relative flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-lg ${
                item.offset ? "lg:mt-8" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-brand-blue/20" />

              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 font-bold text-brand-blue">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-brand-orange font-medium">{item.rank}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google rating strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border bg-slate-50 py-6 px-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">4.9</span>
            <span className="text-sm text-muted-foreground">on Google</span>
          </div>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <p className="text-sm text-muted-foreground">
            Based on <span className="font-semibold text-foreground">1,200+</span> verified reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}

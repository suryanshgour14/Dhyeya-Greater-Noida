"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { TOPPERS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function TopperCard({ topper }: { topper: (typeof TOPPERS)[number] }) {
  const airNum = parseInt(topper.rank.replace("AIR ", ""), 10);
  const isTop10 = airNum <= 10;
  const isFirst = airNum === 1;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
      }}
      className={`group relative flex flex-col items-center rounded-2xl border bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        isFirst ? "border-brand-gold/40 ring-1 ring-brand-gold/30" : "border-slate-100"
      }`}
    >
      {/* Photo */}
      <div className="relative mb-3" style={{ width: 84, height: 84 }}>
        {isTop10 && (
          <div
            className="absolute -inset-[3px] rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg,rgba(201,161,59,0.8) 0%,rgba(201,161,59,0.1) 55%,rgba(201,161,59,0.8) 100%)",
            }}
          />
        )}
        <Image
          src={topper.photo}
          alt={topper.name}
          width={84}
          height={84}
          className="relative h-full w-full rounded-full object-cover object-top ring-2 ring-white"
        />
        {isFirst && (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold shadow-md">
            <Star className="h-3 w-3 fill-brand-blue text-brand-blue" />
          </div>
        )}
      </div>

      {/* Rank */}
      <div className="flex items-center gap-1">
        <Trophy className={`h-3.5 w-3.5 ${isTop10 ? "text-brand-gold" : "text-slate-400"}`} />
        <span className={`text-sm font-extrabold ${isTop10 ? "text-brand-gold" : "text-slate-500"}`}>
          {topper.rank}
        </span>
      </div>

      <div className={`my-2 h-px w-8 ${isTop10 ? "bg-brand-gold/40" : "bg-slate-200"}`} />

      <p className="text-sm font-bold leading-snug text-brand-blue">{topper.name}</p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {topper.exam}
      </p>
    </motion.div>
  );
}

export default function ResultsGallery() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {TOPPERS.map((topper) => (
        <TopperCard key={topper.id} topper={topper} />
      ))}
    </motion.div>
  );
}

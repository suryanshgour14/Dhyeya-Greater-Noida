"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Eye, ExternalLink, PlayCircle } from "lucide-react";
import { VIDEOS_DATA } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function VideoCard({
  video,
  index,
}: {
  video: (typeof VIDEOS_DATA)[number];
  index: number;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Thumbnail / Player */}
      <div className="relative aspect-video bg-slate-900">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Thumbnail placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/20 text-brand-gold">
                <PlayCircle className="h-8 w-8" />
              </div>
            </div>
            {/* Play button overlay */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-90"
              aria-label={`Play ${video.title}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 fill-white text-white" />
              </span>
            </button>
            {/* Featured badge on first video */}
            {index === 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-2.5 py-0.5 text-[10px] font-bold text-white">
                Featured
              </span>
            )}
          </>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {video.title}
        </h3>
        <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {video.views}
          </span>
          <span>{video.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function YouTubeSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
        >
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
              <PlayCircle className="h-3.5 w-3.5" />
              Video Lectures
            </span>
            <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
              Watch &amp; Learn
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Free lectures, strategy sessions, and current affairs analysis - straight from our faculty.
            </p>
          </div>
          <Link
            href="https://www.youtube.com/@DhyeyaIAS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white"
          >
            Subscribe on YouTube
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Video cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VIDEOS_DATA.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </motion.div>

        {/* Channel stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-10 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white"
        >
          {[
            { value: "1.2L+", label: "Subscribers" },
            { value: "500+", label: "Videos" },
            { value: "2Cr+", label: "Total Views" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5 text-center">
              <span className="text-2xl font-bold text-brand-blue">{value}</span>
              <span className="mt-1 text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

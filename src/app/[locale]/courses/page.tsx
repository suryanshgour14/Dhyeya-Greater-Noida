"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";
import CourseFilterBar, { type FilterCategory, type FilterPhase } from "@/components/courses/CourseFilterBar";
import { COURSES, type Course } from "@/lib/constants";

function matchesCategory(course: Course, cat: FilterCategory) {
  if (cat === "All") return true;
  return course.category === cat;
}

function matchesPhase(course: Course, phase: FilterPhase) {
  if (phase === "All") return true;
  return course.phase === phase;
}

function buildCounts(courses: Course[]) {
  const category: Record<string, number> = { All: courses.length };
  const phase: Record<string, number> = { All: courses.length };

  courses.forEach((c) => {
    category[c.category] = (category[c.category] ?? 0) + 1;
    phase[c.phase] = (phase[c.phase] ?? 0) + 1;
  });
  return { category, phase };
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [activePhase, setActivePhase] = useState<FilterPhase>("All");

  const counts = useMemo(() => buildCounts(COURSES), []);

  const filtered = useMemo(
    () => COURSES.filter((c) => matchesCategory(c, activeCategory) && matchesPhase(c, activePhase)),
    [activeCategory, activePhase]
  );

  return (
    <>
      {/* Hero strip */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-800 text-white">
        <div className="container mx-auto px-4 py-14 md:py-20 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <GraduationCap className="h-7 w-7" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold leading-tight md:text-5xl"
          >
            Our Courses
          </motion.h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Comprehensive UPSC &amp; UPPSC preparation programmes for every aspirant — from foundation to interview.
          </p>

          {/* stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[
              { value: "10+", label: "Programmes" },
              { value: "68%", label: "Selection Rate" },
              { value: "500+", label: "Selections" },
              { value: "15+", label: "Expert Faculty" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          {/* Filter bar */}
          <CourseFilterBar
            activeCategory={activeCategory}
            activePhase={activePhase}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setActivePhase("All");
            }}
            onPhaseChange={setActivePhase}
            counts={counts}
          />

          {/* Results count */}
          <div className="mt-6 mb-4 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> programme{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` for ${activeCategory}`}
            {activePhase !== "All" && ` · ${activePhase} phase`}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, i) => (
                <CourseCard key={course.slug} course={course} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">No courses match this filter.</p>
              <button
                onClick={() => { setActiveCategory("All"); setActivePhase("All"); }}
                className="mt-4 rounded-full bg-brand-blue px-6 py-2 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

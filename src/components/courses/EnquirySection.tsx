"use client";

import { Phone, MessageSquare, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import type { Course } from "@/lib/constants";

interface EnquirySectionProps {
  course: Course;
}

const themes = {
  blue: {
    wrap:    "bg-gradient-to-br from-blue-50/60 to-sky-50/30 border border-blue-100 rounded-2xl",
    heading: "text-brand-blue",
    sub:     "text-slate-500",
    card:    "bg-white border border-slate-200/80 shadow-sm hover:shadow-md rounded-2xl",
    phone:   "text-brand-blue",
    label:   "text-slate-700 font-semibold",
    val:     "text-slate-500 text-xs",
  },
  gold: {
    wrap:    "bg-gradient-to-br from-amber-50/60 to-yellow-50/30 border border-amber-100 rounded-2xl",
    heading: "text-amber-900",
    sub:     "text-amber-700/60",
    card:    "bg-white border border-slate-200/80 shadow-sm hover:shadow-md rounded-2xl",
    phone:   "text-amber-600",
    label:   "text-slate-700 font-semibold",
    val:     "text-slate-500 text-xs",
  },
  orange: {
    wrap:    "bg-gradient-to-br from-orange-50/60 to-rose-50/20 border border-orange-100 rounded-2xl",
    heading: "text-orange-900",
    sub:     "text-orange-700/60",
    card:    "bg-white border border-slate-200/80 shadow-sm hover:shadow-md rounded-2xl",
    phone:   "text-brand-orange",
    label:   "text-slate-700 font-semibold",
    val:     "text-slate-500 text-xs",
  },
};

export default function EnquirySection({ course }: EnquirySectionProps) {
  const t = themes[course.accentColor];

  return (
    <div id="enquiry" className="scroll-mt-24">
      <div className={cn("p-6 md:p-8", t.wrap)}>
        <h2 className={cn("text-2xl font-bold", t.heading)}>Enquire About This Course</h2>
        <p className={cn("mt-1.5 text-sm", t.sub)}>
          Interested in <strong className="font-semibold">{course.title}</strong>? Our counsellors are available Mon–Sat, 9 AM to 7 PM.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {/* Call */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className={cn("flex flex-col items-center gap-2.5 p-5 text-center transition-all duration-200", t.card)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
              <Phone className={cn("h-5 w-5", t.phone)} />
            </span>
            <span className={t.label}>Call Us</span>
            <span className={t.val}>{CONTACT_INFO.phone}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I'm interested in the ${encodeURIComponent(course.title)} course.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2.5 p-5 text-center bg-white border border-slate-200/80 shadow-sm hover:shadow-md rounded-2xl transition-all duration-200"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </span>
            <span className="text-slate-700 font-semibold">WhatsApp</span>
            <span className="text-xs text-slate-500">Chat with us instantly</span>
          </a>

          {/* Visit */}
          <div className="flex flex-col items-center gap-2.5 p-5 text-center bg-white border border-slate-200/80 shadow-sm rounded-2xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50">
              <MapPin className="h-5 w-5 text-rose-500" />
            </span>
            <span className="text-slate-700 font-semibold">Visit Centre</span>
            <span className="text-xs text-slate-500 leading-snug">{CONTACT_INFO.address}</span>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">{CONTACT_INFO.hours}</p>
      </div>
    </div>
  );
}

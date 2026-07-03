import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, Users, MapPin, Phone, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Batch Details | Dhyeya IAS Greater Noida",
  description:
    "View current batch schedules, timings, faculty, and classroom allotments for all ongoing UPSC and State PSC coaching programmes.",
};

type BatchStatus = "ongoing" | "filling" | "upcoming";
const BATCHES: { name: string; code: string; time: string; days: string; faculty: string; room: string; seats: string; status: BatchStatus; exam: string }[] = [
  {
    name: "15-Month GS Foundation — Morning",
    code: "GS-F-01",
    time: "7:00 AM – 10:00 AM",
    days: "Mon – Sat",
    faculty: "Dr. R. K. Sharma, Prof. Anita Singh",
    room: "Lecture Hall A",
    seats: "60 / 60",
    status: "ongoing",
    exam: "UPSC CSE",
  },
  {
    name: "1-Year UPPSC PCS Comprehensive — Morning",
    code: "PCS-C-01",
    time: "10:30 AM – 1:30 PM",
    days: "Mon – Sat",
    faculty: "Prof. Vinod Yadav, Dr. Priya Mishra",
    room: "Lecture Hall B",
    seats: "55 / 60",
    status: "ongoing",
    exam: "UPPSC PCS",
  },
  {
    name: "3-Year UDAAN Integrated — Evening",
    code: "UDAAN-01",
    time: "4:00 PM – 7:00 PM",
    days: "Mon – Sat",
    faculty: "Senior Faculty Team",
    room: "Seminar Hall",
    seats: "28 / 30",
    status: "ongoing",
    exam: "UPSC + UPPSC",
  },
  {
    name: "4-Month CSAT Mastery",
    code: "CSAT-01",
    time: "2:00 PM – 4:00 PM",
    days: "Mon – Fri",
    faculty: "Prof. Rakesh Gupta",
    room: "Room 204",
    seats: "45 / 80",
    status: "ongoing",
    exam: "UPSC CSAT",
  },
  {
    name: "4-Month UPPCS Prelims Crash Course",
    code: "PCS-CC-01",
    time: "7:00 AM – 10:00 AM",
    days: "Mon – Sat",
    faculty: "Prof. Mahesh Tiwari",
    room: "Room 301",
    seats: "72 / 80",
    status: "filling",
    exam: "UPPSC Prelims",
  },
  {
    name: "15-Month GS Foundation — July 2026",
    code: "GS-F-02",
    time: "10:30 AM – 1:30 PM",
    days: "Mon – Sat",
    faculty: "TBA",
    room: "Lecture Hall A",
    seats: "0 / 60",
    status: "upcoming",
    exam: "UPSC CSE",
  },
];

const STATUS_MAP = {
  ongoing:  { label: "Ongoing",  cls: "bg-green-100 text-green-700 border-green-200" },
  filling:  { label: "Filling Fast", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  upcoming: { label: "Upcoming", cls: "bg-blue-100 text-blue-700 border-blue-200" },
} as const;

export default function BatchDetailsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-blue py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container relative mx-auto px-4">
          <Link href="/student-zone" className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> Student Zone
          </Link>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Student Zone
          </p>
          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">
            Batch Details
          </h1>
          <p className="max-w-lg text-base text-slate-300">
            Current batch schedules, timings, faculty assignments, and seat availability for all ongoing programmes.
          </p>
        </div>
      </section>

      {/* Batch grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BATCHES.map((b) => {
            const s = STATUS_MAP[b.status];
            return (
              <div key={b.code} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {b.code}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.cls}`}>
                    {s.label}
                  </span>
                </div>

                <h3 className="mb-1 text-sm font-bold leading-snug text-slate-900">{b.name}</h3>
                <p className="mb-4 text-xs font-semibold text-brand-blue">{b.exam}</p>

                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                    {b.time} · {b.days}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                    {b.faculty}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                    {b.room}
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                    Seats: {b.seats}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact note */}
        <div className="mt-10 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
          <p className="mb-1 text-sm font-bold text-slate-800">Need the latest schedule?</p>
          <p className="mb-4 text-sm text-slate-500">
            Schedules are updated regularly. For the most accurate batch timing, faculty details, or to check seat availability, please contact our admissions office.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+919205336037" className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800">
              <Phone className="h-4 w-4" /> Call: +91 92053 36037
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-blue/30 hover:text-brand-blue">
              Enquiry Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

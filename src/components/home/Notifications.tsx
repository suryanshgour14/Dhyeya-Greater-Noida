"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Bell, ArrowRight, ExternalLink } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date_label: string;
  is_new: boolean;
}

interface Props {
  initialItems?: NotificationItem[];
}

export default function Notifications({ initialItems = [] }: Props) {
  const locale = useLocale();

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8"
        >
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
            <Bell className="h-3.5 w-3.5" />
            Notice Board
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            Latest Notifications
          </h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with test schedules, exam alerts, and institute news.
          </p>
        </motion.div>

        {initialItems.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-muted-foreground shadow-sm">
            No notifications at the moment. Check back soon.
          </div>
        ) : (
          <ul className="space-y-3">
            {initialItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex items-start gap-4 rounded-xl border border-transparent bg-white p-4 shadow-sm transition-all hover:border-brand-blue/20 hover:shadow-md"
              >
                {item.date_label ? (
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-blue/5 text-center">
                    <span className="text-[11px] font-bold leading-none text-brand-blue">
                      {item.date_label.split(" ")[0]}
                    </span>
                    <span className="mt-0.5 text-[10px] text-muted-foreground">
                      {item.date_label.split(" ")[1] ?? ""}
                    </span>
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/5">
                    <Bell className="h-4 w-4 text-brand-blue/60" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-sm font-semibold text-foreground leading-snug">
                      {item.title}
                    </p>
                    {item.is_new && (
                      <span className="shrink-0 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                        NEW
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  )}
                </div>

                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-blue" />
              </motion.li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <Link
            href={`/${locale}/student-zone/notifications`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
          >
            View All Notifications
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

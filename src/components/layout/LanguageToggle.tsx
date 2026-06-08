"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-full border px-1 py-0.5 text-sm">
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`rounded-full px-2 py-0.5 transition-colors disabled:opacity-60 ${
          locale === "en" ? "bg-primary text-white" : "hover:bg-muted"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("hi")}
        disabled={isPending}
        className={`rounded-full px-2 py-0.5 transition-colors disabled:opacity-60 ${
          locale === "hi" ? "bg-primary text-white" : "hover:bg-muted"
        }`}
      >
        हि
      </button>
    </div>
  );
}

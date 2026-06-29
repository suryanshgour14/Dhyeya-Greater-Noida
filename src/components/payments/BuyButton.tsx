"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, CheckCircle2, Loader2, LogIn, ArrowRight, XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

// Razorpay is loaded from CDN at runtime — not bundled
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { Razorpay: new (o: any) => { open(): void } }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

export interface BuyButtonProps {
  productId: string;
  /** Server-resolved enrollment state so the button renders correctly on first paint */
  isEnrolled?: boolean;
  /** Path to send the student after successful enrollment (locale-relative, e.g. /courses/ias-foundation) */
  redirectTo: string;
  label?: string;
  enrolledLabel?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "navy";
}

export default function BuyButton({
  productId,
  isEnrolled: serverEnrolled = false,
  redirectTo,
  label = "Enroll Now",
  enrolledLabel = "Access Now",
  className,
  size = "md",
  variant = "gold",
}: BuyButtonProps) {
  const locale    = useLocale();
  const router    = useRouter();
  const pathname  = usePathname();
  const supabase  = createClient();

  const [enrolled, setEnrolled]   = useState(serverEnrolled);
  const [loggedIn, setLoggedIn]   = useState<boolean | null>(null);
  const [busy, setBusy]           = useState(false);
  const [toast, setToast]         = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
  }, [supabase]);

  function flash(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 5000);
  }

  async function handleClick() {
    if (!loggedIn) {
      router.push(`/${locale}/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (enrolled) {
      router.push(`/${locale}${redirectTo}`);
      return;
    }

    setBusy(true);
    try {
      const ready = await loadRazorpay();
      if (!ready) {
        flash("Failed to load payment gateway. Check your internet connection.", false);
        setBusy(false);
        return;
      }

      // Step 1 — create server-side order (price read from DB, not client)
      const res  = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      let data: Record<string, string> = {};
      try {
        data = await res.json();
      } catch {
        flash("Server error — check console for details", false);
        setBusy(false);
        return;
      }

      if (!res.ok) {
        flash(data.error ?? "Could not create order", false);
        setBusy(false);
        return;
      }

      const { razorpayOrderId, amount, currency, keyId, orderId, productTitle, prefill } = data;

      // Step 2 — open Razorpay hosted checkout (card data never touches our server)
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "Dhyeya IAS Greater Noida",
        description: productTitle,
        order_id: razorpayOrderId,
        prefill,
        theme: { color: "#0B1C3D" },
        modal: {
          ondismiss: () => setBusy(false),
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // Step 3 — server verifies signature and grants enrollment
          const vRes  = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, orderId }),
          });
          const vData = await vRes.json();
          setBusy(false);

          if (vRes.ok && vData.success) {
            setEnrolled(true);
            flash("Payment successful! You are now enrolled.", true);
            setTimeout(() => router.push(
              `/${locale}/payment/success?ref=${response.razorpay_payment_id}&product=${encodeURIComponent(productTitle)}`
            ), 1800);
          } else {
            flash(vData.error ?? "Verification failed. Please contact support.", false);
          }
        },
      });

      rzp.open();
    } catch {
      flash("Something went wrong. Please try again.", false);
      setBusy(false);
    }
  }

  const pad = { sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" }[size];

  // Skeleton while checking auth
  if (loggedIn === null) {
    return <div className={cn("h-11 animate-pulse rounded-2xl bg-slate-200", className)} />;
  }

  const btnColor = enrolled
    ? "bg-green-600 text-white hover:bg-green-700"
    : !loggedIn
    ? "bg-brand-blue text-white hover:bg-brand-blue/90"
    : variant === "gold"
    ? "bg-brand-gold text-brand-blue hover:opacity-90"
    : "bg-brand-blue text-white hover:bg-brand-blue/90";

  return (
    <div className="relative inline-block">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            className={cn(
              "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap",
              "rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-lg",
              toast.ok ? "bg-green-600" : "bg-red-600"
            )}
          >
            <span className="flex items-center gap-1.5">
              {toast.ok
                ? <CheckCircle2 className="h-3.5 w-3.5" />
                : <XCircle className="h-3.5 w-3.5" />}
              {toast.msg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        disabled={busy}
        whileHover={{ scale: busy ? 1 : 1.03 }}
        whileTap={{ scale: busy ? 1 : 0.97 }}
        className={cn(
          "inline-flex items-center gap-2 rounded-2xl font-bold transition-all",
          pad, btnColor,
          busy && "opacity-60 cursor-not-allowed",
          className,
        )}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" />
          : enrolled ? <CheckCircle2 className="h-4 w-4" />
          : !loggedIn ? <LogIn className="h-4 w-4" />
          : <ShoppingCart className="h-4 w-4" />}
        <span>
          {busy ? "Processing…"
            : enrolled ? enrolledLabel
            : !loggedIn ? "Login to Enroll"
            : label}
        </span>
        {!busy && <ArrowRight className="h-4 w-4" />}
      </motion.button>
    </div>
  );
}

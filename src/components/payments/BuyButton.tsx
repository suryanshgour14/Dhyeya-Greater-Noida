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
import type { PaymentDetails } from "@/lib/payment-details";
import EnrollDetailsDialog from "./EnrollDetailsDialog";

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
  /** Shown in the details-form header (optional, improves UX). */
  productTitle?: string;
  priceLabel?: string;
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
  productTitle,
  priceLabel,
}: BuyButtonProps) {
  const locale    = useLocale();
  const router    = useRouter();
  const pathname  = usePathname();
  const supabase  = createClient();

  const [enrolled, setEnrolled]   = useState(serverEnrolled);
  const [loggedIn, setLoggedIn]   = useState<boolean | null>(null);
  const [busy, setBusy]           = useState(false);
  const [toast, setToast]         = useState<{ msg: string; ok: boolean } | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [prefill, setPrefill]       = useState<Partial<PaymentDetails>>({});
  const [payError, setPayError]     = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
  }, [supabase]);

  function flash(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 5000);
  }

  // Step 0 — click: gate on auth/enrollment, then open the details form
  async function handleClick() {
    if (!loggedIn) {
      router.push(`/${locale}/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (enrolled) {
      router.push(`/${locale}${redirectTo}`);
      return;
    }
    setPayError("");
    // Prefill the form from the saved profile (best-effort)
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: p } = await supabase
          .from("profiles")
          .select("full_name, father_name, mother_name, phone, state, city, address, pincode")
          .eq("id", user.id)
          .maybeSingle();
        setPrefill({
          fullName:   p?.full_name   ?? "",
          fatherName: p?.father_name ?? "",
          motherName: p?.mother_name ?? "",
          mobile:     p?.phone       ?? "",
          email:      user.email     ?? "",
          state:      p?.state       ?? "",
          city:       p?.city        ?? "",
          address:    p?.address     ?? "",
          pincode:    p?.pincode     ?? "",
        });
      }
    } catch { /* prefill is optional */ }
    setDialogOpen(true);
  }

  // Step 1→2 — details submitted: create order, open Razorpay checkout
  async function startPayment(details: PaymentDetails) {
    setPayError("");
    setBusy(true);
    try {
      const ready = await loadRazorpay();
      if (!ready) {
        setPayError("Failed to load the payment gateway. Check your internet connection.");
        setBusy(false);
        return;
      }

      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, details }),
      });

      let data: Record<string, string> = {};
      try { data = await res.json(); } catch {
        setPayError("Server error — please try again.");
        setBusy(false);
        return;
      }

      if (!res.ok) {
        // Already-enrolled / validation / product errors surface in the dialog
        setPayError(data.error ?? "Could not start the payment. Please try again.");
        setBusy(false);
        if (data.error === "You are already enrolled in this product") {
          setEnrolled(true);
          setDialogOpen(false);
        }
        return;
      }

      const { razorpayOrderId, amount, currency, keyId, orderId, productTitle: title, prefill: rzpPrefill } = data;

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "Dhyeya IAS Greater Noida",
        description: title,
        order_id: razorpayOrderId,
        prefill: rzpPrefill,
        theme: { color: "#0B1C3D" },
        modal: {
          ondismiss: () => {
            setBusy(false);
            flash("Payment cancelled. You can retry anytime.", false);
          },
        },
        // Step 3 — server verifies signature and grants enrollment
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
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
                `/${locale}/payment/success?ref=${response.razorpay_payment_id}&product=${encodeURIComponent(title)}`
              ), 1400);
            } else {
              // Verify failed on the browser, but the webhook may still settle it.
              pollOrderStatus(orderId, title, response.razorpay_payment_id);
            }
          } catch {
            pollOrderStatus(orderId, title, response.razorpay_payment_id);
          }
        },
      });

      // Details captured & order created — hand off to Razorpay's checkout
      setDialogOpen(false);
      setBusy(false);
      rzp.open();
    } catch {
      setPayError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  // Recovery — browser didn't get verify success; wait for the webhook to settle
  async function pollOrderStatus(orderId: string, title: string, paymentRef: string) {
    flash("Confirming your payment…", true);
    for (let i = 0; i < 12; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const r = await fetch(`/api/payments/order-status?orderId=${orderId}`);
        if (!r.ok) continue;
        const d = await r.json();
        if (d.status === "paid") {
          setEnrolled(true);
          router.push(`/${locale}/payment/success?ref=${paymentRef}&product=${encodeURIComponent(title)}`);
          return;
        }
        if (d.status === "failed") {
          flash("Payment failed. If money was deducted it will be auto-refunded.", false);
          return;
        }
      } catch { /* keep polling */ }
    }
    flash("Payment is still processing. Check 'My Purchases' in a few minutes.", false);
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
        disabled={busy || dialogOpen}
        whileHover={{ scale: busy ? 1 : 1.03 }}
        whileTap={{ scale: busy ? 1 : 0.97 }}
        className={cn(
          "inline-flex items-center gap-2 rounded-2xl font-bold transition-all",
          pad, btnColor,
          (busy || dialogOpen) && "opacity-60 cursor-not-allowed",
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

      <EnrollDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={startPayment}
        submitting={busy}
        defaultValues={prefill}
        productTitle={productTitle ?? label ?? "This programme"}
        priceLabel={priceLabel}
        error={payError}
      />
    </div>
  );
}

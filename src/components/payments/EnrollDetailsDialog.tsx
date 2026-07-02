"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, ShieldCheck, Lock } from "lucide-react";
import {
  PaymentDetailsSchema,
  type PaymentDetails,
  INDIAN_STATES,
} from "@/lib/payment-details";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Parent runs create-order + opens Razorpay. Dialog stays in a loading state until then. */
  onSubmit: (details: PaymentDetails) => void;
  submitting: boolean;
  defaultValues?: Partial<PaymentDetails>;
  productTitle: string;
  priceLabel?: string;
  /** Server-side error (e.g. create-order failed) shown inside the dialog. */
  error?: string;
}

const EMPTY: PaymentDetails = {
  fullName: "", fatherName: "", motherName: "", mobile: "", email: "",
  state: "", city: "", address: "", pincode: "",
};

export default function EnrollDetailsDialog({
  open, onClose, onSubmit, submitting, defaultValues, productTitle, priceLabel, error,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<PaymentDetails>({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues: EMPTY,
  });

  // Re-seed the form each time it opens (prefill from profile)
  useEffect(() => {
    if (open) reset({ ...EMPTY, ...defaultValues });
  }, [open, defaultValues, reset]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !submitting && onClose()}
        >
          <motion.div
            className="relative my-8 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="rounded-t-2xl bg-gradient-to-r from-slate-800 to-brand-blue px-6 py-5 text-white">
              <button
                type="button"
                onClick={() => !submitting && onClose()}
                disabled={submitting}
                className="absolute right-4 top-4 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Enrollment Details</p>
              <h2 className="mt-1 text-lg font-bold leading-snug">{productTitle}</h2>
              {priceLabel && (
                <p className="mt-1 text-sm text-white/70">
                  Amount payable: <span className="font-bold text-white">{priceLabel}</span>
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <p className="mb-4 text-xs text-slate-500">
                All fields are required. These details are shared with the institute to enrol you and grant access on the app.
              </p>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input {...register("fullName")} disabled={submitting} className={inputCls} placeholder="Your full name" />
                </Field>
                <Field label="Mobile Number" error={errors.mobile?.message}>
                  <input {...register("mobile")} disabled={submitting} inputMode="numeric" maxLength={10} className={inputCls} placeholder="10-digit mobile" />
                </Field>
                <Field label="Father's Name" error={errors.fatherName?.message}>
                  <input {...register("fatherName")} disabled={submitting} className={inputCls} placeholder="Father's name" />
                </Field>
                <Field label="Mother's Name" error={errors.motherName?.message}>
                  <input {...register("motherName")} disabled={submitting} className={inputCls} placeholder="Mother's name" />
                </Field>
                <Field label="Email Address" error={errors.email?.message} full>
                  <input {...register("email")} disabled={submitting} type="email" className={inputCls} placeholder="you@example.com" />
                </Field>
                <Field label="State" error={errors.state?.message}>
                  <select {...register("state")} disabled={submitting} className={inputCls} defaultValue="">
                    <option value="" disabled>Select state</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="City" error={errors.city?.message}>
                  <input {...register("city")} disabled={submitting} className={inputCls} placeholder="Your city" />
                </Field>
                <Field label="Full Address" error={errors.address?.message} full>
                  <textarea {...register("address")} disabled={submitting} rows={2} className={inputCls} placeholder="House / street / area" />
                </Field>
                <Field label="Pincode" error={errors.pincode?.message}>
                  <input {...register("pincode")} disabled={submitting} inputMode="numeric" maxLength={6} className={inputCls} placeholder="6-digit pincode" />
                </Field>
              </div>

              {error && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-blue transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening secure payment…</>
                  : <><Lock className="h-4 w-4" /> Proceed to Pay{priceLabel ? ` ${priceLabel}` : ""}</>}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Secure payment via Razorpay · we never store card details
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/15 disabled:bg-slate-50 disabled:text-slate-400";

function Field({
  label, error, children, full = false,
}: {
  label: string; error?: string; children: React.ReactNode; full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </div>
  );
}

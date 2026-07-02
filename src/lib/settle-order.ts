import type { SupabaseClient } from "@supabase/supabase-js";
import { notifyOwner } from "./notify-owner";

// Single source of truth for "a payment succeeded → settle the order".
// Called by BOTH the browser-driven verify route AND the Razorpay webhook.
// Whichever runs first grants access; the other is a harmless no-op. The
// owner email is sent EXACTLY ONCE via an atomic claim on owner_notified_at.

export interface SettleInput {
  service: SupabaseClient;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  method?: string | null;
  signature?: string | null;
  /** Captured amount in paise (from the webhook entity) — enables amount verification. */
  expectedAmountPaise?: number | null;
  /** When set (verify path), the settle only proceeds if the order belongs to this user. */
  studentIdGuard?: string;
}

export interface SettleResult {
  ok: boolean;
  reason?: "order_not_found" | "ownership_mismatch" | "amount_mismatch";
  status?: string;
  productType?: string;
  productRefSlug?: string | null;
  productRefId?: string | null;
  productTitle?: string;
}

export async function settleOrder(input: SettleInput): Promise<SettleResult> {
  const {
    service, razorpayOrderId, razorpayPaymentId,
    method, signature, expectedAmountPaise, studentIdGuard,
  } = input;

  const { data: order } = await service
    .from("orders")
    .select("id, student_id, product_id, amount_inr, status, owner_notified_at")
    .eq("razorpay_order_id", razorpayOrderId)
    .single();

  if (!order) return { ok: false, reason: "order_not_found" };
  if (studentIdGuard && order.student_id !== studentIdGuard) {
    return { ok: false, reason: "ownership_mismatch" };
  }

  // ── Amount verification (defense in depth) ──────────────────────────
  // The order amount was set server-side from products.price_inr, so if the
  // captured amount doesn't match, something is wrong — never grant.
  if (expectedAmountPaise != null) {
    const orderPaise = Math.round(Number(order.amount_inr) * 100);
    if (expectedAmountPaise !== orderPaise) {
      await service.from("orders").update({ status: "failed" })
        .eq("id", order.id).neq("status", "paid");
      return { ok: false, reason: "amount_mismatch" };
    }
  }

  const { data: product } = await service
    .from("products")
    .select("type, ref_id, ref_slug, access_days, title")
    .eq("id", order.product_id)
    .single();

  const expiresAt = product?.access_days
    ? new Date(Date.now() + Number(product.access_days) * 86_400_000).toISOString()
    : null;

  // ── Idempotent grant (only the first settler writes) ────────────────
  if (order.status !== "paid") {
    await service.from("payments").upsert(
      {
        order_id: order.id,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: signature ?? null,
        status: "captured",
        method: method ?? null,
        amount_inr: order.amount_inr,
      },
      { onConflict: "razorpay_payment_id", ignoreDuplicates: true },
    );
    await service.from("orders")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", order.id).neq("status", "paid");
    await service.from("enrollments").upsert(
      { student_id: order.student_id, product_id: order.product_id, expires_at: expiresAt, source: "payment" },
      { onConflict: "student_id,product_id" },
    );
  }

  // ── Notify owner exactly once ───────────────────────────────────────
  await maybeNotifyOwner(service, order.id, razorpayPaymentId, product);

  return {
    ok: true,
    status: "paid",
    productType: product?.type,
    productRefSlug: product?.ref_slug ?? null,
    productRefId: product?.ref_id ?? null,
    productTitle: product?.title,
  };
}

async function maybeNotifyOwner(
  service: SupabaseClient,
  orderId: string,
  paymentId: string,
  product: { type?: string; title?: string } | null,
) {
  // Atomically claim the notification: only the row where owner_notified_at
  // is still null gets updated + returned, so exactly one caller sends.
  const { data: claimed } = await service
    .from("orders")
    .update({ owner_notified_at: new Date().toISOString() })
    .eq("id", orderId)
    .eq("status", "paid")
    .is("owner_notified_at", null)
    .select("amount_inr, razorpay_order_id, paid_at")
    .maybeSingle();

  if (!claimed) return; // already notified (or not paid yet)

  const { data: d } = await service
    .from("order_details")
    .select("*")
    .eq("order_id", orderId)
    .maybeSingle();

  const res = await notifyOwner({
    fullName:   d?.full_name   ?? "—",
    fatherName: d?.father_name ?? "—",
    motherName: d?.mother_name ?? "—",
    mobile:     d?.mobile      ?? "—",
    email:      d?.email       ?? "—",
    state:      d?.state       ?? "—",
    city:       d?.city        ?? "—",
    address:    d?.address     ?? "—",
    pincode:    d?.pincode     ?? "—",
    productTitle: product?.title ?? "Purchase",
    productType:  product?.type  ?? "",
    amountInr:  Number(claimed.amount_inr),
    razorpayPaymentId: paymentId,
    razorpayOrderId:   claimed.razorpay_order_id as string,
    paidAt: (claimed.paid_at as string) ?? new Date().toISOString(),
    status: "captured",
  });

  // If the email failed, release the claim so the webhook/reconcile retries.
  if (!res.ok) {
    await service.from("orders").update({ owner_notified_at: null }).eq("id", orderId);
  }
}

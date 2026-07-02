import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createServiceClient } from '@/lib/supabase/service';
import { settleOrder } from '@/lib/settle-order';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const razorpayClient = () => new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

type RzpPayment = { id: string; status: string; amount: number; method?: string };

// Cron backstop (Vercel Cron → GET with Authorization: Bearer CRON_SECRET).
// Recovers "money left the bank but the frontend never confirmed" and any
// order whose owner email failed to send earlier.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization');
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const service = createServiceClient();
  const rzp = razorpayClient();

  const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString();          // stuck > 10 min
  const floor  = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(); // within last 3 days

  const summary = { checked: 0, reconciled: 0, failed: 0, notified: 0 };

  // ── A) Stuck 'created' orders — ask Razorpay what actually happened ──────
  const { data: stuck } = await service
    .from('orders')
    .select('id, razorpay_order_id')
    .eq('status', 'created')
    .lt('created_at', cutoff)
    .gt('created_at', floor)
    .limit(50);

  for (const o of stuck ?? []) {
    summary.checked++;
    try {
      const res = await rzp.orders.fetchPayments(o.razorpay_order_id) as unknown as { items?: RzpPayment[] };
      const items = res.items ?? [];
      const captured = items.find((p) => p.status === 'captured');
      if (captured) {
        const r = await settleOrder({
          service,
          razorpayOrderId:     o.razorpay_order_id,
          razorpayPaymentId:   captured.id,
          method:              captured.method ?? null,
          expectedAmountPaise: captured.amount,
        });
        if (r.ok) summary.reconciled++;
      } else if (items.length > 0 && items.every((p) => p.status === 'failed')) {
        await service.from('orders').update({ status: 'failed' }).eq('id', o.id).neq('status', 'paid');
        summary.failed++;
      }
    } catch (e) {
      console.error('[reconcile] fetchPayments failed for', o.razorpay_order_id, e instanceof Error ? e.message : e);
    }
  }

  // ── B) Paid but owner email never sent — retry the notification ─────────
  const { data: unnotified } = await service
    .from('orders')
    .select('razorpay_order_id, payments(razorpay_payment_id)')
    .eq('status', 'paid')
    .is('owner_notified_at', null)
    .limit(50);

  for (const o of unnotified ?? []) {
    const pid = o.payments?.[0]?.razorpay_payment_id;
    if (!pid) continue;
    const r = await settleOrder({
      service,
      razorpayOrderId:   o.razorpay_order_id,
      razorpayPaymentId: pid,
    });
    if (r.ok) summary.notified++;
  }

  return NextResponse.json({ ok: true, ...summary });
}

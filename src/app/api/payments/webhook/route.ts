import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/service';
import { settleOrder } from '@/lib/settle-order';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Read raw body FIRST (needed for signature verification)
  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature') ?? '';
  const eventId   = request.headers.get('x-razorpay-event-id') ?? '';

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest('hex');

  let valid = false;
  try {
    valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    valid = false;
  }

  if (!valid) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    event: string;
    payload: { payment: { entity: { id: string; order_id: string; method?: string; amount?: number } } };
  };

  const service = createServiceClient();

  // ── Idempotency: ignore a Razorpay event we've already processed ─────────
  if (eventId) {
    const { error: dupErr } = await service
      .from('webhook_events')
      .insert({ event_id: eventId, event_type: event.event });
    // Unique-violation → we've seen this event; ack 200 so Razorpay stops retrying.
    if (dupErr && dupErr.code === '23505') {
      return NextResponse.json({ received: true, duplicate: true });
    }
  }

  if (event.event === 'payment.captured') {
    const entity = event.payload.payment.entity;
    await settleOrder({
      service,
      razorpayOrderId:     entity.order_id,
      razorpayPaymentId:   entity.id,
      method:              entity.method ?? null,
      expectedAmountPaise: entity.amount ?? null,
    });
  } else if (event.event === 'payment.failed') {
    const rzpOrderId = event.payload.payment.entity.order_id;
    await service.from('orders').update({ status: 'failed' })
      .eq('razorpay_order_id', rzpOrderId).neq('status', 'paid');
  }

  // Always 200 quickly on a valid, processed event — Razorpay retries non-200.
  return NextResponse.json({ received: true });
}

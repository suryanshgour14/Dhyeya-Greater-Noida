import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Read raw body FIRST (needed for signature verification)
  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature') ?? '';

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

  // Respond 200 quickly; Razorpay retries on non-200
  const event = JSON.parse(rawBody) as {
    event: string;
    payload: { payment: { entity: { id: string; order_id: string; method?: string } } };
  };

  const service = createServiceClient();

  if (event.event === 'payment.captured') {
    const entity = event.payload.payment.entity;
    const rzpOrderId  = entity.order_id;
    const rzpPaymentId = entity.id;
    const method = entity.method ?? '';

    const { data: order } = await service
      .from('orders')
      .select('id, student_id, product_id, status')
      .eq('razorpay_order_id', rzpOrderId)
      .single();

    if (order && order.status !== 'paid') {
      const { data: product } = await service
        .from('products')
        .select('access_days')
        .eq('id', order.product_id)
        .single();

      const expiresAt = product?.access_days
        ? new Date(Date.now() + (product.access_days as number) * 86_400_000).toISOString()
        : null;

      // Idempotent writes — safe even if verify already ran
      await service.from('payments').upsert(
        { order_id: order.id, razorpay_payment_id: rzpPaymentId, status: 'captured', method },
        { onConflict: 'razorpay_payment_id', ignoreDuplicates: true },
      );
      await service.from('orders').update({ status: 'paid' }).eq('id', order.id);
      await service.from('enrollments').upsert(
        { student_id: order.student_id, product_id: order.product_id, expires_at: expiresAt, source: 'payment' },
        { onConflict: 'student_id,product_id' },
      );
    }
  } else if (event.event === 'payment.failed') {
    const rzpOrderId = event.payload.payment.entity.order_id;
    await service.from('orders').update({ status: 'failed' }).eq('razorpay_order_id', rzpOrderId);
  }

  return NextResponse.json({ received: true });
}

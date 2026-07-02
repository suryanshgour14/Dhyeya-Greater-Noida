import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { settleOrder } from '@/lib/settle-order';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Login required' }, { status: 401 });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = await request.json() as {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderId: string;
  };

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 });
  }

  // ── 1) Verify the checkout signature: HMAC(order_id|payment_id, secret) ──
  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(payload)
    .digest('hex');

  let valid = false;
  try {
    valid = crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(razorpay_signature, 'hex'),
    );
  } catch {
    valid = false;
  }

  const service = createServiceClient();

  if (!valid) {
    if (orderId) {
      await service.from('orders').update({ status: 'failed' })
        .eq('id', orderId).eq('student_id', user.id).neq('status', 'paid');
    }
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
  }

  // ── 2) Settle (idempotent grant + notify-once), guarded to this user ────
  const result = await settleOrder({
    service,
    razorpayOrderId:   razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    signature:         razorpay_signature,
    studentIdGuard:    user.id,
  });

  if (!result.ok) {
    const status = result.reason === 'order_not_found' || result.reason === 'ownership_mismatch' ? 404 : 400;
    return NextResponse.json({ error: 'Payment could not be verified', reason: result.reason }, { status });
  }

  // ── 3) Where to send the student next ───────────────────────────────────
  let redirectUrl = '/dashboard?tab=courses';
  if (result.productType === 'course' && result.productRefSlug) redirectUrl = `/courses/${result.productRefSlug}`;
  else if (result.productType === 'test' && result.productRefId) redirectUrl = `/tests/${result.productRefId}`;

  return NextResponse.json({ success: true, redirectUrl });
}

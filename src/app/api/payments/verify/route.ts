import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

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

  // Recompute HMAC-SHA256 and compare with timing-safe compare
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
    // Mark order failed (best-effort)
    if (orderId) {
      await service.from('orders').update({ status: 'failed' })
        .eq('id', orderId).eq('student_id', user.id);
    }
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
  }

  // Look up order by Razorpay order id
  const { data: order } = await service
    .from('orders')
    .select('id, student_id, product_id, status')
    .eq('razorpay_order_id', razorpay_order_id)
    .single();

  if (!order || order.student_id !== user.id) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Fetch product for access_days + redirect target
  const { data: product } = await service
    .from('products')
    .select('type, ref_id, ref_slug, access_days, title')
    .eq('id', order.product_id)
    .single();

  const expiresAt = product?.access_days
    ? new Date(Date.now() + (product.access_days as number) * 86_400_000).toISOString()
    : null;

  // Idempotent grant: only write if not already paid
  if (order.status !== 'paid') {
    await service.from('payments').upsert(
      { order_id: order.id, razorpay_payment_id, razorpay_signature, status: 'captured' },
      { onConflict: 'razorpay_payment_id', ignoreDuplicates: true },
    );
    await service.from('orders').update({ status: 'paid' }).eq('id', order.id);
    await service.from('enrollments').upsert(
      { student_id: order.student_id, product_id: order.product_id, expires_at: expiresAt, source: 'payment' },
      { onConflict: 'student_id,product_id' },
    );
  }

  // Determine where to send the student next
  let redirectUrl = '/purchases';
  if (product?.type === 'course' && product.ref_slug) redirectUrl = `/courses/${product.ref_slug}`;
  else if (product?.type === 'test' && product.ref_id) redirectUrl = `/tests/${product.ref_id}`;

  return NextResponse.json({ success: true, redirectUrl });
}

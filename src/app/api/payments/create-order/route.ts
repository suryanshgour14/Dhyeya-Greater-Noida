import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createServerClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  // Auth check
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Login required' }, { status: 401 });

  const body = await request.json();
  const { productId } = body as { productId?: string };
  if (!productId) return NextResponse.json({ error: 'productId is required' }, { status: 400 });

  const service = createServiceClient();

  // Read price from DB — the client NEVER sends the amount
  const { data: product } = await service
    .from('products')
    .select('*')
    .eq('id', productId)
    .eq('is_active', true)
    .single();

  if (!product) {
    return NextResponse.json({ error: 'Product not found or inactive' }, { status: 404 });
  }

  // Block double-buy (check for active enrollment)
  const { data: existing } = await service
    .from('enrollments')
    .select('id, expires_at')
    .eq('student_id', user.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (existing) {
    const active = existing.expires_at === null || new Date(existing.expires_at) > new Date();
    if (active) {
      return NextResponse.json({ error: 'You are already enrolled in this product' }, { status: 400 });
    }
  }

  // Create Razorpay order — amount in paise
  const amountPaise = Math.round(Number(product.price_inr) * 100);
  const rzpOrder = await razorpay.orders.create({
    amount: amountPaise,
    currency: 'INR',
    notes: { productId: product.id, studentId: user.id },
  });

  // Persist our order row via service role
  const { data: order, error: orderErr } = await service
    .from('orders')
    .insert({
      student_id: user.id,
      product_id: product.id,
      amount_inr: product.price_inr,
      razorpay_order_id: rzpOrder.id,
      status: 'created',
    })
    .select('id')
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ error: 'Failed to create order record' }, { status: 500 });
  }

  // Profile for prefill (best-effort)
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, phone')
    .eq('id', user.id)
    .maybeSingle();

  return NextResponse.json({
    razorpayOrderId: rzpOrder.id,
    amount: amountPaise,
    currency: 'INR',
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    orderId: order.id,
    productTitle: product.title,
    prefill: {
      name: profile?.name ?? '',
      email: user.email ?? '',
      contact: profile?.phone ?? '',
    },
  });
}

import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@/lib/supabase/server';

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Anon client — used for public reads (products table has anon SELECT policy)
const anonDb = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Service client — used only for writes that bypass RLS
const serviceDb = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
};

export async function POST(request: NextRequest) {
  try {
    // ── Auth check ─────────────────────────────────────────────────────────────
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Login required' }, { status: 401 });

    const body = await request.json();
    const { productId } = body as { productId?: string };
    if (!productId) return NextResponse.json({ error: 'productId is required' }, { status: 400 });

    const anon = anonDb();

    // ── Read product (public policy — anon key is fine) ──────────────────────
    const { data: product, error: productErr } = await anon
      .from('products')
      .select('id, title, price_inr, is_active, access_days')
      .eq('id', productId)
      .eq('is_active', true)
      .single();

    if (productErr || !product) {
      return NextResponse.json(
        { error: 'Product not found or inactive. Make sure you have run 007_products_seed.sql in Supabase.' },
        { status: 404 },
      );
    }

    // ── Double-buy check (user reads own enrollments — anon + user session) ──
    const { data: existing } = await supabase
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

    // ── Create Razorpay order ─────────────────────────────────────────────────
    const amountPaise = Math.round(Number(product.price_inr) * 100);
    const rzpOrder = await razorpay.orders.create({
      amount:   amountPaise,
      currency: 'INR',
      notes:    { productId: product.id, studentId: user.id },
    });

    // ── Persist order row (needs service role — no student INSERT policy) ─────
    const service = serviceDb();
    const { data: order, error: orderErr } = await service
      .from('orders')
      .insert({
        student_id:        user.id,
        product_id:        product.id,
        amount_inr:        product.price_inr,
        razorpay_order_id: rzpOrder.id,
        status:            'created',
      })
      .select('id')
      .single();

    if (orderErr || !order) {
      console.error('Order insert error:', orderErr);
      return NextResponse.json({ error: 'Failed to create order record' }, { status: 500 });
    }

    // ── Profile prefill (best-effort) ─────────────────────────────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, phone')
      .eq('id', user.id)
      .maybeSingle();

    return NextResponse.json({
      razorpayOrderId: rzpOrder.id,
      amount:          amountPaise,
      currency:        'INR',
      keyId:           process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      orderId:         order.id,
      productTitle:    product.title,
      prefill: {
        name:    profile?.name    ?? '',
        email:   user.email       ?? '',
        contact: profile?.phone   ?? '',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    console.error('[create-order]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

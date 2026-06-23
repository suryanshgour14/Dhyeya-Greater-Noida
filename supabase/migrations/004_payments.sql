-- ============================================================
-- Payments schema: products, orders, payments, enrollments
-- Run in Supabase SQL Editor AFTER 002_fix_rls_role_check.sql
-- ============================================================

-- PRODUCTS ─────────────────────────────────────────────────
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('course','test')),
  ref_id      uuid,       -- test UUID for type='test'
  ref_slug    text,       -- course slug for type='course'
  title       text not null,
  title_hi    text,
  price_inr   numeric not null,
  is_active   boolean not null default true,
  access_days int,        -- null = lifetime; n = expires n days after purchase
  created_at  timestamptz default now()
);

-- ORDERS ───────────────────────────────────────────────────
create table if not exists orders (
  id                 uuid primary key default gen_random_uuid(),
  student_id         uuid not null references auth.users on delete cascade,
  product_id         uuid not null references products,
  amount_inr         numeric not null,
  razorpay_order_id  text not null unique,
  status             text not null default 'created',  -- created | paid | failed
  created_at         timestamptz default now()
);

-- PAYMENTS ─────────────────────────────────────────────────
create table if not exists payments (
  id                   uuid primary key default gen_random_uuid(),
  order_id             uuid not null references orders on delete cascade,
  razorpay_payment_id  text not null unique,
  razorpay_signature   text,
  status               text not null,   -- captured | failed
  method               text,            -- upi | card | netbanking | wallet
  paid_at              timestamptz default now()
);

-- ENROLLMENTS ──────────────────────────────────────────────
create table if not exists enrollments (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references auth.users on delete cascade,
  product_id  uuid not null references products,
  granted_at  timestamptz not null default now(),
  expires_at  timestamptz,              -- null = lifetime
  source      text not null default 'payment',  -- payment | manual
  unique (student_id, product_id)
);

-- ── Helper: check active enrollment for the calling user ──
create or replace function has_active_enrollment(p_product uuid)
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from enrollments
    where student_id = auth.uid()
      and product_id  = p_product
      and (expires_at is null or expires_at > now())
  );
$$;

-- ── RLS ───────────────────────────────────────────────────

alter table products enable row level security;

-- Anyone (incl. anon) can read active products
create policy "products_anon_read" on products
  for select using (is_active = true);

-- Only admin/faculty can write products
create policy "products_admin_write" on products
  for all
  using    (public.user_role() in ('admin','faculty'))
  with check (public.user_role() in ('admin','faculty'));

alter table orders enable row level security;

-- Students read their own orders; service role writes
create policy "orders_own_read" on orders
  for select using (student_id = auth.uid());

-- Admin can read all orders
create policy "orders_admin_read" on orders
  for select using (public.user_role() in ('admin','faculty'));

alter table payments enable row level security;

-- Students read payments that belong to their orders
create policy "payments_own_read" on payments
  for select using (
    exists (
      select 1 from orders
      where orders.id = payments.order_id
        and orders.student_id = auth.uid()
    )
  );

-- Admin can read all payments
create policy "payments_admin_read" on payments
  for select using (public.user_role() in ('admin','faculty'));

alter table enrollments enable row level security;

-- Students read their own enrollments
create policy "enrollments_own_read" on enrollments
  for select using (student_id = auth.uid());

-- Admin can read + write all enrollments (for manual grants)
create policy "enrollments_admin_all" on enrollments
  for all
  using    (public.user_role() in ('admin','faculty'))
  with check (public.user_role() in ('admin','faculty'));

-- ── Indexes ───────────────────────────────────────────────
create index if not exists idx_products_ref_id   on products(ref_id)  where ref_id  is not null;
create index if not exists idx_products_ref_slug on products(ref_slug) where ref_slug is not null;
create index if not exists idx_orders_student    on orders(student_id);
create index if not exists idx_orders_rzp        on orders(razorpay_order_id);
create index if not exists idx_enroll_student    on enrollments(student_id);
create index if not exists idx_enroll_product    on enrollments(product_id);

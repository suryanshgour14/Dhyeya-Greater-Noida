-- ============================================================
-- 010: Applicant details form + owner-notification + payment hardening
--
-- Adds:
--   • order_details  — the 9-field applicant snapshot, 1:1 with orders
--   • orders.paid_at / orders.owner_notified_at — settle + notify-once guards
--   • payments.amount_inr — captured amount for the amount-verification audit
--   • webhook_events — Razorpay event-id dedup (replay / duplicate delivery)
--   • profiles.*    — reusable personal fields so the form prefills next time
--
-- Run AFTER 007_products_seed.sql. Idempotent (if-not-exists throughout).
-- ============================================================

-- ── order_details : per-purchase applicant snapshot ─────────
create table if not exists order_details (
  order_id     uuid primary key references orders on delete cascade,
  full_name    text not null,
  father_name  text not null,
  mother_name  text not null,
  mobile       text not null,
  email        text not null,
  state        text not null,
  city         text not null,
  address      text not null,
  pincode      text not null,
  created_at   timestamptz not null default now()
);

alter table order_details enable row level security;

-- Student reads the details attached to their own orders
drop policy if exists "order_details_own_read" on order_details;
create policy "order_details_own_read" on order_details
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_details.order_id
        and orders.student_id = auth.uid()
    )
  );

-- Admin / faculty read all (owner dashboard)
drop policy if exists "order_details_admin_read" on order_details;
create policy "order_details_admin_read" on order_details
  for select using (public.user_role() in ('admin','faculty'));
-- Writes happen via the service-role client only (bypasses RLS).

-- ── orders : settle + notify-once guards ───────────────────
alter table orders add column if not exists paid_at           timestamptz;
alter table orders add column if not exists owner_notified_at timestamptz;

-- ── payments : record captured amount for the audit ────────
alter table payments add column if not exists amount_inr numeric;

-- ── webhook_events : idempotency / replay guard ────────────
create table if not exists webhook_events (
  event_id    text primary key,          -- Razorpay x-razorpay-event-id header
  event_type  text,
  received_at timestamptz not null default now()
);
alter table webhook_events enable row level security;   -- service-role only

-- ── profiles : reusable personal fields for prefill ────────
alter table profiles add column if not exists father_name text;
alter table profiles add column if not exists mother_name text;
alter table profiles add column if not exists phone       text;
alter table profiles add column if not exists state       text;
alter table profiles add column if not exists city        text;
alter table profiles add column if not exists address     text;
alter table profiles add column if not exists pincode     text;

-- ── Index for reconciliation (find stuck 'created' orders) ─
create index if not exists idx_orders_status_created
  on orders(status, created_at);

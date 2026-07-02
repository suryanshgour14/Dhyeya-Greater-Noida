-- ============================================================
-- 011: Link individual live tests to test-series bundles (M:N)
--
-- A live test (tests table) can belong to MANY test series, and a
-- series contains many tests. A student who bought a given series
-- (products row, type='test', ref_id IS NULL) gets access to every
-- test linked to it. Free tests (tests.is_free = true) are open to all.
--
-- Series bundle products are the ones seeded in 007 with ref_id NULL
-- (dd000001-…-01 … 07). Per-test products (ref_id = a test id) still
-- work for backward compatibility — the gating checks both.
--
-- Run AFTER 007_products_seed.sql. Idempotent.
-- ============================================================

create table if not exists test_series_links (
  test_id            uuid not null references tests    on delete cascade,
  series_product_id  uuid not null references products on delete cascade,
  created_at         timestamptz not null default now(),
  primary key (test_id, series_product_id)
);

create index if not exists idx_tsl_series on test_series_links(series_product_id);
create index if not exists idx_tsl_test   on test_series_links(test_id);

alter table test_series_links enable row level security;

-- Anyone may read the mapping (not sensitive — just "which series a test is in").
-- The access decision itself is enforced server-side against enrollments.
drop policy if exists "tsl_public_read" on test_series_links;
create policy "tsl_public_read" on test_series_links
  for select using (true);

-- Only admin / faculty may change the mapping.
drop policy if exists "tsl_admin_write" on test_series_links;
create policy "tsl_admin_write" on test_series_links
  for all
  using    (public.user_role() in ('admin','faculty'))
  with check (public.user_role() in ('admin','faculty'));

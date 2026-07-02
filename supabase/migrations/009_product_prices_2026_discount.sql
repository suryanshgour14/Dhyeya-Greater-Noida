-- ============================================================
-- 009: Correct test-series prices to the 2026 discounted rates
--
-- WHY THIS EXISTS:
-- The site (frontend) shows discounted test-series prices, but the
-- amount actually CHARGED comes from products.price_inr in this DB
-- (see src/app/api/payments/create-order/route.ts, which reads
-- price_inr and creates the Razorpay order from it — NOT from any
-- price sent by the browser).
--
-- 007_products_seed.sql uses `on conflict (id) do nothing`, so if the
-- products were already seeded in production, editing 007 alone does
-- NOT update them. This migration force-updates the prices by id so
-- the charged amount matches what the site displays.
--
-- Idempotent: safe to run repeatedly. Run AFTER 007_products_seed.sql.
--
-- Displayed price = discounted (charged). Original/strikethrough price
-- lives only in the frontend (src/lib/test-series.ts) and is cosmetic.
-- ============================================================

update products set price_inr = 2999, title = 'All India IAS Prelims Test Series 2026'
  where id = 'dd000001-0000-0000-0000-000000000001';   -- IAS Prelims   ₹4,999 -> ₹2,999

update products set price_inr = 8999, title = 'GS Mains Answer Writing Programme 2026'
  where id = 'dd000001-0000-0000-0000-000000000002';   -- IAS Mains     ₹15,999 -> ₹8,999

update products set price_inr = 1499, title = 'UPPCS Prelims Test Series 2026'
  where id = 'dd000001-0000-0000-0000-000000000003';   -- UPPCS Prelims ₹2,999 -> ₹1,499

update products set price_inr = 6999, title = 'UPPCS Mains Test Series 2026'
  where id = 'dd000001-0000-0000-0000-000000000004';   -- UPPCS Mains   ₹9,999 -> ₹6,999

update products set price_inr = 1499, title = 'UKPCS Prelims Test Series 2026'
  where id = 'dd000001-0000-0000-0000-000000000005';   -- UKPCS Prelims ₹1,999 -> ₹1,499

update products set price_inr = 4999, title = 'UKPCS Mains Test Series 2026'
  where id = 'dd000001-0000-0000-0000-000000000006';   -- UKPCS Mains   ₹8,999 -> ₹4,999

-- dd...07 Integrated stays at 8999 (already correct).

-- Verify after running:
--   select id, title, price_inr from products where type = 'test' order by id;

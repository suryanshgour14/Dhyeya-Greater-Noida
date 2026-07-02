# Payments & Webhook Go-Live Checklist

> Read this before enabling live payments. It exists because the site now shows
> **discounted** test-series prices with "Enroll Now" buttons, but the amount a
> student is actually charged does **not** come from the page — it comes from
> `products.price_inr` in Supabase. These two must agree.

---

## 1. How pricing works (important)

- `src/app/api/payments/create-order/route.ts` reads the product from Supabase
  by `productId`, then creates the Razorpay order from **`product.price_inr`**
  (`amountPaise = price_inr * 100`). The browser never sends a price.
- The strikethrough "original" price (e.g. ~~₹15,999~~) is **cosmetic only** and
  lives in `src/lib/test-series.ts` / the home marquee. It is never charged.
- **Therefore: `products.price_inr` must equal the discounted price shown on the site.**

## 2. Run the migrations (in order)

| # | File | What it does |
|---|------|--------------|
| 007 | `007_products_seed.sql` | Seeds all course + test-series products (fixed UUIDs). Now seeds the **discounted** test-series prices. Uses `on conflict (id) do nothing`. |
| 009 | `009_product_prices_2026_discount.sql` | **Force-updates** test-series `price_inr` by id. Needed because 007's `do nothing` will NOT change rows that were already seeded. Idempotent — safe to re-run. |

If the products table was seeded before this branch merged, **you must run 009**,
otherwise old prices (₹5,999 / ₹3,499 / …) will be charged while the site shows
the new ones.

Verify:
```sql
select id, title, price_inr from products where type = 'test' order by id;
```

## 3. Test-series product IDs → charged price (must match site)

| Product ID (UUID) | Series | Site shows | `price_inr` |
|---|---|---|---|
| dd000001-…-000000000001 | IAS Prelims | ~~4,999~~ **2,999** | 2999 |
| dd000001-…-000000000002 | IAS Mains (GS Answer Writing) | ~~15,999~~ **8,999** | 8999 |
| dd000001-…-000000000003 | UPPCS Prelims | ~~2,999~~ **1,499** | 1499 |
| dd000001-…-000000000004 | UPPCS Mains | ~~9,999~~ **6,999** | 6999 |
| dd000001-…-000000000005 | UKPCS Prelims | ~~1,999~~ **1,499** | 1499 |
| dd000001-…-000000000006 | UKPCS Mains | ~~8,999~~ **4,999** | 4999 |
| dd000001-…-000000000007 | Integrated Prelims + Mains | **8,999** | 8999 |

The mapping slug → UUID is hardcoded in
`src/app/[locale]/test-series/[slug]/page.tsx` (`PRODUCT_IDS`). Test-series
products have `ref_slug = null` and are matched by UUID only, so the UUIDs above
must exist and stay stable.

## 4. Courses (link by `ref_slug`, not UUID)

- Course "Enroll Now" on the detail page fetches the product with
  `type = 'course'` AND `ref_slug = <course slug>`
  (`src/app/[locale]/courses/[slug]/page.tsx`).
- The **course list cards** ("Enroll Now" + "Details") link to the detail page;
  the real Razorpay button is on the detail page.
- ✅ Confirm every course slug used on the site has a matching `ref_slug` row in
  `007_products_seed.sql`, and that each `price_inr` matches the displayed fee.
  Course prices were **not** changed on this branch — only test-series prices.

## 5. Razorpay webhook setup (Razorpay Dashboard)

- Endpoint: `https://<production-domain>/api/payments/webhook`
- Enable at least: `payment.captured` (and `payment.failed` if you want to record failures).
- Set the webhook secret in the dashboard, and set the **same value** in the env
  var `RAZORPAY_WEBHOOK_SECRET` (the route verifies the `x-razorpay-signature`
  HMAC against it — a mismatch silently rejects every payment).
- The webhook marks the order paid and creates the `enrollments` row
  (`access_days` → `expires_at`). Test series use `access_days = 365`; courses
  use `null` (lifetime).

## 6. Required environment variables (production)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        # server only — order/enrollment writes bypass RLS
NEXT_PUBLIC_RAZORPAY_KEY_ID      # sent to browser checkout
RAZORPAY_KEY_ID                  # server order creation
RAZORPAY_KEY_SECRET              # server order creation
RAZORPAY_WEBHOOK_SECRET          # must equal the secret set in Razorpay dashboard
```

## 7. Smoke test before announcing

1. Log in as a normal student.
2. Open a test series → **Enroll Now** → Razorpay checkout shows the **discounted** amount.
3. Pay with a Razorpay test card → webhook fires → row appears in `enrollments`.
4. Re-open the same product → it should block a second purchase ("already enrolled").
5. Repeat for one course.

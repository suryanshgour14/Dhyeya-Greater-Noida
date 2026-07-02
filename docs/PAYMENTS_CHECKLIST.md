# Payments & Webhook Go-Live Checklist

> Read this before enabling live payments. It exists because the site now shows
> **discounted** test-series prices with "Enroll Now" buttons, but the amount a
> student is actually charged does **not** come from the page — it comes from
> `products.price_inr` in Supabase. These two must agree.

---

## ⚠️ ACTION REQUIRED ON MERGE (do these or checkout breaks)

The new checkout flow (details form → pay → owner email) will **not** work until
BOTH of these are done on the production Supabase project + Vercel env:

### 1) Run the new migrations in Supabase (SQL Editor)

Run these in order (idempotent — safe to re-run):

- `supabase/migrations/009_product_prices_2026_discount.sql` — syncs test-series prices
- `supabase/migrations/010_purchase_details_and_notify.sql` — **required**: creates the
  `order_details` table the details form writes to. **Without 010, clicking
  "Proceed to Pay" returns "Failed to save your details."**

Verify 010 ran:
```sql
select to_regclass('public.order_details');   -- should NOT be null
```

### 2) Set these environment variables (Vercel → Project → Settings → Environment Variables)

```
GMAIL_USER            = the Gmail address that sends purchase alerts
GMAIL_APP_PASSWORD    = a Google App Password (16 chars, from Google Account >
                        Security > App passwords — needs 2-Step Verification ON).
                        NOT the normal Gmail password.
OWNER_EMAIL           = who receives the alerts (comma-separated for multiple)
CRON_SECRET           = any long random string (protects the reconcile cron)
```

Also confirm the Razorpay ones are already set: `RAZORPAY_KEY_ID`,
`RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`.

> If the GMAIL_* vars are missing, payments still succeed — only the owner email is
> skipped (and logged). If CRON_SECRET is missing, the reconcile cron returns 401.

Details for every step are in the numbered sections below.

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
| 010 | `010_purchase_details_and_notify.sql` | Adds `order_details` (the 9-field applicant form), `orders.paid_at/owner_notified_at`, `payments.amount_inr`, `webhook_events` (replay guard), and reusable `profiles.*` fields. Idempotent (`if not exists`). **Required for the new checkout flow.** |

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
GMAIL_USER                       # Gmail address that sends the owner notification
GMAIL_APP_PASSWORD               # Google App Password (2FA required) — NOT the normal password
OWNER_EMAIL                      # who receives purchase alerts (comma-separated ok)
CRON_SECRET                      # protects /api/payments/reconcile (Vercel Cron sends it automatically)
```

## 7. New checkout flow (details form → pay → owner email)

Clicking **Enroll Now** now:
1. Opens a **details form** (9 mandatory fields: full name, father's, mother's,
   mobile, email, state, city, address, pincode — prefilled from the profile).
2. On submit → `create-order` validates the details, stores them in
   `order_details`, saves them back to the profile, and creates the Razorpay order.
3. Razorpay checkout opens (amount = `products.price_inr`).
4. On success → `verify` (browser) **or** `webhook` (server) settles the order
   **once** (idempotent), grants the `enrollments` row, and **emails the owner**
   the full applicant + payment details.

**Owner email** is sent from the server via Gmail SMTP (`src/lib/notify-owner.ts`),
so it fires even if the buyer's browser closed. It's sent exactly once via an
atomic claim on `orders.owner_notified_at`. If `GMAIL_USER`/`GMAIL_APP_PASSWORD`
are unset, the payment still succeeds — only the email is skipped (logged).

## 8. Reconciliation cron (recovers interrupted payments)

`vercel.json` registers `/api/payments/reconcile` every 15 min. It:
- finds `created` orders older than 10 min, asks the Razorpay Orders API what
  really happened, and settles/fails them (covers "money debited but the browser
  never confirmed");
- retries the owner email for any `paid` order whose email hadn't gone out.

Needs `CRON_SECRET` set (Vercel Cron sends `Authorization: Bearer $CRON_SECRET`).

## 9. Giving app access (owner's side)

Every paid purchase produces:
- an **`enrollments`** row keyed to the student's login + product (source of truth
  for access — **the mobile app reads this**), and
- an **`order_details`** row + the **owner email** with who bought what.

If the app uses **this same Supabase project/logins**, access is automatic (the
app checks `enrollments`). If the app is a separate backend, the owner uses the
email / the admin/payments page to grant access manually. Either way the website's
job is done once the payment is verified and recorded.

## 10. Smoke test before announcing

1. Log in as a normal student.
2. Open a test series → **Enroll Now** → the **details form** appears; try submitting
   empty to confirm validation, then fill it.
3. Razorpay checkout shows the **discounted** amount → pay with a Razorpay test card.
4. Success page says "website and mobile app"; a row appears in `enrollments` +
   `order_details`; the **owner receives the email**.
5. Re-open the same product → it blocks a second purchase ("already enrolled").
6. Test an interruption: close the browser right after paying → within ~15 min the
   reconcile cron (or the webhook) should still mark it paid + email the owner.
7. Repeat for one course.

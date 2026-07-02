-- ============================================================
-- 013: Seed products for courses that were missing one
--
-- The course detail page shows the Razorpay "Enroll Now" button only when a
-- products row exists with type='course' AND ref_slug = <course slug>
-- (src/app/[locale]/courses/[slug]/page.tsx). Two courses on the site had no
-- product, so they fell back to "Enquire Now":
--   • uppsc-general-hindi   — 30-Day General Hindi Intensive   (₹10,000)
--   • uppsc-pcs-mentorship  — 6-Month UPPSC PCS Mentorship     (₹40,000)
--
-- Courses are lifetime access (access_days = null), matching 007.
-- Run AFTER 007_products_seed.sql. Idempotent.
-- ============================================================

insert into products (id, type, ref_slug, title, price_inr, is_active, access_days) values
  (
    'cc000001-0000-0000-0000-00000000000a',
    'course', 'uppsc-general-hindi',
    '30-Day General Hindi Intensive (UPPSC Mains Paper V)',
    10000, true, null
  ),
  (
    'cc000001-0000-0000-0000-00000000000b',
    'course', 'uppsc-pcs-mentorship',
    '6-Month UPPSC PCS Mentorship',
    40000, true, null
  )
on conflict (id) do nothing;

-- ============================================================
-- Seed: all course + test-series products
-- Run AFTER 004_payments.sql
-- UUIDs are fixed so the frontend can reference them by ID
-- ============================================================

insert into products (id, type, ref_slug, title, price_inr, is_active, access_days) values

  -- ── COURSES ────────────────────────────────────────────────
  (
    'cc000001-0000-0000-0000-000000000001',
    'course', 'upsc-ias-foundation',
    '15-Month GS Foundation (UPSC Civil Services)',
    110000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000002',
    'course', 'uppsc-pcs-comprehensive',
    '1-Year UPPSC PCS Comprehensive',
    81000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000003',
    'course', 'udaan-3-year-integrated',
    '3-Year Integrated UDAAN (UPSC + UPPSC)',
    253700, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000004',
    'course', 'upsc-ias-mentorship',
    '6-Month UPSC CSE Mentorship',
    45000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000005',
    'course', 'csat-mastery',
    '4-Month CSAT Mastery',
    22000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000006',
    'course', 'uppsc-prelims-crash-course',
    '4-Month UPPCS Prelims Crash Course',
    25000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000007',
    'course', 'up-special-paper-5-6',
    'UP Special Paper 5 & 6 (UPPSC Mains)',
    25000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000008',
    'course', 'bpsc-cce-prep',
    'BPSC CCE Complete Prep',
    95000, true, null
  ),
  (
    'cc000001-0000-0000-0000-000000000009',
    'course', 'uppsc-mains-answer-writing',
    '120-Day Mains Answer Writing Programme',
    15000, true, null
  ),

  -- ── TEST SERIES ────────────────────────────────────────────
  (
    'dd000001-0000-0000-0000-000000000001',
    'test', null,
    'All India IAS Prelims Test Series 2026',
    2999, true, 365
  ),
  (
    'dd000001-0000-0000-0000-000000000002',
    'test', null,
    'GS Mains Answer Writing Programme 2026',
    8999, true, 365
  ),
  (
    'dd000001-0000-0000-0000-000000000003',
    'test', null,
    'UPPCS Prelims Test Series 2026',
    1499, true, 365
  ),
  (
    'dd000001-0000-0000-0000-000000000004',
    'test', null,
    'UPPCS Mains Test Series 2026',
    6999, true, 365
  ),
  (
    'dd000001-0000-0000-0000-000000000005',
    'test', null,
    'UKPCS Prelims Test Series 2026',
    1499, true, 365
  ),
  (
    'dd000001-0000-0000-0000-000000000006',
    'test', null,
    'UKPCS Mains Test Series 2026',
    4999, true, 365
  ),
  (
    'dd000001-0000-0000-0000-000000000007',
    'test', null,
    'Integrated Prelims + Mains Series 2026',
    8999, true, 365
  )

on conflict (id) do nothing;

-- ============================================================
-- 012: Per-test attempt limit
--
-- tests.max_attempts = how many times a student may take a test.
--   NULL (or <= 0) = unlimited (current behaviour, preserved for old rows).
--   N              = at most N completed attempts.
--
-- Enforced server-side in /api/tests/[id]/start. Idempotent.
-- ============================================================

alter table tests add column if not exists max_attempts int;

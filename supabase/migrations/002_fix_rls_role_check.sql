-- ============================================================
-- Fix RLS policies: use profiles table instead of JWT app_role
-- Run this in Supabase SQL Editor
-- ============================================================

-- Helper: reads role from profiles table (security definer so it
-- bypasses RLS on profiles when called inside other policies)
create or replace function public.user_role()
returns text language sql security definer stable as $$
  select role from public.profiles where id = auth.uid()
$$;

-- ── tests ────────────────────────────────────────────────────
drop policy if exists "students_read_published_tests" on tests;
drop policy if exists "faculty_manage_tests" on tests;

create policy "read_tests" on tests
  for select using (
    status = 'published'
    or public.user_role() in ('admin', 'faculty')
  );

create policy "faculty_manage_tests" on tests
  for all using (public.user_role() in ('admin', 'faculty'))
  with check (public.user_role() in ('admin', 'faculty'));

-- ── test_sections ────────────────────────────────────────────
drop policy if exists "read_test_sections" on test_sections;
drop policy if exists "faculty_manage_sections" on test_sections;

create policy "read_test_sections" on test_sections
  for select using (
    exists (
      select 1 from tests t
      where t.id = test_id
        and (t.status = 'published' or public.user_role() in ('admin', 'faculty'))
    )
  );

create policy "faculty_manage_sections" on test_sections
  for all using (public.user_role() in ('admin', 'faculty'))
  with check (public.user_role() in ('admin', 'faculty'));

-- ── questions ────────────────────────────────────────────────
drop policy if exists "read_questions_of_published" on questions;
drop policy if exists "faculty_manage_questions" on questions;

create policy "read_questions_of_published" on questions
  for select using (
    exists (
      select 1 from tests t
      where t.id = test_id
        and (t.status = 'published' or public.user_role() in ('admin', 'faculty'))
    )
  );

create policy "faculty_manage_questions" on questions
  for all using (public.user_role() in ('admin', 'faculty'))
  with check (public.user_role() in ('admin', 'faculty'));

-- ── profiles ─────────────────────────────────────────────────
drop policy if exists "faculty_read_profiles" on profiles;

create policy "faculty_read_profiles" on profiles
  for select using (
    id = auth.uid()
    or public.user_role() in ('admin', 'faculty')
  );

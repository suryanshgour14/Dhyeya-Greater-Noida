-- ============================================================
-- Test Series Schema
-- Run this in your Supabase SQL Editor (or via Supabase CLI)
-- ============================================================

-- TESTS
create table if not exists tests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_hi text,
  exam_type text,
  total_duration_min int not null,
  marks_per_q numeric not null default 2,
  negative_marks numeric not null default 0.66,
  sectional_timing boolean not null default false,
  is_free boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published')),
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

-- SECTIONS
create table if not exists test_sections (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references tests on delete cascade,
  name text not null,
  name_hi text,
  order_index int not null,
  duration_min int
);

-- QUESTIONS
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references tests on delete cascade,
  section_id uuid not null references test_sections on delete cascade,
  order_index int not null,
  question_en text not null,
  question_hi text,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct char(1) not null check (correct in ('a','b','c','d')),
  created_at timestamptz default now()
);

-- ATTEMPTS
create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users on delete cascade,
  test_id uuid not null references tests,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  status text not null default 'in_progress' check (status in ('in_progress','submitted','auto_submitted')),
  score numeric,
  total_correct int,
  total_wrong int,
  total_skipped int,
  time_taken_sec int,
  blur_count int not null default 0,
  progress jsonb,
  created_at timestamptz default now()
);

-- ANSWERS (written on submit only)
create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references attempts on delete cascade,
  question_id uuid not null references questions,
  section_id uuid not null references test_sections,
  selected_option char(1),
  is_correct boolean not null,
  time_spent_sec int default 0
);

-- ── Indexes ──────────────────────────────────────────────────
create index if not exists idx_questions_test_id on questions(test_id);
create index if not exists idx_attempts_student_test on attempts(student_id, test_id);
create index if not exists idx_answers_attempt_id on answers(attempt_id);

-- ── Row Level Security ────────────────────────────────────────
alter table tests enable row level security;
alter table test_sections enable row level security;
alter table questions enable row level security;
alter table attempts enable row level security;
alter table answers enable row level security;

-- TESTS: students see published only; faculty/admin see all
create policy "students_read_published_tests" on tests
  for select using (
    status = 'published'
    or (auth.jwt() ->> 'app_role') in ('admin','faculty')
  );

create policy "faculty_manage_tests" on tests
  for all using (
    (auth.jwt() ->> 'app_role') in ('admin','faculty')
  );

-- TEST_SECTIONS: mirror tests policy
create policy "read_test_sections" on test_sections
  for select using (
    exists (
      select 1 from tests t where t.id = test_id
      and (t.status = 'published' or (auth.jwt() ->> 'app_role') in ('admin','faculty'))
    )
  );

create policy "faculty_manage_sections" on test_sections
  for all using ((auth.jwt() ->> 'app_role') in ('admin','faculty'));

-- QUESTIONS: NEVER expose correct to students via RLS
-- Students get all fields except correct; faculty get everything.
-- We handle stripping `correct` in the API route, not via RLS column grants.
create policy "read_questions_of_published" on questions
  for select using (
    exists (
      select 1 from tests t where t.id = test_id
      and (t.status = 'published' or (auth.jwt() ->> 'app_role') in ('admin','faculty'))
    )
  );

create policy "faculty_manage_questions" on questions
  for all using ((auth.jwt() ->> 'app_role') in ('admin','faculty'));

-- ATTEMPTS: student sees/modifies only their own
create policy "student_own_attempts" on attempts
  for all using (student_id = auth.uid());

-- ANSWERS: student sees only their own (via attempt)
create policy "student_own_answers" on answers
  for all using (
    exists (
      select 1 from attempts a where a.id = attempt_id and a.student_id = auth.uid()
    )
  );

-- ── Helper: get user role ─────────────────────────────────────
-- Call this to check role: auth.jwt() ->> 'app_role'
-- Set the role on the user in Supabase Auth dashboard under
-- app_metadata: { "app_role": "faculty" }
-- OR use a profiles table approach:

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'student' check (role in ('student','faculty','admin')),
  full_name text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "profiles_own" on profiles
  for all using (id = auth.uid());

create policy "faculty_read_profiles" on profiles
  for select using ((auth.jwt() ->> 'app_role') in ('admin','faculty'));

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Scoring RPC (server-side, bypasses RLS for correct field) ──
-- This runs with SECURITY DEFINER so it can read `correct`
create or replace function score_attempt(p_attempt_id uuid)
returns jsonb language plpgsql security definer as $$
declare
  v_attempt attempts%rowtype;
  v_test    tests%rowtype;
  v_progress jsonb;
  v_answers  jsonb;
  v_qid      text;
  v_chosen   text;
  v_correct  text;
  v_is_corr  boolean;
  v_score    numeric := 0;
  v_ncorrect int := 0;
  v_nwrong   int := 0;
  v_nskip    int := 0;
  v_time_sec int;
begin
  select * into v_attempt from attempts where id = p_attempt_id;
  if not found then raise exception 'Attempt not found'; end if;
  if v_attempt.status <> 'in_progress' then
    return jsonb_build_object('error','already_submitted');
  end if;

  select * into v_test from tests where id = v_attempt.test_id;
  v_progress := coalesce(v_attempt.progress, '{}'::jsonb);
  v_answers  := coalesce(v_progress->'answers', '{}'::jsonb);

  -- delete any previous answers for this attempt
  delete from answers where attempt_id = p_attempt_id;

  -- iterate questions
  for v_qid, v_correct in
    select id::text, correct from questions where test_id = v_attempt.test_id
  loop
    v_chosen := v_answers->>v_qid;

    if v_chosen is null or v_chosen = '' then
      v_is_corr := false;
      v_nskip   := v_nskip + 1;
    elsif v_chosen = v_correct then
      v_is_corr := true;
      v_ncorrect := v_ncorrect + 1;
      v_score    := v_score + v_test.marks_per_q;
    else
      v_is_corr := false;
      v_nwrong  := v_nwrong + 1;
      v_score   := v_score - v_test.negative_marks;
    end if;

    insert into answers (attempt_id, question_id, section_id, selected_option, is_correct)
    select p_attempt_id, q.id, q.section_id, nullif(v_chosen,''), v_is_corr
    from questions q where q.id::text = v_qid;
  end loop;

  v_time_sec := extract(epoch from now() - v_attempt.started_at)::int;

  update attempts set
    status       = 'submitted',
    submitted_at = now(),
    score        = v_score,
    total_correct  = v_ncorrect,
    total_wrong    = v_nwrong,
    total_skipped  = v_nskip,
    time_taken_sec = v_time_sec
  where id = p_attempt_id;

  return jsonb_build_object(
    'score', v_score,
    'total_correct', v_ncorrect,
    'total_wrong', v_nwrong,
    'total_skipped', v_nskip,
    'time_taken_sec', v_time_sec
  );
end;
$$;

grant execute on function score_attempt(uuid) to authenticated;

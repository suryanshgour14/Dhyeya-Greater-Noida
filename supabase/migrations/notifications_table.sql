-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

create table if not exists notifications (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  description text        not null default '',
  date_label  text        not null default '',
  is_new      boolean     not null default true,
  is_active   boolean     not null default true,
  show_in_bar boolean     not null default true,
  sort_order  int         not null default 0,
  created_at  timestamptz not null default now()
);

alter table notifications enable row level security;

-- Public can read active notifications (used by the home page + announcement bar)
create policy "public_read_active"
  on notifications for select
  using (is_active = true);

-- Seed with existing announcements (edit or delete as needed)
insert into notifications (title, description, date_label, is_new, is_active, show_in_bar, sort_order) values
  ('UKPCS Prelims Test Series 2026 Starting 15 June 2026 - Online ₹1,499 | Offline ₹4,999 - Enroll Now', 'Online and offline registration open', '15 Jun', true,  true, true, 10),
  ('New UPSC IAS Foundation Batch Starting July 2026 - Limited Seats of 60 - Book Your Seat Today',        'Limited seats available',             '01 Jul', true,  true, true, 20),
  ('4-Month UPPCS Prelims Crash Course - October 2026 Batch Open - Exam-Ready Programme Enrollments Live','Enrollments live now',                 '01 Oct', false, true, true, 30),
  ('UDAAN 3-Year Integrated Programme - Merit Scholarship Up to ₹2 Lakh - Apply Before Seats Fill',       'Scholarship upto ₹2 Lakh available',   '',       true,  true, true, 40),
  ('UPPCS Mains Test Series 2026 - 18 Tests Including UP Special Papers 5 & 6 - Register Now',            '18-test series including optional papers','',    false, true, true, 50);

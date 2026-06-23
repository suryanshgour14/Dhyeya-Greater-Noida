-- ============================================================
-- Content tables: Current Affairs & Magazine
-- Run in Supabase SQL Editor
-- ============================================================

-- Current Affairs
create table if not exists current_affairs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_hi text,
  slug text not null unique,
  excerpt text not null,
  excerpt_hi text,
  body text,
  body_hi text,
  category text not null,
  gs_relevance text[] default '{}',
  tags text[] default '{}',
  is_important boolean not null default false,
  image_url text,
  published_at timestamptz not null default now(),
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

alter table current_affairs enable row level security;

create policy "public_read_current_affairs" on current_affairs
  for select using (true);

create policy "admin_manage_current_affairs" on current_affairs
  for all using (public.user_role() in ('admin','faculty'))
  with check (public.user_role() in ('admin','faculty'));

-- Magazine Issues
create table if not exists magazine_issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  month text not null,
  year int not null,
  cover_image_url text,
  description text,
  topics text[] default '{}',
  page_count int,
  pdf_url text not null,
  is_free boolean not null default true,
  published_at timestamptz not null default now(),
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

alter table magazine_issues enable row level security;

create policy "public_read_magazine" on magazine_issues
  for select using (true);

create policy "admin_manage_magazine" on magazine_issues
  for all using (public.user_role() in ('admin','faculty'))
  with check (public.user_role() in ('admin','faculty'));

-- Indexes
create index if not exists idx_ca_published_at on current_affairs(published_at desc);
create index if not exists idx_ca_category on current_affairs(category);
create index if not exists idx_mag_year on magazine_issues(year desc, published_at desc);

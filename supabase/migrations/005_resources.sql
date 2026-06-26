-- ============================================================
-- Free Resources: downloadable PDFs (Student Zone)
-- Files live in a PRIVATE Storage bucket; this table lists them.
-- Run in Supabase SQL Editor.
-- ============================================================

-- ── Storage bucket (private) ─────────────────────────────────
insert into storage.buckets (id, name, public)
values ('resources', 'resources', false)
on conflict (id) do nothing;

-- ── resources table ──────────────────────────────────────────
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_hi text,
  description text,
  category text not null default 'General',
  file_path text not null,            -- path of the object inside the 'resources' bucket
  file_size_kb int,                   -- optional, for display only
  download_count int not null default 0,
  is_active boolean not null default true,
  published_at timestamptz not null default now(),
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

alter table resources enable row level security;

-- Any logged-in student can see the list (page itself is login-gated)
drop policy if exists "auth_read_resources" on resources;
create policy "auth_read_resources" on resources
  for select using (auth.uid() is not null);

-- Only admin/faculty can add/edit/remove
drop policy if exists "admin_manage_resources" on resources;
create policy "admin_manage_resources" on resources
  for all using (public.user_role() in ('admin','faculty'))
  with check (public.user_role() in ('admin','faculty'));

create index if not exists idx_resources_category on resources(category);
create index if not exists idx_resources_published_at on resources(published_at desc);

-- ── Storage object policies (bucket: resources) ──────────────
-- Logged-in users may download (needed to generate signed URLs)
drop policy if exists "auth_download_resources" on storage.objects;
create policy "auth_download_resources" on storage.objects
  for select to authenticated
  using (bucket_id = 'resources');

-- Only admin/faculty may upload / replace / delete files
drop policy if exists "admin_upload_resources" on storage.objects;
create policy "admin_upload_resources" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'resources' and public.user_role() in ('admin','faculty'));

drop policy if exists "admin_update_resources" on storage.objects;
create policy "admin_update_resources" on storage.objects
  for update to authenticated
  using (bucket_id = 'resources' and public.user_role() in ('admin','faculty'));

drop policy if exists "admin_delete_resources" on storage.objects;
create policy "admin_delete_resources" on storage.objects
  for delete to authenticated
  using (bucket_id = 'resources' and public.user_role() in ('admin','faculty'));

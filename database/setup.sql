-- run this once in the supabase sql editor (see README.md). safe to run again.
--
-- makes two tables (items = projects/dashboards/cv, messages = the message log)
-- and a public storage folder for uploaded files.
-- rules: everyone can read items and send a message. only the admin email below
-- can add/change/delete items, read messages and upload files.


-- 1. the one line to change: put the admin email here, the same one you make
-- in supabase under authentication > users. keep the quotes.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('PUT-YOUR-ADMIN-EMAIL-HERE')
$$;


-- 2. tables
create table if not exists public.items (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('game', 'website', 'cv')),
  kind        text not null check (kind in ('file', 'link')),
  title       text not null check (char_length(title) between 1 and 120),
  description text check (char_length(description) <= 600),
  url         text,
  file_path   text,
  file_size   bigint,
  created_at  timestamptz not null default now(),
  check ((kind = 'file' and file_path is not null) or (kind = 'link' and url is not null))
);

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 80),
  email      text not null check (char_length(email) between 3 and 254),
  message    text not null check (char_length(message) between 1 and 1000),
  status     text not null default 'new' check (status in ('new', 'replied', 'ignored')),
  created_at timestamptz not null default now()
);


-- 3. rules for the tables
alter table public.items    enable row level security;
alter table public.messages enable row level security;

-- permissions. works whether or not "automatically expose new tables" was ticked.
-- row level security below still decides who can do what.
grant select on public.items to anon, authenticated;
grant insert, update, delete on public.items to authenticated;
grant insert on public.messages to anon, authenticated;
grant select, update on public.messages to authenticated;

drop policy if exists "anyone can read items"   on public.items;
drop policy if exists "admin manages items"     on public.items;
drop policy if exists "anyone can send message" on public.messages;
drop policy if exists "admin reads messages"    on public.messages;
drop policy if exists "admin updates messages"  on public.messages;

create policy "anyone can read items"
  on public.items for select
  using (true);

create policy "admin manages items"
  on public.items for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "anyone can send message"
  on public.messages for insert to anon, authenticated
  with check (status = 'new');

create policy "admin reads messages"
  on public.messages for select to authenticated
  using (public.is_admin());

create policy "admin updates messages"
  on public.messages for update to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- 4. file storage (one public folder, 50 mb per file)
insert into storage.buckets (id, name, public, file_size_limit)
values ('portfolio-files', 'portfolio-files', true, 52428800)
on conflict (id) do update set public = true, file_size_limit = 52428800;

drop policy if exists "admin reads files"   on storage.objects;
drop policy if exists "admin uploads files" on storage.objects;
drop policy if exists "admin changes files" on storage.objects;
drop policy if exists "admin deletes files" on storage.objects;

-- Supabase needs SELECT permission to delete or replace a file
create policy "admin reads files"
  on storage.objects for select to authenticated
  using (bucket_id = 'portfolio-files' and public.is_admin());

create policy "admin uploads files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-files' and public.is_admin());

create policy "admin changes files"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-files' and public.is_admin());

create policy "admin deletes files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-files' and public.is_admin());

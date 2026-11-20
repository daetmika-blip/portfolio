-- only needed if you ran an older setup.sql. lets the admin delete and replace uploaded files.
-- safe to run again.
drop policy if exists "admin reads files" on storage.objects;

create policy "admin reads files"
  on storage.objects for select to authenticated
  using (bucket_id = 'portfolio-files' and public.is_admin());

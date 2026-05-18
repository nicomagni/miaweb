insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values
  (
    'site-public',
    'site-public',
    true,
    15728640,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
  ),
  (
    'site-private',
    'site-private',
    false,
    15728640,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
-- Custom SQL migration file, put your code below! --

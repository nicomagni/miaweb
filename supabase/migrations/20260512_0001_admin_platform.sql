create extension if not exists pgcrypto;

create type public.admin_role as enum ('superadmin', 'editor', 'sales');
create type public.collection_status as enum ('draft', 'published', 'archived');
create type public.wholesaler_status as enum ('lead', 'approved', 'inactive', 'rejected');
create type public.wholesale_application_status as enum (
  'new',
  'reviewing',
  'contacted',
  'approved',
  'rejected',
  'spam'
);

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text not null,
  full_name text,
  role public.admin_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text,
  long_description text,
  status public.collection_status not null default 'draft',
  sort_order integer not null default 0,
  cover_image_path text,
  color_card_path text,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_by uuid references public.admin_users(id) on delete set null,
  updated_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.collection_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.collections(id) on delete cascade,
  name text not null,
  sku text,
  image_path text,
  color_name text,
  color_hex text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.wholesale_applications (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  cuit text,
  email text not null,
  province text,
  city text,
  instagram text,
  website text,
  estimated_volume text,
  message text,
  status public.wholesale_application_status not null default 'new',
  assigned_to uuid references public.admin_users(id) on delete set null,
  review_notes text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.wholesalers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  contact_name text,
  email text,
  phone text,
  city text,
  province text,
  country text not null default 'AR',
  instagram text,
  website text,
  status public.wholesaler_status not null default 'lead',
  source_application_id uuid references public.wholesale_applications(id) on delete set null,
  internal_notes text,
  approved_at timestamptz,
  created_by uuid references public.admin_users(id) on delete set null,
  updated_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_admin_user_id uuid references public.admin_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index collections_status_sort_idx on public.collections(status, sort_order);
create index collection_items_collection_idx on public.collection_items(collection_id, sort_order);
create index wholesale_applications_status_submitted_idx on public.wholesale_applications(status, submitted_at desc);
create index wholesalers_status_name_idx on public.wholesalers(status, name);
create index audit_logs_entity_idx on public.audit_logs(entity_type, entity_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_admin_users_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

create trigger set_collections_updated_at
before update on public.collections
for each row execute function public.set_updated_at();

create trigger set_collection_items_updated_at
before update on public.collection_items
for each row execute function public.set_updated_at();

create trigger set_wholesale_applications_updated_at
before update on public.wholesale_applications
for each row execute function public.set_updated_at();

create trigger set_wholesalers_updated_at
before update on public.wholesalers
for each row execute function public.set_updated_at();

create or replace function public.current_clerk_user_id()
returns text
language sql
stable
as $$
  select nullif(auth.jwt() ->> 'sub', '');
$$;

create or replace function public.current_admin_role()
returns public.admin_role
language sql
stable
as $$
  select au.role
  from public.admin_users au
  where au.clerk_user_id = public.current_clerk_user_id()
    and au.is_active = true
  limit 1;
$$;

create or replace function public.is_active_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.clerk_user_id = public.current_clerk_user_id()
      and au.is_active = true
  );
$$;

create or replace function public.has_admin_role(allowed_roles public.admin_role[])
returns boolean
language sql
stable
as $$
  select public.current_admin_role() = any(allowed_roles);
$$;

alter table public.admin_users enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;
alter table public.wholesale_applications enable row level security;
alter table public.wholesalers enable row level security;
alter table public.audit_logs enable row level security;

create policy "public can read published collections"
on public.collections
for select
to anon, authenticated
using (status = 'published');

create policy "public can read items of published collections"
on public.collection_items
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.collections c
    where c.id = collection_items.collection_id
      and c.status = 'published'
  )
);

create policy "active admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_active_admin());

create policy "superadmins can manage admin users"
on public.admin_users
for all
to authenticated
using (public.has_admin_role(array['superadmin']::public.admin_role[]))
with check (public.has_admin_role(array['superadmin']::public.admin_role[]));

create policy "active admins can read collections"
on public.collections
for select
to authenticated
using (public.is_active_admin());

create policy "editors and superadmins can manage collections"
on public.collections
for all
to authenticated
using (public.has_admin_role(array['superadmin', 'editor']::public.admin_role[]))
with check (public.has_admin_role(array['superadmin', 'editor']::public.admin_role[]));

create policy "active admins can read collection items"
on public.collection_items
for select
to authenticated
using (public.is_active_admin());

create policy "editors and superadmins can manage collection items"
on public.collection_items
for all
to authenticated
using (public.has_admin_role(array['superadmin', 'editor']::public.admin_role[]))
with check (public.has_admin_role(array['superadmin', 'editor']::public.admin_role[]));

create policy "active admins can read wholesale applications"
on public.wholesale_applications
for select
to authenticated
using (public.is_active_admin());

create policy "anyone can create wholesale applications"
on public.wholesale_applications
for insert
to anon, authenticated
with check (true);

create policy "sales and superadmins can update wholesale applications"
on public.wholesale_applications
for update
to authenticated
using (public.has_admin_role(array['superadmin', 'sales']::public.admin_role[]))
with check (public.has_admin_role(array['superadmin', 'sales']::public.admin_role[]));

create policy "superadmins can delete wholesale applications"
on public.wholesale_applications
for delete
to authenticated
using (public.has_admin_role(array['superadmin']::public.admin_role[]));

create policy "active admins can read wholesalers"
on public.wholesalers
for select
to authenticated
using (public.is_active_admin());

create policy "sales and superadmins can manage wholesalers"
on public.wholesalers
for all
to authenticated
using (public.has_admin_role(array['superadmin', 'sales']::public.admin_role[]))
with check (public.has_admin_role(array['superadmin', 'sales']::public.admin_role[]));

create policy "superadmins can read audit logs"
on public.audit_logs
for select
to authenticated
using (public.has_admin_role(array['superadmin']::public.admin_role[]));

create policy "active admins can insert audit logs"
on public.audit_logs
for insert
to authenticated
with check (public.is_active_admin());

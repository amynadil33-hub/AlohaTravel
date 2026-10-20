-- Aloha Travels secure accommodation catalogue foundation.
--
-- This migration is additive and intentionally does not import application data.
-- It must be reviewed in a Supabase development project before production use.
-- Do not run supabase/schema.sql or supabase/seed.sql as part of this migration.

begin;

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  role text not null check (role in ('editor', 'admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.staff_profiles is
  'Invite-only Aloha Travels staff authorization records. Roles are managed outside the staff-facing application.';

create table if not exists public.properties (
  id text primary key check (btrim(id) <> ''),
  slug text not null unique check (
    slug = lower(slug)
    and slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  name text not null check (btrim(name) <> ''),
  type text not null check (type in ('resort', 'guest-house')),
  short_description text not null default '',
  description text not null default '',
  island text not null default '',
  atoll text not null default '',
  location text not null default '',
  tags text[] not null default '{}'::text[],
  interests text[] not null default '{}'::text[],
  experiences text[] not null default '{}'::text[],
  facilities text[] not null default '{}'::text[],
  highlights text[] not null default '{}'::text[],
  room_categories jsonb not null default '[]'::jsonb check (
    jsonb_typeof(room_categories) = 'array'
  ),
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  updated_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.properties is
  'Canonical resort and hotel/guest-house records. Array and JSON fields map to the existing Property TypeScript model.';

create index if not exists properties_public_listing_idx
  on public.properties (type, featured desc, sort_order, name)
  where published = true;

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties (id) on delete cascade,
  image_url text not null check (btrim(image_url) <> ''),
  storage_path text,
  kind text not null default 'gallery' check (kind in ('hero', 'gallery')),
  alt_text text not null check (btrim(alt_text) <> ''),
  caption text not null default '',
  sort_order integer not null default 0 check (sort_order >= 0),
  source_url text,
  permission_note text,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  updated_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (property_id, image_url),
  check (storage_path is null or btrim(storage_path) <> '')
);

comment on table public.property_images is
  'Ordered property photography. image_url supports existing local /images paths; storage_path identifies Supabase-managed uploads.';

create index if not exists property_images_order_idx
  on public.property_images (property_id, kind, sort_order, created_at);

create unique index if not exists property_images_one_hero_idx
  on public.property_images (property_id)
  where kind = 'hero';

create unique index if not exists property_images_storage_path_idx
  on public.property_images (storage_path)
  where storage_path is not null;

create or replace function public.set_catalog_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();

  if tg_op = 'UPDATE' then
    new.created_at := old.created_at;
    new.created_by := old.created_by;
  end if;

  return new;
end;
$$;

revoke all on function public.set_catalog_audit_fields() from public;

create trigger properties_set_catalog_audit_fields
before update on public.properties
for each row execute function public.set_catalog_audit_fields();

create trigger property_images_set_catalog_audit_fields
before update on public.property_images
for each row execute function public.set_catalog_audit_fields();

create or replace function public.set_staff_profile_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.created_at := old.created_at;
  return new;
end;
$$;

revoke all on function public.set_staff_profile_updated_at() from public;

create trigger staff_profiles_set_updated_at
before update on public.staff_profiles
for each row execute function public.set_staff_profile_updated_at();

-- SECURITY DEFINER is required so policies can check staff membership without
-- granting authenticated users permission to enumerate staff_profiles.
create or replace function public.is_active_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_profiles
    where user_id = auth.uid()
      and active = true
      and role in ('editor', 'admin')
  );
$$;

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_profiles
    where user_id = auth.uid()
      and active = true
      and role = 'admin'
  );
$$;

revoke all on function public.is_active_staff() from public;
revoke all on function public.is_active_admin() from public;
grant execute on function public.is_active_staff() to authenticated;
grant execute on function public.is_active_admin() to authenticated;

alter table public.staff_profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;

-- Explicit grants complement RLS. Staff profiles cannot be created, updated or
-- deleted through an authenticated browser session, preventing self-promotion.
revoke all on table public.staff_profiles from anon, authenticated;
grant select on table public.staff_profiles to authenticated;

revoke all on table public.properties from anon, authenticated;
grant select on table public.properties to anon, authenticated;
grant insert, update, delete on table public.properties to authenticated;

revoke all on table public.property_images from anon, authenticated;
grant select on table public.property_images to anon, authenticated;
grant insert, update, delete on table public.property_images to authenticated;

create policy "Staff may read their own profile"
on public.staff_profiles
for select
to authenticated
using (user_id = auth.uid());

create policy "Public may read published properties"
on public.properties
for select
to anon, authenticated
using (published = true);

create policy "Staff may read all properties"
on public.properties
for select
to authenticated
using (public.is_active_staff());

create policy "Staff may create properties"
on public.properties
for insert
to authenticated
with check (
  public.is_active_staff()
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

create policy "Staff may update properties"
on public.properties
for update
to authenticated
using (public.is_active_staff())
with check (public.is_active_staff() and updated_by = auth.uid());

create policy "Admins may delete properties"
on public.properties
for delete
to authenticated
using (public.is_active_admin());

create policy "Public may read images for published properties"
on public.property_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.properties
    where properties.id = property_images.property_id
      and properties.published = true
  )
);

create policy "Staff may read all property images"
on public.property_images
for select
to authenticated
using (public.is_active_staff());

create policy "Staff may create property images"
on public.property_images
for insert
to authenticated
with check (
  public.is_active_staff()
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

create policy "Staff may update property images"
on public.property_images
for update
to authenticated
using (public.is_active_staff())
with check (public.is_active_staff() and updated_by = auth.uid());

create policy "Staff may delete property images"
on public.property_images
for delete
to authenticated
using (public.is_active_staff());

-- Public property photographs. The application must still validate file
-- signatures, dimensions and names before upload.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'property-images',
  'property-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "Public may read property photographs"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'property-images');

create policy "Staff may upload property photographs"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'property-images'
  and public.is_active_staff()
  and (storage.foldername(name))[1] = 'properties'
  and exists (
    select 1
    from public.properties
    where properties.id = (storage.foldername(name))[2]
  )
);

create policy "Staff may update property photographs"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'property-images'
  and public.is_active_staff()
  and (storage.foldername(name))[1] = 'properties'
)
with check (
  bucket_id = 'property-images'
  and public.is_active_staff()
  and (storage.foldername(name))[1] = 'properties'
  and exists (
    select 1
    from public.properties
    where properties.id = (storage.foldername(name))[2]
  )
);

create policy "Staff may delete property photographs"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'property-images'
  and public.is_active_staff()
  and (storage.foldername(name))[1] = 'properties'
);

commit;

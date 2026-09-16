-- =============================================================================
-- Aloha Travels — Supabase schema
-- Run this first (SQL Editor → New query → paste → Run), then run seed.sql.
-- Mirrors lib/types.ts so the app can move from mock data to real queries
-- without changing component contracts.
-- =============================================================================

-- Clean slate (safe to re-run) -----------------------------------------------
drop table if exists public.experience_related_properties cascade;
drop table if exists public.property_experiences cascade;
drop table if exists public.property_interests cascade;
drop table if exists public.room_categories cascade;
drop table if exists public.inquiries cascade;
drop table if exists public.experiences cascade;
drop table if exists public.properties cascade;
drop table if exists public.interests cascade;

-- Interests -------------------------------------------------------------------
create table public.interests (
  slug        text primary key,
  id          text unique not null,
  name        text not null,
  description text not null default '',
  image_url   text not null default '',
  featured    boolean not null default false,
  sort_order  int not null default 0
);

-- Experiences -----------------------------------------------------------------
create table public.experiences (
  slug        text primary key,
  id          text unique not null,
  name        text not null,
  description text not null default '',
  image_url   text not null default '',
  featured    boolean not null default false,
  sort_order  int not null default 0
);

-- Properties (resorts + guest houses) ----------------------------------------
create table public.properties (
  id                text primary key,
  slug              text unique not null,
  name              text not null,
  type              text not null check (type in ('resort', 'guest-house')),
  short_description text not null default '',
  description       text not null default '',
  island            text not null default '',
  atoll             text not null default '',
  location          text not null default '',
  hero_image        text not null default '',
  gallery           text[] not null default '{}',
  tags              text[] not null default '{}',
  facilities        text[] not null default '{}',
  highlights        text[] not null default '{}',
  featured          boolean not null default false,
  published         boolean not null default true,
  created_at        timestamptz not null default now()
);

create index properties_type_idx on public.properties (type);
create index properties_published_idx on public.properties (published);

-- Room categories (3 per property, each with a photo gallery) -----------------
create table public.room_categories (
  id             bigint generated always as identity primary key,
  property_id    text not null references public.properties (id) on delete cascade,
  name           text not null,
  description    text not null default '',
  size           text not null default '',
  max_occupancy  text not null default '',
  price_from     numeric(10, 2) not null default 0,
  photos         text[] not null default '{}',
  sort_order     int not null default 0
);

create index room_categories_property_idx on public.room_categories (property_id);

-- Property <-> interest (many-to-many) ----------------------------------------
create table public.property_interests (
  property_id   text not null references public.properties (id) on delete cascade,
  interest_slug text not null references public.interests (slug) on delete cascade,
  primary key (property_id, interest_slug)
);

-- Property <-> experience offered on that island (many-to-many) ---------------
create table public.property_experiences (
  property_id     text not null references public.properties (id) on delete cascade,
  experience_slug text not null references public.experiences (slug) on delete cascade,
  primary key (property_id, experience_slug)
);

-- Experience -> related properties shown on the experiences page --------------
create table public.experience_related_properties (
  experience_slug text not null references public.experiences (slug) on delete cascade,
  property_id     text not null references public.properties (id) on delete cascade,
  primary key (experience_slug, property_id)
);

-- Inquiries (contact + property inquiry form) ---------------------------------
create table public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  property_name text,
  name          text not null,
  contact       text not null,
  travel_dates  text not null default '',
  guests        text not null default '',
  budget        text not null default '',
  message       text not null default '',
  status        text not null default 'new'
                  check (status in ('new', 'contacted', 'planning', 'confirmed', 'closed')),
  created_at    timestamptz not null default now()
);

create index inquiries_status_idx on public.inquiries (status);
create index inquiries_created_idx on public.inquiries (created_at desc);

-- =============================================================================
-- Row Level Security
-- Public site reads catalog content; anyone can submit an inquiry; only
-- authenticated staff (your admin portal) can read/manage inquiries + content.
-- =============================================================================
alter table public.interests                     enable row level security;
alter table public.experiences                    enable row level security;
alter table public.properties                      enable row level security;
alter table public.room_categories                 enable row level security;
alter table public.property_interests              enable row level security;
alter table public.property_experiences            enable row level security;
alter table public.experience_related_properties   enable row level security;
alter table public.inquiries                        enable row level security;

-- Public read of catalog content ---------------------------------------------
create policy "Public read interests"
  on public.interests for select using (true);

create policy "Public read experiences"
  on public.experiences for select using (true);

create policy "Public read published properties"
  on public.properties for select using (published = true);

create policy "Public read room categories"
  on public.room_categories for select using (true);

create policy "Public read property_interests"
  on public.property_interests for select using (true);

create policy "Public read property_experiences"
  on public.property_experiences for select using (true);

create policy "Public read experience_related_properties"
  on public.experience_related_properties for select using (true);

-- Authenticated staff can fully manage catalog content ------------------------
create policy "Staff manage interests"
  on public.interests for all to authenticated using (true) with check (true);

create policy "Staff manage experiences"
  on public.experiences for all to authenticated using (true) with check (true);

create policy "Staff manage properties"
  on public.properties for all to authenticated using (true) with check (true);

create policy "Staff manage room categories"
  on public.room_categories for all to authenticated using (true) with check (true);

create policy "Staff manage property_interests"
  on public.property_interests for all to authenticated using (true) with check (true);

create policy "Staff manage property_experiences"
  on public.property_experiences for all to authenticated using (true) with check (true);

create policy "Staff manage experience_related_properties"
  on public.experience_related_properties for all to authenticated using (true) with check (true);

-- Inquiries: anyone can submit, only staff can read/update --------------------
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert to anon, authenticated with check (true);

create policy "Staff read inquiries"
  on public.inquiries for select to authenticated using (true);

create policy "Staff update inquiries"
  on public.inquiries for update to authenticated using (true) with check (true);

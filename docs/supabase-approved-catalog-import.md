# Approved catalogue import

This document accompanies
`supabase/migrations/202610200002_import_approved_catalog.sql`. The migration
has been prepared locally and has not been applied to any Supabase project.

## Source and scope

The import is a snapshot of the public catalogue exported by `lib/data.ts` on
the `aloha-final-updates` branch:

- 8 records from `resorts`;
- 9 records from `approvedGuestHouses`; and
- the hero and gallery paths attached to those 17 records.

The six legacy guest-house demo records are not selected through
`approvedGuestHouseIds` and are not present in the migration. The import also
contains no inquiries, prices, staff accounts, Storage objects, or unpublished
mock records. The website continues to read `lib/data.ts`; applying this import
later will not switch the public data source.

## Repeatability and protection of later edits

The import is deliberately insert-only:

1. `properties` uses `on conflict do nothing`, with no update clause.
2. A temporary transaction-local table records only property IDs inserted by
   the current run.
3. Image metadata is inserted only for those newly inserted properties.
4. Existing property or image rows are never updated or deleted.
5. The whole operation is transactional.

Therefore, rerunning the SQL after staff have edited, removed, or replaced
records does not overwrite those changes or restore deleted images. If an ID or
slug already exists before the first run, that source property is skipped and
the verification queries below will expose the conflict for manual review.

## Field mapping

| Existing `Property` field | Supabase destination |
| --- | --- |
| `id`, `slug`, `name`, `type` | matching columns on `properties` |
| `shortDescription`, `description` | `short_description`, `description` |
| `island`, `atoll`, `location` | matching columns |
| list fields | PostgreSQL text arrays |
| `roomCategories` | `room_categories` JSONB array |
| `featured`, `published` | matching booleans |
| source array order | `properties.sort_order` |
| `heroImage` | one `property_images` row with `kind = 'hero'` |
| `gallery` | ordered `property_images` rows with `kind = 'gallery'` |

All 17 approved records currently have empty `roomCategories`, so the import
contains no room prices, occupancy, or unsupported room data.

## Known model differences and source inconsistencies

- Most source gallery arrays repeat the hero path as a gallery item. That is
  meaningful because the current detail page renders `gallery` independently
  from `heroImage`. The foundation migration's original uniqueness constraint
  could not represent both roles. This import therefore replaces it with a
  unique index on `(property_id, kind, image_url)`: the same path can be one
  hero and one ordered gallery item, but cannot be duplicated within a role.
  This is a non-destructive compatibility adjustment and preserves the source
  gallery arrays exactly.
- `Property` has no per-image alt text. The database requires it, so the import
  uses conservative property-name labels. The six resorts without verified
  property photography are explicitly labelled as illustrative Maldives
  destination imagery.
- `Property` has no image provenance fields. `source_url`, `permission_note`
  and `storage_path` are consequently left null; existing provenance remains
  in repository documentation and should be reconciled before a future admin
  edit or upload workflow writes those fields.
- Atoll values are preserved exactly from `lib/data.ts`. Resort records often
  omit the word “Atoll”, while guest-house records generally include it. The
  import does not silently normalise client-facing text.
- The first six named resorts retain the neutral/illustrative local paths used
  by the current public site; the migration does not claim those images are
  verified photographs of the named properties.

## Review and application procedure

1. Review this migration and the foundation migration together.
2. Confirm the source branch still contains exactly 8 public resorts and 9
   approved guest houses. If catalogue data changes, create a new migration;
   do not edit an already-applied migration.
3. Verify every `/images/...` path in the migration exists under
   `public/images` in the deployment artifact.
4. Apply both migrations to a disposable Supabase development project first.
5. Run the verification queries below from a privileged SQL session.
6. Compare the ordered result with `resorts` and `approvedGuestHouses` in
   `lib/data.ts`, including descriptions, arrays, publication state and image
   order.
7. Test anonymous reads and confirm all 17 published records and their image
   metadata are visible through RLS.
8. Test an authenticated non-staff account and confirm it cannot mutate the
   imported rows.
9. Test an editor and admin according to the authorization matrix in
   `docs/supabase-admin-foundation.md`.
10. Only after review, apply through the approved Supabase migration workflow.

## Verification queries

The following checks are read-only.

```sql
-- Exactly 17 approved imported identities: 8 resorts and 9 guest houses.
select type, count(*)
from public.properties
where id in (
  'prop-constance-halaveli-resort',
  'prop-conrad-maldives-rangali-island',
  'prop-anantara-kihavah-villas',
  'prop-the-st-regis-vommuli-resort-maldives',
  'prop-pullman-maldives-maamutaa-resort',
  'prop-baros-maldives',
  'prop-the-westin-maldives-miriandhoo-resort',
  'prop-dhigufaru-island-resort',
  'prop-lagoon-villa-thoddoo',
  'prop-belena-maldives',
  'prop-season-paradise',
  'prop-h78',
  'prop-h78-veli',
  'prop-h78-iru',
  'prop-avanti-vaadhoo',
  'prop-arena-beach-hotel',
  'prop-bambukeyo-villa'
)
group by type
order by type;

-- Must return zero rows; identifies a skipped ID/slug conflict or failed row.
with expected (id) as (
  values
    ('prop-constance-halaveli-resort'),
    ('prop-conrad-maldives-rangali-island'),
    ('prop-anantara-kihavah-villas'),
    ('prop-the-st-regis-vommuli-resort-maldives'),
    ('prop-pullman-maldives-maamutaa-resort'),
    ('prop-baros-maldives'),
    ('prop-the-westin-maldives-miriandhoo-resort'),
    ('prop-dhigufaru-island-resort'),
    ('prop-lagoon-villa-thoddoo'),
    ('prop-belena-maldives'),
    ('prop-season-paradise'),
    ('prop-h78'),
    ('prop-h78-veli'),
    ('prop-h78-iru'),
    ('prop-avanti-vaadhoo'),
    ('prop-arena-beach-hotel'),
    ('prop-bambukeyo-villa')
)
select expected.id as missing_id
from expected
left join public.properties using (id)
where properties.id is null;

-- Review every imported property in source order.
select
  sort_order, id, slug, name, type, island, atoll, location,
  short_description, description, tags, interests, experiences,
  facilities, highlights, room_categories, featured, published
from public.properties
where id like 'prop-%'
order by sort_order, id;

-- Every approved property must have exactly one hero.
select p.id, p.name,
       count(i.id) filter (where i.kind = 'hero') as hero_count,
       count(i.id) filter (where i.kind = 'gallery') as gallery_count
from public.properties p
left join public.property_images i on i.property_id = p.id
where p.sort_order between 0 and 16
group by p.id, p.name, p.sort_order
order by p.sort_order;

-- Inspect all local paths and their deterministic order.
select p.id, i.kind, i.sort_order, i.image_url, i.alt_text
from public.properties p
join public.property_images i on i.property_id = p.id
where p.sort_order between 0 and 16
order by p.sort_order,
         case i.kind when 'hero' then 0 else 1 end,
         i.sort_order;

-- Must return zero duplicate identities or image paths.
select id as duplicate_value from public.properties group by id having count(*) > 1
union all
select slug from public.properties group by slug having count(*) > 1
union all
select property_id || ':' || kind || ':' || image_url
from public.property_images
group by property_id, kind, image_url
having count(*) > 1;
```

The range-based review queries assume this initial import owns sort orders
0–16. For a database that already contains catalogue rows, use the explicit ID
list from the first query instead.

## Validation limitation

The Supabase CLI and PostgreSQL client are not installed in this workspace, and
this task does not permit connecting to an external project. SQL parsing,
constraint execution, RLS behavior and a second-run database test must therefore
be completed in the disposable Supabase project before production application.

# Supabase admin foundation

This document accompanies
`supabase/migrations/202610200001_secure_admin_catalog.sql`. The migration is
code preparation only. It has not been connected to or applied against a
Supabase project.

## Scope

The migration creates only the production foundation needed for accommodation
administration:

- `staff_profiles` for invite-only staff authorization;
- `properties` for resorts and hotels/guest houses;
- `property_images` for ordered hero and gallery photography;
- a public-read `property-images` Storage bucket with staff-only writes; and
- helper functions, triggers, explicit grants and Row Level Security policies.

It does not import inquiries, prices, mock records, or any content from
`supabase/seed.sql`. It does not execute or depend on the destructive
`supabase/schema.sql` file.

## Existing application compatibility

The `properties` fields map to the existing `Property` interface. A later data
adapter should convert snake_case database fields to the current camelCase
shape and assemble:

- `heroImage` from the `kind = 'hero'` image;
- `gallery` from ordered `kind = 'gallery'` images; and
- `roomCategories` from the `room_categories` JSON array.

`property_images.image_url` accepts the existing `/images/...` paths, allowing
the 17 approved public listings to be imported without moving their current
photographs. New uploads should also record their `storage_path`.

The approved listings must be imported in a separate, reviewed data migration.
That migration should preserve all current IDs and slugs and must include only
the 8 public resorts and 9 approved hotels/guest houses. The six isolated legacy
guest-house demo records must not be imported.

## Project configuration required before application

The Supabase project owner must:

1. Select the production project and region and grant the implementation team
   appropriate project access.
2. Disable public user registration. Staff accounts should be invited by an
   authorised project owner.
3. Configure the production and preview Site URL and redirect allow-list.
4. Decide whether staff use password or magic-link authentication and enable
   MFA for administrative users.
5. Configure local and Netlify environment variables by name:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` only where a server-only provisioning or
     migration script genuinely requires it
   - `NEXT_PUBLIC_SITE_URL`
6. Confirm the staff emails and whether each person is an `editor` or `admin`.
7. Confirm backup, recovery and billing expectations before production use.

No credential values belong in Git. The service-role key must never be exposed
through a `NEXT_PUBLIC_` variable or browser code.

## Staff authorization

An authenticated user is not automatically staff. After Supabase Auth has
created an invited user, a project owner must add the authorization row from a
trusted SQL session or provisioning script:

```sql
insert into public.staff_profiles (user_id, display_name, role, active)
select id, 'Staff display name', 'editor', true
from auth.users
where email = 'approved-staff-address@example.com';
```

Replace the example values only inside the trusted project session. The public
application receives no insert, update or delete privileges on
`staff_profiles`, so staff cannot activate themselves or change their own role.

Editors may create and update properties and manage photographs. Only admins
may delete a property. Prefer adding an archive workflow in the application
before exposing permanent deletion.

## Storage rules

Uploads must use this object layout:

```text
properties/<property-id>/<generated-uuid>.<extension>
```

The bucket accepts JPEG, PNG and WebP files up to 10 MiB. SVG is intentionally
excluded. The application must additionally verify the actual file signature,
dimensions and file size, generate object names rather than trusting uploaded
filenames, and require accurate alt text before publication.

The bucket is public because property photographs are public website assets.
Draft object URLs should therefore be treated as unlisted rather than private.
If draft-image confidentiality becomes a requirement, use a private bucket and
signed delivery URLs instead.

## Review and later application

Before applying this migration to production:

1. Create or select a disposable Supabase development project.
2. Run `supabase db lint` and apply the migration there first.
3. Test access as `anon`, an authenticated non-staff user, an editor, and an
   admin.
4. Verify non-staff users cannot read drafts or mutate any catalogue/storage
   record.
5. Verify editors cannot modify `staff_profiles` or delete properties.
6. Verify admins can delete properties and that cascading image metadata is
   intentional.
7. Upload each permitted MIME type and reject oversized or disallowed files.
8. Review the separate 17-listing import migration and reconcile every row with
   the current public website before switching application reads.
9. Apply migrations through the Supabase CLI or the approved deployment
   workflow, then configure Netlify variables separately.

The migration is additive: it contains no `drop`, `truncate`, or obsolete seed
execution. Because PostgreSQL/Supabase tooling is not installed in the current
workspace and no external project may be contacted for this task, database
execution, RLS behavior and Storage policy behavior still require the review
environment above.

# Supabase setup

This project uses **Supabase directly** (`@supabase/supabase-js` + `@supabase/ssr`). **Prisma is not used** — schema lives in SQL migrations under `supabase/migrations/`.

## 1. Project

Use your existing project if you already host images at `ckmvgvvcbqntbmhjzjof.supabase.co`, or create a new one at [supabase.com/dashboard](https://supabase.com/dashboard).

From **Project Settings → API**, copy:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- Publishable (anon) key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Service role key → `SUPABASE_SERVICE_ROLE_KEY` (server only, never commit)

Add them to `.env` (see `.env.example`).

## 2. Run the migration

**Option A — Dashboard:** SQL Editor → paste `migrations/20260522100000_initial_admin_schema.sql` → Run.

**Option B — CLI** (recommended for ongoing work):

```bash
brew install supabase/tap/supabase
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Auth (before admin UI)

In **Authentication → Providers**, enable Email (magic link) and/or Google.

In **Authentication → URL configuration**, add redirect URLs:

- `http://localhost:3000/admin/auth/callback`
- `https://quynuoiem.com/admin/auth/callback`
- `https://www.quynuoiem.com/admin/auth/callback`

## 4. Storage

The live site already uses bucket `images` with paths like `tin-tuc/...` and `bao-cao/...`.

If admin image upload fails with a permission error, run:

`migrations/20260526100000_storage_tin_tuc_upload.sql`

in the SQL Editor (creates policies for `tin-tuc/` uploads by editors/admins).

## 5. First admin user

1. Sign up via Auth (magic link) with your staff email.
2. In SQL Editor, promote your user:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'you@example.com';
```

## 6. Production server

Copy `.env.example` to `.env` on the server and set all values, especially:

- `NEXT_PUBLIC_SITE_URL` — `https://quynuoiem.com` (this CMS site)
- `NEXT_PUBLIC_PUBLIC_CATALOG_URL` — `https://nuoiem2025.quynuoiem.com/` (linked catalog app)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET` and admin credentials

Run `npm run build && npm run start` (or your process manager) behind a reverse proxy with HTTPS.

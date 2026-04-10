# Newsletter Email Storage — Design Spec
Date: 2026-04-10

## Overview

Add real email collection to the existing newsletter form on the Plonbli landing page. The site is statically hosted on GitHub Pages, so storage is handled by an external Supabase (Postgres) database. The frontend submits emails directly to Supabase via its public anon key.

---

## Database

**Provider:** Supabase (free tier)

**Table: `subscribers`**

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, auto-generated (`gen_random_uuid()`) |
| `email` | `text` | Unique, not null |
| `created_at` | `timestamptz` | Default `now()` |

**Row Level Security (RLS):**
- RLS enabled on the table
- Policy: anonymous role (`anon`) may INSERT only
- No SELECT, UPDATE, or DELETE for anonymous users
- The subscriber list is only accessible via the Supabase dashboard or service role key

---

## Frontend

### New file: `src/lib/supabase.ts`
Creates and exports the Supabase client configured via Vite env vars:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Modified: `src/pages/Index.tsx`
`handleSubscribe` is updated to:
1. Call `supabase.from('subscribers').insert({ email })`
2. On success: show "Dziękujemy za zapisanie się!" toast, clear input
3. On unique constraint violation (duplicate email): show "Ten adres e-mail jest już zapisany" toast
4. On other error: show generic error toast, do not clear input

### New file: `.env`
```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

`.env` is gitignored — values are never committed.

---

## CI/CD

The existing GitHub Actions deploy workflow (`/.github/workflows/deploy.yml`) needs two repository secrets added via the GitHub UI:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The workflow's build step must expose them as environment variables so Vite can embed them at build time.

---

## Security

- The anon key is safe to expose in frontend code — it is scoped to INSERT only via RLS
- No sensitive data is stored beyond email addresses
- Duplicate emails are rejected at the database level (unique constraint), not just the application level

---

## Out of Scope

- Email sending / campaign management
- Admin UI for viewing subscribers
- Unsubscribe flow
- GDPR consent checkbox (can be added later)

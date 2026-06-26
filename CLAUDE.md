# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## ⚠️ Next.js version

This project uses **Next.js 16.2.9 with React 19 and Turbopack**. APIs and conventions differ from older Next.js. Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices — do not rely on training-data assumptions.

Note: middleware lives in `src/proxy.ts` (the `proxy` convention), not `middleware.ts`.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint (eslint-config-next, flat config in eslint.config.mjs)
```

There is no test framework configured. Scripts invoke Next directly via `node node_modules/next/dist/bin/next ...`.

## Environment setup

Copy `.env.example` to `.env.local` and fill in Supabase + Kinde credentials. Required keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `KINDE_CLIENT_ID`, `KINDE_CLIENT_SECRET`, `KINDE_ISSUER_URL`, and the `KINDE_*_URL` redirect vars. Auth routes degrade gracefully (return a 500 JSON error) when Kinde env vars are missing.

## Architecture

**Success at School** — a tutoring business site (Kindergarten–Year 12, AU/Sydney focus) combining a public marketing site with role-based dashboards. App Router throughout.

### Authentication & authorization — the core pattern

Auth is **two-layered**: Kinde owns identity, Supabase owns application data.

- **Kinde** (`@kinde-oss/kinde-auth-nextjs`) handles login/sessions. The `admin` role is assigned **only in the Kinde dashboard** — never in-app.
- **Supabase** `profiles` table mirrors every Kinde user (keyed by `kinde_id`) and stores the in-app role (`tutor`, `parent`).
- **`src/proxy.ts`** is Kinde's `withAuth` middleware. On every authenticated request it lazily imports the Supabase server client and **upserts the user's profile** (creating it on first login, promoting to `admin` if the Kinde role appeared). `publicPaths` lists routes that bypass auth (`/`, `/marketing`, `/enrol`, auth routes). Profile-sync failures are swallowed — they must not block the request.
- **`src/lib/kinde/roles.ts`** — `getUserRole()` is the authoritative role resolver: checks Kinde roles for `admin` first, then falls back to the Supabase `profiles.role`. `syncKindeUser()` duplicates the proxy's sync logic for use inside server components/actions.
- **`src/app/dashboard/page.tsx`** is a server-side redirect hub: reads Kinde roles and routes to `/dashboard/admin`, `/dashboard/tutor`, or `/dashboard/parent`.
- **`src/components/auth-guard.tsx`** is only a client-side hydration gate (spinner until mounted), **not** a real authorization boundary — enforcement happens in the proxy and server components.

When touching auth, remember role logic is duplicated between `proxy.ts` and `roles.ts`; keep them consistent. Admin is Kinde-sourced; tutor/parent are Supabase-sourced.

### Supabase clients

- `src/lib/supabase/server.ts` — `createServerSupabaseClient()` (cookie-bound, async, for server components/route handlers/proxy).
- `src/lib/supabase/client.ts` — `createClient()` (browser).

Both use the public anon key with `@supabase/ssr`. The schema relies on RLS (see `supabase-schema.sql`).

### Database schema

Two overlapping SQL sources exist — reconcile carefully before changing tables:
- `supabase-schema.sql` — the full canonical schema (profiles, students, tutors, parents, enrolments, sessions, attendance, progress reports, assessments, messages, notifications, testimonials, FAQs, programs, admin notes, audit logs) with enums, indexes, and RLS.
- `supabase/migrations/` — incremental migrations (`001_admin_tables.sql`) plus `diagnostic.sql`.

TypeScript mirrors of these tables live in `src/types/index.ts` — update types and SQL together. Note a known drift: the SQL uses `profile_id` on `students`/`tutors` while some types use `user_id`.

### Routing layout

- `src/app/page.tsx` + `src/components/home/*` — landing page sections (hero, programs grid, testimonials, etc.).
- `src/app/marketing/*` — static marketing pages (about, contact, faq, programs, and OC/NAPLAN/selective prep). Public.
- `src/app/enrol/page.tsx` — public enrolment form (react-hook-form + zod via `@hookform/resolvers`).
- `src/app/dashboard/{admin,tutor,parent}/*` — role dashboards. Admin has the most depth (analytics, enrolments, messages, sessions, settings, students). Many dashboard pages are `"use client"` with hardcoded demo data — wire to Supabase when implementing real features.
- `src/app/auth/*` and `src/app/api/auth/[kindeAuth]/route.ts` — Kinde login/callback handlers.

### UI & styling

- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` via `@theme inline`, no `tailwind.config`). Custom palettes: `primary` (orange), `secondary` (teal), `navy`, `gold`, plus semantic `surface`/`text`/`border` tokens. Use these tokens, not raw hex.
- `src/components/ui/*` — primitives (button, card, input, select, badge, alert, dropdown, map, section, page-header) using `class-variance-authority` + the `cn()` helper (`clsx` + `tailwind-merge`) in `src/lib/utils.ts`.
- `src/lib/utils.ts` also has AU-locale `formatDate`, `formatCurrency` (AUD), and `slugify`.
- Fonts: Inter via `next/font/google` (`--font-sans`); Cabinet Grotesk woff2 files in `src/fonts/`.
- `maplibre-gl` powers `ui/map.tsx`; `framer-motion` for animation; `lucide-react` for icons.

### Images

`next.config.ts` sets `images.unoptimized: true` and allow-lists `**.kinde.com` / `**.supabase.co` remote patterns. Turbopack `root` is pinned to `process.cwd()`.

-- ============================================
-- Public form submissions (no auth required)
-- ============================================
-- These are flat "inbox" tables for unauthenticated visitors submitting the
-- public enrolment and contact forms. They are intentionally NOT linked to the
-- normalized profiles/students/enrolments tables — staff review a request and
-- convert it into a real enrolment later.
--
-- RLS: the browser submits with the Supabase anon key (role `anon`). We allow
-- INSERT only. No SELECT policy exists, so submissions cannot be read back
-- through the API — read them in the Supabase dashboard (service role bypasses
-- RLS) or via a future admin view backed by the service role.

-- 1. ENROLMENT REQUESTS -----------------------------------------------------
create table if not exists public.enrolment_requests (
  id                  uuid primary key default gen_random_uuid(),
  year_level          text not null,
  program_goal        text not null,
  student_first_name  text not null,
  student_last_name   text not null,
  school_name         text,
  parent_first_name   text not null,
  parent_last_name    text not null,
  email               text not null,
  phone               text not null,
  campus              text,
  subjects            text[] not null default '{}',
  learning_goals      text,
  available_days      text[] not null default '{}',
  preferred_time      text,
  session_format      text,
  class_type          text,
  book_assessment     boolean not null default false,
  additional_notes    text,
  terms_accepted      boolean not null default false,
  status              text not null default 'new',
  created_at          timestamptz not null default now()
);

create index if not exists idx_enrolment_requests_created_at
  on public.enrolment_requests (created_at desc);

alter table public.enrolment_requests enable row level security;

drop policy if exists "Public can submit enrolment requests" on public.enrolment_requests;
create policy "Public can submit enrolment requests"
  on public.enrolment_requests
  for insert
  to anon, authenticated
  with check (true);

-- 2. CONTACT MESSAGES -------------------------------------------------------
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  status      text not null default 'new',
  created_at  timestamptz not null default now()
);

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

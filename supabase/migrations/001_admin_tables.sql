-- Create tables for SAS admin dashboard
-- Run this in the Supabase SQL Editor

-- 1. Students
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text not null,
  year_level text not null,
  school text,
  parent_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Parents
create table if not exists public.parents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  students uuid[] default '{}',
  phone text,
  preferred_contact text default 'email',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Tutors
create table if not exists public.tutors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  specialties text[] default '{}',
  bio text,
  rate_per_hour numeric(10,2) default 0,
  availability jsonb default '{}',
  max_students int default 10,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Enrolments
create table if not exists public.enrolments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade not null,
  tutor_id uuid references public.tutors(id) on delete set null,
  program_type text not null,
  year_level text not null,
  session_format text not null,
  class_type text not null,
  subjects text[] default '{}',
  status text default 'pending' check (status in ('pending', 'active', 'paused', 'completed', 'cancelled')),
  preferred_days text[] default '{}',
  preferred_times text[] default '{}',
  notes text,
  goals text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Sessions
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  enrolment_id uuid references public.enrolments(id) on delete cascade not null,
  tutor_id uuid references public.tutors(id) on delete set null not null,
  student_id uuid references public.students(id) on delete cascade not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  format text not null,
  status text default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'no-show')),
  topic text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Attendance
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade not null,
  student_id uuid references public.students(id) on delete cascade not null,
  status text not null check (status in ('present', 'absent', 'late', 'excused')),
  minutes_late int,
  notes text,
  created_at timestamptz default now()
);

-- 7. Progress Reports
create table if not exists public.progress_reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade not null,
  tutor_id uuid references public.tutors(id) on delete set null,
  period_start date not null,
  period_end date not null,
  overall_score numeric(5,2),
  strengths text[] default '{}',
  areas_for_improvement text[] default '{}',
  notes text,
  created_at timestamptz default now()
);

-- 8. Assessments
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade not null,
  type text not null check (type in ('initial', 'mid-term', 'end-of-term', 'mock')),
  subject text not null,
  score numeric(5,2),
  max_score numeric(5,2),
  feedback text,
  completed_at timestamptz not null,
  created_at timestamptz default now()
);

-- 9. Messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  subject text not null,
  body text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- 10. Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  body text not null,
  type text default 'info' check (type in ('info', 'success', 'warning', 'error')),
  read boolean default false,
  created_at timestamptz default now()
);

-- 11. Admin Notes
create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  category text,
  pinned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12. Audit Logs
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  resource text not null,
  resource_id text,
  details jsonb,
  ip_address text,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table public.students enable row level security;
alter table public.parents enable row level security;
alter table public.tutors enable row level security;
alter table public.enrolments enable row level security;
alter table public.sessions enable row level security;
alter table public.attendance enable row level security;
alter table public.progress_reports enable row level security;
alter table public.assessments enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.admin_notes enable row level security;
alter table public.audit_logs enable row level security;

-- RLS policies: admins can do everything, authenticated users read own data
create policy "Admins full access on students" on public.students for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Authenticated users read students" on public.students for select using (
  auth.role() = 'authenticated'
);

create policy "Admins full access on enrolments" on public.enrolments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Authenticated users read enrolments" on public.enrolments for select using (
  auth.role() = 'authenticated'
);

create policy "Admins full access on sessions" on public.sessions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Authenticated users read sessions" on public.sessions for select using (
  auth.role() = 'authenticated'
);

create policy "Admins full access on messages" on public.messages for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on tutors" on public.tutors for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on attendance" on public.attendance for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on progress_reports" on public.progress_reports for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on assessments" on public.assessments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on notifications" on public.notifications for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on admin_notes" on public.admin_notes for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on audit_logs" on public.audit_logs for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins full access on parents" on public.parents for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Indexes for performance
create index if not exists idx_students_parent on public.students(parent_id);
create index if not exists idx_students_user on public.students(user_id);
create index if not exists idx_enrolments_student on public.enrolments(student_id);
create index if not exists idx_enrolments_tutor on public.enrolments(tutor_id);
create index if not exists idx_enrolments_status on public.enrolments(status);
create index if not exists idx_sessions_enrolment on public.sessions(enrolment_id);
create index if not exists idx_sessions_student on public.sessions(student_id);
create index if not exists idx_sessions_tutor on public.sessions(tutor_id);
create index if not exists idx_sessions_date on public.sessions(date);
create index if not exists idx_messages_sender on public.messages(sender_id);
create index if not exists idx_messages_receiver on public.messages(receiver_id);
create index if not exists idx_messages_read on public.messages(read);
create index if not exists idx_notifications_user on public.notifications(user_id);
create index if not exists idx_audit_logs_user on public.audit_logs(user_id);
create index if not exists idx_audit_logs_created on public.audit_logs(created_at);

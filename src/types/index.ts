export type Role = "admin" | "tutor" | "parent" | "student";

export type YearLevel =
  | "kindergarten"
  | "year-1"
  | "year-2"
  | "year-3"
  | "year-4"
  | "year-5"
  | "year-6"
  | "year-7"
  | "year-8"
  | "year-9"
  | "year-10"
  | "year-11"
  | "year-12";

export type ProgramType = "general" | "oc" | "naplan" | "selective" | "subject";

export type SessionFormat = "online" | "in-person" | "hybrid";
export type ClassType = "group" | "private";

export interface User {
  id: string;
  kinde_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  year_level: YearLevel;
  school?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Parent {
  id: string;
  user_id: string;
  students: string[];
  phone?: string;
  preferred_contact?: "email" | "phone";
  created_at: string;
  updated_at: string;
}

export interface Tutor {
  id: string;
  user_id: string;
  specialties: string[];
  bio?: string;
  rate_per_hour: number;
  availability: Record<string, unknown>;
  max_students: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrolment {
  id: string;
  student_id: string;
  tutor_id?: string;
  program_type: ProgramType;
  year_level: YearLevel;
  session_format: SessionFormat;
  class_type: ClassType;
  subjects: string[];
  status: "pending" | "active" | "paused" | "completed" | "cancelled";
  preferred_days: string[];
  preferred_times: string[];
  notes?: string;
  goals?: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  enrolment_id: string;
  tutor_id: string;
  student_id: string;
  date: string;
  start_time: string;
  end_time: string;
  format: SessionFormat;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  topic?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  session_id: string;
  student_id: string;
  status: "present" | "absent" | "late" | "excused";
  minutes_late?: number;
  notes?: string;
  created_at: string;
}

export interface ProgressReport {
  id: string;
  student_id: string;
  tutor_id: string;
  period_start: string;
  period_end: string;
  overall_score?: number;
  strengths: string[];
  areas_for_improvement: string[];
  notes: string;
  created_at: string;
}

export interface Assessment {
  id: string;
  student_id: string;
  type: "initial" | "mid-term" | "end-of-term" | "mock";
  subject: string;
  score?: number;
  max_score?: number;
  feedback?: string;
  completed_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: "parent" | "student";
  avatar_url?: string;
  content: string;
  rating: number;
  outcome?: string;
  is_featured: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  is_published: boolean;
  created_at: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  year_levels: YearLevel[];
  program_type: ProgramType;
  features: string[];
  price?: number;
  duration_weeks?: number;
  icon?: string;
  is_published: boolean;
  created_at: string;
}

export interface AdminNote {
  id: string;
  user_id: string;
  author_id: string;
  content: string;
  category?: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  resource_id?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}

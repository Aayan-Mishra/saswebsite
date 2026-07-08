import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendAdminNotification, formatYearLevel, renderAdminEmail } from "@/lib/email";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";

const REQUIRED_FIELDS = [
  "yearLevel",
  "programGoal",
  "studentFirstName",
  "studentLastName",
  "parentFirstName",
  "parentLastName",
  "email",
  "phone",
] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body?.[field]) {
      return Response.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  // Anti-spam: verify Cloudflare Turnstile (skipped if not configured).
  const captchaOk = await verifyTurnstile(
    body.turnstileToken as string | undefined,
    getClientIp(request)
  );
  if (!captchaOk) {
    return Response.json(
      { error: "Verification failed. Please try again.", code: "CAPTCHA_FAILED" },
      { status: 400 }
    );
  }

  const get = (k: string) => (body[k] == null ? null : String(body[k]));
  const getArr = (k: string) => (Array.isArray(body[k]) ? (body[k] as string[]) : []);

  // Guard against a misconfigured deployment (env vars not set on the host).
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("[api/enrol] Missing Supabase env vars on the server");
    return Response.json(
      { error: "Server not configured", code: "ENV_MISSING" },
      { status: 500 }
    );
  }

  // 1. Persist to Supabase (anon insert is allowed by RLS policy)
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("enrolment_requests").insert({
    year_level: get("yearLevel"),
    program_goal: get("programGoal"),
    student_first_name: get("studentFirstName"),
    student_last_name: get("studentLastName"),
    school_name: get("schoolName"),
    parent_first_name: get("parentFirstName"),
    parent_last_name: get("parentLastName"),
    email: get("email"),
    phone: get("phone"),
    campus: get("campus"),
    subjects: getArr("subjects"),
    learning_goals: get("learningGoals"),
    available_days: getArr("availableDays"),
    preferred_time: get("preferredTime"),
    session_format: get("sessionFormat"),
    class_type: get("classType"),
    book_assessment: Boolean(body.bookAssessment),
    additional_notes: get("additionalNotes"),
    terms_accepted: Boolean(body.termsAccepted),
  });

  if (error) {
    console.error("[api/enrol] Supabase insert failed:", error);
    return Response.json(
      { error: "Could not save enrolment", code: error.code, detail: error.message },
      { status: 500 }
    );
  }

  // 2. Notify admin (best-effort — never fail the submission on email error)
  const studentName = `${get("studentFirstName")} ${get("studentLastName")}`.trim();
  const grade = formatYearLevel(get("yearLevel") ?? "");
  const subjects = getArr("subjects");
  const days = getArr("availableDays");

  try {
    await sendAdminNotification({
      subject: `[URGENT] - New Enrollment Fillout - ${studentName} - ${grade}`,
      html: renderAdminEmail({
        title: "New Enrolment Request",
        subtitle: `${studentName} · ${grade}`,
        rows: [
          { label: "Student", value: studentName },
          { label: "Year level", value: grade },
          { label: "School", value: get("schoolName") ?? "" },
          { label: "Program goal", value: get("programGoal") ?? "" },
          { label: "Subjects", value: subjects.join(", ") },
          { label: "Parent", value: `${get("parentFirstName")} ${get("parentLastName")}`.trim() },
          { label: "Email", value: get("email") ?? "" },
          { label: "Phone", value: get("phone") ?? "" },
          { label: "Campus", value: get("campus") ?? "" },
          { label: "Session format", value: get("sessionFormat") ?? "" },
          { label: "Class type", value: get("classType") ?? "" },
          { label: "Available days", value: days.join(", ") },
          { label: "Preferred time", value: get("preferredTime") ?? "" },
          { label: "Book assessment", value: body.bookAssessment ? "Yes" : "No" },
          { label: "Learning goals", value: get("learningGoals") ?? "" },
          { label: "Notes", value: get("additionalNotes") ?? "" },
        ],
      }),
    });
  } catch (e) {
    console.error("[api/enrol] Admin email failed:", e);
  }

  return Response.json({ ok: true });
}

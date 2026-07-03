import { requireAdmin } from "@/lib/admin-guard";

// Always run fresh — admins need to see the latest submissions.
export const dynamic = "force-dynamic";

/** GET /api/admin/enrolment-requests — list every public enrolment submission. */
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { data, error } = await guard.supabase
    .from("enrolment_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/admin/enrolment-requests] read failed:", error);
    return Response.json(
      { error: "Could not load enrolment requests", detail: error.message },
      { status: 500 }
    );
  }

  return Response.json({ requests: data ?? [] });
}

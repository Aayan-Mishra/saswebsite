import { requireAdmin } from "@/lib/admin-guard";

// Always run fresh — admins need to see the latest messages.
export const dynamic = "force-dynamic";

/** GET /api/admin/contact-messages — list every public contact submission. */
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { data, error } = await guard.supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/admin/contact-messages] read failed:", error);
    return Response.json(
      { error: "Could not load contact messages", detail: error.message },
      { status: 500 }
    );
  }

  return Response.json({ messages: data ?? [] });
}

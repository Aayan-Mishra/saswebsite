import { requireAdmin } from "@/lib/admin-guard";

const ALLOWED_STATUSES = ["new", "read", "replied", "archived"] as const;
type Status = (typeof ALLOWED_STATUSES)[number];

/** PATCH /api/admin/contact-messages/:id — update a message's status. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const status = body.status;
  if (!status || !ALLOWED_STATUSES.includes(status as Status)) {
    return Response.json(
      { error: `status must be one of: ${ALLOWED_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  const { data, error } = await guard.supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/admin/contact-messages/:id] update failed:", error);
    return Response.json(
      { error: "Could not update message", detail: error.message },
      { status: 500 }
    );
  }

  return Response.json({ message: data });
}

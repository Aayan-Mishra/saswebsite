import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendAdminNotification, renderAdminEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body?.name || !body?.email || !body?.message) {
    return Response.json(
      { error: "Missing required field (name, email, message)" },
      { status: 400 }
    );
  }

  const get = (k: string) => (body[k] == null ? null : String(body[k]));

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("[api/contact] Missing Supabase env vars on the server");
    return Response.json(
      { error: "Server not configured", code: "ENV_MISSING" },
      { status: 500 }
    );
  }

  // 1. Persist to Supabase
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    subject: get("subject"),
    message: get("message"),
  });

  if (error) {
    console.error("[api/contact] Supabase insert failed:", error);
    return Response.json(
      { error: "Could not save message", code: error.code, detail: error.message },
      { status: 500 }
    );
  }

  // 2. Notify admin (best-effort)
  try {
    await sendAdminNotification({
      subject: `[URGENT] - New Contact Message - ${get("name")}`,
      html: renderAdminEmail({
        title: "New Contact Message",
        subtitle: get("name") ?? undefined,
        rows: [
          { label: "Name", value: get("name") ?? "" },
          { label: "Email", value: get("email") ?? "" },
          { label: "Phone", value: get("phone") ?? "" },
          { label: "Subject", value: get("subject") ?? "" },
          { label: "Message", value: get("message") ?? "" },
        ],
      }),
    });
  } catch (e) {
    console.error("[api/contact] Admin email failed:", e);
  }

  return Response.json({ ok: true });
}

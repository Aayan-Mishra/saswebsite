import { getUserRole } from "@/lib/kinde/roles";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { SupabaseClient } from "@supabase/supabase-js";

type AdminGuardResult =
  | { ok: true; supabase: SupabaseClient }
  | { ok: false; response: Response };

/**
 * Gate an admin route handler: verify the caller is a Kinde admin, then hand
 * back a service-role Supabase client that bypasses RLS.
 *
 * Usage:
 *   const guard = await requireAdmin();
 *   if (!guard.ok) return guard.response;
 *   const { supabase } = guard;
 */
export async function requireAdmin(): Promise<AdminGuardResult> {
  const { role } = await getUserRole();
  if (role !== "admin") {
    return {
      ok: false,
      response: Response.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    console.error("[admin] SUPABASE_SERVICE_ROLE_KEY not configured");
    return {
      ok: false,
      response: Response.json(
        { error: "Server not configured", code: "ENV_MISSING" },
        { status: 500 }
      ),
    };
  }

  return { ok: true, supabase };
}

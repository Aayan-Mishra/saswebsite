import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — **server only**.
 *
 * Bypasses RLS, so it must NEVER be imported into a client component or exposed
 * to the browser. Use it inside admin route handlers that have already verified
 * the caller is a Kinde admin (see `requireAdmin`).
 *
 * Returns null when the service-role key isn't configured, so callers can return
 * a clean "server not configured" response instead of throwing.
 */
export function createAdminSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

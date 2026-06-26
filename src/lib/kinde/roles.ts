import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "tutor" | "parent" | null;

/**
 * Get the user's effective application role by checking:
 * 1. Kinde roles (for admin — only assignable via Kinde dashboard)
 * 2. Supabase profiles (for tutor — assigned in-app)
 */
export async function getUserRole(): Promise<{
  role: AppRole;
  profileId: string | null;
  kindeId: string | null;
}> {
  const session = getKindeServerSession();
  const kindeUser = await session.getUser();
  const kindeRoles = await session.getRoles();

  if (!kindeUser?.id) {
    return { role: null, profileId: null, kindeId: null };
  }

  // 1. Check Kinde roles first — only admin is managed there
  const isAdmin = kindeRoles?.some(
    (r) => r.key === "admin" || r.name === "admin"
  );
  if (isAdmin) {
    return { role: "admin", profileId: null, kindeId: kindeUser.id };
  }

  // 2. Check Supabase for app-assigned roles
  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("kinde_id", kindeUser.id)
    .single();

  if (profile && (profile.role === "tutor" || profile.role === "parent")) {
    return {
      role: profile.role as AppRole,
      profileId: profile.id,
      kindeId: kindeUser.id,
    };
  }

  // Authenticated but no app role yet (e.g. newly registered parent)
  return { role: null, profileId: null, kindeId: kindeUser.id };
}

/**
 * Sync a Kinde user into the Supabase profiles table.
 * Called on every authenticated request to ensure the profile exists.
 */
export async function syncKindeUser(): Promise<void> {
  const session = getKindeServerSession();
  const kindeUser = await session.getUser();
  const kindeRoles = await session.getRoles();

  if (!kindeUser?.id) return;

  const supabase = await createServerSupabaseClient();
  const isAdmin = kindeRoles?.some(
    (r) => r.key === "admin" || r.name === "admin"
  );

  // Check if profile already exists
  const { data: existing } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("kinde_id", kindeUser.id)
    .single();

  if (!existing) {
    // First login — create profile
    await supabase.from("profiles").insert({
      kinde_id: kindeUser.id,
      email: kindeUser.email ?? "",
      first_name: kindeUser.given_name ?? "",
      last_name: kindeUser.family_name ?? "",
      role: isAdmin ? "admin" : "parent", // default to parent for new users
    });
  } else if (isAdmin && existing.role !== "admin") {
    // Promote to admin if Kinde role was granted since last login
    await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", existing.id);
  }
}

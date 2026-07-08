import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware({ token, user }: { token: any; user: any }) {
    // Sync Kinde user to Supabase on every authenticated request.
    // This ensures profiles exist before they hit any dashboard page.
    if (user?.id) {
      try {
        const { createServerSupabaseClient } = await import(
          "@/lib/supabase/server"
        );
        const supabase = await createServerSupabaseClient();

        // Decode token to check Kinde roles
        const roles: { key: string }[] = token?.roles || [];
        const roleKeys = roles.map((r) => r.key?.toLowerCase());
        const isAdmin = roleKeys.includes("admin");

        const { data: existing } = await supabase
          .from("profiles")
          .select("id, role")
          .eq("kinde_id", user.id)
          .single();

        if (!existing) {
          await supabase.from("profiles").insert({
            kinde_id: user.id,
            email: user.email ?? "",
            first_name: user.given_name ?? "",
            last_name: user.family_name ?? "",
            role: isAdmin ? "admin" : "parent",
          });
        } else if (isAdmin && existing.role !== "admin") {
          await supabase
            .from("profiles")
            .update({ role: "admin" })
            .eq("id", existing.id);
        }
      } catch {
        // Silently fail — sync is not critical for every request
      }
    }
  },
  {
    publicPaths: [
      "/",
      "/marketing",
      "/auth/login",
      "/auth/callback",
      "/enrol",
      "/privacy",
      "/terms",
      // Public form submission endpoints — anonymous visitors POST here.
      // They validate their own input and only allow inserts. Without these,
      // Kinde's withAuth (which matches publicPaths by prefix — "/api/enrol"
      // does NOT match "/enrol") redirects the POST to login and the
      // submission never reaches the handler.
      "/api/enrol",
      "/api/contact",
      "/_not-found",
    ],
    loginPageUrl: "/auth/login",
  }
);

export const config = {
  // Exclude Next internals and public static assets from auth. The extension
  // list must include txt/xml/webmanifest so crawler-facing files (robots.txt,
  // sitemap.xml, llms.txt, llms-full.txt, manifest.webmanifest) are reachable
  // without a login — otherwise withAuth redirects them to /auth/login.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|eot|txt|xml|webmanifest)).*)"],
};

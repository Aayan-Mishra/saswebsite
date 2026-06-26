import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

const handler = handleAuth();

export async function GET(request: Request, context: any) {
  try {
    return await handler(request, context);
  } catch {
    return new Response(
      JSON.stringify({ error: "Kinde is not configured. Set KINDE_ISSUER_URL, KINDE_CLIENT_ID, KINDE_CLIENT_SECRET, and KINDE_SITE_URL in .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const POST = GET;

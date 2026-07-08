/**
 * Server-side Cloudflare Turnstile verification.
 *
 * Graceful by design: if TURNSTILE_SECRET_KEY isn't set, verification is
 * skipped (returns true) so forms keep working before Cloudflare is configured.
 * Once the secret is set, a missing/invalid token fails.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  remoteip?: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — don't block submissions
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          ...(remoteip ? { remoteip } : {}),
        }),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (e) {
    console.error("[turnstile] verification request failed:", e);
    return false;
  }
}

/** Best-effort client IP from common proxy headers (Cloudflare / Railway). */
export function getClientIp(request: Request): string | undefined {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

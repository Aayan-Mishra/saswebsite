import { Resend } from "resend";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "successatschooltuition@gmail.com";

/**
 * Send a notification email to the admin inbox.
 *
 * Best-effort: if Resend isn't configured (missing RESEND_API_KEY / ADMIN_EMAIL)
 * we log and return without throwing, so a missing email config never blocks a
 * form submission that already saved to the database. Real send failures throw,
 * so the caller can log them.
 */
export async function sendAdminNotification({
  subject,
  html,
}: {
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY missing — skipping admin notification"
    );
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend send failed: ${JSON.stringify(error)}`);
  }
}

/** "year-5" -> "Year 5", "kindergarten" -> "Kindergarten" */
export function formatYearLevel(value: string): string {
  if (!value) return "—";
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Minimal HTML escaping for values interpolated into email bodies. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Render a clean, professional black-and-white admin email.
 * Strictly monochrome: white background, black text, thin gray hairline rules.
 * All styles are inlined (email clients strip <style> blocks).
 */
export function renderAdminEmail({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: { label: string; value: string }[];
}): string {
  const rowHtml = rows
    .map(({ label, value }) => {
      const safeValue = escapeHtml(value).replace(/\n/g, "<br />") || "&mdash;";
      return `
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:top;width:170px;border-bottom:1px solid #e5e5e5;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#666;">${escapeHtml(
          label
        )}</td>
        <td style="padding:12px 0;vertical-align:top;border-bottom:1px solid #e5e5e5;font-size:14px;color:#111;">${safeValue}</td>
      </tr>`;
    })
    .join("");

  return `
  <div style="background:#ffffff;padding:24px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
      <tr><td style="padding:0 24px;">
        <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#000000;">${escapeHtml(
          title
        )}</h1>
        ${
          subtitle
            ? `<p style="margin:0;font-size:13px;color:#888;">${escapeHtml(subtitle)}</p>`
            : ""
        }
        <hr style="border:none;border-top:2px solid #000000;margin:16px 0 4px;" />
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${rowHtml}
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#999;">Sent automatically by the Success at School website.</p>
      </td></tr>
    </table>
  </div>`;
}

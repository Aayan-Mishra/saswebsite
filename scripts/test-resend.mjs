// Quick end-to-end test that Resend is configured and can send.
//
// Usage (from the repo root):
//   RESEND_API_KEY=re_xxx ADMIN_EMAIL=you@example.com node scripts/test-resend.mjs
//
// Or, if your keys are in .env.local:
//   node --env-file=.env.local scripts/test-resend.mjs
//
// It sends one real email to ADMIN_EMAIL and prints the Resend response id.

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.ADMIN_EMAIL || "successatschooltuition@gmail.com";
const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

if (!apiKey) {
  console.error("✗ RESEND_API_KEY is not set. Aborting.");
  process.exit(1);
}

console.log(`Sending test email  from: ${from}  to: ${to} ...`);

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  from,
  to,
  subject: "Success at School — Resend test ✅",
  html: "<p>This is a test email. If you received it, Resend is working correctly.</p>",
});

if (error) {
  console.error("✗ Resend send FAILED:", JSON.stringify(error, null, 2));
  process.exit(1);
}

console.log("✓ Sent. Resend message id:", data?.id);
console.log("  Check the inbox for", to);

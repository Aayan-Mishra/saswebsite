import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { pageMetadata, SITE_NAME, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, stores and protects the personal information of students and parents.`,
  path: "/privacy",
});

const LAST_UPDATED = "8 July 2026";

// NOTE: This is a good-faith template tailored to an Australian tutoring
// business handling children's data under the Privacy Act 1988 (Cth) and the
// Australian Privacy Principles. Have it reviewed by a legal professional and
// fill in the ABN before relying on it.
export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description={`Your privacy matters. This policy explains how ${SITE_NAME} handles personal information.`}
      lastUpdated={LAST_UPDATED}
    >
      <p>
        {SITE_NAME} ({BUSINESS.legalName}, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) is
        committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and
        safeguard personal information when you use our website, enquire about our services, or enrol a student
        with us. We handle personal information in accordance with the{" "}
        <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
      </p>

      <h2>1. Information we collect</h2>
      <p>We collect personal information that you provide to us directly, including through our enrolment and contact forms:</p>
      <ul>
        <li><strong>Parent/guardian details</strong> — name, email address, and phone number.</li>
        <li><strong>Student details</strong> — name, year level, school name, subjects, and learning goals or needs.</li>
        <li><strong>Enquiry content</strong> — any information you include in a message to us.</li>
        <li><strong>Preferences</strong> — preferred campus, session format, availability, and similar scheduling details.</li>
      </ul>
      <p>
        We also automatically collect limited technical information (such as IP address, browser type, and pages
        visited) through standard web logs and security tooling used to protect our forms from abuse.
      </p>

      <h2>2. Children&rsquo;s information</h2>
      <p>
        Our services are directed at families, and much of the information we collect relates to children. Enrolment
        and enquiry details about a student are provided by a parent or guardian, who consents to our collection and
        use of that information on the child&rsquo;s behalf. We do not knowingly collect information directly from a
        child without parental involvement.
      </p>

      <h2>3. How we use your information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>respond to enquiries and provide information about our programs;</li>
        <li>process enrolments and arrange tutoring sessions and assessments;</li>
        <li>communicate with you about scheduling, progress, fees, and service updates;</li>
        <li>maintain and improve our services; and</li>
        <li>comply with our legal obligations and protect against fraud or misuse.</li>
      </ul>

      <h2>4. Disclosure and third-party service providers</h2>
      <p>
        We do not sell your personal information. We share it only with trusted service providers who help us
        operate our website and business, under obligations of confidentiality and data protection. These include:
      </p>
      <ul>
        <li><strong>Supabase</strong> — secure database hosting for form submissions and account data.</li>
        <li><strong>Kinde</strong> — authentication for our parent, tutor and staff portals.</li>
        <li><strong>Resend</strong> — delivery of transactional and notification emails.</li>
        <li><strong>Cloudflare</strong> — website delivery, security, and bot/spam protection (Turnstile) on our forms.</li>
        <li><strong>Vimeo</strong> — video hosting for content displayed on our website.</li>
      </ul>
      <p>
        Some of these providers may store or process data outside Australia. Where that occurs, we take reasonable
        steps to ensure your information is handled consistently with the APPs.
      </p>

      <h2>5. Data security and retention</h2>
      <p>
        We take reasonable technical and organisational measures to protect personal information from misuse,
        loss, and unauthorised access, including access controls and encryption in transit. We retain personal
        information only for as long as necessary to provide our services and meet legal and record-keeping
        obligations, after which it is securely deleted or de-identified.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Our website uses essential cookies and similar technologies to operate securely (for example, to keep you
        signed in to portals and to protect our forms). You can control cookies through your browser settings,
        though disabling them may affect some functionality.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You may request access to, or correction of, the personal information we hold about you. You may also ask us
        to delete information where we are not required to retain it. To make a request, or if you have a privacy
        concern or complaint, contact us using the details below. We will respond within a reasonable time. If you
        are not satisfied with our response, you may contact the Office of the Australian Information Commissioner
        (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">oaic.gov.au</a>.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date above reflects the
        most recent revision. Material changes will be posted on this page.
      </p>

      <h2>9. Contact us</h2>
      <p>
        If you have any questions about this Privacy Policy or how we handle your information, please contact us:
      </p>
      <ul>
        <li>Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
        <li>Phone: <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phone}</a></li>
      </ul>
    </LegalLayout>
  );
}

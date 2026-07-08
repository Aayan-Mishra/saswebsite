import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { pageMetadata, SITE_NAME, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms and conditions governing your use of ${SITE_NAME}'s website and tutoring services.`,
  path: "/terms",
});

const LAST_UPDATED = "8 July 2026";

// NOTE: Good-faith template for an Australian tutoring business. Have it
// reviewed by a legal professional and confirm fee/refund terms before relying
// on it.
export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      description={`Please read these terms carefully before using ${SITE_NAME}'s website and services.`}
      lastUpdated={LAST_UPDATED}
    >
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website and tutoring
        services provided by {SITE_NAME} ({BUSINESS.legalName}, &ldquo;we&rdquo;, &ldquo;us&rdquo; or
        &ldquo;our&rdquo;). By using our website, submitting an enquiry, or enrolling a student, you agree to these
        Terms. If you do not agree, please do not use our services.
      </p>

      <h2>1. Our services</h2>
      <p>
        We provide educational tutoring and exam-preparation services for students from Kindergarten to Year 12,
        delivered in small groups or one-to-one, on-site and online. While we work hard to support each student&rsquo;s
        progress, we do not guarantee any particular academic result, placement, examination outcome, or score.
      </p>

      <h2>2. Enrolment and eligibility</h2>
      <p>
        Enrolment must be completed by a parent or legal guardian for any student under 18. By enrolling, you confirm
        that the information you provide is accurate and that you are authorised to provide it. We may decline or
        cancel an enrolment at our discretion, including where a program is full or is not a suitable fit.
      </p>

      <h2>3. Fees and payment</h2>
      <p>
        Fees vary by program, year level, and session format and will be confirmed with you before enrolment is
        finalised. Fees are payable in accordance with the schedule we provide (for example, per term or via an
        agreed payment plan). We may update our fees from time to time; changes will not affect a term already paid
        for.
      </p>

      <h2>4. Trial lessons, cancellations and rescheduling</h2>
      <p>
        We may offer a no-obligation trial lesson. For ongoing sessions, missed lessons may be rescheduled where you
        give us reasonable notice (at least 24 hours), subject to availability. Sessions cancelled without adequate
        notice may not be refunded or made up. Specific cancellation and refund arrangements will be set out in your
        enrolment agreement.
      </p>

      <h2>5. Consumer rights</h2>
      <p>
        Nothing in these Terms excludes, restricts or modifies any consumer guarantee, right or remedy you may have
        under the <em>Australian Consumer Law</em> or other laws that cannot lawfully be excluded. Where permitted,
        our liability for a failure to comply with a consumer guarantee is limited to re-supplying the relevant
        service or paying the cost of having it re-supplied.
      </p>

      <h2>6. Student conduct and responsibilities</h2>
      <p>
        We ask that students engage respectfully with tutors and other students, and that parents ensure students
        attend on time and prepared. We may pause or end tutoring where conduct is unsafe, disruptive, or repeatedly
        disrupts the learning of others.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All materials we provide — including worksheets, practice papers, and website content — are owned by or
        licensed to us and are provided for the personal, non-commercial use of enrolled students. You may not copy,
        distribute, resell, or publish our materials without our written permission.
      </p>

      <h2>8. Website use</h2>
      <p>
        You agree to use our website lawfully and not to interfere with its operation, attempt to gain unauthorised
        access, or misuse our forms. We use security measures, including Cloudflare Turnstile, to protect our forms
        from automated abuse.
      </p>

      <h2>9. Privacy</h2>
      <p>
        Our handling of personal information is described in our{" "}
        <a href="/privacy">Privacy Policy</a>, which forms part of these Terms.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, and subject to your rights under the Australian Consumer Law, we are
        not liable for any indirect, incidental, or consequential loss arising from your use of our website or
        services.
      </p>

      <h2>11. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date above reflects the most
        recent revision, and continued use of our services after changes take effect constitutes acceptance of the
        updated Terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These Terms are governed by the laws of New South Wales, Australia, and you submit to the non-exclusive
        jurisdiction of the courts of that state.
      </p>

      <h2>13. Contact us</h2>
      <ul>
        <li>Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
        <li>Phone: <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phone}</a></li>
      </ul>
    </LegalLayout>
  );
}

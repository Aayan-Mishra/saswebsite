import { ReactNode } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

/**
 * Shared shell for legal/policy pages. Provides consistent typography for long
 * text content without depending on a prose plugin.
 */
export function LegalLayout({
  title,
  description,
  lastUpdated,
  children,
}: {
  title: string;
  description?: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <main>
      <PageHeader title={title} description={description} variant="compact" />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-sm text-text-tertiary">Last updated: {lastUpdated}</p>
          <div
            className="
              space-y-4 text-text-secondary leading-relaxed
              [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-900 [&_h2]:tracking-tight
              [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-navy-800
              [&_p]:mb-4
              [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
              [&_a]:font-medium [&_a]:text-primary-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-700
              [&_strong]:text-navy-800 [&_strong]:font-semibold
            "
          >
            {children}
          </div>
        </div>
      </Section>
    </main>
  );
}

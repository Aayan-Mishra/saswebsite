/**
 * Renders a JSON-LD structured-data script. Server-safe and works inside both
 * server and client component trees. Content is serialized at render time.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, app-controlled content (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import type { Metadata } from "next";

/**
 * Single source of truth for site-wide SEO.
 * Override the production domain with NEXT_PUBLIC_SITE_URL at build time.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://successatschool.com.au"
).replace(/\/$/, "");

export const SITE_NAME = "Success at School";
export const SITE_TAGLINE =
  "Premium Tutoring Kindergarten to Year 12 in Western Sydney";

export const BUSINESS = {
  legalName: "Success at School Tutoring",
  email: "hello@successatschool.com.au",
  phone: "1300 789 123",
  phoneE164: "+611300789123",
  logo: `${SITE_URL}/logo.png`,
  // Western Sydney service area — strong local-intent signal
  areaServed: [
    "Plumpton",
    "Hassall Grove",
    "Quakers Hill",
    "Mount Druitt",
    "Blacktown",
    "Western Sydney",
    "Sydney",
  ],
  sameAs: [] as string[], // add social profile URLs here when available
};

export const CAMPUSES = [
  {
    id: "plumpton",
    name: "Success at School — Plumpton",
    venue: "Plumpton Neighbourhood Centre",
    street: "337 Rooty Hill Rd N",
    suburb: "Plumpton",
    postcode: "2761",
    lat: -33.7507,
    lng: 150.8414,
  },
  {
    id: "hassall-grove",
    name: "Success at School — Hassall Grove",
    venue: "Hassall Grove Neighbourhood Centre",
    street: "25 Melanie St",
    suburb: "Hassall Grove",
    postcode: "2761",
    lat: -33.732,
    lng: 150.8372,
  },
  {
    id: "quakers-hill",
    name: "Success at School — Quakers Hill",
    venue: "Breed Australia, Nirimba Education Precinct",
    street: "Warawara Cct",
    suburb: "Quakers Hill",
    postcode: "2763",
    lat: -33.7307,
    lng: 150.8831,
  },
] as const;

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "15:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "16:00",
  },
];

/** Resolve a path against the canonical site origin. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build per-page metadata with a canonical URL and Open Graph / Twitter cards.
 * Keep titles ≤ ~60 chars and descriptions ≤ ~155 chars for full SERP display.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords,
  image = "/logo.png",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_AU",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/* ----------------------------- JSON-LD builders ---------------------------- */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: BUSINESS.logo,
    image: BUSINESS.logo,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    priceRange: "$$",
    description:
      "Premium tutoring from Kindergarten to Year 12 across Western Sydney, specialising in OC, NAPLAN and Selective School preparation.",
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CAMPUSES[0].venue}, ${CAMPUSES[0].street}`,
      addressLocality: CAMPUSES[0].suburb,
      addressRegion: "NSW",
      postalCode: CAMPUSES[0].postcode,
      addressCountry: "AU",
    },
    location: CAMPUSES.map((c) => ({ "@id": `${SITE_URL}/#campus-${c.id}` })),
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };
}

export function campusSchemas() {
  return CAMPUSES.map((c) => ({
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#campus-${c.id}`,
    name: c.name,
    parentOrganization: { "@id": ORG_ID },
    url: absoluteUrl("/marketing/contact"),
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${c.venue}, ${c.street}`,
      addressLocality: c.suburb,
      addressRegion: "NSW",
      postalCode: c.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.lat,
      longitude: c.lng,
    },
    openingHoursSpecification: OPENING_HOURS,
  }));
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };
}

/** Site-wide graph injected on every page via the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), ...campusSchemas(), websiteSchema()],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function courseSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@type": "EducationalOrganization", "@id": ORG_ID, name: SITE_NAME },
    inLanguage: "en-AU",
    courseMode: ["onsite", "online"],
    educationalLevel: "Primary and Secondary (Kindergarten to Year 12)",
  };
}

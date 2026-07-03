import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI/LLM crawlers we explicitly welcome (training + retrieval/citation bots).
// Being explicit removes ambiguity for auditors even though "*" already allows
// them — some tools flag a site as "blocking" unless the agent is named.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "meta-externalagent",
  "Meta-ExternalAgent",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  // Same access policy for everyone: index public pages, keep app surfaces out.
  const disallow = ["/dashboard/", "/auth/", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Named allow-rules for AI crawlers so audits see explicit access.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

import type { Metadata } from "next";
import { contact } from "@/content/cv";

/**
 * The one address every canonical, sitemap entry and Open Graph URL is built
 * from. NEXT_PUBLIC_SITE_URL wins when set; otherwise Vercel's production
 * domain, which is the custom domain once one is attached. Preview deployments
 * resolve to the same production URL on purpose, so a *.vercel.app preview
 * never claims to be the original of its own pages.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = contact.name;

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Title, description, canonical and the matching Open Graph block for one page.
 * Open Graph is set per page rather than in the layout because Next replaces
 * the whole openGraph object of a parent segment instead of merging into it.
 */
export function pageMetadata({
  title,
  description,
  path,
  article,
}: {
  title: string;
  description?: string;
  path: string;
  article?: { publishedTime: string; tags: string[] };
}): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      ...(article
        ? { type: "article", publishedTime: article.publishedTime, authors: [SITE_NAME], tags: article.tags }
        : { type: "website" }),
    },
    twitter: { card: "summary", title, ...(description ? { description } : {}) },
  };
}

/** Serialises structured data for a <script type="application/ld+json">,
 *  escaping `<` so no string in it can close the script tag. */
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export const personJsonLd = {
  "@type": "Person",
  name: contact.name,
  jobTitle: contact.role,
  url: SITE_URL,
  sameAs: [contact.linkedin, contact.github],
};

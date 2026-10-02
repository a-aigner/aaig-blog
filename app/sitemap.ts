import type { MetadataRoute } from "next";
import { getAllProjects, getProjectArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every public page. Articles carry their own date as lastModified, and a
 * project page the date of its newest article. Static pages carry none rather
 * than a build time, because Google learns to ignore a lastModified that
 * changes on every deploy. changeFrequency and priority are left out: Google
 * ignores both.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/projects", "/about", "/uses", "/ai", "/privacy", "/impressum"].map(
    (path) => ({ url: absoluteUrl(path) }),
  );

  const projectPages = getAllProjects().flatMap((p) => {
    const articles = getProjectArticles(p.slug);
    const newest = articles.map((a) => a.date).filter(Boolean).sort().at(-1);
    return [
      { url: absoluteUrl(`/projects/${p.slug}`), ...(newest ? { lastModified: newest } : {}) },
      ...articles.map((a) => ({
        url: absoluteUrl(`/projects/${p.slug}/${a.slug}`),
        ...(a.date ? { lastModified: a.date } : {}),
      })),
    ];
  });

  return [...staticPages, ...projectPages];
}

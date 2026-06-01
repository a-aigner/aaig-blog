import Link from "next/link";
import type { ArticleMeta } from "@/lib/content.types";

export function ArticleList({ projectSlug, articles }: { projectSlug: string; articles: ArticleMeta[] }) {
  if (articles.length === 0) {
    return <p className="mt-3 text-sm text-secondary">No articles yet.</p>;
  }
  return (
    <ul className="mt-3">
      {articles.map((a) => (
        <li key={a.slug} className="border-b hairline py-3">
          <Link href={`/projects/${projectSlug}/${a.slug}`} className="flex items-baseline justify-between gap-4 hover:opacity-70">
            <span className="text-sm font-medium">{a.title}</span>
            <span className="shrink-0 text-xs text-secondary">{a.date}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

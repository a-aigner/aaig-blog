import Link from "next/link";
import type { ArticleMeta } from "@/lib/content.types";

function Rows({ projectSlug, articles }: { projectSlug: string; articles: ArticleMeta[] }) {
  return (
    <ul>
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

export function ArticleList({ projectSlug, articles }: { projectSlug: string; articles: ArticleMeta[] }) {
  if (articles.length === 0) {
    return <p className="mt-3 text-sm text-secondary">No articles yet.</p>;
  }

  // Grouped only when the articles say so. A project whose pieces are just a
  // list has no `part` on any of them and renders exactly as it always did.
  const parts: { name: string; articles: ArticleMeta[] }[] = [];
  for (const a of articles) {
    if (!a.part) continue;
    const last = parts[parts.length - 1];
    if (last?.name === a.part) last.articles.push(a);
    else parts.push({ name: a.part, articles: [a] });
  }

  if (parts.length < 2) {
    return <div className="mt-3"><Rows projectSlug={projectSlug} articles={articles} /></div>;
  }

  return (
    <div className="mt-3">
      {parts.map((part) => (
        <section key={part.name} className="mt-6 first:mt-0">
          <p className="text-xs uppercase tracking-wide text-secondary">
            {part.name} · {part.articles.length} articles
          </p>
          <div className="mt-1">
            <Rows projectSlug={projectSlug} articles={part.articles} />
          </div>
        </section>
      ))}
    </div>
  );
}

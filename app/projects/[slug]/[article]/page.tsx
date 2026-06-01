import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllProjects, getProject, getProjectArticles, getArticle, getAdjacentArticles } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return getAllProjects().flatMap((p) =>
    getProjectArticles(p.slug).map((a) => ({ slug: p.slug, article: a.slug })),
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}) {
  const { slug, article } = await params;
  const project = getProject(slug);
  const { meta, content } = getArticle(slug, article);
  const { prev, next } = getAdjacentArticles(slug, article);

  const { content: body } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return (
    <article className="mx-auto max-w-2xl px-6 pt-2">
      <Link href={`/projects/${slug}`} className="text-sm text-secondary hover:text-[var(--color-ink)]">
        ← {project.meta.title}
      </Link>

      <p className="mt-6 text-xs uppercase tracking-wide text-secondary">
        {meta.tags[0] ?? "article"} · {meta.date} · {meta.readingTime}
      </p>
      <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight">{meta.title}</h1>

      <div className="mt-6">{body}</div>

      <nav className="mt-12 flex justify-between border-t hairline pt-4 text-sm text-secondary">
        {prev ? (
          <Link href={`/projects/${slug}/${prev.slug}`} className="hover:text-[var(--color-ink)]">← {prev.title}</Link>
        ) : <span />}
        {next ? (
          <Link href={`/projects/${slug}/${next.slug}`} className="hover:text-[var(--color-ink)]">{next.title} →</Link>
        ) : <span />}
      </nav>
    </article>
  );
}

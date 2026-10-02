import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllProjects, getProject, getProjectArticles, getArticle, getAdjacentArticles } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import { pageMetadata, jsonLd, personJsonLd, absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjects().flatMap((p) =>
    getProjectArticles(p.slug).map((a) => ({ slug: p.slug, article: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}) {
  const { slug, article } = await params;
  const { meta } = getArticle(slug, article);
  return pageMetadata({
    title: meta.title,
    description: meta.summary,
    path: `/projects/${slug}/${article}`,
    article: { publishedTime: meta.date, tags: meta.tags },
  });
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
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: false, defaultLang: { block: "plaintext" } }]],
      },
    },
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    keywords: meta.tags.join(", "),
    url: absoluteUrl(`/projects/${slug}/${article}`),
    mainEntityOfPage: absoluteUrl(`/projects/${slug}/${article}`),
    author: personJsonLd,
    isPartOf: { "@type": "CreativeWork", name: project.meta.title, url: absoluteUrl(`/projects/${slug}`) },
  };

  return (
    <article className="mx-auto max-w-2xl px-6 pt-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }} />
      <Link href={`/projects/${slug}`} className="text-sm text-secondary hover:text-[var(--color-ink)]">
        ← {project.meta.title}
      </Link>

      <p className="mt-6 text-sm text-secondary">
        {meta.tags[0] ?? "article"} · {meta.date} · {meta.readingTime}
      </p>
      <h1 className="mt-2 text-2xl font-medium leading-snug tracking-tight">{meta.title}</h1>

      <div className="mt-6">{body}</div>

      <p className="mt-12 text-sm text-secondary">
        Written with AI from my own repositories and notes, reviewed and published by me.{" "}
        <Link href="/ai" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
          How this site is written
        </Link>
      </p>

      <nav className="mt-6 flex justify-between border-t hairline pt-4 text-sm text-secondary">
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

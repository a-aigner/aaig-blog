import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllProjects, getProject, getProjectArticles } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import { LuminousGradient } from "@/components/LuminousGradient";
import { ArticleList } from "@/components/ArticleList";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = getProject(slug);
  const articles = getProjectArticles(slug);

  const { content: body } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark", keepBackground: false }]],
      },
    },
  });

  return (
    <article className="mx-auto max-w-3xl px-6 pt-2">
      <Link href="/projects" className="text-sm text-secondary hover:text-[var(--color-ink)]">← projects</Link>

      <LuminousGradient gradient={meta.gradient} className="rounded-card mt-4 flex min-h-40 items-end p-6">
        <h1 className="relative text-4xl font-extrabold tracking-tight">{meta.title}</h1>
      </LuminousGradient>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {meta.stack.map((s) => <Pill key={s}>{s}</Pill>)}
      </div>
      {(meta.links.github || meta.links.live) && (
        <div className="mt-3 flex gap-3">
          {meta.links.github && <Button href={meta.links.github} external>GitHub ↗</Button>}
          {meta.links.live && <Button href={meta.links.live} variant="ghost" external>Live ↗</Button>}
        </div>
      )}
      {(meta.links.appStore || meta.links.playStore) && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {meta.links.appStore && (
            <a href={meta.links.appStore} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/badges/app-store.svg" alt="Download on the App Store" className="h-12 w-auto" />
            </a>
          )}
          {meta.links.playStore && (
            <a href={meta.links.playStore} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/badges/google-play.svg" alt="Get it on Google Play" className="h-12 w-auto" />
            </a>
          )}
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-bold">The story</h2>
        <div className="mt-2">{body}</div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Articles</h2>
        <ArticleList projectSlug={slug} articles={articles} />
      </section>
    </article>
  );
}

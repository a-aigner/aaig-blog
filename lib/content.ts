import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ProjectMeta, ArticleMeta, GradientKey, ReadingOrder } from "./content.types";

const DEFAULT_ROOT = path.join(process.cwd(), "content");
const projectsDir = (root: string) => path.join(root, "projects");

function readProjectFile(root: string, slug: string) {
  const file = path.join(projectsDir(root), slug, "project.mdx");
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

export function getAllProjects(root: string = DEFAULT_ROOT): ProjectMeta[] {
  const dir = projectsDir(root);
  if (!fs.existsSync(dir)) return [];
  const slugs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return slugs
    .map((slug) => toProjectMeta(slug, readProjectFile(root, slug).data))
    .sort((a, b) => a.order - b.order);
}

export function getProject(
  slug: string,
  root: string = DEFAULT_ROOT,
): { meta: ProjectMeta; content: string } {
  const { data, content } = readProjectFile(root, slug);
  return { meta: toProjectMeta(slug, data), content };
}

export function getProjectArticles(
  slug: string,
  root: string = DEFAULT_ROOT,
): ArticleMeta[] {
  const dir = path.join(projectsDir(root), slug, "articles");
  if (!fs.existsSync(dir)) return [];
  const articles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const articleSlug = f.replace(/\.mdx$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return toArticleMeta(slug, articleSlug, data, content);
    })
    // Newest first. Two articles on the same day fall back to their slugs, so
    // the order is the same on every machine rather than whatever order the
    // filesystem happened to list the directory in.
    .sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug));

  // The project decides. Only a project that says so gets the other order, so
  // every existing project keeps the list it had.
  const ordered = readingOrderFor(slug, root) === "oldest-first" ? articles.reverse() : articles;
  return keepPartsTogether(ordered);
}

/**
 * A part is a chapter, so its articles stay together even when one was written
 * later than the next part began: a piece added to part I in September belongs
 * at the end of part I, not in a second "part I" after part IV. Parts keep the
 * order of their first article, and inside a part the date order stands.
 * Articles without a part are one group of their own, so a project that uses
 * no parts comes back exactly as it went in.
 */
function keepPartsTogether(articles: ArticleMeta[]): ArticleMeta[] {
  const groups = new Map<string | undefined, ArticleMeta[]>();
  for (const a of articles) {
    const group = groups.get(a.part);
    if (group) group.push(a);
    else groups.set(a.part, [a]);
  }
  return [...groups.values()].flat();
}

function readingOrderFor(slug: string, root: string): ReadingOrder {
  return toProjectMeta(slug, readProjectFile(root, slug).data).readingOrder;
}

export function getArticle(
  slug: string,
  articleSlug: string,
  root: string = DEFAULT_ROOT,
): { meta: ArticleMeta; content: string } {
  const file = path.join(projectsDir(root), slug, "articles", `${articleSlug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: toArticleMeta(slug, articleSlug, data, content), content };
}

export function getAdjacentArticles(
  slug: string,
  articleSlug: string,
  root: string = DEFAULT_ROOT,
): { prev: ArticleMeta | null; next: ArticleMeta | null } {
  // Adjacency follows the list the reader sees, read in its direction: `next`
  // is where reading goes on, which in an oldest-first project is further down
  // the list and in a newest-first one is the newer article above. So the
  // footer arrows never invert, and in a project with parts they walk a part to
  // its end before the next one begins, even when that part's last article is
  // the newest of all.
  const list = getProjectArticles(slug, root);
  const i = list.findIndex((a) => a.slug === articleSlug);
  if (i === -1) return { prev: null, next: null };
  const before = i > 0 ? list[i - 1] : null;
  const after = i < list.length - 1 ? list[i + 1] : null;
  return readingOrderFor(slug, root) === "oldest-first"
    ? { prev: before, next: after }
    : { prev: after, next: before };
}

function toProjectMeta(slug: string, data: Record<string, unknown>): ProjectMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    gradient: (data.gradient as GradientKey) ?? "violet",
    stack: (data.stack as string[]) ?? [],
    links: (data.links as ProjectMeta["links"]) ?? {},
    featured: Boolean(data.featured),
    order: Number(data.order ?? 999),
    readingOrder: data.readingOrder === "oldest-first" ? "oldest-first" : "newest-first",
  };
}

function toArticleMeta(
  projectSlug: string,
  slug: string,
  data: Record<string, unknown>,
  body: string,
): ArticleMeta {
  return {
    slug,
    projectSlug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    // Older notemd articles call it `description`; same field, older name.
    summary: String(data.summary ?? data.description ?? ""),
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTime(body).text, // e.g. "1 min read"
    ...(typeof data.part === "string" && data.part ? { part: data.part } : {}),
  };
}

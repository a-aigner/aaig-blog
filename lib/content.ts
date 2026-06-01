import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ProjectMeta, ArticleMeta, GradientKey } from "./content.types";

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
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const articleSlug = f.replace(/\.mdx$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return toArticleMeta(slug, articleSlug, data, content);
    })
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
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
  const list = getProjectArticles(slug, root); // newest-first
  const i = list.findIndex((a) => a.slug === articleSlug);
  if (i === -1) return { prev: null, next: null };
  return {
    next: i > 0 ? list[i - 1] : null,        // newer
    prev: i < list.length - 1 ? list[i + 1] : null, // older
  };
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
    summary: String(data.summary ?? ""),
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTime(body).text, // e.g. "1 min read"
  };
}

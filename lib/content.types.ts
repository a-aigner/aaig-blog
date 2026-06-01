export type GradientKey = "green" | "violet" | "purple" | "orange" | "rose";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  gradient: GradientKey;
  stack: string[];
  links: { github?: string; live?: string; appStore?: string; playStore?: string };
  featured: boolean;
  order: number;
}

export interface ArticleMeta {
  slug: string;        // article filename without extension
  projectSlug: string;
  title: string;
  date: string;        // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
  readingTime: string; // e.g. "5 min read"
}

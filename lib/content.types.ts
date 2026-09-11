export type GradientKey = "green" | "violet" | "purple" | "orange" | "rose";

/** How a project's own article list is ordered. Newest-first suits a set of
 *  loosely related pieces; a series that reads as one narrative wants the
 *  opposite, so a reader lands on its first instalment rather than its last. */
export type ReadingOrder = "newest-first" | "oldest-first";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  gradient: GradientKey;
  stack: string[];
  links: { github?: string; live?: string; appStore?: string; playStore?: string };
  featured: boolean;
  order: number;
  readingOrder: ReadingOrder;
}

export interface ArticleMeta {
  slug: string;        // article filename without extension
  projectSlug: string;
  title: string;
  date: string;        // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
  readingTime: string; // e.g. "5 min read"
  /** Optional grouping label, for a project whose articles form named parts.
   *  Absent on every project that is just a list. */
  part?: string;
}

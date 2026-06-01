# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build André Aigner's personal portfolio — an editorial-stack landing page with CV + featured projects, project story pages, and nested blog-style articles — as a statically-generated Next.js site styled after `DESIGN.md`.

**Architecture:** Next.js App Router with statically-generated routes. Project/article content lives as MDX files under `content/`, read at build time by a small typed content layer (`lib/content.ts`) and rendered with `next-mdx-remote/rsc`. Structured CV data lives in `content/cv.ts`. A design-token layer in `globals.css` (Tailwind v4 `@theme`) ports the `DESIGN.md` colors, gradients, and type scale to the web. UI is composed from a handful of focused components (gradient card, luminous background, nav, footer, pills, buttons).

**Tech Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · MDX (`next-mdx-remote`, `gray-matter`, `reading-time`, `remark-gfm`, `rehype-pretty-code`/`shiki`) · Vitest (content-layer tests) · Vercel.

**Reference docs:** Design spec at `docs/superpowers/specs/2026-06-01-portfolio-design.md`. Aesthetic source at `DESIGN.md`. CV source at `cv.tex` / `cv-aigner-andre.pdf`.

**Testing note:** The content layer (`lib/content.ts`) is pure data logic and is built test-first with Vitest against fixture MDX. UI pages/components are verified by type-check + production build + a dev-server render check, since asserting on static JSX markup adds little value. Every UI task ends with `npm run build` passing.

---

## File Structure

```
aa-portfolio/
  app/
    layout.tsx                      # root layout: fonts, <Nav/>, <Footer/>, globals
    page.tsx                        # / landing
    globals.css                     # Tailwind v4 import + @theme design tokens + gradient classes
    projects/
      page.tsx                      # /projects grid
      [slug]/
        page.tsx                    # /projects/[slug] story
        [article]/
          page.tsx                  # /projects/[slug]/[article] article
    about/page.tsx                  # /about
    uses/page.tsx                   # /uses
  components/
    Nav.tsx
    Footer.tsx
    LuminousGradient.tsx            # layered gradient background
    GradientCard.tsx                # project card
    Pill.tsx
    Button.tsx                      # primary / ghost link-button
    CvSummary.tsx                   # skills + experience timeline + education
    ArticleList.tsx                 # list of article links for a project
    mdx-components.tsx              # MDX element overrides (code, headings, etc.)
  lib/
    content.ts                      # typed filesystem content layer
    content.types.ts                # ProjectMeta, ArticleMeta interfaces
  content/
    cv.ts                           # structured CV data (skills, experience, education, contact)
    projects/
      aen-client/
        project.mdx
        articles/
          designing-the-client-api-surface.mdx
  public/
    cv-aigner-andre.pdf             # copied from repo root for download
  tests/
    content.test.ts                 # Vitest tests for lib/content.ts
    fixtures/content/projects/      # fixture MDX used by tests
  vitest.config.ts
  next.config.ts                    # (next-mdx-remote needs no MDX loader config)
  .gitignore                        # add .superpowers/
```

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: entire Next.js skeleton via `create-next-app`
- Modify: `.gitignore`

- [ ] **Step 1: Scaffold into the current (non-empty) directory**

The folder already contains `DESIGN.md`, `cv.tex`, `cv-aigner-andre.pdf`, `docs/`, and `.superpowers/`. `create-next-app` refuses a non-empty dir, so scaffold in a temp dir and move files in.

Run:
```bash
cd /Users/andreaigner/Dev/projects
npx create-next-app@latest aa-portfolio-tmp \
  --typescript --tailwind --app --eslint \
  --src-dir=false --import-alias="@/*" --use-npm --no-turbopack
```
Expected: scaffolds successfully into `aa-portfolio-tmp/` (creates its own git repo).

- [ ] **Step 2: Merge scaffold into the project folder**

Run:
```bash
cd /Users/andreaigner/Dev/projects
cp -R aa-portfolio-tmp/. aa-portfolio/
rm -rf aa-portfolio-tmp
cd aa-portfolio
ls
```
Expected: `aa-portfolio/` now has `app/`, `package.json`, `next.config.ts`, `.git/`, etc., alongside the existing `DESIGN.md`, `cv.tex`, `docs/`.

- [ ] **Step 3: Ignore the brainstorm dir**

Append to `.gitignore`:
```
# brainstorming visual-companion artifacts
.superpowers/
```

- [ ] **Step 4: Verify the dev toolchain runs**

Run:
```bash
npm run build
```
Expected: build succeeds (default starter page compiles).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app (App Router, TS, Tailwind)"
```

---

## Task 2: Install content + test dependencies

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install runtime + dev dependencies**

Run:
```bash
npm install next-mdx-remote gray-matter reading-time remark-gfm rehype-pretty-code shiki
npm install -D vitest
```
Expected: installs without peer-dependency errors.

- [ ] **Step 2: Add the test script**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create the Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 4: Verify the test runner starts**

Run:
```bash
npx vitest run
```
Expected: exits cleanly with "No test files found" (no tests yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add MDX content and Vitest dependencies"
```

---

## Task 3: Design tokens and gradient styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with the design-token layer**

Overwrite `app/globals.css` with the ported `DESIGN.md` tokens. Gradient hexes are converted from the spec's RGB values.

```css
@import "tailwindcss";

@theme {
  /* Neutrals & accent (DESIGN.md §4.1–4.2) */
  --color-app-bg: #f4f4f1;
  --color-page-bg: #e0e3e1;
  --color-ink: #0a0a0a;
  --color-active-red: #db0a12;

  /* Type scale */
  --font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;

  /* Radii (DESIGN.md §3.2) */
  --radius-card: 30px;
  --radius-card-sm: 22px;
  --radius-pill: 999px;
}

html, body {
  background: var(--color-app-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Opacity-driven text hierarchy (DESIGN.md §5.3) */
.text-secondary { color: rgb(10 10 10 / 0.42); }
.text-tertiary  { color: rgb(10 10 10 / 0.24); }
.hairline       { border-color: rgb(10 10 10 / 0.08); }

/* Semantic gradient base palettes (DESIGN.md §4.3, neutral names) */
.grad-green  { background: linear-gradient(135deg, #80def5, #c7f573, #5ce859); }
.grad-violet { background: linear-gradient(135deg, #5947db, #ed73e0, #fa9473); }
.grad-purple { background: linear-gradient(135deg, #7047e8, #d485e6, #d4bacf); }
.grad-orange { background: linear-gradient(135deg, #ff5c14, #ffa11c, #f2c424); }
.grad-rose   { background: linear-gradient(135deg, #e8dbcc, #bf858c, #943857); }

/* Continuous-corner feel for large cards */
.rounded-card    { border-radius: var(--radius-card); }
.rounded-card-sm { border-radius: var(--radius-card-sm); }
```

- [ ] **Step 2: Verify the build still compiles**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: design tokens and gradient styles from DESIGN.md"
```

---

## Task 4: Content types and the content layer (test-first)

**Files:**
- Create: `lib/content.types.ts`
- Create: `lib/content.ts`
- Test: `tests/content.test.ts`
- Create fixtures: `tests/fixtures/content/projects/alpha/project.mdx`, `tests/fixtures/content/projects/alpha/articles/first.mdx`, `tests/fixtures/content/projects/alpha/articles/second.mdx`, `tests/fixtures/content/projects/beta/project.mdx`

- [ ] **Step 1: Define content types**

Create `lib/content.types.ts`:
```ts
export type GradientKey = "green" | "violet" | "purple" | "orange" | "rose";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  gradient: GradientKey;
  stack: string[];
  links: { github?: string; live?: string };
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
```

- [ ] **Step 2: Create test fixtures**

Create `tests/fixtures/content/projects/alpha/project.mdx`:
```mdx
---
title: "Alpha Project"
summary: "First test project."
gradient: "violet"
stack: ["Python", "REST APIs"]
links:
  github: "https://github.com/example/alpha"
featured: true
order: 1
---

The story of Alpha.
```

Create `tests/fixtures/content/projects/alpha/articles/first.mdx`:
```mdx
---
title: "First Article"
date: "2025-01-10"
summary: "Earliest article."
tags: ["challenge"]
---

Body of the first article with enough words to register a reading time value here.
```

Create `tests/fixtures/content/projects/alpha/articles/second.mdx`:
```mdx
---
title: "Second Article"
date: "2025-03-22"
summary: "Later article."
tags: ["challenge", "auth"]
---

Body of the second article.
```

Create `tests/fixtures/content/projects/beta/project.mdx`:
```mdx
---
title: "Beta Project"
summary: "Second test project."
gradient: "green"
stack: ["TypeScript"]
links: {}
featured: false
order: 2
---

The story of Beta.
```

- [ ] **Step 3: Write the failing tests**

Create `tests/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import path from "node:path";
import {
  getAllProjects,
  getProject,
  getProjectArticles,
  getArticle,
  getAdjacentArticles,
} from "@/lib/content";

const FIXTURES = path.resolve(__dirname, "fixtures/content");

describe("content layer", () => {
  it("lists projects sorted by order", () => {
    const projects = getAllProjects(FIXTURES);
    expect(projects.map((p) => p.slug)).toEqual(["alpha", "beta"]);
    expect(projects[0].title).toBe("Alpha Project");
    expect(projects[0].featured).toBe(true);
    expect(projects[0].gradient).toBe("violet");
  });

  it("reads a single project's meta and body", () => {
    const { meta, content } = getProject("alpha", FIXTURES);
    expect(meta.stack).toEqual(["Python", "REST APIs"]);
    expect(meta.links.github).toBe("https://github.com/example/alpha");
    expect(content).toContain("The story of Alpha.");
  });

  it("lists a project's articles newest-first with reading time", () => {
    const articles = getProjectArticles("alpha", FIXTURES);
    expect(articles.map((a) => a.slug)).toEqual(["second", "first"]);
    expect(articles[0].title).toBe("Second Article");
    expect(articles[1].readingTime).toMatch(/min read$/);
  });

  it("reads a single article", () => {
    const { meta, content } = getArticle("alpha", "first", FIXTURES);
    expect(meta.title).toBe("First Article");
    expect(meta.projectSlug).toBe("alpha");
    expect(content).toContain("Body of the first article");
  });

  it("computes prev/next within a project (date order)", () => {
    // newest-first list is [second, first]; "next" = newer, "prev" = older
    const adj = getAdjacentArticles("alpha", "second", FIXTURES);
    expect(adj.next).toBeNull();
    expect(adj.prev?.slug).toBe("first");
  });

  it("returns empty article list for a project with none", () => {
    expect(getProjectArticles("beta", FIXTURES)).toEqual([]);
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run:
```bash
npx vitest run
```
Expected: FAIL — `@/lib/content` has no such exports.

- [ ] **Step 5: Implement the content layer**

Create `lib/content.ts`:
```ts
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
    links: (data.links as { github?: string; live?: string }) ?? {},
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
```

- [ ] **Step 6: Run tests to verify they pass**

Run:
```bash
npx vitest run
```
Expected: PASS (6 tests).

- [ ] **Step 7: Commit**

```bash
git add lib/content.ts lib/content.types.ts tests/
git commit -m "feat: typed MDX content layer with tests"
```

---

## Task 5: Structured CV data

**Files:**
- Create: `content/cv.ts`
- Create: copy `cv-aigner-andre.pdf` into `public/`

- [ ] **Step 1: Copy the CV PDF into public/**

Run:
```bash
cp cv-aigner-andre.pdf public/cv-aigner-andre.pdf
```
Expected: file present at `public/cv-aigner-andre.pdf`.

- [ ] **Step 2: Create the CV data module**

Create `content/cv.ts` (values taken verbatim from `cv.tex`):
```ts
export const contact = {
  name: "André Aigner",
  role: "Software Engineer & Founder",
  location: "Ergolding, Germany",
  email: "andreaigner@icloud.com",
  linkedin: "https://www.linkedin.com/in/andre-aigner",
  github: "https://github.com/a-aigner",
  cvPdf: "/cv-aigner-andre.pdf",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Programming", items: ["Python", "JavaScript/TypeScript", "C#", "Java", "Swift", "SQL"] },
  { group: "Frameworks", items: ["Flutter", "Spring Boot", "Selenium", "FastAPI", "Supabase"] },
  { group: "DevOps & Tools", items: ["Docker", "Git", "Linux", "REST APIs", "Scikit-learn"] },
  { group: "Specialties", items: ["Software Development", "Testing Automation", "Microservices", "Machine Learning", "LLM Integration"] },
];

export const experience: { period: string; role: string; org: string; place: string }[] = [
  { period: "Oct 2025 – Present", role: "Founder", org: "ARSoftware UG", place: "Landshut, Germany" },
  { period: "Mar 2023 – Aug 2025", role: "Working Student – IT Consulting", org: "intellior GmbH", place: "Stuttgart, Germany" },
  { period: "Apr 2022 – Nov 2022", role: "Intern – Production Technologies", org: "BMW Group", place: "Dingolfing, Germany" },
  { period: "Mar 2021 – Mar 2022", role: "Software Developer (Student Worker)", org: "TRIO Project I", place: "Landshut, Germany" },
];

export const education: { period: string; degree: string; org: string; place: string }[] = [
  { period: "Oct 2025 – Expected 2027", degree: "M.Sc. Applied Artificial Intelligence", org: "TH Rosenheim", place: "Rosenheim, Germany" },
  { period: "Mar 2023 – Sep 2025", degree: "B.Sc. Computer Science", org: "OTH Regensburg", place: "Regensburg, Germany" },
  { period: "Sep 2019 – Mar 2023", degree: "Computer Science Studies", org: "HAW Landshut", place: "Landshut, Germany" },
];
```

- [ ] **Step 3: Verify it type-checks via build**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add content/cv.ts public/cv-aigner-andre.pdf
git commit -m "feat: structured CV data and downloadable PDF"
```

---

## Task 6: Primitive UI components

**Files:**
- Create: `components/Pill.tsx`, `components/Button.tsx`, `components/LuminousGradient.tsx`

- [ ] **Step 1: Pill**

Create `components/Pill.tsx`:
```tsx
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[999px] bg-[rgb(10_10_10/0.06)] px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Button (link styled as primary or ghost)**

Create `components/Button.tsx`:
```tsx
import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export function Button({ href, children, variant = "primary", external }: Props) {
  const base = "inline-block rounded-[999px] px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-ink)] text-white"
      : "border border-[rgb(10_10_10/0.15)] text-[var(--color-ink)]";
  const cls = `${base} ${styles}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: LuminousGradient background**

Create `components/LuminousGradient.tsx` (web port of `DESIGN.md` §4.4 — base gradient + two soft blurred glows):
```tsx
import type { GradientKey } from "@/lib/content.types";

const gradClass: Record<GradientKey, string> = {
  green: "grad-green",
  violet: "grad-violet",
  purple: "grad-purple",
  orange: "grad-orange",
  rose: "grad-rose",
};

export function LuminousGradient({
  gradient,
  className = "",
}: {
  gradient: GradientKey;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${gradClass[gradient]} ${className}`}>
      <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds (components compile even if unused).

- [ ] **Step 5: Commit**

```bash
git add components/Pill.tsx components/Button.tsx components/LuminousGradient.tsx
git commit -m "feat: primitive UI components (Pill, Button, LuminousGradient)"
```

---

## Task 7: Navigation and footer; root layout

**Files:**
- Create: `components/Nav.tsx`, `components/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Nav**

Create `components/Nav.tsx`:
```tsx
import Link from "next/link";

export function Nav() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-sm">
      <Link href="/" className="font-bold tracking-tight">
        André Aigner
      </Link>
      <div className="flex gap-5 text-secondary">
        <Link href="/projects" className="hover:text-[var(--color-ink)]">projects</Link>
        <Link href="/about" className="hover:text-[var(--color-ink)]">about</Link>
        <Link href="/uses" className="hover:text-[var(--color-ink)]">uses</Link>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Footer with contact block**

Create `components/Footer.tsx`:
```tsx
import { contact } from "@/content/cv";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-3xl border-t hairline px-6 py-10 text-sm text-secondary">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-ink)]">{contact.email}</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)]">LinkedIn</a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)]">GitHub</a>
      </div>
      <p className="mt-4 text-tertiary">© {contact.name} · {contact.location}</p>
    </footer>
  );
}
```

- [ ] **Step 3: Wire layout**

Overwrite `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "André Aigner — Software Engineer & Founder",
  description: "Portfolio, projects, and writing by André Aigner.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: nav, footer with contact, root layout"
```

---

## Task 8: CvSummary and GradientCard components

**Files:**
- Create: `components/CvSummary.tsx`, `components/GradientCard.tsx`

- [ ] **Step 1: CvSummary**

Create `components/CvSummary.tsx`:
```tsx
import { skills, experience, education, contact } from "@/content/cv";
import { Pill } from "./Pill";
import { Button } from "./Button";

export function CvSummary() {
  return (
    <section className="mx-auto max-w-3xl px-6">
      <div>
        <h2 className="text-xl font-bold">CV at a glance</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills.flatMap((g) => g.items).map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold">Experience</h3>
        <ul className="mt-3 space-y-3 border-l hairline pl-4">
          {experience.map((e) => (
            <li key={e.role + e.org}>
              <div className="text-sm font-semibold">{e.role} · {e.org}</div>
              <div className="text-xs text-secondary">{e.period} · {e.place}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold">Education</h3>
        <ul className="mt-3 space-y-3 border-l hairline pl-4">
          {education.map((e) => (
            <li key={e.degree}>
              <div className="text-sm font-semibold">{e.degree} · {e.org}</div>
              <div className="text-xs text-secondary">{e.period} · {e.place}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button href={contact.cvPdf} variant="ghost" external>Download full CV (PDF)</Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: GradientCard (project card)**

Create `components/GradientCard.tsx`:
```tsx
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content.types";
import { LuminousGradient } from "./LuminousGradient";
import { Pill } from "./Pill";

export function GradientCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <LuminousGradient
        gradient={project.gradient}
        className="rounded-card flex min-h-48 flex-col justify-end p-5 transition-transform group-hover:-translate-y-1"
      >
        <h3 className="relative text-2xl font-extrabold tracking-tight">{project.title}</h3>
        <p className="relative mt-1 max-w-md text-sm text-[rgb(10_10_10/0.6)]">{project.summary}</p>
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </LuminousGradient>
    </Link>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/CvSummary.tsx components/GradientCard.tsx
git commit -m "feat: CvSummary and GradientCard components"
```

---

## Task 9: Landing page (`/`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement the editorial-stack landing**

Overwrite `app/page.tsx`:
```tsx
import { contact } from "@/content/cv";
import { getAllProjects } from "@/lib/content";
import { CvSummary } from "@/components/CvSummary";
import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/Button";

export default function Home() {
  const featured = getAllProjects().filter((p) => p.featured);

  return (
    <div className="pb-12">
      <section className="mx-auto max-w-3xl px-6 pt-10 pb-16">
        <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
          Software<br />engineer &amp;<br />founder.
        </h1>
        <p className="mt-5 max-w-md text-secondary">
          Building AI-driven tools at ARSoftware. M.Sc. Applied AI. Based in {contact.location}.
        </p>
        <div className="mt-6">
          <Button href={contact.cvPdf} external>Download CV</Button>
        </div>
      </section>

      <CvSummary />

      <section className="mx-auto mt-16 max-w-3xl px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Selected projects</h2>
          <a href="/projects" className="text-sm text-secondary hover:text-[var(--color-ink)]">all projects →</a>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <GradientCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build (will succeed even before content exists — featured list is empty)**

Run:
```bash
npm run build
```
Expected: build succeeds. (Featured grid is empty until Task 13 adds content.)

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: editorial-stack landing page"
```

---

## Task 10: Projects index (`/projects`)

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Implement the grid**

Create `app/projects/page.tsx`:
```tsx
import { getAllProjects } from "@/lib/content";
import { GradientCard } from "@/components/GradientCard";

export const metadata = { title: "Projects — André Aigner" };

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <section className="mx-auto max-w-3xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Projects</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <GradientCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: projects index grid"
```

---

## Task 11: MDX rendering setup + project story page (`/projects/[slug]`)

**Files:**
- Create: `components/mdx-components.tsx`
- Create: `components/ArticleList.tsx`
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: MDX component overrides**

Create `components/mdx-components.tsx`:
```tsx
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-8 text-2xl font-bold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-6 text-xl font-bold" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-[rgb(10_10_10/0.78)]" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-1 pl-6" {...props} />,
  a: (props) => <a className="underline underline-offset-2 hover:opacity-70" {...props} />,
  pre: (props) => <pre className="mt-4 overflow-x-auto rounded-card-sm bg-[#0a0a0a] p-4 text-sm" {...props} />,
  code: (props) => <code className="rounded bg-[rgb(10_10_10/0.06)] px-1 py-0.5 text-sm" {...props} />,
};
```

- [ ] **Step 2: ArticleList**

Create `components/ArticleList.tsx`:
```tsx
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
```

- [ ] **Step 3: Project story page**

Create `app/projects/[slug]/page.tsx`. Note `compileMDX` from `next-mdx-remote/rsc`, `remark-gfm`, and `generateStaticParams` for SSG.
```tsx
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
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
      <div className="mt-3 flex gap-3">
        {meta.links.github && <Button href={meta.links.github} external>GitHub ↗</Button>}
        {meta.links.live && <Button href={meta.links.live} variant="ghost" external>Live ↗</Button>}
      </div>

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
```

- [ ] **Step 4: Verify build (no project content yet → empty static params is fine)**

Run:
```bash
npm run build
```
Expected: build succeeds with zero `/projects/[slug]` pages generated (content added in Task 13).

- [ ] **Step 5: Commit**

```bash
git add components/mdx-components.tsx components/ArticleList.tsx app/projects/[slug]/page.tsx
git commit -m "feat: MDX rendering and project story page"
```

---

## Task 12: Article page (`/projects/[slug]/[article]`)

**Files:**
- Create: `app/projects/[slug]/[article]/page.tsx`

- [ ] **Step 1: Implement the article page with prev/next**

Create `app/projects/[slug]/[article]/page.tsx`:
```tsx
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
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds (no article params until Task 13).

- [ ] **Step 3: Commit**

```bash
git add app/projects/[slug]/[article]/page.tsx
git commit -m "feat: article page with prev/next navigation"
```

---

## Task 13: Seed real content (Aeneis project + first article)

**Files:**
- Create: `content/projects/aen-client/project.mdx`
- Create: `content/projects/aen-client/articles/designing-the-client-api-surface.mdx`

- [ ] **Step 1: Project story MDX**

Create `content/projects/aen-client/project.mdx` (facts from `cv.tex`):
```mdx
---
title: "Aeneis API Wrapper"
summary: "A stable Python client for Aeneis that fed business-process data into an internal AI/LLM chatbot."
gradient: "violet"
stack: ["Python", "REST APIs", "OAuth2"]
links:
  github: "https://github.com/a-aigner/aen_client"
featured: true
order: 1
---

While working at intellior GmbH, I built a Python client library for **Aeneis**,
a business-process management platform. The goal was to let one of Germany's
largest business groups pull process data programmatically and feed it into an
internal AI/LLM chatbot system.

## Motivation

The process data lived behind a REST API that was awkward to consume directly:
OAuth2 auth, paginated resources, and inconsistent payloads. Every team that
wanted the data was re-writing the same fragile glue code. A single, stable,
well-typed client removed that duplication and made the chatbot integration
possible.

## What it does

- Wraps authentication, pagination, and resource access behind a clean API.
- Provides a stable surface other internal tools can depend on.
- Powers the data ingestion path for the LLM chatbot.
```

- [ ] **Step 2: First article MDX**

Create `content/projects/aen-client/articles/designing-the-client-api-surface.mdx`:
```mdx
---
title: "Designing a client API surface people actually want to use"
date: "2025-02-18"
summary: "How I turned an awkward REST API into a Python client that hides the sharp edges."
tags: ["challenge", "api-design"]
---

The Aeneis REST API worked, but using it directly meant every caller had to
understand OAuth2 token handling, pagination cursors, and a few inconsistent
response shapes. That is exactly the kind of complexity a client library should
absorb.

## The challenge

I wanted callers to write code like this:

```python
client = AeneisClient(base_url, credentials)
for process in client.processes.iter_all():
    ingest(process)
```

…without ever thinking about tokens or page cursors.

## How I solved it

I split the client into a thin transport layer (auth + retries + pagination)
and a set of resource accessors on top. The transport layer refreshes tokens
transparently and turns paginated endpoints into lazy iterators, so the public
surface stays small and predictable.

The result: integrating the chatbot's ingestion pipeline went from days of glue
code to a handful of lines.
```

- [ ] **Step 3: Build and confirm pages generate**

Run:
```bash
npm run build
```
Expected: build output lists the generated routes `/projects/aen-client` and `/projects/aen-client/designing-the-client-api-surface`.

- [ ] **Step 4: Run the full test suite**

Run:
```bash
npm run test
```
Expected: PASS (content-layer tests still green).

- [ ] **Step 5: Commit**

```bash
git add content/projects/aen-client
git commit -m "content: seed Aeneis project and first article"
```

---

## Task 14: About and Uses pages

**Files:**
- Create: `app/about/page.tsx`, `app/uses/page.tsx`

- [ ] **Step 1: About page**

Create `app/about/page.tsx`:
```tsx
import { contact } from "@/content/cv";

export const metadata = { title: "About — André Aigner" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">About</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-[rgb(10_10_10/0.78)]">
        <p>
          I'm {contact.name}, a software engineer and founder based in {contact.location}.
          I founded ARSoftware UG to build apps focused on automation and AI-driven tooling,
          and I'm pursuing an M.Sc. in Applied Artificial Intelligence at TH Rosenheim.
        </p>
        <p>
          Before that I built microservices and process-mining tools for German enterprises
          at intellior GmbH, automated production workflows during an innovation project at
          BMW Group, and wrote large-scale UI test automation early on. I like turning awkward,
          fragile systems into clean tools other people can rely on.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Uses page**

Create `app/uses/page.tsx`:
```tsx
import { skills } from "@/content/cv";
import { Pill } from "@/components/Pill";

export const metadata = { title: "Uses — André Aigner" };

export default function UsesPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Uses</h1>
      <p className="mt-4 text-secondary">Tools and tech I currently work with.</p>
      <div className="mt-6 space-y-6">
        {skills.map((g) => (
          <div key={g.group}>
            <h2 className="text-sm font-bold">{g.group}</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds; `/about` and `/uses` generated.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/uses/page.tsx
git commit -m "feat: about and uses pages"
```

---

## Task 15: Final verification and dev-server render check

**Files:** none (verification only)

- [ ] **Step 1: Lint, type-check, test, build**

Run:
```bash
npm run lint && npx tsc --noEmit && npm run test && npm run build
```
Expected: all four pass with no errors.

- [ ] **Step 2: Manual render check**

Run:
```bash
npm run dev
```
Then open `http://localhost:3000` and verify:
- Landing shows hero, CV summary (skills/experience/education), Download CV button, and the Aeneis featured card.
- `/projects` shows the Aeneis card.
- `/projects/aen-client` shows the gradient hero, story prose, GitHub button, and the article in the list.
- `/projects/aen-client/designing-the-client-api-surface` renders the article with a syntax-highlighted code block and prev/next nav.
- `/about` and `/uses` render.
- Footer contact links work; Download CV opens the PDF.

Stop the dev server when done (Ctrl-C).

- [ ] **Step 3: Final commit (if any tweaks were needed)**

```bash
git add -A
git commit -m "chore: final verification pass"
```

---

## Notes for the implementer

- **Tailwind v4** is assumed (current `create-next-app` default): tokens live in `@theme` inside `globals.css`, not a JS config. If the scaffold produced Tailwind v3 (a `tailwind.config.ts` exists), move the `@theme` tokens into that config's `theme.extend` and keep the gradient/utility classes as plain CSS in `globals.css`.
- **Next 15 async params**: dynamic route params are a `Promise` and must be awaited (shown in Tasks 11–12). If the scaffold is Next 14, change `params: Promise<{...}>` to `params: { ... }` and remove the `await`.
- **rehype-pretty-code**: Tasks 11–12 ship with `remark-gfm` only, which keeps the build dependency-light and guaranteed to compile. To enable richer syntax highlighting, add `rehypePlugins: [[rehypePrettyCode, { theme: "github-light" }]]` to the `mdxOptions` in both dynamic pages and import it — verify the build still passes after adding.
- **Adding content later**: new project = `content/projects/<slug>/project.mdx`; new article = `content/projects/<slug>/articles/<name>.mdx`. No code changes; `generateStaticParams` picks them up on the next build.
```

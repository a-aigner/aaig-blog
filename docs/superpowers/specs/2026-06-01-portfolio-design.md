# Portfolio Site — Design Spec

**Date:** 2026-06-01
**Owner:** André Aigner
**Status:** Approved (design phase)

## 1. Purpose

A personal portfolio site that (a) presents André's CV on the landing page and
(b) showcases his projects. Each project has a **story page** explaining the
motivation and the story behind it, plus **blog-style articles** where he writes
about recent work — specifically challenges he hit and how he overcame them.

The site is a personal, content-forward portfolio for a software engineer and
founder. It is not a CMS-backed marketing site or a multi-author blog.

## 2. Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, with a custom design-token layer (see §5)
- **Content:** MDX files committed to the repo
- **Hosting:** Vercel
- **Rendering:** Statically generated (SSG). All content known at build time;
  no runtime database or CMS.

Rationale: App Router + TS + Tailwind is the modern Next.js default and fits a
static, design-heavy site. MDX-in-repo keeps content version-controlled with
zero external services and an excellent authoring experience for a developer.

## 3. Design Intent

The visual language is adapted from `DESIGN.md` (originally written for
SwiftUI/iOS) and re-implemented natively in React/CSS. `DESIGN.md` is the
**aesthetic North Star**, not a literal port — iOS-specific constructs (safe
areas, SF Symbols, haptics, bottom dial controls) are dropped or reinterpreted
for the web.

Feeling to achieve: **technical, calm, premium, futuristic, lightweight.**
Restraint over density. Typography and whitespace do the work.

Core principles carried over:

- Fewer surfaces, stronger hierarchy. Whitespace separates content, not borders.
- Continuous rounded geometry everywhere (large radii on cards).
- Typography is the interface: oversized black editorial headlines, very quiet
  grey secondary text, aggressive use of opacity for hierarchy.
- Gradients are functional, luminous surfaces (layered base gradient + soft
  blurred glows), used as semantic project/section colors — not flat fills.
- Data graphics are quiet: thin strokes, dots, sparse ticks. (Used sparingly
  here — this is a portfolio, not a dashboard.)
- Controls are soft and minimal; the red accent is rare.
- Calm, spring-like motion; no theatrical effects.

## 4. Routing Structure

| Route | Purpose |
|---|---|
| `/` | Landing — hero intro, CV-at-a-glance, featured projects, footer contact |
| `/projects` | Full grid of all projects |
| `/projects/[slug]` | Project story page — motivation, story, stack, links, article list |
| `/projects/[slug]/[article]` | Article — blog-style MDX post (a challenge + how it was solved) |
| `/about` | Longer-form bio / personal story |
| `/uses` | Current focus, tools, what André is working on |

Notes:

- **Articles are nested under projects only.** There is no global blog feed.
- **Contact is a footer block** (email, LinkedIn, GitHub), present site-wide —
  not a dedicated route.
- Slugs come from content folder names; article slugs from MDX filenames.

## 5. Design Tokens

A single token layer ports the relevant `DESIGN.md` values to CSS/Tailwind
theme config. Concrete values:

**Neutrals & accent**

- `appBackground` ≈ `#F4F4F1` (warm off-white)
- `pageBackground` ≈ `#E0E3E1`
- `primaryText` ≈ `#0A0A0A`
- `secondaryText` = black @ 42% opacity
- `tertiaryText` = black @ 24% opacity
- `hairline` = black @ 8% opacity
- `activeRed` ≈ `#DB0A12` (rare accent only)

**Gradient palettes** (assignable per project/section via frontmatter key):

- `green` — cyan → lime → green
- `violet` — blue-violet → pink → coral
- `purple` — purple → lilac
- `orange` — orange → yellow
- `rose` — warm beige → rose → deep rose

Each rendered as a layered "luminous" background: linear base gradient plus two
soft, blurred, translucent radial glows (web equivalent of the SwiftUI
`LuminousGradientBackground`).

**Typography**

- System font stack (SF Pro–like on Apple, system-ui elsewhere).
- Scale mirrors `DESIGN.md`: heavy black screen titles (~34px+ and larger for
  hero), bold card titles, quiet medium captions, optional thin/rounded large
  display for any numeric/metric accents.
- Opacity-driven hierarchy per the `DESIGN.md` table.

**Spacing & radius**

- Generous horizontal margins (~24px mobile, wider gutters on desktop).
- Card radii large and continuous: hero/large cards ~28–34px, smaller cards
  ~18–24px, pills ~999px. Use CSS for continuous-corner feel.

**Motion**

- Spring-like transitions (CSS or a light motion lib): smooth, contained,
  no overshoot. Subtle fade/slide for content entrance.

## 6. Content Model (MDX)

```
content/
  projects/
    aen-client/
      project.mdx            # story + motivation; frontmatter drives metadata
      articles/
        oauth2-token-refresh.mdx
        rate-limit-backoff.mdx
    <another-project>/
      project.mdx
      articles/
        ...
```

**`project.mdx` frontmatter (example):**

```yaml
title: "Aeneis API Wrapper"
summary: "A stable Python client for Aeneis used to feed an internal AI/LLM chatbot."
gradient: "violet"        # one of the palette keys in §5
stack: ["Python", "REST APIs", "OAuth2"]
links:
  github: "https://github.com/a-aigner/aen_client"
  live: ""                # optional
featured: true            # surfaces on the landing page
order: 1
```

**Article `*.mdx` frontmatter (example):**

```yaml
title: "OAuth2 token refresh hell"
date: "2025-03-12"
summary: "Tokens expired mid-batch and broke long migrations — here's the fix."
tags: ["challenge", "auth"]
readingTime: auto         # computed at build, not hand-entered
```

Rules:

- Adding a project = new folder + `project.mdx`. Adding an article = drop a new
  `.mdx` in that project's `articles/`. No code changes required.
- The body of `project.mdx` is the long-form "story / motivation" content.
- The body of each article is the blog-style post (prose + syntax-highlighted
  code blocks via MDX).
- Reading time and date sorting are derived at build time.

## 7. Page Designs

### 7.1 Landing (`/`) — "Editorial stack"

Vertical flow, chosen for readability and mobile grace:

1. **Top nav** — name/wordmark left; `about · projects · uses` right. Minimal.
2. **Hero** — oversized black headline (e.g. "Software engineer & founder."),
   a one-line intro, and a **Download CV** button (links to the existing PDF).
3. **CV at a glance** — skills as pills; the four roles (Founder · ARSoftware,
   intellior, BMW, TRIO) as a quiet timeline; education. Styled to match; a
   secondary "Download full CV (PDF)" affordance.
4. **Selected / featured projects** — gradient project cards (those with
   `featured: true`), linking to their story pages.
5. **Footer** — contact block: email, LinkedIn (`andre-aigner`),
   GitHub (`a-aigner`).

### 7.2 Projects index (`/projects`)

Full responsive grid of all project gradient cards (title, summary, stack
chips). Sorted by `order` / `featured`.

### 7.3 Project story page (`/projects/[slug]`)

- Back link to `/projects`.
- Gradient hero band (palette from `gradient` frontmatter) with the title.
- Stack chips + GitHub / live links.
- **The story** — long-form motivation/story (MDX body of `project.mdx`).
- **Articles** — list of this project's articles (title + date), newest first,
  linking to each article.

### 7.4 Article page (`/projects/[slug]/[article]`)

- Back link to the parent project.
- Editorial header: small meta line (tag · date · reading time), then the
  oversized title.
- MDX body: prose with syntax-highlighted code blocks, images, callouts.
- Prev / next article navigation within the same project.

### 7.5 `/about`

Longer-form bio and personal story, same design system. Mostly prose, possibly
one gradient accent.

### 7.6 `/uses`

Casual page: current focus, tools, stack André is working with. Simple list /
card layout.

## 8. Initial Content (seeded from CV)

- **Identity:** André Aigner — software engineer & founder, ARSoftware UG;
  M.Sc. Applied AI (TH Rosenheim, expected 2027); based in Ergolding/Landshut.
- **CV summary data:** skills (Python, JS/TS, C#, Java, Swift, SQL; flutter,
  Spring Boot, Selenium, FastAPI, supabase; Docker, Git, Linux, REST, sklearn);
  experience (ARSoftware, intellior, BMW, TRIO); education (TH Rosenheim,
  OTH Regensburg, HAW Landshut).
- **CV PDF:** `cv-aigner-andre.pdf` served for download.
- **First project:** Aeneis Python API Wrapper (real, from CV) with `project.mdx`
  and at least one seed article. Other projects added later as folders.

## 9. Out of Scope (YAGNI)

- No global blog feed / tag aggregation across projects.
- No CMS, database, auth, or comments.
- No dark mode in v1 (design is light-mode-first; can revisit later).
- No i18n.
- No analytics in v1 (can add Vercel Analytics later if desired).
- No dense data dashboards (the `DESIGN.md` instrumentation visuals are a style
  reference, not a feature requirement).

## 10. Success Criteria

- Landing page presents the CV clearly and offers the PDF download.
- A visitor can browse to any project, read its story, and read its articles.
- Adding a new project or article requires only adding MDX files.
- The site visually reads as the `DESIGN.md` language: calm, editorial,
  luminous gradient cards, strong typography.
- Static build deploys cleanly to Vercel; good Lighthouse scores; responsive
  from mobile to desktop.

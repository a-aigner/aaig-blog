import { contact } from "@/content/cv";
import { getAllProjects, getProjectArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt (llmstxt.org): a Markdown index of the site for language models,
 * built from the same content the pages are, so it can never list an article
 * that does not exist. Prerendered at build time like the pages themselves.
 */
export const dynamic = "force-static";

export function GET() {
  const projects = getAllProjects().map((p) => {
    const articles = getProjectArticles(p.slug)
      .map((a) => `- [${a.title}](${absoluteUrl(`/projects/${p.slug}/${a.slug}`)})${a.summary ? `: ${a.summary}` : ""}`)
      .join("\n");
    return [
      `## ${p.title}`,
      "",
      `[Project overview](${absoluteUrl(`/projects/${p.slug}`)}): ${p.summary}`,
      ...(articles ? ["", articles] : []),
    ].join("\n");
  });

  const body = [
    `# ${contact.name}`,
    "",
    `> ${contact.role} based in ${contact.location}. Portfolio and long-form engineering write-ups on the projects below: AI tooling, LLM integration, retrieval and the systems around them.`,
    "",
    "Each article is a first-person account of one problem in one project, written with AI from the author's own repositories and notes and reviewed by the author before publishing.",
    "",
    ...projects.flatMap((p) => [p, ""]),
    "## About",
    "",
    `- [About](${absoluteUrl("/about")}): background and current work`,
    `- [Uses](${absoluteUrl("/uses")}): languages, frameworks and tools`,
    `- [How this site is written](${absoluteUrl("/ai")}): how AI is used on this site and who is responsible for it`,
    `- [CV (PDF)](${absoluteUrl(contact.cvPdf)})`,
    `- [LinkedIn](${contact.linkedin})`,
    `- [GitHub](${contact.github})`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

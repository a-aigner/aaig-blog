import { getAllProjects } from "@/lib/content";
import { GradientCard } from "@/components/GradientCard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects — André Aigner",
  description: "Projects by André Aigner, each with long-form engineering write-ups: on-premises AI, LLM integration, retrieval, native apps and developer tools.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <section className="mx-auto max-w-3xl px-6 pt-6">
      <h1 className="text-2xl font-medium tracking-tight">Projects</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <GradientCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

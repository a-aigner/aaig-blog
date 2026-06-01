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

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

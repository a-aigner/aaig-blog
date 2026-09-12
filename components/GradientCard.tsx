import Link from "next/link";
import type { ProjectMeta } from "@/lib/content.types";
import { LuminousGradient } from "./LuminousGradient";
import { Pill } from "./Pill";

/**
 * A card shows at most this many stack pills. The project page shows the whole
 * list; here a third row of pills makes one card taller than every other and
 * the grid stops looking deliberate. Six is what fits two rows at the column
 * width the grid uses.
 */
const CARD_PILLS = 6;

/**
 * `h-full` is load-bearing. The <Link> is the grid item and already stretches
 * to the tallest card in its row, but the gradient panel inside it is
 * content-sized, so a project with a shorter summary used to leave a band of
 * page background under it while its neighbour filled the row. The panel has
 * to be told to fill the item it sits in.
 */
export function GradientCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <LuminousGradient
        gradient={project.gradient}
        className="rounded-card flex h-full min-h-48 flex-col justify-end p-5 transition-transform group-hover:-translate-y-1"
      >
        <h3 className="relative text-2xl font-extrabold tracking-tight">{project.title}</h3>
        <p className="relative mt-1 max-w-md text-sm text-[rgb(10_10_10/0.6)]">{project.summary}</p>
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, CARD_PILLS).map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </LuminousGradient>
    </Link>
  );
}

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

import Link from "next/link";
import { contact } from "@/content/cv";
import { getAllProjects } from "@/lib/content";
import { CvSummary } from "@/components/CvSummary";
import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/Button";
import { pageMetadata, jsonLd, personJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "André Aigner — Applied AI Engineer",
  description: `Applied AI engineer: LLM tools, agents and computer vision, taken from idea to production. M.Sc. Applied AI (Feb 2027), based in ${contact.location}. Projects and engineering write-ups.`,
  path: "/",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: personJsonLd,
};

export default function Home() {
  const featured = getAllProjects().filter((p) => p.featured);

  return (
    <div className="pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeJsonLd) }} />
      <section className="mx-auto max-w-3xl px-6 pt-10 pb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatar.svg" alt="" className="mb-6 size-14 rounded-full" />
        <h1 className="text-2xl font-medium leading-snug tracking-tight">
          Applied AI engineer.
        </h1>
        <p className="mt-5 max-w-md text-secondary">
          I take AI systems from idea to production: LLM tools, agents and computer vision,
          under real-world constraints. M.Sc. Applied AI (Feb 2027). Based in {contact.location},
          open to roles from March 2027 in the Nordics and Europe.
        </p>
        <div className="mt-6">
          <Button href={contact.cvPdf} external>Download CV</Button>
        </div>
      </section>

      <CvSummary />

      <section className="mx-auto mt-16 max-w-3xl px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-medium">Selected projects</h2>
          <Link href="/projects" className="text-sm text-secondary hover:text-[var(--color-ink)]">all projects →</Link>
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

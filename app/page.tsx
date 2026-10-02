import Link from "next/link";
import { contact } from "@/content/cv";
import { getAllProjects } from "@/lib/content";
import { CvSummary } from "@/components/CvSummary";
import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/Button";
import { pageMetadata, jsonLd, personJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "André Aigner — Software Engineer & Founder",
  description: `Software engineer and founder building AI-driven tools at ARSoftware. M.Sc. Applied AI, based in ${contact.location}. Projects and engineering write-ups.`,
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
          Software engineer &amp; founder.
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

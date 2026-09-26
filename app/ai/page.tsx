import Link from "next/link";
import { contact } from "@/content/cv";

export const metadata = {
  title: "How this site is written — André Aigner",
  description: "How AI is used to write the articles, diagrams and graphics on this site, and who is responsible for them.",
};

/**
 * The disclosure the EU AI Act asks for (Art. 50(4) of Regulation (EU)
 * 2024/1689), written for the people who actually read this site. The legal
 * point is the editorial-responsibility sentence: text that a named person
 * reviews and answers for is the case the article carves out. The German
 * short form lives on /impressum and links here.
 */

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-base font-medium tracking-tight">{children}</h2>;
}

export default function AiPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-2xl font-medium tracking-tight">How this site is written</h1>

      <div className="mt-6 space-y-4 leading-relaxed text-[rgb(26_26_26/0.8)]">
        <p>
          The work on this site is mine. The projects, the code, the decisions, the
          measurements and the things that went wrong all happened, and the repositories
          they come from are real.
        </p>
        <p>
          The writing about that work is produced with generative AI, mostly Claude by
          Anthropic. Parts of an article, or all of it, may be machine-written. The same
          goes for the diagrams and graphics. I say so plainly because you should know
          what you are reading, and because building this kind of workflow is part of
          the job I do.
        </p>

        <H>How an article gets made</H>
        <p>
          It starts from primary sources, never from a blank prompt: the repository, its
          commit history, the specifications and my notes. Facts are gathered from those
          first, so every number, name and date in an article can be traced back to
          something that exists.
        </p>
        <p>
          The drafting runs through a system I designed for it. A set of skills fixes the
          voice, the structure and the level of explanation. A style pass removes the
          habits that make machine-written text generic. Diagrams are drawn in this
          site&apos;s own design and rendered and checked before they ship. Customer names
          and customer data never go in.
        </p>
        <p>
          Screenshots show the real software. Where a screen would contain someone&apos;s
          data, it is filled with synthetic data first.
        </p>

        <H>Who is responsible</H>
        <p>
          I read, correct and approve every article before it is published, and I take
          editorial responsibility for all content on this site. If something is wrong,
          that is my mistake, and I would like to hear about it at{" "}
          <a href={`mailto:${contact.email}`} className="underline underline-offset-2 hover:opacity-70">
            {contact.email}
          </a>
          .
        </p>
        <p>
          This site&apos;s code was built with AI assistance as well.
        </p>

        <p className="mt-10 text-sm text-secondary">
          This page is the disclosure under Art. 50 of the EU AI Act (Regulation (EU)
          2024/1689). The German version is in the{" "}
          <Link href="/impressum#ki" className="underline underline-offset-2 hover:opacity-70">
            Impressum
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

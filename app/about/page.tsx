import { contact } from "@/content/cv";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About — André Aigner",
  description: "André Aigner, applied AI engineer based in Rosenheim and founder of ARSoftware UG, finishing an M.Sc. in Applied Artificial Intelligence at TH Rosenheim.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-2xl font-medium tracking-tight">About</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-[rgb(26_26_26/0.8)]">
        <p>
          I’m {contact.name}, an applied AI engineer based in {contact.location}. I’m finishing
          an M.Sc. in Applied Artificial Intelligence at TH Rosenheim in February 2027. Right now
          I’m at 3con Technologies, building vision systems and automations for engineering teams.
        </p>
        <p>
          I founded ARSoftware UG, where I built and run replai, an on-premises AI suite for a
          client. Before that I built Python microservices that automated software migrations for
          German enterprises at intellior GmbH, and worked on an innovation project at BMW Group.
          I work agent-first: I write the specs and the architecture, AI coding agents implement,
          and I review and test every change. I like turning awkward, fragile systems into clean
          tools other people can rely on.
        </p>
        <p>
          I’m open to applied AI and AI engineering roles from March 2027, in the Nordics and
          across Europe. Outside work I captain a tennis team and coach tennis.
        </p>
      </div>
    </section>
  );
}

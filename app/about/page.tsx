import { contact } from "@/content/cv";

export const metadata = { title: "About — André Aigner" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">About</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-[rgb(10_10_10/0.78)]">
        <p>
          I’m {contact.name}, a software engineer and founder based in {contact.location}.
          I founded ARSoftware UG to build apps focused on automation and AI-driven tooling,
          and I’m pursuing an M.Sc. in Applied Artificial Intelligence at TH Rosenheim.
        </p>
        <p>
          Before that I built microservices and process-mining tools for German enterprises
          at intellior GmbH, automated production workflows during an innovation project at
          BMW Group, and wrote large-scale UI test automation early on. I like turning awkward,
          fragile systems into clean tools other people can rely on.
        </p>
      </div>
    </section>
  );
}

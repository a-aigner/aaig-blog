import { aiHighlights, experience, education, contact } from "@/content/cv";
import { Pill } from "./Pill";
import { Button } from "./Button";

export function CvSummary() {
  return (
    <section className="mx-auto max-w-3xl px-6">
      <div>
        <h2 className="text-xl font-bold">CV at a glance</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {aiHighlights.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold">Experience</h3>
        <ul className="mt-3 space-y-3 border-l hairline pl-4">
          {experience.map((e) => (
            <li key={e.role + e.org}>
              <div className="text-sm font-semibold">{e.role} · {e.org}</div>
              <div className="text-xs text-secondary">{e.period} · {e.place}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold">Education</h3>
        <ul className="mt-3 space-y-3 border-l hairline pl-4">
          {education.map((e) => (
            <li key={e.degree}>
              <div className="text-sm font-semibold">{e.degree} · {e.org}</div>
              <div className="text-xs text-secondary">{e.period} · {e.place}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button href={contact.cvPdf} variant="ghost" external>Download full CV (PDF)</Button>
      </div>
    </section>
  );
}

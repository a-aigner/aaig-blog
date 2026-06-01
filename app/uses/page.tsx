import { skills } from "@/content/cv";
import { Pill } from "@/components/Pill";

export const metadata = { title: "Uses — André Aigner" };

export default function UsesPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Uses</h1>
      <p className="mt-4 text-secondary">Tools and tech I currently work with.</p>
      <div className="mt-6 space-y-6">
        {skills.map((g) => (
          <div key={g.group}>
            <h2 className="text-sm font-bold">{g.group}</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

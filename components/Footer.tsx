import { contact } from "@/content/cv";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-3xl border-t hairline px-6 py-10 text-sm text-secondary">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-ink)]">{contact.email}</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)]">LinkedIn</a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)]">GitHub</a>
      </div>
      <p className="mt-4 text-tertiary">© {contact.name} · {contact.location}</p>
    </footer>
  );
}

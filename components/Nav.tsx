import Link from "next/link";

export function Nav() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-sm">
      <Link href="/" className="font-bold tracking-tight">
        André Aigner
      </Link>
      <div className="flex gap-5 text-secondary">
        <Link href="/projects" className="hover:text-[var(--color-ink)]">projects</Link>
        <Link href="/about" className="hover:text-[var(--color-ink)]">about</Link>
        <Link href="/uses" className="hover:text-[var(--color-ink)]">uses</Link>
      </div>
    </nav>
  );
}

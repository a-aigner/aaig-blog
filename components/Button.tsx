import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export function Button({ href, children, variant = "primary", external }: Props) {
  const base = "inline-block rounded-[999px] px-4 py-1.5 text-sm transition-opacity hover:opacity-80";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-green)] text-white"
      : "border border-[rgb(26_26_26/0.12)] text-[var(--color-ink)]";
  const cls = `${base} ${styles}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

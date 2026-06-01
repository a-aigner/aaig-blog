import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export function Button({ href, children, variant = "primary", external }: Props) {
  const base = "inline-block rounded-[999px] px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-ink)] text-white"
      : "border border-[rgb(10_10_10/0.15)] text-[var(--color-ink)]";
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

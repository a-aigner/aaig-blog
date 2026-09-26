export function Pill({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  const colors = tone === "dark" ? "bg-white/10 text-white/80" : "bg-[rgb(26_26_26/0.05)] text-[rgb(26_26_26/0.7)]";
  return (
    <span className={`inline-block rounded-[999px] px-2.5 py-0.5 text-xs ${colors}`}>
      {children}
    </span>
  );
}

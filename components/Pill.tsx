export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[999px] bg-[rgb(10_10_10/0.06)] px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

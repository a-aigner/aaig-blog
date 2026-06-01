import type React from "react";
import type { GradientKey } from "@/lib/content.types";

const gradClass: Record<GradientKey, string> = {
  green: "grad-green",
  violet: "grad-violet",
  purple: "grad-purple",
  orange: "grad-orange",
  rose: "grad-rose",
};

export function LuminousGradient({
  gradient,
  className = "",
  children,
}: {
  gradient: GradientKey;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${gradClass[gradient]} ${className}`}>
      <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
      {children}
    </div>
  );
}

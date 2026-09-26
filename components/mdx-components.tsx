import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-lg font-medium tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 text-base font-medium" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-[rgb(26_26_26/0.8)]" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-1 pl-6" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-1 pl-6" {...props} />,
  li: (props) => <li className="leading-relaxed text-[rgb(26_26_26/0.8)]" {...props} />,
  a: (props) => <a className="underline decoration-[rgb(31_58_44/0.35)] underline-offset-2 transition-colors hover:decoration-[var(--color-green)]" {...props} />,
  code: (props) => <code className="rounded-md border hairline bg-[rgb(26_26_26/0.03)] px-1 py-px font-mono text-[0.85em]" {...props} />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="mt-6 w-full rounded-card-sm border hairline" loading="lazy" {...props} />
  ),
  Figure: ({ src, alt, caption }: { src: string; alt?: string; caption?: string }) => (
    <figure className="mt-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? caption ?? ""} loading="lazy" className="w-full rounded-card-sm border hairline" />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
      ) : null}
    </figure>
  ),
};

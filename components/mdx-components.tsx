import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-8 text-2xl font-bold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-6 text-xl font-bold" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-[rgb(10_10_10/0.78)]" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-1 pl-6" {...props} />,
  a: (props) => <a className="underline underline-offset-2 hover:opacity-70" {...props} />,
  pre: (props) => <pre className="mt-4 overflow-x-auto rounded-card-sm bg-[#0a0a0a] p-4 text-sm text-[#e6edf3]" {...props} />,
  code: (props) => <code className="rounded bg-[rgb(10_10_10/0.06)] px-1 py-0.5 text-sm" {...props} />,
};

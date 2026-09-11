import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "André Aigner — Software Engineer & Founder",
  description: "Portfolio, projects, and writing by André Aigner.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Cookieless page counting. Sets no cookie and writes nothing to the
            device, which is why there is no consent banner on this site; the
            processing is still described in /privacy. Only reports when
            deployed on Vercel, so local runs stay silent. */}
        <Analytics />
      </body>
    </html>
  );
}

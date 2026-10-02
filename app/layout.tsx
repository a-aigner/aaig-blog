import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// No canonical here: a canonical set in the layout is inherited by every page
// that forgets its own, and would point them all at the home page. Each page
// sets its own through pageMetadata in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "André Aigner — Software Engineer & Founder",
  description: "Portfolio, projects, and writing by André Aigner.",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  verification: { google: "xp6l12RW0hHUZ6p0yilSy1bpEIEgngwfWMTPRX3xamg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
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

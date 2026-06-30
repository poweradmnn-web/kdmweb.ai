import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { brand } from "@/config/brand";
import BookingScripts from "@/components/booking/BookingScripts";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const title = "kdmweb.ai — Websites, apps & systems, shipped in weeks";
const description =
  "kdmweb.ai is a modern studio that builds custom websites, apps, and internal systems for founders and SMBs. AI as leverage means agency-grade quality, faster and more affordable. Book a free call.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title,
  description,
  applicationName: brand.name,
  keywords: [
    "web development studio",
    "app development",
    "custom software",
    "automation",
    "internal tools",
    "MVP development",
    "AI web agency",
    "SMB software",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.name,
    title,
    description,
    // To enable a social-share preview: add public/og.png (1200×630) and uncomment:
    // images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: brand.colors.ink,
  colorScheme: "dark",
};

// JSON-LD: helps search engines understand who we are.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  url: brand.url,
  email: brand.email,
  description,
  areaServed: "Worldwide",
  serviceType: ["Website development", "App development", "Software & automation"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <a
          href="#contact"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to contact
        </a>
        {/* No-JS fallback: make scroll-reveal content visible even without JavaScript. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        {children}
        <BookingScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

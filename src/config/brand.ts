/**
 * ──────────────────────────────────────────────────────────────────────────
 *  kdmweb.ai — SINGLE SOURCE OF TRUTH for brand look + links.
 *  Edit colors, fonts, email, and links HERE. Tailwind reads `colors` from
 *  this file (see tailwind.config.ts), so changing a hex updates the whole site.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  name: "kdmweb.ai",
  // Used in <title>, metadata, JSON-LD, canonical, OG. Update if the domain changes.
  url: "https://kdmweb.ai",
  tagline: "We build websites, apps, and systems — shipped in weeks, not months.",

  // TODO: confirm the real inbox. This is the mailto target used everywhere on the site.
  email: "hello@kdmweb.ai",

  // Booking / "Book a free call".
  // Production: set NEXT_PUBLIC_BOOKING_URL in Vercel (recommended). Local dev: set it in
  // .env.local, or paste a link into the `|| ""` fallback below. While the URL is empty,
  // every "Book a free call" CTA smooth-scrolls to the contact form (never a dead end).
  booking: {
    // "calcom" (recommended) or "calendly". Override with NEXT_PUBLIC_BOOKING_PROVIDER.
    provider: ((process.env.NEXT_PUBLIC_BOOKING_PROVIDER ?? "calcom") as "calcom" | "calendly"),
    //   Cal.com  → "https://cal.com/your-name/intro"
    //   Calendly → "https://calendly.com/your-name/intro"
    url: (process.env.NEXT_PUBLIC_BOOKING_URL || "") as string,
  },

  // TODO: add real profiles. Empty links are hidden in the footer automatically.
  // Instagram: paste your profile URL (e.g. https://instagram.com/kdmweb.ai) to show the icon.
  social: {
    instagram: "",
    linkedin: "",
    x: "",
    github: "",
  },

  // Anchor nav shown in the header.
  nav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  /**
   * COLORS — dark, tinted-ink palette with an iris accent.
   * Tailwind generates utilities from these keys: bg-ink, bg-surface, text-fg,
   * text-muted, text-accent, border-line, etc.
   */
  colors: {
    ink: "#0A0B12", // page background
    surface: "#12131C", // cards / raised surfaces
    "surface-2": "#171826", // hover / nested surfaces
    line: "#23252F", // hairline borders
    fg: "#F4F5FA", // primary text
    muted: "#9AA0B4", // secondary text
    accent: "#7C5CFF", // primary accent (iris)
    "accent-hover": "#6B47F0", // accent hover
    glow: "#22D3EE", // secondary accent, used only for subtle glow/gradient
  },

  /**
   * FONTS — actual loading happens in src/app/layout.tsx via next/font, which
   * exposes these as the CSS variables --font-display / --font-body / --font-mono.
   * These names are the documented source of truth for the type pairing.
   */
  fonts: {
    display: "Space Grotesk",
    body: "Geist Sans",
    mono: "Geist Mono",
  },
} as const;

export type Brand = typeof brand;

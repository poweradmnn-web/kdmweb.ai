import type { Config } from "tailwindcss";
import { brand } from "./src/config/brand";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // Colors come straight from the single brand config file.
      colors: brand.colors,
      fontFamily: {
        // CSS variables are set by next/font + the geist package in src/app/layout.tsx.
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      // ~1.25 modular scale from the design plan.
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.5" }], // 14
        sm: ["1rem", { lineHeight: "1.6" }], // 16
        base: ["1.25rem", { lineHeight: "1.6" }], // 20
        lg: ["1.5625rem", { lineHeight: "1.4" }], // 25
        xl: ["1.953rem", { lineHeight: "1.2" }], // 31
        "2xl": ["2.441rem", { lineHeight: "1.15" }], // 39
        "3xl": ["3.052rem", { lineHeight: "1.1" }], // 49
        "4xl": ["3.815rem", { lineHeight: "1.05" }], // 61
        "5xl": ["4.768rem", { lineHeight: "1.02" }], // 76
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        glow: "0 0 80px -24px rgba(124, 92, 255, 0.55)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 24px 48px -24px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "accent-line":
          "linear-gradient(180deg, transparent, rgba(124,92,255,0.7) 18%, rgba(34,211,238,0.5) 82%, transparent)",
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

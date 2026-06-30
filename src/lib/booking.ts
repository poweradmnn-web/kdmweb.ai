import { brand } from "@/config/brand";

/**
 * Booking helpers. The provider + link live in src/config/brand.ts (`booking`).
 * Everything here is provider-agnostic so switching Cal.com ↔ Calendly is a
 * one-line config change.
 */

export const booking = brand.booking;

/** True once a scheduling link has been pasted into brand.ts. */
export function isBookingEnabled(): boolean {
  return Boolean(booking.url && booking.url.trim() !== "");
}

/**
 * Cal.com embeds want only the link path (e.g. "kdmweb/intro"), not the full
 * URL. Accepts a full URL OR a bare path and returns the path.
 */
export function calcomCalLink(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^(www\.)?cal\.com\//, "")
    .replace(/^app\.cal\.com\//, "")
    .replace(/\/$/, "");
}

/** Load the Cal.com embed once (idempotent, client-only). */
export function loadCalcom(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { Cal?: { (...args: unknown[]): void; q?: unknown[] } };
  if (w.Cal) return;

  const cal = function (...args: unknown[]) {
    (cal.q = cal.q || []).push(args);
  } as { (...args: unknown[]): void; q?: unknown[] };
  w.Cal = cal;

  const s = document.createElement("script");
  s.src = "https://app.cal.com/embed/embed.js";
  s.async = true;
  document.head.appendChild(s);

  cal("init", { origin: "https://cal.com" });
  cal("ui", {
    theme: "dark",
    cssVarsPerTheme: { dark: { "cal-brand": "#7C5CFF" } },
    layout: "month_view",
  });
}

/** Load the Calendly widget assets once (idempotent, client-only). */
export function loadCalendly(): void {
  if (typeof window === "undefined") return;
  if (!document.getElementById("calendly-css")) {
    const l = document.createElement("link");
    l.id = "calendly-css";
    l.rel = "stylesheet";
    l.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(l);
  }
  if (!document.getElementById("calendly-js")) {
    const s = document.createElement("script");
    s.id = "calendly-js";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }
}

/** Open the Calendly popup (falls back to a new tab if the script isn't ready). */
export function openCalendlyPopup(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    Calendly?: { initPopupWidget: (o: { url: string }) => void };
  };
  if (w.Calendly) w.Calendly.initPopupWidget({ url: booking.url });
  else window.open(booking.url, "_blank", "noopener,noreferrer");
}

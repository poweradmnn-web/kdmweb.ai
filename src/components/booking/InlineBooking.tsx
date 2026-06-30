"use client";

import { useEffect } from "react";
import {
  booking,
  isBookingEnabled,
  calcomCalLink,
  loadCalcom,
  loadCalendly,
} from "@/lib/booking";

/**
 * Embedded calendar shown inside the Contact section so visitors can pick a
 * time without leaving the page. Renders nothing until a booking link is set.
 */
export default function InlineBooking() {
  useEffect(() => {
    if (!isBookingEnabled()) return;

    if (booking.provider === "calendly") {
      loadCalendly(); // widget.js auto-renders the .calendly-inline-widget div
      return;
    }

    // Cal.com inline embed.
    loadCalcom();
    const w = window as unknown as { Cal?: (...args: unknown[]) => void };
    w.Cal?.("inline", {
      elementOrSelector: "#booking-inline",
      calLink: calcomCalLink(booking.url),
      config: { theme: "dark", layout: "month_view" },
    });
  }, []);

  if (!isBookingEnabled()) return null;

  if (booking.provider === "calendly") {
    return (
      <div
        className="calendly-inline-widget overflow-hidden rounded-2xl border border-line bg-surface"
        data-url={booking.url}
        style={{ minWidth: "320px", height: "680px" }}
      />
    );
  }

  return (
    <div
      id="booking-inline"
      className="min-h-[600px] overflow-hidden rounded-2xl border border-line bg-surface"
    />
  );
}

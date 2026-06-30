"use client";

import { useEffect } from "react";
import { booking, isBookingEnabled, loadCalcom, loadCalendly } from "@/lib/booking";

/**
 * Loads the active scheduler's embed script once, site-wide, so that
 * "Book a free call" buttons can open the modal/popup. Renders nothing.
 * No-op until a booking link is set in brand.ts.
 */
export default function BookingScripts() {
  useEffect(() => {
    if (!isBookingEnabled()) return;
    if (booking.provider === "calendly") loadCalendly();
    else loadCalcom();
  }, []);

  return null;
}

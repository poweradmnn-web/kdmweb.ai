"use client";

import { booking, isBookingEnabled, calcomCalLink, openCalendlyPopup } from "@/lib/booking";

/**
 * Every "Book a free call" CTA. Pass full styling via `className`
 * (use buttonClasses() from Button.tsx for the standard look).
 *
 * - Booking configured (brand.ts) → opens the scheduler:
 *     Cal.com  → modal via the embed's data-cal-link binding
 *     Calendly → popup via the widget API
 * - Not configured yet → renders <a href="#contact"> so the CTA gracefully
 *   smooth-scrolls to the contact form (nothing looks broken).
 */
export default function BookCallButton({
  className,
  children,
  ariaLabel,
}: {
  className: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  if (!isBookingEnabled()) {
    return (
      <a href="#contact" className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  if (booking.provider === "calendly") {
    return (
      <button
        type="button"
        className={className}
        aria-label={ariaLabel}
        onClick={openCalendlyPopup}
      >
        {children}
      </button>
    );
  }

  // Cal.com: BookingScripts loads the embed, which opens a modal when an
  // element carrying data-cal-link is clicked.
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      data-cal-link={calcomCalLink(booking.url)}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
    >
      {children}
    </button>
  );
}

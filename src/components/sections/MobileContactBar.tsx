"use client";

import { CalendarCheck, Mail } from "lucide-react";
import { brand } from "@/config/brand";
import { mailtoHref } from "@/lib/links";
import BookCallButton from "@/components/ui/BookCallButton";

/**
 * Sticky bottom bar on mobile so contact is reachable from anywhere.
 * Hidden on md+ where the header CTA is always visible.
 */
export default function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/90 backdrop-blur-md md:hidden">
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <BookCallButton
          ariaLabel="Book a free call"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-white shadow-glow"
        >
          <CalendarCheck size={18} aria-hidden />
          Book a free call
        </BookCallButton>
        <a
          href={mailtoHref()}
          aria-label={`Email ${brand.email}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-fg"
        >
          <Mail size={20} aria-hidden />
        </a>
      </div>
    </div>
  );
}

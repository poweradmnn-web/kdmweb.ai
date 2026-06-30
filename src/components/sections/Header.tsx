"use client";

import { useEffect, useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import Logo from "@/components/Logo";
import BookCallButton from "@/components/ui/BookCallButton";
import { buttonClasses } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label={`${brand.name} — back to top`} className="rounded-md">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {brand.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Persistent CTA — visible at every scroll position, on every breakpoint. */}
          <BookCallButton
            ariaLabel="Book a free call"
            className={buttonClasses("primary", "md", "hidden sm:inline-flex")}
          >
            <CalendarCheck size={16} aria-hidden />
            Book a free call
          </BookCallButton>
          <BookCallButton
            ariaLabel="Book a free call"
            className={buttonClasses("primary", "md", "sm:hidden")}
          >
            <CalendarCheck size={16} aria-hidden />
            Book a call
          </BookCallButton>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-fg hover:bg-surface md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md md:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col py-2">
          {brand.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}

import { Github, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/Logo";
import Button, { buttonClasses } from "@/components/ui/Button";
import BookCallButton from "@/components/ui/BookCallButton";
import { brand } from "@/config/brand";
import { footer } from "@/content/site";
import { mailtoHref } from "@/lib/links";

const socials = [
  { key: "instagram", href: brand.social.instagram, Icon: Instagram, label: "Instagram" },
  { key: "linkedin", href: brand.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { key: "x", href: brand.social.x, Icon: Twitter, label: "X" },
  { key: "github", href: brand.social.github, Icon: Github, label: "GitHub" },
].filter((s) => s.href); // empty links are hidden automatically

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/30">
      <Container className="py-16">
        {/* Final CTA band */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">{footer.finalCtaHeading}</h2>
            <p className="mt-2 text-sm text-muted">{footer.finalCtaBody}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookCallButton ariaLabel="Book a free call" className={buttonClasses("primary", "md")}>
              Book a free call
              <ArrowRight size={16} aria-hidden />
            </BookCallButton>
            <Button href={mailtoHref()} variant="secondary">
              Email us
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted">{footer.blurb}</p>
            <a
              href={mailtoHref()}
              className="mt-4 inline-block font-mono text-sm text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              {brand.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
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
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {brand.name}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-2">
              {socials.map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-fg"
                >
                  <Icon size={18} aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}

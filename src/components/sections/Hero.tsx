import { ArrowRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Button, { buttonClasses } from "@/components/ui/Button";
import BookCallButton from "@/components/ui/BookCallButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { brand } from "@/config/brand";
import { hero } from "@/content/site";
import { mailtoHref } from "@/lib/links";

export default function Hero() {
  const [lead, emphasis] = hero.headline.split(" — ");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Decorative background: accent glow + faint grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-[8%] top-[30%] h-[280px] w-[280px] rounded-full bg-glow/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
          }}
        />
      </div>

      <Container className="max-w-3xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{hero.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={60}>
          <h1
            id="hero-heading"
            className="mt-6 text-2xl font-semibold leading-[1.05] sm:text-4xl"
          >
            <span className="text-gradient">{lead} — </span>
            <span className="text-accent">{emphasis}</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-base">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookCallButton
              ariaLabel={hero.primaryCta}
              className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
            >
              {hero.primaryCta}
              <ArrowRight size={18} aria-hidden />
            </BookCallButton>
            <Button
              href={mailtoHref()}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Mail size={18} aria-hidden />
              {hero.secondaryCta}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-5 text-xs text-muted">
            {hero.microcopy} ·{" "}
            <a
              href={mailtoHref()}
              className="font-mono text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
            >
              {brand.email}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

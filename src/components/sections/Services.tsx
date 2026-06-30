import { ArrowUpRight, Globe, AppWindow, Workflow, type LucideIcon } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/content/site";

const icons: Record<string, LucideIcon> = {
  Globe,
  AppWindow,
  Workflow,
};

export default function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <div className="max-w-2xl">
        <Eyebrow>What we build</Eyebrow>
        <h2 id="services-heading" className="mt-5 text-xl font-semibold sm:text-2xl">
          Three ways we help you ship
        </h2>
        <p className="mt-4 text-base text-muted">
          Websites, apps, and the systems behind them — designed and built fast, so you
          can launch while it still matters.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Globe;
          return (
            <Reveal key={service.id} delay={i * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.problem}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors group-hover:text-accent"
                >
                  {service.cta}
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

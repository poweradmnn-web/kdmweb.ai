import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { work } from "@/content/site";

export default function Work() {
  return (
    <Section id="work" labelledBy="work-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>{work.eyebrow}</Eyebrow>
          <h2 id="work-heading" className="mt-5 text-xl font-semibold sm:text-2xl">
            {work.heading}
          </h2>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          Could be you next
          <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {work.cases.map((c, i) => {
          const domain = c.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
          return (
            <Reveal key={c.client} delay={i * 80}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.client} — visit ${domain} (opens in a new tab)`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  {/* TODO: replace the initials chip with the client's real logo. */}
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface-2 font-mono text-sm text-accent">
                    {c.client.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {c.sector}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold">{c.client}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.result}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  {domain}
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

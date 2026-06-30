import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/content/site";

export default function About() {
  return (
    <Section
      id="about"
      labelledBy="about-heading"
      className="border-y border-line bg-surface/30"
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="max-w-2xl">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 id="about-heading" className="mt-5 text-xl font-semibold sm:text-2xl">
            {about.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{about.body}</p>
        </div>

        <Reveal>
          <dl className="grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl font-semibold text-fg">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

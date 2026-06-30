import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { process } from "@/content/site";

export default function Process() {
  return (
    <Section id="process" labelledBy="process-heading">
      <div className="max-w-2xl">
        <Eyebrow>{process.eyebrow}</Eyebrow>
        <h2 id="process-heading" className="mt-5 text-xl font-semibold sm:text-2xl">
          {process.heading}
        </h2>
        <p className="mt-4 text-base text-muted">
          A tight, low-friction path from first call to live product. You stay in the
          loop the whole way.
        </p>
      </div>

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 80}>
            <li className="relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

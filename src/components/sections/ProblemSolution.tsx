import { Check, X } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import BookCallButton from "@/components/ui/BookCallButton";
import { buttonClasses } from "@/components/ui/Button";
import { problemSolution } from "@/content/site";

export default function ProblemSolution() {
  return (
    <Section
      id="why"
      labelledBy="why-heading"
      className="border-y border-line bg-surface/30"
    >
      <div className="max-w-2xl">
        <Eyebrow>{problemSolution.eyebrow}</Eyebrow>
        <h2 id="why-heading" className="mt-5 text-xl font-semibold sm:text-2xl">
          {problemSolution.heading}
        </h2>
      </div>

      <div className="mt-12 grid gap-4">
        {problemSolution.rows.map((row, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="grid items-stretch gap-4 md:grid-cols-2">
              {/* The old way */}
              <div className="flex gap-3 rounded-2xl border border-line bg-ink/40 p-5">
                <X size={20} aria-hidden className="mt-0.5 shrink-0 text-muted" />
                <p className="text-sm leading-relaxed text-muted">{row.problem}</p>
              </div>
              {/* The kdmweb.ai way */}
              <div className="flex gap-3 rounded-2xl border border-accent/30 bg-accent/[0.06] p-5">
                <Check size={20} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-fg">{row.solution}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10">
          <BookCallButton
            ariaLabel="Book a free call"
            className={buttonClasses("primary", "md")}
          >
            Get a straight answer in 30 minutes
          </BookCallButton>
        </div>
      </Reveal>
    </Section>
  );
}

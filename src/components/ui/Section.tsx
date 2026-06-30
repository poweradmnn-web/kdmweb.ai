import { cn } from "@/lib/cn";
import Container from "./Container";

type SectionProps = {
  id: string;
  /** Accessible label: the id of the heading element that titles this section. */
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

/** A semantic <section> landmark with consistent vertical rhythm. */
export default function Section({
  id,
  labelledBy,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-20 py-20 sm:py-28", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

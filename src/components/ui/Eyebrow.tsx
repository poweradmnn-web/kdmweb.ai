import { cn } from "@/lib/cn";

/** Small monospace label above a heading, with the signature accent dot. */
export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
      {children}
    </span>
  );
}

import { cn } from "@/lib/cn";

/**
 * kdmweb.ai logomark — "Ascending signal": data points rising to a bright AI node
 * (results / growth / AI as leverage). Colors come from the brand tokens.
 */
export default function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* rising connector line */}
        <path
          d="M11 35 L21 27 L30 31 L39 13"
          className="stroke-accent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* data points */}
        <circle cx="11" cy="35" r="3" className="fill-fg" />
        <circle cx="21" cy="27" r="3" className="fill-fg" />
        <circle cx="30" cy="31" r="3" className="fill-fg" />
        {/* bright AI signal node */}
        <circle cx="39" cy="13" r="4.3" className="fill-glow" />
      </svg>
      {showWordmark && (
        <span className="font-mono text-base font-medium tracking-tight text-fg">
          kdmweb<span className="text-accent">.ai</span>
        </span>
      )}
    </span>
  );
}

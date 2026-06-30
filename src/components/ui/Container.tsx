import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centers content at the max width with responsive gutters. */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}

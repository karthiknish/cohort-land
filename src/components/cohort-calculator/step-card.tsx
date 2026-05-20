import { cn } from "@/lib/utils";

type StepCardProps = {
  step: number;
  title: string;
  description?: string;
  locked?: boolean;
  lockedLabel?: string;
  children?: React.ReactNode;
  className?: string;
};

export function StepCard({
  step,
  title,
  description,
  locked = false,
  lockedLabel,
  children,
  className,
}: StepCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        locked && "pointer-events-none select-none",
        className,
      )}
      aria-disabled={locked}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-gray-400">
          STEP {step}
        </p>
        {locked ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-gray-500">
            <span className="size-1.5 rounded-full bg-gray-400" aria-hidden />
            {lockedLabel ?? `Step ${step} locked`}
          </span>
        ) : null}
      </div>

      <h2
        className={cn(
          "mt-2 font-heading text-xl font-bold tracking-tight text-gray-900",
          locked && "text-gray-400",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-1.5 text-sm text-gray-500",
            locked && "text-gray-400",
          )}
        >
          {description}
        </p>
      ) : null}

      {children ? (
        <div className={cn("mt-5", locked && "opacity-50")}>{children}</div>
      ) : null}
    </section>
  );
}

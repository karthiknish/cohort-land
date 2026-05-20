import { cn } from "@/lib/utils";

type StepCardProps = {
  step: number;
  title: string;
  description?: string;
  locked?: boolean;
  lockedLabel?: string;
  headerAction?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function StepCard({
  step,
  title,
  description,
  locked = false,
  lockedLabel,
  headerAction,
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
      <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-gray-500">
        STEP {step}
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2
            className={cn(
              "font-heading text-xl font-bold tracking-tight text-gray-900",
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
        </div>

        {locked ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-gray-500">
            <span className="size-1.5 rounded-full bg-gray-400" aria-hidden />
            {lockedLabel ?? `Step ${step} locked`}
          </span>
        ) : headerAction ? (
          <div className="shrink-0 pt-0.5">{headerAction}</div>
        ) : null}
      </div>

      {children ? (
        <div
          className={cn(
            "mt-5",
            locked && "opacity-45",
          )}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

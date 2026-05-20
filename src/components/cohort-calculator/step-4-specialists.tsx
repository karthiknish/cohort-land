"use client";

import { ArrowRight, Info } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { formatGbp } from "./calculate-savings";
import { HELP_AREAS, type HelpAreaId } from "./constants";
import { SPECIALISTS, type Specialist } from "./specialists";

type Step4SpecialistsProps = {
  selectedAreas: HelpAreaId[];
  selectedSpecialistIds: string[];
  onToggleSpecialist: (id: string) => void;
};

export function Step4Specialists({
  selectedAreas,
  selectedSpecialistIds,
  onToggleSpecialist,
}: Step4SpecialistsProps) {
  const areasToShow = HELP_AREAS.filter((a) => selectedAreas.includes(a.id));

  if (areasToShow.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-6 py-10 text-center">
        <p className="text-sm font-medium text-gray-600">
          Choose one or more areas in Step 1 to see specialists.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {areasToShow.map((area) => {
        const specialists = SPECIALISTS.filter((s) => s.areaId === area.id);

        return (
          <section key={area.id}>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[0.65rem] font-bold tracking-wide",
                  area.bg,
                  area.color,
                )}
              >
                {area.abbr}
              </span>
              <h3 className="text-base font-bold text-gray-900">{area.label}</h3>
              <span className="text-sm text-gray-500">
                {specialists.length} available
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {specialists.map((specialist) => (
                <SpecialistCard
                  key={specialist.id}
                  specialist={specialist}
                  selected={selectedSpecialistIds.includes(specialist.id)}
                  onToggle={() => onToggleSpecialist(specialist.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SpecialistCard({
  specialist,
  selected,
  onToggle,
}: {
  specialist: Specialist;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-xl border bg-white p-4 transition-all",
        selected
          ? "border-[#2563eb] ring-2 ring-[#2563eb]/20"
          : "border-gray-200 hover:border-gray-300",
      )}
    >
      <button
        type="button"
        className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        aria-label={`More about ${specialist.name}`}
      >
        <Info className="size-3.5" strokeWidth={2.25} />
      </button>

      <div className="flex gap-3.5">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
          <Image
            src={specialist.image}
            alt={specialist.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 pr-6">
          <h4 className="font-bold text-gray-900">{specialist.name}</h4>
          <p className="text-[0.65rem] font-semibold tracking-wide text-gray-500">
            {specialist.role.toUpperCase()}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            UK avg {formatGbp(specialist.salaryMonthly)}/mo · {specialist.yearsExp}y
            exp
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        {specialist.bio}
      </p>

      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors",
          selected
            ? "text-[#2563eb]"
            : "text-gray-700 hover:text-[#2563eb]",
        )}
      >
        {selected ? "Added to cohort" : "Add to cohort"}
        <ArrowRight className="size-3.5" />
      </button>
    </article>
  );
}

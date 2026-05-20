"use client";

import { Minus, Plus, Sparkles, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  calculateCosts,
  formatGbp,
  type CostSummary,
} from "./calculate-savings";
import {
  COHORT_BASE_PRICE,
  COHORT_EXTRA_RESOURCE,
  DEFAULT_RESOURCES,
  RESOURCE_MAX,
  RESOURCE_MIN,
  RESOURCE_QUICK_PICKS,
  UK_2026_AVERAGES,
  type HelpAreaId,
} from "./constants";
import type { TeamProfile } from "./calculate-savings";

type Step3ResourcesProps = {
  resourceCount: number;
  setResourceCount: (n: number) => void;
  adjustResources: (delta: number) => void;
  selectedAreas: HelpAreaId[];
  team: TeamProfile;
  step1Complete: boolean;
  selectedSpecialistIds: string[];
};

export function Step3Resources({
  resourceCount,
  setResourceCount,
  adjustResources,
  selectedAreas,
  team,
  step1Complete,
  selectedSpecialistIds,
}: Step3ResourcesProps) {
  const effectiveTeam = step1Complete
    ? team
    : {
        currentStaff: UK_2026_AVERAGES.currentStaff,
        overheadsAnnual: UK_2026_AVERAGES.overheadsAnnual,
        useUkAverage: true,
      };

  const costs = calculateCosts({
    areas: selectedAreas,
    team: effectiveTeam,
    resourceCount,
    selectedSpecialistIds,
  });

  const extras = Math.max(0, resourceCount - DEFAULT_RESOURCES);

  return (
    <div className="space-y-4">
      <ResourcePicker
        resourceCount={resourceCount}
        setResourceCount={setResourceCount}
        adjustResources={adjustResources}
      />

      <CohortPriceCard costs={costs} extras={extras} />

      <div className="grid gap-3 sm:grid-cols-2">
        <InHouseCard resourceCount={resourceCount} costs={costs} />
        <SavingsCard costs={costs} />
      </div>

      <p className="text-center text-xs leading-relaxed text-gray-500">
        Want a more precise quote? Pick specific specialists below — their real
        UK salaries replace the category average.
      </p>
    </div>
  );
}

function ResourcePicker({
  resourceCount,
  setResourceCount,
  adjustResources,
}: {
  resourceCount: number;
  setResourceCount: (n: number) => void;
  adjustResources: (delta: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-6xl font-extrabold leading-none tracking-tight text-gray-900">
          {resourceCount}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-600">
          resources in your cohort
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => adjustResources(-1)}
            disabled={resourceCount <= RESOURCE_MIN}
            aria-label="Remove one resource"
            className="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Minus className="size-4" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => adjustResources(1)}
            disabled={resourceCount >= RESOURCE_MAX}
            aria-label="Add one resource"
            className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Plus className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <div
          className="flex flex-wrap justify-end gap-1.5"
          role="group"
          aria-label="Quick select team size"
        >
          {RESOURCE_QUICK_PICKS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setResourceCount(n)}
              aria-pressed={resourceCount === n}
              aria-label={`${n} resources`}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                resourceCount === n
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="text-[0.65rem] text-gray-400">
          Tap a number or use +/− — both update your cohort size
        </p>
      </div>
    </div>
  );
}

function CohortPriceCard({
  costs,
  extras,
}: {
  costs: CostSummary;
  extras: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] px-5 py-5 text-white shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-white/80">
          YOUR COHORTS PRICE
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[0.62rem] font-semibold tracking-wide text-white">
          <Sparkles className="size-3" />
          BEST VALUE
        </span>
      </div>

      <p className="mt-2 text-4xl font-extrabold tracking-tight">
        {formatGbp(costs.cohortMonthly)}
        <span className="text-xl font-semibold text-white/90"> /mo</span>
      </p>

      <p className="mt-1 text-sm text-white/85">
        {formatGbp(COHORT_BASE_PRICE)} base
        {extras > 0
          ? ` + ${extras} extra × ${formatGbp(COHORT_EXTRA_RESOURCE)}`
          : null}{" "}
        — flat monthly, cancel anytime
      </p>

      <div className="mt-4 rounded-lg bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/95">
        Build a dedicated specialist team at the cost of hiring 1 mid-level
        associate.
      </div>
    </div>
  );
}

function InHouseCard({
  resourceCount,
  costs,
}: {
  resourceCount: number;
  costs: CostSummary;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-4">
      <p className="text-[0.62rem] font-semibold tracking-[0.1em] text-gray-500">
        IN-HOUSE COST
      </p>
      <p className="mt-1 text-2xl font-extrabold text-gray-900">
        {formatGbp(costs.inHouseMonthly)}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        {resourceCount} × {formatGbp(costs.estSalaryMonthly)} (UK mid-level avg)
      </p>
    </div>
  );
}

function SavingsCard({ costs }: { costs: CostSummary }) {
  return (
    <div className="rounded-xl bg-gray-100 px-4 py-4">
      <p className="flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.1em] text-gray-600">
        <TrendingUp className="size-3.5" aria-hidden />
        YOU SAVE
      </p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <p className="text-2xl font-extrabold text-gray-900">
          {formatGbp(costs.savingsMonthly)}
          <span className="text-sm font-semibold text-gray-600"> /mo</span>
        </p>
        <p className="text-3xl font-extrabold text-[#2563eb]">
          {costs.savingsPercent}%
        </p>
      </div>
      <p className="mt-2 text-xs font-medium text-gray-600">
        {formatGbp(costs.savingsYearly)} per year
      </p>
    </div>
  );
}

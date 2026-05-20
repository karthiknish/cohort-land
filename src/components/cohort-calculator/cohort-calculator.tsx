"use client";

import { Minus, Plus, User } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { AreaPill } from "./area-pill";
import {
  calculateCosts,
  formatGbp,
  type TeamProfile,
} from "./calculate-savings";
import { CohortSidebar } from "./cohort-sidebar";
import {
  DEFAULT_RESOURCES,
  HELP_AREAS,
  RESOURCE_MAX,
  RESOURCE_MIN,
  UK_2026_AVERAGES,
  type HelpAreaId,
} from "./constants";
import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { StepCard } from "./step-card";

const RESOURCE_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10];

export function CohortCalculator() {
  const [selectedAreas, setSelectedAreas] = useState<HelpAreaId[]>([]);
  const [team, setTeam] = useState<TeamProfile>({
    currentStaff: UK_2026_AVERAGES.currentStaff,
    overheadPercent: UK_2026_AVERAGES.overheadPercent,
  });
  const [resourceCount, setResourceCount] = useState(DEFAULT_RESOURCES);

  const step1Complete = selectedAreas.length > 0;
  const step2Complete = step1Complete;
  const step3Complete = step2Complete;

  const costs = useMemo(
    () =>
      calculateCosts({
        areas: selectedAreas,
        team,
        resourceCount,
      }),
    [selectedAreas, team, resourceCount],
  );

  function toggleArea(id: HelpAreaId) {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  function adjustResources(delta: number) {
    setResourceCount((n) =>
      Math.min(RESOURCE_MAX, Math.max(RESOURCE_MIN, n + delta)),
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      <Hero />

      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          <FormColumn
            selectedAreas={selectedAreas}
            toggleArea={toggleArea}
            team={team}
            setTeam={setTeam}
            resourceCount={resourceCount}
            setResourceCount={setResourceCount}
            adjustResources={adjustResources}
            costs={costs}
            step1Complete={step1Complete}
            step2Complete={step2Complete}
            step3Complete={step3Complete}
          />

          <CohortSidebar
            resourceCount={resourceCount}
            costs={costs}
            step1Complete={step1Complete}
          />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function FormColumn({
  selectedAreas,
  toggleArea,
  team,
  setTeam,
  resourceCount,
  setResourceCount,
  adjustResources,
  costs,
  step1Complete,
  step2Complete,
  step3Complete,
}: {
  selectedAreas: HelpAreaId[];
  toggleArea: (id: HelpAreaId) => void;
  team: TeamProfile;
  setTeam: React.Dispatch<React.SetStateAction<TeamProfile>>;
  resourceCount: number;
  setResourceCount: (n: number) => void;
  adjustResources: (delta: number) => void;
  costs: ReturnType<typeof calculateCosts>;
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <StepCard
        step={1}
        title="Where do you need help?"
        description="Pick one or more — multi-select."
      >
        <div className="flex flex-wrap gap-2.5">
          {HELP_AREAS.map((area) => (
            <AreaPill
              key={area.id}
              areaId={area.id}
              selected={selectedAreas.includes(area.id)}
              onClick={() => toggleArea(area.id)}
            />
          ))}
        </div>
      </StepCard>

      <StepCard
        step={2}
        title="Your team profile"
        description="Tell us your real numbers, or skip to use the UK 2026 average."
        locked={!step1Complete}
        lockedLabel="STEP 2 LOCKED"
      >
        <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="current-staff"
                className="text-[0.65rem] font-semibold tracking-wide text-gray-500"
              >
                CURRENT STAFF
              </Label>
              <Input
                id="current-staff"
                type="number"
                min={0}
                placeholder="e.g. 3"
                value={team.currentStaff || ""}
                onChange={(e) =>
                  setTeam((t) => ({
                    ...t,
                    currentStaff: Number(e.target.value) || 0,
                  }))
                }
                className="h-11 bg-gray-50/80"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="overhead"
                className="text-[0.65rem] font-semibold tracking-wide text-gray-500"
              >
                OVERHEAD (%)
              </Label>
              <Input
                id="overhead"
                type="number"
                min={0}
                placeholder="e.g. 30"
                value={team.overheadPercent || ""}
                onChange={(e) =>
                  setTeam((t) => ({
                    ...t,
                    overheadPercent: Number(e.target.value) || 0,
                  }))
                }
                className="h-11 bg-gray-50/80"
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:min-w-[180px]">
            <p className="text-[0.6rem] font-semibold leading-snug tracking-wide text-gray-400">
              EST. SALARY — MID-LEVEL — PER
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatGbp(step1Complete ? costs.estSalaryMonthly : 0)}
              <span className="text-base font-semibold text-gray-500">
                {" "}
                /mo
              </span>
            </p>
          </div>
        </div>
      </StepCard>

      <StepCard
        step={3}
        title="How many resources?"
        description="Select the number of embedded specialists for your cohort."
        locked={!step2Complete}
        lockedLabel="STEP 3 LOCKED"
      >
        <ResourceSelector
          resourceCount={resourceCount}
          setResourceCount={setResourceCount}
          adjustResources={adjustResources}
          costs={costs}
          active={step2Complete}
        />
      </StepCard>

      <StepCard
        step={4}
        title="Choose your specialists"
        description="Pick a category to see experts."
        locked={!step3Complete}
        lockedLabel="STEP 4 LOCKED"
      >
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/80 px-6 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-gray-200/80 text-gray-400">
            <User className="size-6" />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Pick a category to see experts.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Choose one or more areas in Step 1.
          </p>
        </div>
      </StepCard>
    </div>
  );
}

function ResourceSelector({
  resourceCount,
  setResourceCount,
  adjustResources,
  costs,
  active,
}: {
  resourceCount: number;
  setResourceCount: (n: number) => void;
  adjustResources: (delta: number) => void;
  costs: ReturnType<typeof calculateCosts>;
  active: boolean;
}) {
  const display = active ? costs : zeroCosts();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => adjustResources(-1)}
          disabled={resourceCount <= RESOURCE_MIN}
          className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
          aria-label="Decrease resources"
        >
          <Minus className="size-4" />
        </button>
        <span className="min-w-[3rem] text-center text-5xl font-extrabold tracking-tight text-gray-900">
          {resourceCount}
        </span>
        <button
          type="button"
          onClick={() => adjustResources(1)}
          disabled={resourceCount >= RESOURCE_MAX}
          className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
          aria-label="Increase resources"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {RESOURCE_OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setResourceCount(n)}
            className={cn(
              "min-w-[2.25rem] rounded-md border px-2.5 py-1.5 text-sm font-semibold transition-colors",
              resourceCount === n
                ? "border-[#2563eb] bg-[#2563eb] text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
            )}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-gray-100 px-5 py-4">
        <p className="text-[0.65rem] font-semibold tracking-wide text-gray-500">
          YOUR COHORTS PRICE
        </p>
        <p className="mt-1 text-3xl font-bold text-gray-400">
          {formatGbp(display.cohortMonthly)}
          <span className="text-lg font-semibold"> /mo</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CostBox
          label="IN-HOUSE COST"
          value={formatGbp(display.inHouseMonthly)}
        />
        <CostBox
          label="YOU SAVE"
          value={`${formatGbp(display.savingsMonthly)} /mo`}
          sub={`${display.savingsPercent}%`}
          highlight
        />
      </div>
    </div>
  );
}

function zeroCosts() {
  return {
    inHouseMonthly: 0,
    cohortMonthly: 0,
    savingsMonthly: 0,
    savingsPercent: 0,
    estSalaryMonthly: 0,
  };
}

function CostBox({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3",
        highlight
          ? "border-blue-200 bg-blue-50"
          : "border-gray-200 bg-white",
      )}
    >
      <p className="text-[0.62rem] font-semibold tracking-wide text-gray-500">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-lg font-bold",
          highlight ? "text-blue-900" : "text-gray-400",
        )}
      >
        {value}
        {sub ? (
          <span className="ml-1 text-sm font-semibold text-blue-600">{sub}</span>
        ) : null}
      </p>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

import { ArrowRight } from "lucide-react";

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
import { Step2TeamProfile } from "./step-2-team-profile";
import { Step3Resources } from "./step-3-resources";
import { Step4Specialists } from "./step-4-specialists";
import { SPECIALISTS } from "./specialists";
import { StepCard } from "./step-card";

export function CohortCalculator() {
  const [selectedAreas, setSelectedAreas] = useState<HelpAreaId[]>([]);
  const [team, setTeam] = useState<TeamProfile>({
    currentStaff: UK_2026_AVERAGES.currentStaff,
    overheadsAnnual: UK_2026_AVERAGES.overheadsAnnual,
    useUkAverage: UK_2026_AVERAGES.useUkAverage,
  });
  const [resourceCount, setResourceCount] = useState(DEFAULT_RESOURCES);
  const [selectedSpecialistIds, setSelectedSpecialistIds] = useState<string[]>(
    [],
  );

  const step1Complete = selectedAreas.length > 0;
  const step2Complete = step1Complete;
  const step3Complete = step2Complete;

  const costs = useMemo(() => {
    const effectiveTeam = step1Complete
      ? team
      : {
          currentStaff: UK_2026_AVERAGES.currentStaff,
          overheadsAnnual: UK_2026_AVERAGES.overheadsAnnual,
          useUkAverage: true,
        };
    return calculateCosts({
      areas: selectedAreas,
      team: effectiveTeam,
      resourceCount,
      selectedSpecialistIds,
    });
  }, [selectedAreas, team, resourceCount, step1Complete, selectedSpecialistIds]);

  function toggleSpecialist(id: string) {
    setSelectedSpecialistIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function toggleArea(id: HelpAreaId) {
    setSelectedAreas((prev) => {
      const next = prev.includes(id)
        ? prev.filter((a) => a !== id)
        : [...prev, id];
      setSelectedSpecialistIds((ids) =>
        ids.filter((sid) => {
          const specialist = SPECIALISTS.find((s) => s.id === sid);
          return specialist && next.includes(specialist.areaId);
        }),
      );
      return next;
    });
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
            selectedSpecialistIds={selectedSpecialistIds}
            onToggleSpecialist={toggleSpecialist}
          />

          <CohortSidebar
            resourceCount={resourceCount}
            costs={costs}
            selectedSpecialistIds={selectedSpecialistIds}
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
  selectedSpecialistIds,
  onToggleSpecialist,
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
  selectedSpecialistIds: string[];
  onToggleSpecialist: (id: string) => void;
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
        headerAction={
          step1Complete ? (
            <button
              type="button"
              onClick={() =>
                setTeam({
                  currentStaff: UK_2026_AVERAGES.currentStaff,
                  overheadsAnnual: UK_2026_AVERAGES.overheadsAnnual,
                  useUkAverage: true,
                })
              }
              className="text-sm font-semibold text-[#2563eb] underline-offset-2 hover:underline"
            >
              Skip — use UK avg
              <ArrowRight className="ml-0.5 inline size-3.5" />
            </button>
          ) : undefined
        }
      >
        <Step2TeamProfile
          selectedAreas={selectedAreas}
          team={team}
          setTeam={setTeam}
        />
      </StepCard>

      <StepCard
        step={3}
        title="How many resources?"
        description={`Starts at ${RESOURCE_MIN}. Add more — each extra is just £1,000/mo with Cohorts.`}
      >
        <Step3Resources
          resourceCount={resourceCount}
          setResourceCount={setResourceCount}
          adjustResources={adjustResources}
          selectedAreas={selectedAreas}
          team={team}
          step1Complete={step1Complete}
          selectedSpecialistIds={selectedSpecialistIds}
        />
      </StepCard>

      <StepCard
        step={4}
        title="Choose your specialists"
        description="Optional — pick real specialists and the cost adjusts to their precise UK salary."
        locked={!step3Complete}
        lockedLabel="STEP 4 LOCKED"
      >
        <Step4Specialists
          selectedAreas={selectedAreas}
          selectedSpecialistIds={selectedSpecialistIds}
          onToggleSpecialist={onToggleSpecialist}
        />
      </StepCard>
    </div>
  );
}

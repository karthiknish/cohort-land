import type { HelpAreaId } from "./constants";
import {
  COHORT_BASE_PRICE,
  COHORT_EXTRA_RESOURCE,
  DEFAULT_RESOURCES,
} from "./constants";
import { SPECIALISTS } from "./specialists";
import { getBenchmarkForAreas } from "./uk-benchmarks";

export type TeamProfile = {
  currentStaff: number;
  /** Annual overheads in £ (employer NI, pension, benefits, tools, etc.) */
  overheadsAnnual: number | null;
  useUkAverage: boolean;
};

export function resolveMonthlyCtc(
  areas: HelpAreaId[],
  team: TeamProfile,
  selectedSpecialistIds: string[] = [],
) {
  const selectedSpecialists = SPECIALISTS.filter((s) =>
    selectedSpecialistIds.includes(s.id),
  );
  if (selectedSpecialists.length > 0) {
    return Math.round(
      selectedSpecialists.reduce((sum, s) => sum + s.salaryMonthly, 0) /
        selectedSpecialists.length,
    );
  }

  const benchmark = getBenchmarkForAreas(areas);

  if (
    team.useUkAverage ||
    team.overheadsAnnual == null ||
    team.overheadsAnnual <= 0
  ) {
    return benchmark.monthlyCtc;
  }

  const staff = Math.max(team.currentStaff, 1);
  const overheadPerPerson = team.overheadsAnnual / 12 / staff;
  return Math.round(benchmark.breakdown[0]!.monthly + overheadPerPerson);
}

export type CostSummary = {
  inHouseMonthly: number;
  cohortMonthly: number;
  savingsMonthly: number;
  savingsPercent: number;
  savingsYearly: number;
  estSalaryMonthly: number;
};

export function cohortMonthlyPrice(resourceCount: number, areaCount = 1) {
  const resources = Math.max(resourceCount, DEFAULT_RESOURCES);
  const extras = Math.max(0, resources - DEFAULT_RESOURCES);
  const areaFactor = 1 + Math.max(areaCount - 1, 0) * 0.08;
  return Math.round(
    (COHORT_BASE_PRICE + extras * COHORT_EXTRA_RESOURCE) * areaFactor,
  );
}

function cohortPriceFromSpecialists(
  resourceCount: number,
  specialistIds: string[],
  areaCount: number,
) {
  const selected = SPECIALISTS.filter((s) => specialistIds.includes(s.id));
  if (selected.length === 0) return null;

  const resources = Math.max(resourceCount, DEFAULT_RESOURCES);
  const salaries = [...selected]
    .sort((a, b) => b.salaryMonthly - a.salaryMonthly)
    .map((s) => s.salaryMonthly);

  let total = 0;
  for (let i = 0; i < resources; i++) {
    total +=
      i < salaries.length ? salaries[i]! : COHORT_EXTRA_RESOURCE;
  }

  const areaFactor = 1 + Math.max(areaCount - 1, 0) * 0.08;
  return Math.round(total * areaFactor);
}

export function calculateCosts({
  areas,
  team,
  resourceCount,
  selectedSpecialistIds = [],
}: {
  areas: HelpAreaId[];
  team: TeamProfile;
  resourceCount: number;
  selectedSpecialistIds?: string[];
}): CostSummary {
  const resources = Math.max(resourceCount, DEFAULT_RESOURCES);
  const areaCount = Math.max(areas.length, 1);

  const estSalaryMonthly = resolveMonthlyCtc(
    areas,
    team,
    selectedSpecialistIds,
  );

  const inHouseMonthly = Math.round(resources * estSalaryMonthly);

  const specialistCohort = cohortPriceFromSpecialists(
    resources,
    selectedSpecialistIds,
    areaCount,
  );
  const cohortMonthly =
    specialistCohort ?? cohortMonthlyPrice(resources, areaCount);

  const savingsMonthly = Math.max(0, inHouseMonthly - cohortMonthly);
  const savingsPercent =
    inHouseMonthly > 0
      ? Math.round((savingsMonthly / inHouseMonthly) * 100)
      : 0;

  return {
    inHouseMonthly,
    cohortMonthly,
    savingsMonthly,
    savingsPercent,
    savingsYearly: savingsMonthly * 12,
    estSalaryMonthly,
  };
}

export function formatGbp(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

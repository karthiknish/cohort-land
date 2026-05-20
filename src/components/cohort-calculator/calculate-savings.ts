import type { HelpAreaId } from "./constants";
import { UK_MID_LEVEL_MONTHLY } from "./constants";

export type TeamProfile = {
  currentStaff: number;
  overheadPercent: number;
};

export type CostSummary = {
  inHouseMonthly: number;
  cohortMonthly: number;
  savingsMonthly: number;
  savingsPercent: number;
  estSalaryMonthly: number;
};

export function calculateCosts({
  areas,
  team,
  resourceCount,
}: {
  areas: HelpAreaId[];
  team: TeamProfile;
  resourceCount: number;
}): CostSummary {
  const staff = Math.max(team.currentStaff, 0);
  const overhead = Math.max(team.overheadPercent, 0) / 100;
  const resources = Math.max(resourceCount, 1);
  const areaFactor = 1 + Math.max(areas.length - 1, 0) * 0.08;

  const estSalaryMonthly = UK_MID_LEVEL_MONTHLY;
  const inHouseMonthly = Math.round(
    staff * estSalaryMonthly * (1 + overhead),
  );
  const cohortMonthly = Math.round(resources * estSalaryMonthly * areaFactor);

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

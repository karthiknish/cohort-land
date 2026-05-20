import type { HelpAreaId } from "./constants";

export type CtcBreakdownLine = {
  label: string;
  detail: string;
  monthly: number;
};

export type AreaBenchmark = {
  categoryLabel: string;
  monthlyCtc: number;
  annualCtc: number;
  breakdown: CtcBreakdownLine[];
};

const BASE_BREAKDOWN: CtcBreakdownLine[] = [
  {
    label: "Base salary",
    detail: "~£30,000/yr",
    monthly: 2500,
  },
  {
    label: "Employer NI",
    detail: "~10%",
    monthly: 250,
  },
  {
    label: "Pension",
    detail: "3% min",
    monthly: 75,
  },
  {
    label: "Benefits & tools",
    detail: "hardware, software, training",
    monthly: 175,
  },
];

function benchmark(
  categoryLabel: string,
  monthlyCtc: number,
): AreaBenchmark {
  const scale = monthlyCtc / 3000;
  const breakdown = BASE_BREAKDOWN.map((line) => ({
    ...line,
    monthly: Math.round(line.monthly * scale),
  }));
  const breakdownSum = breakdown.reduce((s, l) => s + l.monthly, 0);
  if (breakdownSum !== monthlyCtc) {
    breakdown[0] = {
      ...breakdown[0]!,
      monthly: breakdown[0]!.monthly + (monthlyCtc - breakdownSum),
    };
  }
  return {
    categoryLabel,
    monthlyCtc,
    annualCtc: monthlyCtc * 12,
    breakdown,
  };
}

export const UK_AREA_BENCHMARKS: Record<HelpAreaId, AreaBenchmark> = {
  seo: benchmark("organic", 3000),
  perf: benchmark("performance", 3500),
  dsgn: benchmark("design", 3600),
  cnt: benchmark("content", 2900),
};

export function getBenchmarkForAreas(areas: HelpAreaId[]): AreaBenchmark {
  if (areas.length === 0) {
    return UK_AREA_BENCHMARKS.seo;
  }
  if (areas.length === 1) {
    return UK_AREA_BENCHMARKS[areas[0]!];
  }
  const monthlyCtc = Math.round(
    areas.reduce((sum, id) => sum + UK_AREA_BENCHMARKS[id].monthlyCtc, 0) /
      areas.length,
  );
  const labels = areas.map((id) => UK_AREA_BENCHMARKS[id].categoryLabel);
  return benchmark(labels.join(" & "), monthlyCtc);
}

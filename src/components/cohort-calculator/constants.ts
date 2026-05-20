export const HELP_AREAS = [
  {
    id: "perf",
    abbr: "PERF",
    label: "Performance Marketing",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-50",
  },
  {
    id: "seo",
    abbr: "SEO",
    label: "Organic & SEO",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    selectedBorder: "border-emerald-500",
    selectedBg: "bg-emerald-50",
  },
  {
    id: "dsgn",
    abbr: "DSGN",
    label: "Design",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    selectedBorder: "border-violet-500",
    selectedBg: "bg-violet-50",
  },
  {
    id: "cnt",
    abbr: "CNT",
    label: "Content",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    selectedBorder: "border-cyan-500",
    selectedBg: "bg-cyan-50",
  },
] as const;

export type HelpAreaId = (typeof HELP_AREAS)[number]["id"];

/** UK mid-level monthly salary used for in-house comparison */
export const UK_MID_LEVEL_MONTHLY = 3500;

/** Cohort flat base price for minimum team size */
export const COHORT_BASE_PRICE = 3500;

/** Price per resource above the base pack */
export const COHORT_EXTRA_RESOURCE = 1000;

export const RESOURCE_MIN = 3;
export const RESOURCE_MAX = 10;
export const DEFAULT_RESOURCES = 3;

/** Quick-pick options shown in Step 3 */
export const RESOURCE_QUICK_PICKS = [3, 4, 5, 6, 8, 10] as const;

export const UK_2026_AVERAGES = {
  currentStaff: 8,
  overheadsAnnual: null as number | null,
  useUkAverage: true,
} as const;

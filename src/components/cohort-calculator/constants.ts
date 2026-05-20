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

export const UK_MID_LEVEL_MONTHLY = 2500;

export const RESOURCE_MIN = 3;
export const RESOURCE_MAX = 10;
export const DEFAULT_RESOURCES = 3;

export const UK_2026_AVERAGES = {
  currentStaff: 3,
  overheadPercent: 30,
} as const;

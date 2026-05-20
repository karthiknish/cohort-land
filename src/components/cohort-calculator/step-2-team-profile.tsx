"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatGbp, type TeamProfile } from "./calculate-savings";
import { UK_2026_AVERAGES, type HelpAreaId } from "./constants";
import { getBenchmarkForAreas } from "./uk-benchmarks";

type Step2TeamProfileProps = {
  selectedAreas: HelpAreaId[];
  team: TeamProfile;
  setTeam: React.Dispatch<React.SetStateAction<TeamProfile>>;
};

export function Step2TeamProfile({
  selectedAreas,
  team,
  setTeam,
}: Step2TeamProfileProps) {
  const benchmark = getBenchmarkForAreas(selectedAreas);
  const hasCustomNumbers =
    !team.useUkAverage &&
    (team.currentStaff !== UK_2026_AVERAGES.currentStaff ||
      (team.overheadsAnnual != null && team.overheadsAnnual > 0));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
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
                placeholder="e.g. 8"
                value={team.currentStaff || ""}
                onChange={(e) =>
                  setTeam((t) => ({
                    ...t,
                    currentStaff: Number(e.target.value) || 0,
                    useUkAverage: false,
                  }))
                }
                className="h-11 border-gray-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="overheads"
                className="text-[0.65rem] font-semibold tracking-wide text-gray-500"
              >
                OVERHEADS (£)
              </Label>
              <Input
                id="overheads"
                type="number"
                min={0}
                placeholder="e.g. 32000"
                value={team.overheadsAnnual ?? ""}
                onChange={(e) => {
                  const raw = e.target.value;
                  setTeam((t) => ({
                    ...t,
                    overheadsAnnual: raw === "" ? null : Number(raw) || 0,
                    useUkAverage: false,
                  }));
                }}
                className="h-11 border-gray-200 bg-white"
              />
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            Based on selected category ({benchmark.categoryLabel}), the UK 2026
            cost-to-company average is{" "}
            <strong className="font-semibold text-gray-900">
              {formatGbp(benchmark.monthlyCtc)}/mo.
            </strong>{" "}
            {hasCustomNumbers
              ? "Your numbers below replace this benchmark in the live estimate."
              : "Adding your real numbers will replace this benchmark."}
          </p>
        </div>

        <SalaryBreakdownCard benchmark={benchmark} />
    </div>
  );
}

function SalaryBreakdownCard({
  benchmark,
}: {
  benchmark: ReturnType<typeof getBenchmarkForAreas>;
}) {
  return (
    <div className="rounded-xl border-2 border-gray-900 bg-white p-4 lg:min-w-[280px]">
      <p className="text-[0.6rem] font-semibold leading-snug tracking-[0.08em] text-gray-500">
        AVG SALARY · MID-LEVEL · 2026
      </p>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
        {formatGbp(benchmark.monthlyCtc)}
        <span className="text-base font-semibold text-gray-600"> /mo</span>
      </p>
      <p className="mt-0.5 text-sm text-gray-500">
        ~{formatGbp(benchmark.annualCtc)}/yr cost-to-company
      </p>

      <hr className="my-4 border-gray-200" />

      <p className="text-[0.6rem] font-semibold tracking-[0.08em] text-gray-500">
        COST-TO-COMPANY BREAKDOWN
      </p>
      <ul className="mt-3 space-y-2.5">
        {benchmark.breakdown.map((line) => (
          <li
            key={line.label}
            className="flex items-start justify-between gap-2 text-sm"
          >
            <span className="min-w-0 text-gray-600">
              <span className="font-medium text-gray-800">{line.label}</span>
              <span className="text-gray-400"> · {line.detail}</span>
            </span>
            <span className="shrink-0 font-bold text-gray-900">
              {formatGbp(line.monthly)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

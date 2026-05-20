"use client";

import { ArrowRight, TrendingUp, User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { formatGbp, type CostSummary } from "./calculate-savings";
import { COHORT_BASE_PRICE } from "./constants";
import { SPECIALISTS } from "./specialists";

type CohortSidebarProps = {
  resourceCount: number;
  costs: CostSummary;
  selectedSpecialistIds: string[];
};

export function CohortSidebar({
  resourceCount,
  costs,
  selectedSpecialistIds,
}: CohortSidebarProps) {
  const specialistsShortfall = Math.max(
    0,
    resourceCount - selectedSpecialistIds.length,
  );
  const canSubmit = specialistsShortfall === 0;

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="overflow-hidden rounded-2xl border-2 border-gray-900 bg-white shadow-md">
        <CohortSummary
          resourceCount={resourceCount}
          estSalaryMonthly={costs.estSalaryMonthly}
          selectedSpecialistIds={selectedSpecialistIds}
        />

        <div className="space-y-3 px-5 pb-5">
          <InHouseCard amount={costs.inHouseMonthly} />
          <CohortsCard amount={costs.cohortMonthly} />
          <SavingsCard costs={costs} />
        </div>

        <ProposalForm
          canSubmit={canSubmit}
          specialistsShortfall={specialistsShortfall}
        />
      </div>
    </aside>
  );
}

function CohortSummary({
  resourceCount,
  estSalaryMonthly,
  selectedSpecialistIds,
}: {
  resourceCount: number;
  estSalaryMonthly: number;
  selectedSpecialistIds: string[];
}) {
  const selectedSpecialists = SPECIALISTS.filter((s) =>
    selectedSpecialistIds.includes(s.id),
  );
  const slotWord = resourceCount === 1 ? "slot" : "slots";

  return (
    <div className="border-b border-gray-100 px-5 pb-5 pt-5">
      <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-gray-400">
        YOUR COHORT
      </p>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-5xl font-extrabold leading-none tracking-tight text-gray-900">
          {resourceCount}
        </span>
        <span className="pb-1 text-sm font-medium text-gray-500">
          resources in cohort
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Using {formatGbp(estSalaryMonthly)} (UK mid-level avg) for all{" "}
        {resourceCount} {slotWord}
      </p>

      <div className="mt-3 rounded-xl bg-slate-100 px-4 py-3.5">
        <div className="flex items-center">
          {Array.from({ length: resourceCount }).map((_, i) => {
            const specialist = selectedSpecialists[i];

            return (
              <span
                key={specialist?.id ?? `slot-${i}`}
                className={cn(
                  "relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blue-100 text-blue-500 ring-1 ring-blue-200/60",
                  i > 0 && "-ml-3",
                )}
                style={{ zIndex: resourceCount - i }}
              >
                {specialist ? (
                  <Image
                    src={specialist.image}
                    alt={specialist.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                ) : (
                  <User className="size-5" strokeWidth={2} />
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InHouseCard({ amount }: { amount: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3.5">
      <div>
        <p className="text-[0.65rem] font-semibold tracking-wide text-gray-500">
          IN-HOUSE TOTAL
        </p>
        <p className="text-xs text-gray-400">Sum of UK avg salaries</p>
      </div>
      <p className="text-2xl font-extrabold tracking-tight text-gray-900">
        {formatGbp(amount)}
      </p>
    </div>
  );
}

function CohortsCard({ amount }: { amount: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-gray-900 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-4 py-3.5 text-white">
      <div>
        <p className="text-[0.65rem] font-semibold tracking-wide text-white/85">
          COHORTS TOTAL
        </p>
        <p className="text-xs text-white/70">
          {formatGbp(COHORT_BASE_PRICE)} base
        </p>
      </div>
      <p className="text-2xl font-extrabold tracking-tight">
        {formatGbp(amount)}
        <span className="text-base font-semibold text-white/90">/mo</span>
      </p>
    </div>
  );
}

function SavingsCard({ costs }: { costs: CostSummary }) {
  return (
    <div className="flex items-center justify-between rounded-xl border-[3px] border-gray-900 bg-white px-4 py-3.5">
      <div>
        <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-[#2563eb]">
          <TrendingUp className="size-3.5" strokeWidth={2.5} aria-hidden />
          YOU SAVE
        </p>
        <p className="mt-1 text-xl font-extrabold text-gray-900">
          {formatGbp(costs.savingsMonthly)}
          <span className="text-sm font-semibold text-gray-600">/mo</span>
          <span className="text-sm font-medium text-gray-400">
            {" "}
            · {formatGbp(costs.savingsYearly)}/yr
          </span>
        </p>
      </div>
      <p className="text-4xl font-extrabold leading-none text-[#2563eb]">
        {costs.savingsPercent}%
      </p>
    </div>
  );
}

function ProposalForm({
  canSubmit,
  specialistsShortfall,
}: {
  canSubmit: boolean;
  specialistsShortfall: number;
}) {
  return (
    <form
      className="border-t border-gray-200 px-5 pb-5 pt-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-gray-400">
        GET MY PROPOSAL
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm text-gray-700">
            Your name *
          </Label>
          <Input
            id="name"
            placeholder="Jane Smith"
            className="h-10 rounded-lg border-gray-200 bg-white"
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-sm text-gray-700">
            Company *
          </Label>
          <Input
            id="company"
            placeholder="Acme Ltd"
            className="h-10 rounded-lg border-gray-200 bg-white"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <Label htmlFor="email" className="text-sm text-gray-700">
          Work email *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@company.com"
          className="h-10 rounded-lg border-gray-200 bg-white"
          autoComplete="email"
        />
      </div>

      <div className="mt-3 space-y-1.5">
        <Label htmlFor="notes" className="text-sm text-gray-700">
          Anything else? (optional)
        </Label>
        <Textarea
          id="notes"
          placeholder="Tell us about your goals..."
          className="min-h-[88px] resize-none rounded-lg border-gray-200 bg-white"
        />
      </div>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="mt-4 h-12 w-full rounded-full bg-[#2563eb] text-base font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:bg-[#1d4ed8] disabled:opacity-50"
      >
        Get my proposal
        <ArrowRight className="size-4" />
      </Button>

      {!canSubmit ? (
        <p
          className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-center text-xs font-medium leading-relaxed text-amber-800"
          role="status"
        >
          Team not full yet — add {specialistsShortfall} more specialist
          {specialistsShortfall === 1 ? "" : "s"} in Step 4 to submit.
        </p>
      ) : null}

      <p className="mt-4 text-center text-[0.65rem] leading-relaxed text-gray-400">
        By submitting, you agree to be contacted. We never share your data.
      </p>
    </form>
  );
}

"use client";

import { ArrowRight, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { formatGbp, type CostSummary } from "./calculate-savings";
import { UK_MID_LEVEL_MONTHLY } from "./constants";

type CohortSidebarProps = {
  resourceCount: number;
  costs: CostSummary;
  step1Complete: boolean;
};

export function CohortSidebar({
  resourceCount,
  costs,
  step1Complete,
}: CohortSidebarProps) {
  const display = step1Complete ? costs : zeroCosts();

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-gray-400">
          YOUR COHORT
        </p>

        <div className="mt-4 flex items-end gap-3">
          <span className="text-5xl font-extrabold leading-none tracking-tight text-gray-900">
            {resourceCount}
          </span>
          <span className="pb-1 text-sm font-medium text-gray-500">
            resources included
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Only {formatGbp(UK_MID_LEVEL_MONTHLY)} (UK mid-level avg) for all{" "}
          {resourceCount} plus:
        </p>

        <div className="mt-3 flex gap-2">
          {Array.from({ length: Math.min(resourceCount, 5) }).map((_, i) => (
            <span
              key={i}
              className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-blue-600"
            >
              <User className="size-4" strokeWidth={2} />
            </span>
          ))}
          {resourceCount > 5 ? (
            <span className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">
              +{resourceCount - 5}
            </span>
          ) : null}
        </div>

        <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-500">IN-HOUSE TOTAL</span>
            <span className="font-bold text-gray-900">
              {formatGbp(display.inHouseMonthly)}
            </span>
          </div>

          <div className="rounded-lg bg-[#2563eb] px-4 py-3 text-white">
            <p className="text-[0.65rem] font-semibold tracking-wide text-white/80">
              COHORTS TOTAL
            </p>
            <p className="mt-0.5 text-2xl font-bold">
              {formatGbp(display.cohortMonthly)}
              <span className="text-base font-semibold"> /mo</span>
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <p className="text-[0.65rem] font-semibold tracking-wide text-blue-700">
              YOU SAVE
            </p>
            <p className="mt-0.5 text-xl font-bold text-blue-900">
              {formatGbp(display.savingsMonthly)}
              <span className="text-sm font-semibold"> /mo</span>
              <span className="ml-2 text-sm font-semibold text-blue-700">
                {display.savingsPercent}%
              </span>
            </p>
          </div>
        </div>

        <ProposalForm />
      </div>
    </aside>
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

function ProposalForm() {
  return (
    <form
      className="mt-8 space-y-4 border-t border-gray-100 pt-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-gray-400">
        GET MY PROPOSAL
      </p>

      <div className="space-y-2">
        <Label htmlFor="name">Your name *</Label>
        <Input id="name" placeholder="Jane Smith" className="bg-gray-50/50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company *</Label>
        <Input id="company" placeholder="Acme Ltd" className="bg-gray-50/50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Work email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@company.com"
          className="bg-gray-50/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Anything else? (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Tell us about your goals..."
          className="min-h-[88px] resize-none bg-gray-50/50"
        />
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#2563eb] text-base font-semibold hover:bg-[#1d4ed8]"
      >
        Get my proposal
        <ArrowRight className="size-4" />
      </Button>

      <p className="text-center text-[0.65rem] leading-relaxed text-gray-400">
        We&apos;ll send a tailored proposal within 1 business day. No spam.
      </p>
    </form>
  );
}

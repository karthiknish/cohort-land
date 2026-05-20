import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#2563eb] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[40px_40px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] backdrop-blur-sm">
          <Sparkles className="size-3.5 shrink-0" strokeWidth={2.25} />
          COHORT COST CALCULATOR
        </div>

        <h1 className="mt-6 max-w-3xl text-left font-heading text-[2.5rem] font-black leading-[1.08] tracking-tight text-white md:text-[72px]">
          See exactly how much you&apos;d save with a cohort.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-[1.05rem]">
          Four quick steps. Tell us about your team, pick areas + size, and refine
          with real specialists. The savings update live.
        </p>
      </div>
    </header>
  );
}

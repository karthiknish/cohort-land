import { cn } from "@/lib/utils";

import type { HelpAreaId } from "./constants";
import { HELP_AREAS } from "./constants";

type AreaPillProps = {
  areaId: HelpAreaId;
  selected?: boolean;
  onClick?: () => void;
};

export function AreaPill({ areaId, selected, onClick }: AreaPillProps) {
  const area = HELP_AREAS.find((a) => a.id === areaId)!;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-all",
        selected
          ? cn(area.selectedBorder, area.selectedBg, "shadow-sm")
          : "border-gray-200 bg-gray-50/80 hover:border-gray-300 hover:bg-white",
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-md text-[0.6rem] font-bold tracking-wide",
          area.bg,
          area.color,
        )}
      >
        {area.abbr.slice(0, 1)}
      </span>
      <span className="font-medium text-gray-800">{area.label}</span>
    </button>
  );
}

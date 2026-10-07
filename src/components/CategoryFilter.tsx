import { useCallback, useEffect, useRef, useState } from "react";

import { PixelIcon } from "@/components/PixelIcon";
import { Button } from "@/components/ui/8bit/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/8bit/toggle-group";
import { QUOTES } from "@/data/quotes";
import { cn } from "@/lib/utils";
import { CATEGORIES, type CategoryFilter as Filter } from "@/types/quote";

const OPTIONS: Filter[] = ["All", ...CATEGORIES];
const COUNTS = Object.fromEntries(
  OPTIONS.map((c) => [c, c === "All" ? QUOTES.length : QUOTES.filter((q) => q.category === c).length]),
) as Record<Filter, number>;

interface Props {
  value: Filter;
  onChange: (value: Filter) => void;
}

/**
 * Category chips in a single row. When they don't all fit, back/next arrows
 * appear and page the row sideways (touch and trackpad scrolling still work).
 */
export function CategoryChips({ value, onChange }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ overflow: false, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ overflow: max > 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const page = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: reduce ? "auto" : "smooth" });
  };

  // Keep the selected chip in view (e.g. after picking one near the edge).
  useEffect(() => {
    const chip = scroller.current?.querySelector<HTMLElement>("[data-state=on]");
    chip?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [value]);

  const arrow = "h-10 w-10 shrink-0 bg-card px-0 text-line hover:bg-muted disabled:opacity-35";

  return (
    <div className="flex items-center gap-4 px-1.5">
      {edges.overflow && (
        <Button onClick={() => page(-1)} disabled={edges.atStart} aria-label="Show previous categories" className={arrow}>
          <PixelIcon name="arrowLeft" scale={2} />
        </Button>
      )}

      <div ref={scroller} className="no-scrollbar min-w-0 flex-1 overflow-x-auto px-1.5 py-1.5">
        <ToggleGroup
          type="single"
          aria-label="Filter quotes by category"
          variant="outline"
          value={value}
          onValueChange={(v) => v && onChange(v as Filter)}
          className={cn("retro relative mx-auto flex w-max flex-nowrap gap-4 px-1.5")}
        >
          {OPTIONS.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option}
              variant="outline"
              aria-label={`${option} (${COUNTS[option]} quotes)`}
              className={cn(
                // 8bitcn's item lets className replace its own, so restore `relative`
                // or its pixel-border overlay anchors to the page instead.
                "retro relative h-10 shrink-0 justify-between gap-2 rounded-none bg-card px-3 text-[9px] text-line",
                "hover:bg-muted hover:text-line",
                "data-[state=on]:bg-solid data-[state=on]:text-on-solid",
              )}
            >
              <span>{option.toUpperCase()}</span>
              <span className="text-[7px] opacity-60" aria-hidden="true">
                {String(COUNTS[option]).padStart(2, "0")}
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {edges.overflow && (
        <Button onClick={() => page(1)} disabled={edges.atEnd} aria-label="Show more categories" className={arrow}>
          <PixelIcon name="arrowRight" scale={2} />
        </Button>
      )}
    </div>
  );
}

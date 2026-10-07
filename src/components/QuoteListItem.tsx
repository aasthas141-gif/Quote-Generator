import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Quote } from "@/types/quote";

interface Props {
  quote: Quote;
  active: boolean;
  onSelect: (id: number) => void;
  trailing?: ReactNode;
}

export function QuoteListItem({ quote, active, onSelect, trailing }: Props) {
  return (
    <li className={cn("group relative flex items-stretch border-b-2 border-dashed border-edge/40 last:border-b-0", active && "bg-pink/10")}>
      {active && <span className="absolute inset-y-0 left-0 w-1.5 bg-pink" aria-hidden="true" />}
      <button
        type="button"
        onClick={() => onSelect(quote.id)}
        aria-current={active ? "true" : undefined}
        aria-label={`Show quote: "${quote.text}" by ${quote.author}${active ? " (currently shown)" : ""}`}
        className="min-w-0 flex-1 px-5 py-4 text-left outline-offset-[-4px] transition-colors hover:bg-muted focus-visible:outline-offset-[-4px]"
      >
        <p className="font-quote line-clamp-2 text-[17px] leading-snug text-text">“{quote.text}”</p>
        <p className="retro mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[8px] text-muted-foreground">
          <span className="text-line">{quote.author.toUpperCase()}</span>
          <span aria-hidden="true">·</span>
          <span className="text-link">{quote.category.toUpperCase()}</span>
          {active && <span className="bg-pink px-1 py-0.5 text-ink">NOW</span>}
        </p>
      </button>
      {trailing}
    </li>
  );
}

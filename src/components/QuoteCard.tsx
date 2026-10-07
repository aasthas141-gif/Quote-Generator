import type { ReactNode } from "react";

import { PixelIcon } from "@/components/PixelIcon";
import { Badge } from "@/components/ui/8bit/badge";
import { Card } from "@/components/ui/8bit/card";
import { QUOTES } from "@/data/quotes";
import { cn } from "@/lib/utils";
import type { Quote } from "@/types/quote";

interface Props {
  quote: Quote;
  poolSize: number;
  filtered: boolean;
  children: ReactNode; // control deck (action buttons)
}

export function QuoteCard({ quote, poolSize, filtered, children }: Props) {
  // Three size tiers by length; each also scales with screen height (vh) and with
  // the card's own width (cqi), so long quotes never push the buttons off-screen.
  const len = quote.text.length;
  const size =
    len > 120
      ? "text-[min(clamp(1.1rem,2vh+0.55rem,1.7rem),6.2cqi)] leading-snug"
      : len > 70
        ? "text-[min(clamp(1.3rem,2.4vh+0.7rem,1.95rem),7cqi)] leading-snug"
        : "text-[min(clamp(1.6rem,3.4vh+0.7rem,2.6rem),9cqi)] leading-tight";

  return (
    <Card font="normal" className="gap-0 bg-card py-0">
      {/* Window title bar */}
      <div className="flex items-center justify-between gap-3 bg-screen px-4 py-3 text-screen-fg">
        <span className="retro truncate text-[9px] sm:text-[10px]">QUOTE.EXE — PLAYER 1</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 bg-pink" />
          <span className="size-2.5 bg-blue" />
          <span className="size-2.5 bg-go" />
        </span>
      </div>

      {/* CRT screen */}
      <div className="p-3">
        <figure className="scanlines m-0 flex min-h-[clamp(200px,calc(100dvh-470px),420px)] flex-col @container bg-screen px-5 py-4 text-screen-fg sm:px-8 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <Badge className="bg-blue border-blue text-on-cool text-[9px]">{quote.category.toUpperCase()}</Badge>
            <span className="retro text-[8px] text-screen-fg/60 sm:text-[9px]">
              #{String(quote.id).padStart(3, "0")}/{QUOTES.length}
              {filtered && <span className="hidden sm:inline"> · POOL {poolSize}</span>}
            </span>
          </div>

          {/* key = id → replays the pixel entrance on every change */}
          <div key={quote.id} className="animate-pixel-in flex flex-1 flex-col items-center justify-center py-4 text-center">
            <PixelIcon name="quote" scale={3} className="mb-3 text-pink" />
            <blockquote className="m-0 max-w-[36ch]">
              <p
                className={cn(
                  "font-quote font-medium tracking-[-0.01em] text-balance text-screen-fg",
                  size,
                )}
              >
                {quote.text}
                <span className="animate-blink ml-1 inline-block h-[0.8em] w-[0.45em] translate-y-[0.08em] bg-pink" aria-hidden="true" />
              </p>
            </blockquote>
            <figcaption className="retro mt-5 flex items-center justify-center gap-3 text-[10px] text-pink sm:text-xs">
              <span className="inline-block h-1 w-6 bg-pink" aria-hidden="true" />
              {quote.author.toUpperCase()}
              <span className="inline-block h-1 w-6 bg-pink" aria-hidden="true" />
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Control deck */}
      <div className="border-t-4 border-dashed border-edge/40 px-4 pt-4 pb-4 sm:px-5">{children}</div>
    </Card>
  );
}

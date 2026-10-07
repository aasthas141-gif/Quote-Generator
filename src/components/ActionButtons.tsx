import { useEffect, useState } from "react";

import { KeyCap } from "@/components/KeyCap";
import { PixelIcon } from "@/components/PixelIcon";
import { Button } from "@/components/ui/8bit/button";
import { cn } from "@/lib/utils";

interface Props {
  isFavorite: boolean;
  copied: boolean;
  onNew: () => void;
  onFavorite: () => void;
  onCopy: () => void;
  onShare: () => void;
  bounceKey: number;
}

const secondary =
  "h-11 w-full bg-card px-2 text-[10px] text-line hover:bg-muted sm:text-[11px] [&>svg]:pointer-events-none";

export function ActionButtons({ isFavorite, copied, onNew, onFavorite, onCopy, onShare, bounceKey }: Props) {
  // Re-trigger the bounce only on an actual save.
  const [bouncing, setBouncing] = useState(false);
  useEffect(() => {
    if (!bounceKey) return;
    setBouncing(true);
    const t = window.setTimeout(() => setBouncing(false), 450);
    return () => window.clearTimeout(t);
  }, [bounceKey]);

  return (
    <div className="flex flex-col gap-4 px-1.5">
      <Button
        onClick={onNew}
        aria-label="Generate a new quote"
        className="group h-12 w-full gap-3 bg-pink text-sm text-ink hover:brightness-110 sm:h-14 sm:text-base"
      >
        <PixelIcon name="dice" scale={2} className="transition-transform group-active:rotate-90" />
        NEW QUOTE
        <KeyCap className="ml-2 hidden h-6 border-ink/60 bg-pink text-[8px] text-ink shadow-[0_2px_0_#111] md:inline-flex">
          SPACE
        </KeyCap>
      </Button>

      <div className="grid grid-cols-3 gap-4">
        <Button
          onClick={onFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove quote from favorites" : "Save quote to favorites"}
          className={cn(secondary, isFavorite && "bg-pink/15 hover:bg-pink/25")}
        >
          <span className={cn("inline-flex text-pink", bouncing && "animate-pixel-bounce")}>
            <PixelIcon name={isFavorite ? "heart" : "heartOutline"} scale={2} />
          </span>
          {isFavorite ? "SAVED" : "SAVE"}
        </Button>

        <Button
          onClick={onCopy}
          aria-label={copied ? "Quote copied" : "Copy quote to clipboard"}
          className={cn(secondary, copied && "bg-go text-ink hover:bg-go")}
        >
          <PixelIcon name={copied ? "check" : "copy"} scale={2} />
          {copied ? "COPIED!" : "COPY"}
        </Button>

        <Button onClick={onShare} aria-label="Share quote" className={secondary}>
          <PixelIcon name="share" scale={2} className="text-blue" />
          SHARE
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import { PixelIcon } from "@/components/PixelIcon";
import { Button } from "@/components/ui/8bit/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/8bit/dialog";
import { toast } from "@/components/ui/8bit/toast";
import { canNativeShare, copyText, formatQuote, nativeShare, shareTargets } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import type { Quote } from "@/types/quote";

interface Props {
  quote: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tile =
  "h-12 w-full justify-start gap-3 bg-card px-3 text-[9px] text-line hover:bg-muted [&_svg]:pointer-events-none";

/** Share menu: app links (always work), copy, and the device share sheet when allowed. */
export function ShareDialog({ quote, open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false);
  const [nativeBlocked, setNativeBlocked] = useState(false);
  const showNative = canNativeShare() && !nativeBlocked;

  // The dialog is opened from app state (button or shortcut), not a Radix trigger,
  // so remember what had focus and hand it back on close.
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (open) returnFocus.current = document.activeElement as HTMLElement | null;
    else setCopied(false);
  }, [open]);

  const onCopy = async () => {
    if (await copyText(formatQuote(quote))) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } else {
      toast("✕ COPY FAILED — CLIPBOARD BLOCKED");
    }
  };

  const onNative = async () => {
    const result = await nativeShare(quote);
    if (result === "shared") {
      toast("✓ SHARED!");
      onOpenChange(false);
    } else if (result === "blocked") {
      // e.g. an embedded page that isn't allowed to open the share sheet
      setNativeBlocked(true);
      toast("DEVICE SHARE IS BLOCKED HERE — PICK AN APP INSTEAD");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocus.current?.focus?.();
        }}
        className="w-[calc(100%-2.5rem)] max-w-lg gap-5 border-none bg-card p-5 text-line sm:p-6">
        <DialogHeader className="gap-2 pr-10 text-left">
          <DialogTitle className="retro text-sm text-line">SHARE QUOTE</DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Pick an app — it opens in a new tab with the quote already filled in.
          </DialogDescription>
        </DialogHeader>

        {/* Preview of exactly what gets shared */}
        <figure className="scanlines m-0 bg-screen px-4 py-4 text-screen-fg">
          <blockquote className="m-0">
            <p className="font-quote m-0 text-lg leading-snug">“{quote.text}”</p>
          </blockquote>
          <figcaption className="retro mt-3 text-[9px] text-pink">— {quote.author.toUpperCase()}</figcaption>
        </figure>

        {showNative && (
          <Button onClick={onNative} className="h-12 w-full gap-3 bg-pink text-[11px] text-ink hover:brightness-110">
            <PixelIcon name="share" scale={2} />
            SHARE FROM THIS DEVICE
          </Button>
        )}

        <ul className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-4 p-0 px-1.5" aria-label="Share to">
          {shareTargets(quote).map((t) => (
            <li key={t.id}>
              <Button asChild className={tile}>
                <a href={t.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${t.name} (opens in a new tab)`}>
                  <span className="grid h-6 min-w-6 shrink-0 place-items-center bg-solid px-1 text-[8px] text-on-solid" aria-hidden="true">
                    {t.tag}
                  </span>
                  <span className="truncate">{t.name.split(" /")[0].toUpperCase()}</span>
                </a>
              </Button>
            </li>
          ))}
          <li>
            <Button
              onClick={onCopy}
              aria-label={copied ? "Quote copied" : "Copy quote text"}
              className={cn(tile, copied && "bg-go text-ink hover:bg-go")}
            >
              <span className="grid h-6 min-w-6 shrink-0 place-items-center" aria-hidden="true">
                <PixelIcon name={copied ? "check" : "copy"} scale={2} />
              </span>
              {copied ? "COPIED!" : "COPY"}
            </Button>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

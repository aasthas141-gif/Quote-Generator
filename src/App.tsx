import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";

import { ActionButtons } from "@/components/ActionButtons";
import { Brand, SystemStatus } from "@/components/Brand";
import { CategoryChips } from "@/components/CategoryFilter";
import { Favorites } from "@/components/Favorites";
import { History } from "@/components/History";
import { QuoteCard } from "@/components/QuoteCard";
import { ShareDialog } from "@/components/ShareDialog";
import { toast } from "@/components/ui/8bit/toast";
import { QUOTES } from "@/data/quotes";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useQuotes } from "@/hooks/useQuotes";
import { copyText, formatQuote } from "@/lib/clipboard";

export default function App() {
  const q = useQuotes();
  const [copied, setCopied] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const copyTimer = useRef<number | undefined>(undefined);

  const announce = useCallback((msg: string) => {
    // Clear first so repeated identical messages are still read out.
    setAnnouncement("");
    window.requestAnimationFrame(() => setAnnouncement(msg));
  }, []);

  const handleNew = useCallback(() => {
    const next = q.generate();
    announce(`New ${next.category} quote by ${next.author}: ${next.text}`);
  }, [q, announce]);

  const handleFavorite = useCallback(
    (id?: number) => {
      const target = id ?? q.current.id;
      const saved = q.toggleFavorite(target);
      if (saved && target === q.current.id) setBounceKey((k) => k + 1);
      const msg = saved ? "♥ SAVED TO FAVORITES" : "REMOVED FROM FAVORITES";
      toast(msg); // sonner's live region announces it
    },
    [q],
  );

  const handleCopy = useCallback(async () => {
    const ok = await copyText(formatQuote(q.current));
    if (!ok) {
      toast("✕ COPY FAILED — CLIPBOARD BLOCKED");
      return;
    }
    setCopied(true);
    announce("Quote copied to clipboard");
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
  }, [q, announce]);

  const handleShare = useCallback(() => setShareOpen(true), []);

  const handleSelect = useCallback(
    (id: number) => {
      q.select(id);
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      announce("Quote loaded");
    },
    [q, announce],
  );

  useKeyboardShortcuts({ onNew: handleNew, onFavorite: () => handleFavorite(), onCopy: handleCopy });
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  return (
    <>
      <a
        href="#quote"
        className="retro sr-only z-[60] bg-solid px-4 py-3 text-[10px] text-on-solid focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        SKIP TO QUOTE
      </a>

      {/* Dashboard: stats | quote (centre, sticky) | options. Stacks below lg. */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-3 py-3 sm:px-4">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-1.5">
          <Brand />
          <SystemStatus total={QUOTES.length} />
        </header>

        <CategoryChips value={q.category} onChange={q.setCategory} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:items-start xl:grid-cols-[300px_minmax(0,1fr)_300px] 2xl:grid-cols-[340px_minmax(0,1fr)_340px] [&>*]:min-w-0">
          {/* Centre — the quote */}
          <main
            id="quote"
            tabIndex={-1}
            className="flex flex-col px-1.5 md:col-span-2 lg:sticky lg:top-4 lg:col-span-1 lg:col-start-2 lg:row-start-1"
          >
            <QuoteCard quote={q.current} poolSize={q.poolSize} filtered={q.category !== "All"}>
              <ActionButtons
                isFavorite={q.isFavorite}
                copied={copied}
                onNew={handleNew}
                onFavorite={() => handleFavorite()}
                onCopy={handleCopy}
                onShare={handleShare}
                bounceKey={bounceKey}
              />
            </QuoteCard>
          </main>

          {/* Left — history */}
          <div className="flex flex-col gap-4 px-1.5 lg:col-start-1 lg:row-start-1">
            <History
              items={q.history}
              currentId={q.current.id}
              onSelect={handleSelect}
              onClear={() => {
                q.clearHistory();
                toast("HISTORY CLEARED");
              }}
              onStart={handleNew}
            />
          </div>

          {/* Right — favorites */}
          <div className="flex flex-col gap-4 px-1.5 lg:col-start-3 lg:row-start-1">
            <Favorites
              items={q.favorites}
              currentId={q.current.id}
              onSelect={handleSelect}
              onRemove={(id) => handleFavorite(id)}
            />
          </div>
        </div>

        <footer className="retro flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2 text-[8px] text-muted-foreground">
          <span>© {new Date().getFullYear()} QUOTE.EXE</span>
          <span className="animate-press-start">INSERT COIN TO CONTINUE</span>
        </footer>
      </div>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <ShareDialog quote={q.current} open={shareOpen} onOpenChange={setShareOpen} />

      <Toaster position="bottom-center" offset={24} mobileOffset={16} toastOptions={{ duration: 2200 }} />
    </>
  );
}

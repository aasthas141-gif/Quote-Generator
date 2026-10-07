import { EmptyState } from "@/components/EmptyState";
import { Panel } from "@/components/Panel";
import { PixelIcon } from "@/components/PixelIcon";
import { QuoteListItem } from "@/components/QuoteListItem";
import { Button } from "@/components/ui/8bit/button";
import type { Quote } from "@/types/quote";

interface Props {
  items: Quote[];
  currentId: number;
  onSelect: (id: number) => void;
  onClear: () => void;
  onStart: () => void;
}

export function History({ items, currentId, onSelect, onClear, onStart }: Props) {
  return (
    <Panel
      id="history"
      title="RECENTLY VIEWED"
      shortTitle="RECENT"
      icon="clock"
      iconClass="text-blue"
      count={items.length}
      action={
        items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            aria-label="Clear history"
            className="h-8 w-8 px-0 text-muted-foreground hover:bg-muted hover:text-line"
          >
            <PixelIcon name="trash" scale={2} />
            <span className="sr-only">Clear</span>
          </Button>
        )
      }
    >
      {items.length === 0 ? (
        <EmptyState
          icon="ghost"
          iconClass="text-blue"
          title="NO HISTORY YET."
          description="Generate your first quote."
        >
          <Button onClick={onStart} className="h-10 bg-solid px-4 text-[10px] text-on-solid hover:bg-solid/85">
            <PixelIcon name="play" scale={2} />
            <span className="animate-press-start">PRESS START</span>
          </Button>
        </EmptyState>
      ) : (
        <ol className="pixel-scroll m-0 max-h-[460px] list-none overflow-y-auto p-0 lg:max-h-[calc(100dvh-230px)]" aria-label="Recently viewed quotes">
          {items.map((q) => (
            <QuoteListItem key={q.id} quote={q} active={q.id === currentId} onSelect={onSelect} />
          ))}
        </ol>
      )}
    </Panel>
  );
}

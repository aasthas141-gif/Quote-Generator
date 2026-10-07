import { EmptyState } from "@/components/EmptyState";
import { Panel } from "@/components/Panel";
import { PixelIcon } from "@/components/PixelIcon";
import { QuoteListItem } from "@/components/QuoteListItem";
import type { Quote } from "@/types/quote";

interface Props {
  items: Quote[];
  currentId: number;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function Favorites({ items, currentId, onSelect, onRemove }: Props) {
  return (
    <Panel id="favorites" title="FAVORITES" icon="heart" iconClass="text-pink" count={items.length}>
      {items.length === 0 ? (
        <EmptyState
          icon="heartOutline"
          iconClass="text-pink"
          title="NO SAVED QUOTES YET."
          description={
            <>
              Press <span className="text-pink">♥</span> to save one.
            </>
          }
        />
      ) : (
        <ul className="pixel-scroll m-0 max-h-[460px] list-none overflow-y-auto p-0 lg:max-h-[calc(100dvh-230px)]" aria-label="Saved quotes">
          {items.map((q) => (
            <QuoteListItem
              key={q.id}
              quote={q}
              active={q.id === currentId}
              onSelect={onSelect}
              trailing={
                <button
                  type="button"
                  onClick={() => onRemove(q.id)}
                  aria-label={`Remove "${q.text}" by ${q.author} from favorites`}
                  className="grid w-12 shrink-0 place-items-center text-muted-foreground transition-colors outline-offset-[-4px] hover:bg-pink hover:text-ink focus-visible:outline-offset-[-4px]"
                >
                  <PixelIcon name="close" scale={2} />
                </button>
              }
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}

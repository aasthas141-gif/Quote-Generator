import { type ReactNode, useState } from "react";

import { PixelIcon, type PixelIconName } from "@/components/PixelIcon";
import { Card } from "@/components/ui/8bit/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/8bit/collapsible";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  /** Used only in the narrow lg side column (1024–1279px). */
  shortTitle?: string;
  icon: PixelIconName;
  iconClass?: string;
  count: number;
  action?: ReactNode;
  children: ReactNode;
}

/**
 * Side panel that is always open on desktop and collapses into an
 * accordion-style section on small screens.
 */
export function Panel({ id, title, shortTitle, icon, iconClass, count, action, children }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const expanded = isDesktop || open;

  const heading = (
    <span className="flex min-w-0 items-center gap-2.5">
      <PixelIcon name={icon} scale={2} className={iconClass} />
      <span className="retro truncate text-[10px] text-line xl:text-[9px]">
        {shortTitle ? (
          <>
            <span className="lg:sr-only xl:not-sr-only">{title}</span>
            <span className="hidden lg:inline xl:hidden" aria-hidden="true">
              {shortTitle}
            </span>
          </>
        ) : (
          title
        )}
      </span>
      <span className="retro bg-solid px-1.5 py-1 text-[8px] text-on-solid">{String(count).padStart(2, "0")}</span>
    </span>
  );

  return (
    <Card font="normal" className="gap-0 bg-card py-0">
      <Collapsible open={expanded} onOpenChange={setOpen} className="flex flex-col">
        <div className="flex min-h-14 items-center justify-between gap-3 border-b-4 border-edge px-4">
          {isDesktop ? (
            <h2 id={`${id}-title`} className="m-0 min-w-0 py-3">
              {heading}
            </h2>
          ) : (
            <h2 id={`${id}-title`} className="m-0 min-w-0 flex-1">
              <CollapsibleTrigger className="flex min-h-14 w-full items-center justify-between gap-3 text-left">
                {heading}
                <PixelIcon
                  name="chevron"
                  scale={2}
                  className={cn("text-line transition-transform", open && "rotate-180")}
                />
              </CollapsibleTrigger>
            </h2>
          )}
          {action && expanded && <div className="shrink-0">{action}</div>}
        </div>
        <CollapsibleContent className="flex-1 font-body" aria-labelledby={`${id}-title`}>
          {children}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

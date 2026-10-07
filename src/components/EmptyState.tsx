import type { ReactNode } from "react";

import { PixelIcon, type PixelIconName } from "@/components/PixelIcon";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/8bit/empty";

interface Props {
  icon: PixelIconName;
  iconClass?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}

export function EmptyState({ icon, iconClass, title, description, children }: Props) {
  return (
    <Empty className="gap-4 p-6">
      <EmptyHeader className="gap-4">
        <EmptyMedia variant="icon" className="size-16 bg-muted">
          <PixelIcon name={icon} scale={4} className={iconClass} />
        </EmptyMedia>
        <EmptyTitle className="retro mt-2 text-[11px] leading-relaxed text-line">{title}</EmptyTitle>
        <EmptyDescription className="font-body text-sm text-muted-foreground">{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}

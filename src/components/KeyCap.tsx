import { Kbd } from "@/components/ui/8bit/kbd";
import { cn } from "@/lib/utils";

export function KeyCap({ children, className }: { children: string; className?: string }) {
  return (
    <Kbd
      className={cn(
        "h-7 min-w-7 rounded-none border-2 border-edge bg-card px-2 text-[9px] text-line shadow-[0_3px_0_var(--edge)]",
        className,
      )}
    >
      {children}
    </Kbd>
  );
}

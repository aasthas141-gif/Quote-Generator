import { PixelIcon } from "@/components/PixelIcon";

export function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <div
        className="grid size-11 shrink-0 place-items-center bg-pink text-ink"
        aria-hidden="true"
      >
        <PixelIcon name="quote" scale={4} />
      </div>
      <div className="min-w-0">
        <h1 className="retro m-0 text-lg leading-none tracking-tight text-line sm:text-xl">
          QUOTE<span className="text-pink">.</span>EXE
        </h1>
        <p className="m-0 mt-1.5 text-sm text-muted-foreground">A little wisdom. One pixel at a time.</p>
      </div>
    </div>
  );
}

export function SystemStatus({ total }: { total: number }) {
  return (
    <p className="retro m-0 hidden items-center gap-2 text-[8px] uppercase text-muted-foreground sm:flex">
      <span className="inline-block size-2 bg-go" aria-hidden="true" />
      SYSTEM READY · {total} QUOTES LOADED
    </p>
  );
}

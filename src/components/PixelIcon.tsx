import { cn } from "@/lib/utils";

/**
 * Tiny bitmap icon set. Each icon is drawn from a string grid where
 * "X" is a lit pixel, rendered as crisp SVG rects in currentColor.
 */
const ICONS = {
  heart: [
    " XX   XX ",
    "XXXX XXXX",
    "XXXXXXXXX",
    "XXXXXXXXX",
    " XXXXXXX ",
    "  XXXXX  ",
    "   XXX   ",
    "    X    ",
  ],
  heartOutline: [
    " XX   XX ",
    "X  X X  X",
    "X   X   X",
    "X       X",
    " X     X ",
    "  X   X  ",
    "   X X   ",
    "    X    ",
  ],
  copy: [
    "XXXXXX   ",
    "X    X   ",
    "X  XXXXXX",
    "X  X    X",
    "X  X    X",
    "XXXX    X",
    "   X    X",
    "   X    X",
    "   XXXXXX",
  ],
  share: [
    "    X    ",
    "   XXX   ",
    "  X X X  ",
    "    X    ",
    "    X    ",
    "X   X   X",
    "X       X",
    "X       X",
    "XXXXXXXXX",
  ],
  dice: [
    "XXXXXXXXX",
    "X       X",
    "X X   X X",
    "X       X",
    "X   X   X",
    "X       X",
    "X X   X X",
    "X       X",
    "XXXXXXXXX",
  ],
  check: [
    "        X",
    "       XX",
    "X     XX ",
    "XX   XX  ",
    " XX XX   ",
    "  XXX    ",
    "   X     ",
  ],
  clock: [
    "  XXXXX  ",
    " X     X ",
    "X   X   X",
    "X   X   X",
    "X   XXX X",
    "X       X",
    "X       X",
    " X     X ",
    "  XXXXX  ",
  ],
  star: [
    "    X    ",
    "    X    ",
    "   XXX   ",
    "XXXXXXXXX",
    " XXXXXXX ",
    "  XXXXX  ",
    "  XX XX  ",
    " XX   XX ",
    " X     X ",
  ],
  close: [
    "X     X",
    " X   X ",
    "  X X  ",
    "   X   ",
    "  X X  ",
    " X   X ",
    "X     X",
  ],
  chevron: ["X     X", " X   X ", "  X X  ", "   X   "],
  arrowLeft: ["   X", "  XX", " XXX", "XXXX", " XXX", "  XX", "   X"],
  arrowRight: ["X   ", "XX  ", "XXX ", "XXXX", "XXX ", "XX  ", "X   "],
  quote: ["XX  XX ", "XX  XX ", " X   X ", "X   X  "],
  ghost: [
    "  XXXXX  ",
    " XXXXXXX ",
    "XX  X  XX",
    "XX  X  XX",
    "XXXXXXXXX",
    "XXXXXXXXX",
    "XXXXXXXXX",
    "XX XXX XX",
    "X   X   X",
  ],
  coin: [
    "  XXXXX  ",
    " X     X ",
    "X  XXX  X",
    "X X     X",
    "X X     X",
    "X X     X",
    "X  XXX  X",
    " X     X ",
    "  XXXXX  ",
  ],
  sun: [
    "    X    ",
    " X     X ",
    "   XXX   ",
    "  XXXXX  ",
    "X XXXXX X",
    "  XXXXX  ",
    "   XXX   ",
    " X     X ",
    "    X    ",
  ],
  moon: [
    "   XXXX  ",
    "  XXX    ",
    " XXX     ",
    "XXX      ",
    "XXX      ",
    "XXX      ",
    " XXX    X",
    "  XXXXXX ",
    "   XXXX  ",
  ],
  play: ["X    ", "XX   ", "XXX  ", "XXXX ", "XXX  ", "XX   ", "X    "],
  trash: [
    "  XXXXX  ",
    "XXXXXXXXX",
    " X     X ",
    " X X X X ",
    " X X X X ",
    " X X X X ",
    " X     X ",
    "  XXXXX  ",
  ],
} as const;

export type PixelIconName = keyof typeof ICONS;

interface PixelIconProps {
  name: PixelIconName;
  /** Rendered size of one pixel, in px. */
  scale?: number;
  className?: string;
  title?: string;
}

export function PixelIcon({ name, scale = 2, className, title }: PixelIconProps) {
  const rows = ICONS[name];
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      style={{ width: w * scale, height: h * scale }}
      shapeRendering="crispEdges"
      fill="currentColor"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => (c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null)),
      )}
    </svg>
  );
}

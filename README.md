# QUOTE.EXE

A little wisdom. One pixel at a time.

A retro 8-bit random quote generator built with React, TypeScript, Tailwind CSS v4 and [8bitcn/ui](https://8bitcn.com).

## Run it

```bash
npm install
npm run dev          # local dev server
npm run build        # type-check + production build → dist/
npm run build:single # one self-contained HTML file → dist-single/index.html
```

## Features

- 62 curated quotes across 8 categories (sources checked; disputed "internet attributions" left out)
- New Quote never repeats the quote on screen; category filter limits the pool
- Favorites (♡ Save / ♥ Saved) and a history of the last 10 quotes, both kept in `localStorage`
- Copy (Clipboard API, with a legacy fallback)
- Share menu (8bitcn Dialog): links that open X, WhatsApp, LinkedIn, Telegram, Threads, Bluesky or Reddit with the quote pre-filled, a Copy button, and the device's own share sheet (Web Share API) when the browser allows it
- Keyboard: `SPACE` new quote · `F` favorite · `C` copy (ignored while typing; a keyboard-focused button keeps its native Space behaviour)
- Dark-only theme: 8bitcn's **Dungeon Torch** values, with the page on the same soot-brown as the panels
- Category chips in a single row across the top; when they don't all fit, pixel back/next arrows appear (disabled at either end) and swipe/trackpad scrolling still works
- Dashboard layout (from `lg`): history on the left, the quote card centred (and sticky), favorites on the right. Stacks to one column on phones.
- The quote card sizes itself to the screen: its height follows the viewport and the quote text scales with both screen height and card width, so New Quote / Save / Copy / Share stay visible without scrolling (checked from 375×667 phones to 1920×1080).
- Mobile: stacked layout, collapsible History and Favorites
- Accessibility: labelled buttons, `aria-pressed` on Save, live-region announcements, visible focus rings, reduced-motion support

## 8bitcn components used

`button`, `card`, `badge`, `kbd`, `toggle-group` (+ `toggle`), `collapsible`, `dialog`, `empty`, `toast` (sonner). Theme: 8bitcn's Dungeon Torch tokens (dark only).

They live in `src/components/ui/8bit/` with their shadcn base components in `src/components/ui/`. They were copied from the official 8bitcn repository source — the same files the CLI installs. To manage them with the CLI instead:

```bash
npx shadcn@latest init
npx shadcn@latest add @8bitcn/button   # etc.
```

Two notes on the vendored components:
- `retro.css` normally pulls *Press Start 2P* from Google Fonts with an `@import url(...)`. That import was removed; the font (plus Newsreader and Space Grotesk) is self-hosted through Fontsource instead, so the app works offline.
- 8bitcn's `DialogContent` was typed as plain `div` props; it now takes Radix's Content props so `onCloseAutoFocus` etc. type-check.
- 8bitcn's `ToggleGroupItem` lets a passed `className` replace its own classes, which drops `relative`. `CategoryFilter` adds it back so each item's pixel border stays attached to the item.

## Structure

```
src/
  components/       QuoteCard, ActionButtons, CategoryFilter, History, Favorites,
                    DashCard, KeyCap, Panel, EmptyState, PixelIcon, …
    ui/8bit/        8bitcn components
  data/quotes.ts    quote dataset
  hooks/            useLocalStorage, useQuotes, useKeyboardShortcuts, useMediaQuery
  lib/              clipboard/share helpers, cn()
  types/quote.ts
  App.tsx
```

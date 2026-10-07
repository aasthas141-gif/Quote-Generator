import type { Quote } from "@/types/quote";

export function formatQuote(quote: Quote) {
  return `"${quote.text}"\n\n— ${quote.author}`;
}

/** Clipboard API first; legacy execCommand fallback for restricted contexts. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }

  const previouslyFocused = document.activeElement as HTMLElement | null;
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    previouslyFocused?.focus?.({ preventScroll: true });
    return ok;
  } catch {
    return false;
  }
}

export type NativeShareResult = "shared" | "cancelled" | "blocked" | "unsupported";

export const canNativeShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function";

/** The device's own share sheet (Web Share API). Some embeds block it even when it exists. */
export async function nativeShare(quote: Quote): Promise<NativeShareResult> {
  if (!canNativeShare()) return "unsupported";
  try {
    await navigator.share({ title: "QUOTE.EXE", text: formatQuote(quote) });
    return "shared";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    return "blocked";
  }
}

export interface ShareTarget {
  id: string;
  name: string;
  tag: string; // short monogram shown on the tile
  href: string;
}

/**
 * Web "intent" links that open each app's composer with the quote filled in.
 * They are ordinary https links, so they work anywhere a link can open a tab —
 * including embeds that block the Web Share API.
 */
export function shareTargets(quote: Quote): ShareTarget[] {
  const line = `“${quote.text}” — ${quote.author}`;
  const t = encodeURIComponent(line);
  return [
    { id: "x", name: "X / Twitter", tag: "X", href: `https://x.com/intent/post?text=${t}` },
    { id: "whatsapp", name: "WhatsApp", tag: "WA", href: `https://wa.me/?text=${t}` },
    { id: "linkedin", name: "LinkedIn", tag: "IN", href: `https://www.linkedin.com/feed/?shareActive=true&text=${t}` },
    { id: "telegram", name: "Telegram", tag: "TG", href: `https://t.me/share/url?url=${t}` },
    { id: "threads", name: "Threads", tag: "TH", href: `https://www.threads.net/intent/post?text=${t}` },
    { id: "bluesky", name: "Bluesky", tag: "BS", href: `https://bsky.app/intent/compose?text=${t}` },
    {
      id: "reddit",
      name: "Reddit",
      tag: "RD",
      href: `https://www.reddit.com/submit?type=TEXT&title=${encodeURIComponent(line.slice(0, 300))}`,
    },
  ];
}

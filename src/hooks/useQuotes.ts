import { useCallback, useMemo, useState } from "react";

import { QUOTES, QUOTES_BY_ID } from "@/data/quotes";
import { isNumberArray, useLocalStorage } from "@/hooks/useLocalStorage";
import type { CategoryFilter, Quote } from "@/types/quote";

export const HISTORY_LIMIT = 10;

const KEYS = {
  favorites: "quote-exe:favorites",
  history: "quote-exe:history",
} as const;

function pickRandom(pool: Quote[], excludeId?: number): Quote {
  const candidates = pool.length > 1 ? pool.filter((q) => q.id !== excludeId) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

const toQuotes = (ids: number[]) =>
  ids.map((id) => QUOTES_BY_ID.get(id)).filter((q): q is Quote => Boolean(q));

export function useQuotes() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(KEYS.favorites, [], isNumberArray);
  const [historyIds, setHistoryIds] = useLocalStorage<number[]>(KEYS.history, [], isNumberArray);
  const [category, setCategoryState] = useState<CategoryFilter>("All");

  // Resume on the last viewed quote; otherwise boot with a random one
  // (the boot quote isn't "generated", so it doesn't touch history).
  const [currentId, setCurrentId] = useState<number>(() => {
    const last = historyIds.find((id) => QUOTES_BY_ID.has(id));
    return last ?? pickRandom(QUOTES).id;
  });

  const current = QUOTES_BY_ID.get(currentId) ?? QUOTES[0];
  const history = useMemo(() => toQuotes(historyIds), [historyIds]);
  const favorites = useMemo(() => toQuotes(favoriteIds), [favoriteIds]);
  const isFavorite = favoriteIds.includes(current.id);

  const poolFor = useCallback(
    (cat: CategoryFilter) => (cat === "All" ? QUOTES : QUOTES.filter((q) => q.category === cat)),
    [],
  );

  const pushHistory = useCallback(
    (id: number) =>
      setHistoryIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, HISTORY_LIMIT)),
    [setHistoryIds],
  );

  const generate = useCallback(
    (cat: CategoryFilter = category) => {
      const next = pickRandom(poolFor(cat), currentId);
      setCurrentId(next.id);
      pushHistory(next.id);
      return next;
    },
    [category, currentId, poolFor, pushHistory],
  );

  /** Switching category re-rolls when the on-screen quote doesn't belong to it. */
  const setCategory = useCallback(
    (cat: CategoryFilter) => {
      setCategoryState(cat);
      if (cat !== "All" && current.category !== cat) generate(cat);
    },
    [current.category, generate],
  );

  const select = useCallback((id: number) => {
    if (QUOTES_BY_ID.has(id)) setCurrentId(id);
  }, []);

  const toggleFavorite = useCallback(
    (id: number = current.id) => {
      const wasSaved = favoriteIds.includes(id);
      setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
      return !wasSaved;
    },
    [current.id, favoriteIds, setFavoriteIds],
  );

  const clearHistory = useCallback(() => setHistoryIds([]), [setHistoryIds]);

  return {
    current,
    category,
    setCategory,
    generate,
    select,
    history,
    clearHistory,
    favorites,
    isFavorite,
    toggleFavorite,
    poolSize: poolFor(category).length,
  };
}

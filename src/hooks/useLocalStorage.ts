import { useCallback, useEffect, useState } from "react";

function read<T>(key: string, fallback: T, validate?: (v: unknown) => v is T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * useState that mirrors its value into localStorage.
 * Survives blocked/absent storage (private mode, sandboxed iframes) by
 * falling back to in-memory state.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (v: unknown) => v is T,
) {
  const [value, setValue] = useState<T>(() => read(key, initialValue, validate));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [key, value]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(read(key, initialValue, validate));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset] as const;
}

export const isNumberArray = (v: unknown): v is number[] =>
  Array.isArray(v) && v.every((n) => typeof n === "number");

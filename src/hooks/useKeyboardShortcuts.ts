import { useEffect, useRef } from "react";

type Handlers = {
  onNew: () => void;
  onFavorite: () => void;
  onCopy: () => void;
};

const TYPING = "input, textarea, select, [contenteditable=''], [contenteditable='true']";
// Space natively activates these, so let the browser handle it there.
const ACTIVATES_ON_SPACE = "button, a[href], [role='button'], [role='radio'], [role='checkbox'], [role='switch'], summary";

export function useKeyboardShortcuts(handlers: Handlers) {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    // Track *how* the focused element got focus: browsers flip :focus-visible
    // on any keypress, so we record the modality at focus time instead.
    let lastInput: "pointer" | "keyboard" = "keyboard";
    let focusedByPointer = false;
    const onPointerDown = () => (lastInput = "pointer");
    const onFocusIn = () => (focusedByPointer = lastInput === "pointer");

    const onKeyDown = (e: KeyboardEvent) => {
      const isSpace = e.code === "Space" || e.key === " ";
      if (!isSpace && e.key !== "f" && e.key !== "F" && e.key !== "c" && e.key !== "C") {
        lastInput = "keyboard";
      }
      if (e.defaultPrevented || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      // A dialog (the share menu) owns the keyboard while it's open.
      if (document.querySelector('[role="dialog"][data-state="open"]')) return;

      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest(TYPING)) return;

      if (isSpace) {
        // A keyboard-focused control keeps native Space behaviour. A control
        // that only has focus because it was clicked shouldn't swallow the shortcut.
        const control = target?.closest(ACTIVATES_ON_SPACE);
        if (control && !focusedByPointer) return;
        e.preventDefault();
        ref.current.onNew();
        return;
      }

      switch (e.key.toLowerCase()) {
        case "f":
          e.preventDefault();
          ref.current.onFavorite();
          break;
        case "c":
          e.preventDefault();
          ref.current.onCopy();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("focusin", onFocusIn);
    };
  }, []);
}

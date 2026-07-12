"use client";

import { useEffect, useRef, useState } from "react";

export function SearchBar({
  Value,
  OnChange,
  ResultCount,
}: {
  Value: string;
  OnChange: (Value: string) => void;
  ResultCount?: number;
}) {
  const InputRef = useRef<HTMLInputElement>(null);
  const [Focused, SetFocused] = useState(false);

  useEffect(() => {
    function HandleKeyDown(Event: KeyboardEvent) {
      if (Event.key !== "/" || Event.metaKey || Event.ctrlKey || Event.altKey) {
        return;
      }

      const Active = document.activeElement;
      const InTextField =
        Active instanceof HTMLInputElement ||
        Active instanceof HTMLTextAreaElement ||
        (Active instanceof HTMLElement && Active.isContentEditable);
      if (InTextField) {
        return;
      }

      Event.preventDefault();

      InputRef.current?.focus();
      InputRef.current?.select();
    }

    window.addEventListener("keydown", HandleKeyDown);

    return () => window.removeEventListener("keydown", HandleKeyDown);
  }, []);

  const Trimmed = Value.trim();
  const HasValue = Trimmed !== "";

  const ShowShortcutHint = !Focused && !HasValue;
  const ShowResultAndClear = HasValue && ResultCount !== undefined;

  const ResultLabel =
    ResultCount !== undefined ? `${ResultCount} ${ResultCount === 1 ? "result" : "results"}` : "";

  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-dim"
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: decor */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path
            d="M10.5 10.5 L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <input
        ref={InputRef}
        type="search"
        value={Value}
        onChange={(Event) => OnChange(Event.target.value)}
        onFocus={() => SetFocused(true)}
        onBlur={() => SetFocused(false)}
        placeholder="search commands…"
        aria-label="search commands"
        aria-keyshortcuts="/"
        className="w-full border border-border bg-surface py-2.5 pl-10 pr-32 text-sm text-foreground transition-colors duration-150 placeholder:text-foreground-dim focus:border-foreground"
        style={{ borderRadius: "var(--radius)" }}
      />

      {ShowShortcutHint && (
        <kbd
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border border-border bg-background px-1.5 font-mono text-xs text-foreground-dim"
          style={{ borderRadius: "var(--radius)" }}
        >
          /
        </kbd>
      )}

      {ShowResultAndClear && (
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 animate-[fade-in_150ms_ease-out] items-center gap-3">
          <span aria-live="polite" className="font-mono text-xs text-foreground-dim">
            {ResultLabel}
          </span>
          <button
            type="button"
            onClick={() => {
              OnChange("");
              InputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="pointer-events-auto relative flex h-7 w-7 items-center justify-center border border-border bg-background text-foreground-dim transition-colors before:absolute before:-inset-2 before:content-[''] hover:border-foreground-dim hover:text-foreground"
            style={{ borderRadius: "var(--radius)" }}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: decor */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path
                d="M2 2 L8 8 M8 2 L2 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "error";

const Labels: Record<Status, string> = {
  idle: "copy command",
  copied: "copied to clipboard",
  error: "copy failed. try again.",
};

const CopiedMessages = ["copied!", "copied again!", "copied one more time!", "ok stop"];

async function CopyText(Text: string): Promise<void> {
  if (!navigator.clipboard || !window.isSecureContext) {
    throw new Error("clipboard API not available in this context");
  }

  try {
    await navigator.clipboard.writeText(Text);
  } catch (err) {
    throw new Error(`clipboard copy failed: ${err}`);
  }
}

export function CopyButton({ Text }: { Text: string }) {
  const [Status, SetStatus] = useState<Status>("idle");
  const [CopyCount, SetCopyCount] = useState(0);

  const TimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (TimeoutRef.current !== null) {
        window.clearTimeout(TimeoutRef.current);
      }
    };
  }, []);

  async function HandleCopy() {
    if (TimeoutRef.current !== null) {
      window.clearTimeout(TimeoutRef.current);
      TimeoutRef.current = null;
    }

    try {
      await CopyText(Text);

      SetStatus("copied");
      SetCopyCount((Count) => Count + 1);
    } catch {
      SetStatus("error");
    }

    TimeoutRef.current = window.setTimeout(() => {
      SetStatus("idle");
      SetCopyCount(0);

      TimeoutRef.current = null;
    }, 2000);
  }

  const ClassName =
    Status === "error"
      ? "flex shrink-0 items-center gap-1.5 border border-warning bg-background px-2.5 py-1.5 text-xs font-medium text-warning transition duration-150 active:scale-[0.97]"
      : "flex shrink-0 items-center gap-1.5 border border-foreground-dim bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition duration-150 hover:border-foreground hover:text-foreground active:scale-[0.97]";

  return (
    <button
      type="button"
      onClick={HandleCopy}
      aria-label={Labels[Status]}
      className={ClassName}
      style={{ borderRadius: "var(--radius)" }}
    >
      {Status === "copied" && (
        <>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: aria-label carrys the state */}
          <svg key={CopyCount} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M2.5 6.5 L5 9 L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={12}
              className="animate-[draw-check_250ms_ease-out_forwards]"
            />
          </svg>
          {CopiedMessages[Math.min(CopyCount - 1, CopiedMessages.length - 1)]}
        </>
      )}
      {Status === "error" && (
        <>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: aria-label carrys the state */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M6 3.75 V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="6" cy="8.25" r="0.7" fill="currentColor" />
          </svg>
          failed
        </>
      )}
      {Status === "idle" && (
        <>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: aria-label carrys the state */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <rect
              x="3.5"
              y="3.5"
              width="6"
              height="6"
              rx="0.5"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M2 8 V2 H8"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          copy
        </>
      )}
    </button>
  );
}

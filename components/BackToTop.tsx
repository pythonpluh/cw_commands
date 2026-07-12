"use client";

export function BackToTop() {
  function HandleClick() {
    window.scrollTo({ top: 0 });
    history.replaceState(null, "", "#top");
  }

  return (
    <button
      type="button"
      onClick={HandleClick}
      className="font-mono text-foreground-dim transition-colors hover:text-foreground"
    >
      back to top ↑
    </button>
  );
}

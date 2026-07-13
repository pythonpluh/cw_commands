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
      className="relative font-mono text-foreground-dim transition-colors before:absolute before:-inset-3.5 before:content-[''] hover:text-foreground"
    >
      back to top ↑
    </button>
  );
}

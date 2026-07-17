"use client";

export function BackToTop() {
  function HandleClick() {
    window.scrollTo({ top: 0 });
    history.replaceState(null, "", "#top");
  }

  return (
    <button
      type="button"
      data-cuelume-hover="tick"
      data-cuelume-toggle="page"
      onClick={HandleClick}
      className="relative font-mono text-foreground-dim underline-offset-4 transition-colors before:absolute before:-inset-3.5 before:content-[''] hover:text-foreground hover:underline"
    >
      back to top ↑
    </button>
  );
}

"use client";

import { useState } from "react";

import { useActiveSection } from "@/lib/useActiveSection";

type SidebarItem = { Id: string; Name: string; Count: number };
type HoverRect = { Top: number; Height: number };

export function CommandSidebar({ Items }: { Items: SidebarItem[] }) {
  const { Active, Select } = useActiveSection(Items.map((Item) => Item.Id));

  const [Rect, SetRect] = useState<HoverRect | null>(null);
  
  const [Hovering, SetHovering] = useState(false);
  const [Sliding, SetSliding] = useState(false);

  function HandleEnter(Event: React.MouseEvent<HTMLAnchorElement>) {
    const Target = Event.currentTarget;

    SetSliding(Hovering);

    SetRect({ Top: Target.offsetTop, Height: Target.offsetHeight });
    SetHovering(true);
  }

  return (
    <nav
      aria-label="command categories"
      className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <ul
        id="sidebar-categories"
        className="relative flex flex-col gap-0.5"
        onMouseLeave={() => SetHovering(false)}
      >
        {Rect && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 top-0 bg-surface duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              Hovering ? "opacity-100" : "opacity-0"
            } ${Sliding ? "transition-[translate,height,opacity]" : "transition-opacity"}`}
            style={{
              height: Rect.Height,
              translate: `0 ${Rect.Top}px`,
              borderRadius: "var(--radius)",
            }}
          />
        )}
        {Items.map((Item, Index) => {
          const IsActive = Active === Item.Id;
          const IndexLabel = String(Index + 1).padStart(2, "0");

          return (
            <li key={Item.Id}>
              <a
                href={`#${Item.Id}`}
                onClick={() => Select(Item.Id)}
                onMouseEnter={HandleEnter}
                aria-current={IsActive ? "true" : undefined}
                className={`relative flex items-baseline gap-3 px-3 py-2.5 text-sm transition-colors ${
                  IsActive
                    ? "bg-surface font-semibold text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden
                  className={`font-mono text-xs tabular-nums ${
                    IsActive ? "text-foreground" : "text-foreground-dim"
                  }`}
                >
                  {IndexLabel}
                </span>
                <span className="flex-1 uppercase tracking-wide">{Item.Name}</span>
                <span className="font-mono text-xs tabular-nums text-foreground-dim">
                  {Item.Count}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

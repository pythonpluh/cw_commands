"use client";

import { useActiveSection } from "@/lib/useActiveSection";

type SidebarItem = { Id: string; Name: string; Count: number };

export function CommandSidebar({ Items }: { Items: SidebarItem[] }) {
  const { Active, Select } = useActiveSection(Items.map((Item) => Item.Id));

  return (
    <nav
      aria-label="command categories"
      className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <ul id="sidebar-categories" className="flex flex-col gap-0.5">
        {Items.map((Item, Index) => {
          const IsActive = Active === Item.Id;
          const IndexLabel = String(Index + 1).padStart(2, "0");

          return (
            <li key={Item.Id}>
              <a
                href={`#${Item.Id}`}
                onClick={() => Select(Item.Id)}
                aria-current={IsActive ? "true" : undefined}
                className={`flex items-baseline gap-3 px-3 py-2 text-sm transition-colors ${
                  IsActive
                    ? "bg-surface font-semibold text-foreground"
                    : "text-foreground-muted hover:bg-surface hover:text-foreground"
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

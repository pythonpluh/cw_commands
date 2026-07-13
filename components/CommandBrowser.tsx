"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { CommandSection } from "@/components/CommandSection";
import { CommandSidebar } from "@/components/CommandSidebar";
import { RoleFilter } from "@/components/RoleFilter";
import { SearchBar } from "@/components/SearchBar";

import type { Category, Command, Role } from "@/lib/types";
import { useActiveSection } from "@/lib/useActiveSection";

function NavigateTo(Id: string) {
  document.getElementById(Id)?.scrollIntoView();
  history.replaceState(null, "", `#${Id}`);
}

function GoToTop() {
  window.scrollTo({ top: 0 });
  history.replaceState(null, "", "#top");
}

function SearchHaystack(Command: Command): string {
  const ArgFields =
    Command.Args?.flatMap((Arg) => [Arg.Label, Arg.Description, Arg.Type ?? ""]) ?? [];
  return [
    Command.Name,
    Command.Description,
    ...ArgFields,
    Command.Note ?? "",
    ...(Command.Aliases ?? []),
    ...(Command.Roles ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function CountRoles(Categories: Category[]): Record<Role, number> {
  const Counts: Record<Role, number> = {
    EVERYONE: 0,
    PS_OWNER: 0,
    ADMIN: 0,
    MOD: 0,
    DEV: 0,
  };

  for (const Category of Categories) {
    for (const Command of Category.Commands) {
      for (const RoleEntry of Command.Roles ?? []) {
        if (RoleEntry in Counts) {
          Counts[RoleEntry]++;
        }
      }
    }
  }

  return Counts;
}

export function CommandBrowser({ Categories }: { Categories: Category[] }) {
  const [Query, SetQuery] = useState("");
  const [RoleFilterValue, SetRoleFilterValue] = useState<Role[]>([]);
  const [Stuck, SetStuck] = useState(false);
  const [MobileNavOpen, SetMobileNavOpen] = useState(false);
  const [FooterVisible, SetFooterVisible] = useState(false);

  useEffect(() => {
    const Footer = document.querySelector("footer");
    if (!Footer) {
      return;
    }

    const Observer = new IntersectionObserver(([Entry]) => SetFooterVisible(Entry.isIntersecting));
    Observer.observe(Footer);

    return () => Observer.disconnect();
  }, []);

  const BarHidden = FooterVisible || !Stuck;

  useEffect(() => {
    if (BarHidden) {
      SetMobileNavOpen(false);
    }
  }, [BarHidden]);

  const PanelRef = useRef<HTMLUListElement>(null);
  const NavToggleRef = useRef<HTMLButtonElement>(null);
  const PanelWasOpenRef = useRef(false);

  useEffect(() => {
    if (MobileNavOpen) {
      PanelWasOpenRef.current = true;
      PanelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    } else if (PanelWasOpenRef.current) {
      PanelWasOpenRef.current = false;
      NavToggleRef.current?.focus();
    }
  }, [MobileNavOpen]);

  useEffect(() => {
    if (!MobileNavOpen) {
      return;
    }

    function HandleKeyDown(Event: KeyboardEvent) {
      if (Event.key === "Escape") {
        SetMobileNavOpen(false);
      }
    }

    window.addEventListener("keydown", HandleKeyDown);

    return () => window.removeEventListener("keydown", HandleKeyDown);
  }, [MobileNavOpen]);

  const SentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Sentinel = SentinelRef.current;
    if (!Sentinel) {
      return;
    }

    const Observer = new IntersectionObserver(([Entry]) => SetStuck(!Entry.isIntersecting));
    Observer.observe(Sentinel);

    return () => Observer.disconnect();
  }, []);

  const Normalized = Query.trim().toLowerCase();

  const RoleCounts = useMemo(() => CountRoles(Categories), [Categories]);

  const Filtered = useMemo(() => {
    const BySearch =
      Normalized === ""
        ? Categories
        : Categories.map((Category) => ({
            ...Category,
            Commands: Category.Commands.filter((Command) =>
              SearchHaystack(Command).includes(Normalized),
            ),
          })).filter((Category) => Category.Commands.length > 0);

    if (RoleFilterValue.length === 0) {
      return BySearch;
    }

    return BySearch.map((Category) => ({
      ...Category,
      Commands: Category.Commands.filter((Command) =>
        RoleFilterValue.some((Role) => Command.Roles?.includes(Role)),
      ),
    })).filter((Category) => Category.Commands.length > 0);
  }, [Categories, Normalized, RoleFilterValue]);

  const TotalResults = Filtered.reduce((Sum, Category) => Sum + Category.Commands.length, 0);

  const SidebarItems = useMemo(
    () =>
      Filtered.map((Category) => ({
        Id: Category.Id,
        Name: Category.Name,
        Count: Category.Commands.length,
      })),
    [Filtered],
  );

  const HasBuggedInView = useMemo(
    () => Filtered.some((Category) => Category.Commands.some((Command) => Command.Bugged)),
    [Filtered],
  );

  const { Active: ActiveCategory, Select } = useActiveSection(SidebarItems.map((Item) => Item.Id));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr] lg:gap-8">
      <CommandSidebar Items={SidebarItems} />

      <div className="min-w-0">
        <div ref={SentinelRef} aria-hidden className="h-px" />

        <div
          className={`sticky top-0 z-20 -mt-px border-b bg-background py-3 transition-colors duration-200 ${
            Stuck ? "border-border" : "border-transparent"
          }`}
        >
          <div className="flex items-center">
            <a
              href="#top"
              aria-label="back to top"
              inert={!Stuck || undefined}
              className={`hidden shrink-0 overflow-hidden transition-[width,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:block ${
                Stuck ? "w-14 opacity-100" : "w-0 opacity-0"
              }`}
            >
              <Image
                src="/assets/cw-icon.svg"
                alt=""
                width={88}
                height={62}
                className="h-7 w-auto max-w-none"
              />
            </a>
            <div className="min-w-0 flex-1">
              <SearchBar Value={Query} OnChange={SetQuery} ResultCount={TotalResults} />
            </div>
          </div>
        </div>

        <div className="mb-6 mt-3">
          <RoleFilter Value={RoleFilterValue} OnChange={SetRoleFilterValue} Counts={RoleCounts} />
        </div>

        {Filtered.length === 0 ? (
          <div className="animate-[fade-in_200ms_ease-out] border border-dashed border-border px-4 py-16 text-center">
            <p className="text-sm text-foreground">
              no commands matching{" "}
              <span className="font-mono text-foreground">&ldquo;{Query}&rdquo;</span>
              {RoleFilterValue.length > 0 && (
                <>
                  {" "}
                  for{" "}
                  <span className="font-mono text-foreground">{RoleFilterValue.join(", ")}</span>
                </>
              )}
              .
            </p>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs uppercase tracking-wider">
              {Query && (
                <button
                  type="button"
                  onClick={() => SetQuery("")}
                  className="text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  clear search
                </button>
              )}
              {RoleFilterValue.length > 0 && (
                <button
                  type="button"
                  onClick={() => SetRoleFilterValue([])}
                  className="text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  clear role filter
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {Filtered.map((Category) => (
              <CommandSection
                key={Category.Id}
                Category={Category}
                HighlightRoles={RoleFilterValue}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label="back to top"
          tabIndex={BarHidden ? -1 : undefined}
          onClick={GoToTop}
          className={`fixed bottom-5 right-5 z-20 hidden h-10 w-10 items-center justify-center border border-border bg-surface font-mono text-foreground-muted transition-[opacity,translate,scale,border-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground-dim hover:text-foreground active:scale-[0.96] lg:flex ${
            BarHidden ? "pointer-events-none translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
          style={{ borderRadius: "var(--radius)" }}
        >
          ↑
        </button>

        <div
          inert={BarHidden || undefined}
          className={`fixed inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
            BarHidden ? "translate-y-full" : "translate-y-0"
          }`}
        >
          {MobileNavOpen && (
            <div aria-hidden className="fixed inset-0" onClick={() => SetMobileNavOpen(false)} />
          )}

          <div
            className="relative flex items-stretch border-x border-t border-border bg-background"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <button
              ref={NavToggleRef}
              type="button"
              onClick={() => SetMobileNavOpen((Open) => !Open)}
              aria-expanded={MobileNavOpen}
              aria-controls={MobileNavOpen ? "mobile-category-nav" : undefined}
              className="flex flex-1 items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-foreground active:bg-surface"
            >
              categories
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: decor */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className={`shrink-0 transition-transform duration-150 ease-out ${MobileNavOpen ? "" : "rotate-180"}`}
              >
                <path
                  d="M3 5 L7 9 L11 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label="back to top"
              onClick={() => {
                GoToTop();
                SetMobileNavOpen(false);
              }}
              className="flex w-12 items-center justify-center border-l border-border font-mono text-foreground-muted transition-transform duration-150 ease-out active:scale-[0.96] active:bg-surface"
            >
              ↑
            </button>
          </div>

          {MobileNavOpen && (
            <nav
              aria-label="command categories"
              className="absolute inset-x-0 bottom-full animate-[fade-in_80ms_ease-out] border-x border-t border-border bg-background"
            >
              <ul
                ref={PanelRef}
                id="mobile-category-nav"
                className="max-h-[50vh] divide-y divide-border overflow-y-auto overscroll-contain"
              >
                {SidebarItems.length === 0 && (
                  <li className="px-4 py-3 text-sm text-foreground-dim">no categories match</li>
                )}
                {SidebarItems.map((Item, Index) => {
                  const IsActive = ActiveCategory === Item.Id;

                  return (
                    <li key={Item.Id}>
                      <a
                        href={`#${Item.Id}`}
                        aria-current={IsActive ? "true" : undefined}
                        onClick={(Event) => {
                          Event.preventDefault();
                          NavigateTo(Item.Id);
                          Select(Item.Id);
                          SetMobileNavOpen(false);
                        }}
                        className={`flex items-baseline gap-3 px-4 py-3 text-sm active:bg-surface ${
                          IsActive
                            ? "bg-surface font-semibold text-foreground"
                            : "text-foreground-muted"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`font-mono text-xs tabular-nums ${
                            IsActive ? "text-foreground" : "text-foreground-dim"
                          }`}
                        >
                          {String(Index + 1).padStart(2, "0")}
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
          )}
        </div>

        {HasBuggedInView && (
          <p className="mt-10 text-xs text-foreground-dim">
            <span className="text-warning">*</span> marked commands are known to be buggy or broken
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { play } from "cuelume";

import type { Role } from "@/lib/types";

const Options: Role[] = ["EVERYONE", "PS_OWNER", "MOD", "ADMIN", "DEV"];

export function RoleFilter({
  Value,
  OnChange,
  Counts,
}: {
  Value: Role[];
  OnChange: (Roles: Role[]) => void;
  Counts: Record<Role, number>;
}) {
  const Toggle = (Role: Role) => {
    const TurningOff = Value.includes(Role);
    play(TurningOff ? "press" : "release");
    OnChange(TurningOff ? Value.filter((Entry) => Entry !== Role) : [...Value, Role]);
  };

  return (
    <fieldset aria-label="filter commands by role" className="flex flex-wrap items-center gap-1.5">
      <span className="ml-0.5 mr-1 font-mono text-[10px] uppercase tracking-wider text-foreground-dim">
        ROLES:
      </span>
      {Options.map((Role) => {
        const IsActive = Value.includes(Role);
        const Count = Counts[Role] ?? 0;

        return (
          <label
            key={Role}
            data-cuelume-hover="tick"
            className={`flex cursor-pointer items-center gap-1.5 border px-2 py-1 font-mono text-xs transition duration-150 active:scale-[0.96] ${
              IsActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface text-foreground-muted hover:border-foreground-dim hover:text-foreground"
            }`}
            style={{ borderRadius: "var(--radius)" }}
          >
            <input
              type="checkbox"
              value={Role}
              checked={IsActive}
              onChange={() => Toggle(Role)}
              className="sr-only"
            />
            <span>{Role}</span>
            <span
              className={`tabular-nums text-[10px] ${
                IsActive ? "text-background/70" : "text-foreground-dim"
              }`}
            >
              {Count}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

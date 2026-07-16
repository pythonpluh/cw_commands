import { CopyButton } from "@/components/CopyButton";
import { CommandToText } from "@/data/commands";

import type { Command, Role } from "@/lib/types";

const RoleOrder: Role[] = ["PS_OWNER", "MOD", "ADMIN", "DEV", "EVERYONE"];

function RoleChip({ Role, Muted }: { Role: Role; Muted?: boolean }) {
  const MutedClass = Muted ? "opacity-40" : "";

  return (
    <span
      className={`border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground-muted ${MutedClass}`}
      style={{ borderRadius: "var(--radius)" }}
    >
      {Role}
    </span>
  );
}

export function CommandCard({
  Command,
  HighlightRoles,
}: {
  Command: Command;
  HighlightRoles?: Role[];
}) {
  const CopyText = CommandToText(Command);

  const SortedRoles = Command.Roles
    ? [...Command.Roles].sort((Left, Right) => RoleOrder.indexOf(Left) - RoleOrder.indexOf(Right))
    : undefined;

  const AliasesLine = Command.Aliases?.map((Alias) => `/${Alias}`).join(" · ") ?? null;

  const HasArgs = Command.Args?.length;

  return (
    <div
      className="group border border-border bg-surface px-4 py-3 transition-colors hover:border-foreground-dim/50 hover:bg-surface-hover"
      style={{ borderRadius: "var(--radius)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <code className="min-w-0 font-mono text-sm text-foreground">
          <span className="font-semibold text-foreground">{Command.Name}</span>
          {Command.Args?.map((Arg) => (
            <span key={Arg.Label} className="text-foreground-muted">
              {" "}
              {Arg.Label}
            </span>
          ))}
          {Command.Bugged && (
            <span className="text-warning" title="buggy / unreliable in this build.">
              {" "}
              *
            </span>
          )}
        </code>

        <CopyButton Text={CopyText} />
      </div>

      {AliasesLine && (
        <p className="mt-1.5 font-mono text-xs text-foreground-dim">also: {AliasesLine}</p>
      )}

      <p className="mt-2 text-sm text-foreground-muted">{Command.Description}</p>

      {HasArgs && (
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-xs sm:grid-cols-[auto_1fr]">
          {Command.Args?.map((Arg) => (
            <div key={Arg.Label} className="contents">
              <dt className="font-mono text-foreground">
                {Arg.Label}
                {Arg.Type && <span className="ml-1.5 text-foreground-dim">:{Arg.Type}</span>}
              </dt>
              <dd className="text-foreground-dim">
                <span
                  className={`mr-1 font-medium ${Arg.Required ? "text-foreground" : "text-foreground-dim"}`}
                >
                  {Arg.Required ? "required" : "optional"}
                </span>
                {Arg.Description}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {Command.Note && (
        <div className="mt-3 border border-warning/40 bg-warning/5 px-3 py-2 text-xs text-foreground-muted">
          <p>
            <span className="font-semibold text-foreground">Note:</span> {Command.Note}
          </p>
        </div>
      )}

      {SortedRoles && SortedRoles.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-dim">
            roles
          </span>
          {SortedRoles.map((Entry) => (
            <RoleChip
              key={Entry}
              Role={Entry}
              Muted={
                HighlightRoles != null &&
                HighlightRoles.length > 0 &&
                !HighlightRoles.includes(Entry)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

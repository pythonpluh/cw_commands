import { CommandCard } from "@/components/CommandCard";
import type { Category, Role } from "@/lib/types";

export function CommandSection({
  Category,
  HighlightRoles, 
}: {
  Category: Category;
  HighlightRoles?: Role[];
}) {
  const CommandCount = Category.Commands.length;
  const CountLabel = `${CommandCount} ${CommandCount === 1 ? "command" : "commands"}`;

  return (
    <section id={Category.Id} data-section={Category.Id}>
      <div className="mb-4 flex items-baseline gap-3 border-b border-border pb-2">
        <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">
          {Category.Name}
        </h2>
        <span className="text-xs text-foreground-dim">{CountLabel}</span>
      </div>

      {Category.Blurb && <p className="mb-4 text-sm text-foreground-muted">{Category.Blurb}</p>}

      <div className="flex flex-col gap-2.5">
        {Category.Commands.map((Command) => (
          <CommandCard key={Command.Name} Command={Command} HighlightRoles={HighlightRoles} />
        ))}
      </div>
    </section>
  );
}

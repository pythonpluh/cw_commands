import Image from "next/image";

import { CommandBrowser } from "@/components/CommandBrowser";
import { SiteFooter } from "@/components/SiteFooter";
import { Categories } from "@/data/commands";

export default function Home() {
  const TotalCommands = Categories.reduce((Sum, Category) => Sum + Category.Commands.length, 0);

  return (
    <div id="top" className="flex min-h-screen flex-col bg-background">
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:py-14">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-30 focus:border focus:border-foreground focus:bg-background focus:px-3 focus:py-1.5 focus:text-sm focus:font-semibold focus:text-foreground"
          style={{ borderRadius: "var(--radius)" }}
        >
          skip to commands
        </a>

        <header className="mb-4 flex flex-col items-center border-b border-border pb-6 text-center sm:mb-10 sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-7 sm:border-b-0 sm:pb-0 sm:text-left">
          <Image
            src="/assets/cw-icon.svg"
            alt=""
            width={88}
            height={62}
            priority
            className="h-16 w-auto shrink-0 sm:row-span-4 sm:self-center sm:h-24 lg:h-28"
          />

          <h1 className="mt-4 min-w-0 text-4xl font-extrabold uppercase tracking-tight text-foreground sm:-ml-[0.03em] sm:mt-0 sm:text-5xl lg:text-6xl">
            commands
          </h1>

          <div aria-hidden className="mt-3 hidden h-px bg-border sm:col-start-2 sm:block" />

          <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-foreground-dim sm:col-start-2 sm:text-xs">
            <span className="tabular-nums text-foreground-muted">{TotalCommands}</span> commands
            <span aria-hidden> · </span>
            <span className="tabular-nums text-foreground-muted">{Categories.length}</span>{" "}
            categories
          </p>

          <p className="mt-3 max-w-2xl text-sm text-foreground-muted sm:col-start-2">
            complete list of all combat warriors commands with all the information you need about
            them
          </p>
        </header>

        <CommandBrowser Categories={Categories} />
      </main>

      <SiteFooter />
    </div>
  );
}

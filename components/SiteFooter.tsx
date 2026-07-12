import Image from "next/image";
import { BackToTop } from "@/components/BackToTop";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-row flex-wrap items-center justify-between gap-3 px-5 py-8 text-xs">
        <p className="flex flex-wrap items-center gap-x-1.5 text-foreground-dim">
          <span>not affiliated with </span>
          <Image
            src="/assets/noctovo-logo.svg"
            alt="NOCTOVO logo"
            width={36}
            height={18}
            className="h-3 w-auto opacity-80"
          />
        </p>

        <BackToTop />
      </div>
    </footer>
  );
}

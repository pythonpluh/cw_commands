"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(Ids: string[]) {
  const [Active, SetActive] = useState<string>(Ids[0] ?? "");

  const PausedUntilRef = useRef(0);

  const IdsKey = Ids.join(",");

  useEffect(() => {
    const Entries = IdsKey.split(",")
      .filter(Boolean)
      .flatMap((Id) => {
        const Element = document.getElementById(Id);
        return Element ? [{ Element, Id }] : [];
      });
    if (Entries.length === 0) {
      return;
    }

    let RafId: number | null = null;

    const ComputeActive = () => {
      const ViewportCenter = window.innerHeight / 2;

      let BestId = Entries[0].Id;
      let BestDistance = Infinity;

      for (const { Element, Id } of Entries) {
        const Rect = Element.getBoundingClientRect();
        const Distance = Math.abs(Rect.top + Rect.height / 2 - ViewportCenter);

        if (Distance < BestDistance) {
          BestDistance = Distance;
          BestId = Id;
        }
      }

      SetActive(BestId);
    };

    const OnScroll = () => {
      if (RafId !== null) {
        return;
      }

      if (Date.now() < PausedUntilRef.current) {
        return;
      }

      RafId = window.requestAnimationFrame(() => {
        ComputeActive();
        RafId = null;
      });
    };

    ComputeActive();

    window.addEventListener("scroll", OnScroll, { passive: true });
    window.addEventListener("resize", ComputeActive);

    return () => {
      window.removeEventListener("scroll", OnScroll);
      window.removeEventListener("resize", ComputeActive);

      if (RafId !== null) {
        window.cancelAnimationFrame(RafId);
      }
    };
  }, [IdsKey]);

  const Select = (Id: string) => {
    PausedUntilRef.current = Date.now() + 800;
    SetActive(Id);
  };

  return { Active, Select };
}

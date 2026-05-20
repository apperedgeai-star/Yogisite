"use client";

import { useEffect } from "react";
import { loadGsap } from "@/lib/gsap-loader";
import { isTouchDevice } from "@/lib/device";

/**
 * GSAP magnetic pull for `.magnetic` elements (spec: 0.42 strength).
 */
export function useMagneticElements(enabled: boolean) {
  useEffect(() => {
    if (!enabled || isTouchDevice()) return;

    let gsapInstance: typeof import("gsap").gsap | null = null;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (!cancelled) gsapInstance = gsap;
    });

    const onMove = (e: MouseEvent) => {
      if (!gsapInstance) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".magnetic");
      if (!el) return;

      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);

      gsapInstance.to(el, {
        x: relX * 0.42,
        y: relY * 0.42,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = (e: MouseEvent) => {
      if (!gsapInstance) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".magnetic");
      if (!el) return;

      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;

      gsapInstance.to(el, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: "elastic.out(1.1, 0.35)",
        overwrite: "auto",
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onLeave);

    return () => {
      cancelled = true;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [enabled]);
}

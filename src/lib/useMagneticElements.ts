"use client";

import { useEffect } from "react";
import { isTouchDevice, lerp } from "@/lib/utils";

const STRENGTH = 0.42;
const LERP_FACTOR = 0.15;

/**
 * Magnetic pull for `.magnetic` elements — transform only, rAF lerp (no GSAP).
 */
export function useMagneticElements(enabled: boolean) {
  useEffect(() => {
    if (!enabled || isTouchDevice()) return;

    const targets = new Map<HTMLElement, { x: number; y: number }>();
    const currents = new Map<HTMLElement, { x: number; y: number }>();
    let rafId = 0;

    const tick = () => {
      targets.forEach((target, el) => {
        const current = currents.get(el) ?? { x: 0, y: 0 };
        current.x = lerp(current.x, target.x, LERP_FACTOR);
        current.y = lerp(current.y, target.y, LERP_FACTOR);
        currents.set(el, current);
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".magnetic");
      if (!el) return;

      const r = el.getBoundingClientRect();
      targets.set(el, {
        x: (e.clientX - (r.left + r.width / 2)) * STRENGTH,
        y: (e.clientY - (r.top + r.height / 2)) * STRENGTH,
      });
    };

    const onLeave = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".magnetic");
      if (!el) return;

      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;

      targets.set(el, { x: 0, y: 0 });
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeave);
      targets.forEach((_, el) => {
        el.style.transform = "";
      });
      targets.clear();
      currents.clear();
    };
  }, [enabled]);
}

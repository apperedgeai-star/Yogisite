"use client";

import { useEffect } from "react";
import { isTouchDevice, lerp } from "@/lib/utils";

const STRENGTH = 0.42;
const STRONG_STRENGTH = 0.55;
const LERP_FACTOR = 0.15;
const SPRING_LERP = 0.12;

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
        const factor = el.classList.contains("magnetic-strong")
          ? SPRING_LERP
          : LERP_FACTOR;
        current.x = lerp(current.x, target.x, factor);
        current.y = lerp(current.y, target.y, factor);
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
      const strength = el.classList.contains("magnetic-strong")
        ? STRONG_STRENGTH
        : STRENGTH;
      const max = el.classList.contains("magnetic-strong") ? 40 : Infinity;
      let x = (e.clientX - (r.left + r.width / 2)) * strength;
      let y = (e.clientY - (r.top + r.height / 2)) * strength;
      if (max < Infinity) {
        x = Math.max(-max, Math.min(max, x));
        y = Math.max(-max, Math.min(max, y));
      }
      targets.set(el, { x, y });
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

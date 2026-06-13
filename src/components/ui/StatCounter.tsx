"use client";

import { useEffect, useRef, useState } from "react";
import { animateNumber } from "@/lib/animate-number";
import { prefersReducedMotion } from "@/lib/utils";

type StatCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** When set, animates numeric portion then appends affixes (e.g. 50 → "50M+") */
  format?: (n: number) => string;
};

function finalDisplay(
  value: number,
  prefix: string,
  suffix: string,
  format?: (n: number) => string
) {
  return format ? format(value) : `${prefix}${value}${suffix}`;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  format,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion()
      ? finalDisplay(value, prefix, suffix, format)
      : finalDisplay(0, prefix, suffix, format)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelAnim: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      if (cancelled || animated.current) return;
      animated.current = true;

      if (prefersReducedMotion()) {
        setDisplay(finalDisplay(value, prefix, suffix, format));
        return;
      }

      setDisplay(finalDisplay(0, prefix, suffix, format));
      cancelAnim = animateNumber({
        to: value,
        durationMs: 2200,
        onUpdate: (n) => {
          const rounded = Math.round(n);
          setDisplay(finalDisplay(rounded, prefix, suffix, format));
        },
        onComplete: () => {
          setDisplay(finalDisplay(value, prefix, suffix, format));
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
        }
      },
      { threshold: 0.12, rootMargin: "80px 0px -10% 0px" }
    );

    observer.observe(el);
    const fallback = window.setTimeout(start, 700);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(fallback);
      cancelAnim?.();
    };
  }, [value, prefix, suffix, format]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center py-2 text-center lg:items-start lg:py-0 lg:text-left"
    >
      <p className="problem-stat-number">{display}</p>
      <p className="problem-stat-label">{label}</p>
    </div>
  );
}

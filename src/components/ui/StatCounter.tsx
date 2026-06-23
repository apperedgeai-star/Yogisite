"use client";

import { useEffect, useRef, useState } from "react";
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

    let cancelled = false;

    const start = () => {
      if (cancelled || animated.current) return;
      animated.current = true;

      if (prefersReducedMotion()) {
        setDisplay(finalDisplay(value, prefix, suffix, format));
        return;
      }

      const counter = { val: 0 };
      import("animejs").then(({ animate }) => {
        if (cancelled) return;
        animate(counter, {
          val: value,
          duration: 1800,
          easing: "easeOutExpo",
          update: () => {
            setDisplay(finalDisplay(Math.round(counter.val), prefix, suffix, format));
          },
          complete: () => {
            setDisplay(finalDisplay(value, prefix, suffix, format));
          },
        });
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

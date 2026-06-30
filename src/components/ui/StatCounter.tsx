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
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(() => finalDisplay(0, prefix, suffix, format));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let animation: { cancel?: () => void; pause?: () => void } | undefined;

    const start = async () => {
      if (cancelled || hasAnimated.current) return;
      hasAnimated.current = true;

      if (prefersReducedMotion()) {
        setDisplay(finalDisplay(value, prefix, suffix, format));
        return;
      }

      const counter = { val: 0 };
      setDisplay(finalDisplay(0, prefix, suffix, format));

      const { animate } = await import("animejs");
      if (cancelled) return;

      animation = animate(counter, {
        val: value,
        duration: 2200,
        easing: "easeOutExpo",
        update: () => {
          setDisplay(finalDisplay(Math.round(counter.val), prefix, suffix, format));
        },
        complete: () => {
          setDisplay(finalDisplay(value, prefix, suffix, format));
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      animation?.cancel?.();
      animation?.pause?.();
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

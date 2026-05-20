"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  format,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -5% 0px" });
  const [display, setDisplay] = useState(() =>
    format ? format(0) : `${prefix}0${suffix}`
  );
  const animated = useRef(false);

  useEffect(() => {
    const run = () => {
      if (animated.current) return;
      animated.current = true;

      if (prefersReducedMotion()) {
        setDisplay(format ? format(value) : `${prefix}${value}${suffix}`);
        return;
      }

      const cancel = animateNumber({
        to: value,
        durationMs: 2000,
        onUpdate: (n) => {
          const rounded = Math.round(n);
          setDisplay(
            format ? format(rounded) : `${prefix}${rounded}${suffix}`
          );
        },
      });

      return cancel;
    };

    if (inView) {
      return run();
    }

    const fallback = window.setTimeout(() => {
      if (!animated.current && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          run();
        }
      }
    }, 400);

    return () => window.clearTimeout(fallback);
  }, [inView, value, prefix, suffix, format]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center px-4 py-6 text-center md:items-start md:px-8 md:py-0 md:text-left"
    >
      <p className="problem-stat-number">{display}</p>
      <p className="problem-stat-label">{label}</p>
    </div>
  );
}

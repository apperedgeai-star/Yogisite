"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type StatCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
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

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
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

    let frame = 0;
    let cancelled = false;

    const animate = () => {
      if (cancelled || hasAnimated.current) return;
      hasAnimated.current = true;

      if (prefersReducedMotion()) {
        setDisplay(finalDisplay(value, prefix, suffix, format));
        return;
      }

      const duration = 2200;
      const startTime = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const progress = easeOutExpo(Math.min((now - startTime) / duration, 1));
        const current = Math.round(value * progress);
        setDisplay(finalDisplay(current, prefix, suffix, format));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(finalDisplay(value, prefix, suffix, format));
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);

    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        animate();
        observer.disconnect();
      }
    };

    checkVisible();
    requestAnimationFrame(checkVisible);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
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

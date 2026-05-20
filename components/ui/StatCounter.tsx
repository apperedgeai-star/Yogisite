"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { loadGsap } from "@/lib/gsap-loader";
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
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(() =>
    format ? format(0) : `${prefix}0${suffix}`
  );
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current) return;
    animated.current = true;

    if (prefersReducedMotion()) {
      setDisplay(format ? format(value) : `${prefix}${value}${suffix}`);
      return;
    }

    loadGsap().then(({ gsap }) => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => {
          const rounded = Math.round(counter.n);
          setDisplay(
            format ? format(rounded) : `${prefix}${rounded}${suffix}`
          );
        },
      });
    });
  }, [inView, value, prefix, suffix, format]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center px-4 py-6 text-center md:items-start md:px-8 md:py-0 md:text-left"
    >
      <p
        className="font-editorial font-normal text-gold-300"
        style={{ fontSize: "var(--text-3xl)", lineHeight: 1 }}
      >
        {display}
      </p>
      <p
        className="mt-3 font-satoshi text-muted"
        style={{ fontSize: "var(--text-sm)" }}
      >
        {label}
      </p>
    </div>
  );
}

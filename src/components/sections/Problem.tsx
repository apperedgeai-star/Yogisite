"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { isMobileViewport } from "@/lib/utils";
import { StatCounter } from "@/components/ui/StatCounter";
import { useGsapScope } from "@/hooks/useGsapScope";
import { cn, prefersReducedMotion } from "@/lib/utils";

const FloatingDiamond = dynamic(
  () =>
    import("@/components/canvas/FloatingDiamond").then((m) => m.FloatingDiamond),
  { ssr: false }
);

const STATS = [
  {
    value: 125,
    label: "Views Delivered and counting…",
    format: (n: number) => `${n}M+`,
  },
  { value: 3, suffix: "+", label: "National Brands" },
  { value: 10, suffix: "+", label: "A-List Creators" },
  {
    value: 2000,
    prefix: "$",
    label: "or $1000 w/o distribution",
    format: (n: number) => `$${n.toLocaleString()}`,
  },
] as const;

const STATEMENT_WARM = [
  "Your business is great.",
  "Your product works.",
  "Your clients love you.",
  "But online —",
];

export default function Problem() {
  const [showDiamond, setShowDiamond] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setShowDiamond(!isMobileViewport());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const punchlineRef = useRef<HTMLSpanElement>(null);

  useGsapScope(
    sectionRef,
    ({ gsap }) => {
      const lines = [
        ...lineRefs.current.filter(Boolean),
        punchlineRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (prefersReducedMotion()) {
        gsap.set(lines, { clearProps: "all", opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      gsap.from(lines, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="section-surface section-surface--problem section-padding relative z-content overflow-hidden"
    >
      {showDiamond && <FloatingDiamond />}

      <div className="relative z-content mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                i >= 2 && "border-t border-[var(--b1)]",
                (i === 1 || i === 3) && "border-l border-[var(--b1)]",
                i > 0 && "md:border-l md:border-t-0",
                i === 0 && "md:border-0"
              )}
            >
              <StatCounter
                value={stat.value}
                label={stat.label}
                {...("format" in stat && stat.format
                  ? { format: stat.format }
                  : {
                      suffix: "suffix" in stat ? stat.suffix : undefined,
                      prefix: "prefix" in stat ? stat.prefix : undefined,
                    })}
              />
            </div>
          ))}
        </div>

        <div
          ref={statementRef}
          className="mx-auto mt-20 max-w-4xl text-center md:mt-28"
        >
          {STATEMENT_WARM.map((line, i) => (
            <div key={line} className="overflow-hidden py-1">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="type-subhead block text-primary opacity-0"
              >
                {line}
              </span>
            </div>
          ))}

          <div className="overflow-hidden py-1">
            <span
              ref={punchlineRef}
              className="type-section block italic text-gold-300 opacity-0"
              style={{ transformOrigin: "bottom center" }}
            >
              you are invisible.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

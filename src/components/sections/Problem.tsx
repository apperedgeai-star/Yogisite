"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { StatCounter } from "@/components/ui/StatCounter";
import { cn, prefersReducedMotion } from "@/lib/utils";

const STATS = [
  {
    value: 125,
    label: "Views delivered",
    format: (n: number) => `${n}M+`,
  },
  { value: 3, suffix: "+", label: "National brands" },
  { value: 10, suffix: "+", label: "A-list creators" },
  {
    value: 2000,
    prefix: "$",
    label: "From / 4 weeks",
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
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
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
        gsap.set(lines, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.from(lines, {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 80%",
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
      className="section-surface section-surface--problem section-padding relative z-content"
    >
      <div className="mx-auto max-w-7xl">
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "stat-cell",
                i % 2 === 1 && "border-l border-[var(--b1)]",
                i >= 2 && "border-t border-[var(--b1)] lg:border-t-0",
                i > 0 && "lg:border-l lg:border-t-0"
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
          className="mx-auto mt-16 max-w-3xl text-center md:mt-24"
        >
          {STATEMENT_WARM.map((line, i) => (
            <div key={line} className="overflow-hidden py-0.5">
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

          <div className="overflow-hidden py-0.5">
            <span
              ref={punchlineRef}
              className="type-section block italic text-gold-300 opacity-0"
            >
              you are invisible.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

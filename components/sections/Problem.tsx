"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { StatCounter } from "@/components/ui/StatCounter";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";

const FloatingDiamond = dynamic(
  () =>
    import("@/components/canvas/FloatingDiamond").then((m) => m.FloatingDiamond),
  { ssr: false }
);

const STATS = [
  {
    value: 50,
    label: "Views Delivered",
    format: (n: number) => `${n}M+`,
  },
  { value: 3, suffix: "+", label: "National Brands" },
  { value: 10, suffix: "+", label: "A-List Creators" },
  {
    value: 2,
    prefix: "₹",
    suffix: "L",
    label: "vs ₹4-6L Market Rate",
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
        gsap.set(lines, { clearProps: "all", opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      gsap.from(lines, {
        y: 80,
        rotateX: 10,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        transformOrigin: "bottom center",
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
      className="section-padding relative z-content overflow-hidden bg-deep"
    >
      <FloatingDiamond />

      <div className="relative z-content mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i > 0
                  ? "border-t border-[var(--border-subtle)] md:border-l md:border-t-0"
                  : ""
              }
            >
              <StatCounter
                value={stat.value}
                label={stat.label}
                {...("format" in stat
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
                className="block font-editorial font-normal text-primary opacity-0"
                style={{
                  fontSize: "clamp(28px, 4vw, 56px)",
                  lineHeight: 1.05,
                }}
              >
                {line}
              </span>
            </div>
          ))}

          <div className="overflow-hidden py-1">
            <span
              ref={punchlineRef}
              className="block font-editorial italic text-gold-300 opacity-0"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: 1.05,
                transformOrigin: "bottom center",
              }}
            >
              you are invisible.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

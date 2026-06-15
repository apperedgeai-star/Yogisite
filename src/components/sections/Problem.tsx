"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { StatCounter } from "@/components/ui/StatCounter";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { prefersReducedMotion } from "@/lib/utils";

const STATS = [
  { value: 125, label: "Views delivered", format: (n: number) => `${n}M+` },
  { value: 3, suffix: "+", label: "National brands" },
  { value: 10, suffix: "+", label: "A-list creators" },
  { value: 2000, prefix: "$", label: "From / 4 weeks", format: (n: number) => `$${n.toLocaleString()}` },
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
      const lines = [...lineRefs.current.filter(Boolean), punchlineRef.current].filter(Boolean) as HTMLElement[];
      if (prefersReducedMotion()) {
        gsap.set(lines, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }
      gsap.from(lines, {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: statementRef.current, start: "top 82%", once: true },
      });
    },
    []
  );

  return (
    <Section id="problem" tone="deep" border className="problem-section" ref={sectionRef as never}>
      <SiteGrid>
        <Col span={12}>
          <div className="stats-band">
            {STATS.map((stat) => (
              <div key={stat.label} className="stats-band__cell">
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
        </Col>

        <Col span={12} spanLg={8} className="lg:col-start-3">
          <div ref={statementRef} className="pt-4 text-center lg:pt-8">
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
              <span ref={punchlineRef} className="type-section block italic text-gold-300 opacity-0">
                you are invisible.
              </span>
            </div>
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}

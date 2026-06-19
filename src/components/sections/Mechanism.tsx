"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { DistributionDiagram } from "@/components/ui/DistributionDiagram";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { MECHANISM_ITEMS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

const OTHERS_ITEMS = [
  "Post on 1 page",
  "Hope algorithm picks it",
  "Charge ₹4–6 Lakh/month",
  "Zero distribution plan",
  "You remain invisible",
] as const;

export default function Mechanism() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapScope(
    sectionRef,
    ({ gsap }) => {
      if (prefersReducedMotion()) return;
      const panels = gsap.utils.toArray<HTMLElement>(".mechanism-panel");
      if (!panels.length) return;
      gsap.from(panels, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
    },
    []
  );

  return (
    <Section id="mechanism" tone="elevated" ref={sectionRef}>
      <SiteGrid className="items-start">
        <Col span={12} spanLg={5} className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            label="The mechanism"
            title="Distribution is the new king."
            description="Everyone posts. Almost no one owns distribution. That's the gap we engineer closed."
          />
          <div className="mt-8 grid gap-4">
            <div className="mechanism-panel surface-card p-5">
              <p className="type-label mb-4 text-[var(--t3)]">What others do</p>
              <ul className="space-y-3">
                {OTHERS_ITEMS.map((item) => (
                  <li key={item} className="mechanism-item">
                    <span className="mechanism-item-icon text-red-400" aria-hidden>
                      ✗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mechanism-panel surface-card border-[var(--b-gold)] p-5">
              <p className="type-label mb-4">What we do</p>
              <ul className="space-y-3">
                {MECHANISM_ITEMS.map((item) => (
                  <li key={item} className="mechanism-item">
                    <span className="mechanism-item-icon text-gold-300" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>

        <Col span={12} spanLg={7}>
          <div className="mechanism-panel surface-card p-4 md:p-6">
            <DistributionDiagram />
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}
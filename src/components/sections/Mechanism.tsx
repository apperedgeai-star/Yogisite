"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import NodeDiagram from "@/components/NodeDiagram";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { MECHANISM_ITEMS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

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
            label="What we do"
            title={
              <>
                <span className="block">22 touchpoints.</span>
                <span className="block text-gold-300">One authority.</span>
              </>
            }
          />
          <ul className="mt-8 space-y-3.5 border-t border-[var(--b1)] pt-8">
            {MECHANISM_ITEMS.map((item) => (
              <li key={item} className="mechanism-item">
                <span className="mechanism-item-icon text-gold-300" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Col>

        <Col span={12} spanLg={7}>
          <div className="mechanism-panel surface-card p-4 md:p-6">
            <NodeDiagram />
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}

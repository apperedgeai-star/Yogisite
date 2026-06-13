"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { NetworkDiagram } from "@/components/ui/NetworkDiagram";
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
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="mechanism"
      className="section-surface section-surface--mechanism section-padding relative z-content pb-24 md:pb-0"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[22vh] lg:z-sticky lg:self-start">
          <p className="type-label mb-4">What we do</p>
          <h2 className="type-section text-primary">
            <span className="block">22 touchpoints.</span>
            <span className="block text-gold-300">One authority.</span>
          </h2>
          <ul className="mt-8 space-y-4">
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

        <div className="mechanism-panel mechanism-diagram-wrap">
          <NetworkDiagram />
        </div>
      </div>
    </section>
  );
}

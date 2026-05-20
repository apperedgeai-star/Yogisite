"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { NetworkDiagram } from "@/components/ui/NetworkDiagram";
import { prefersReducedMotion } from "@/lib/utils";

const OTHERS_ITEMS = [
  "Post on 1 page",
  "Hope algorithm picks it",
  "Charge ₹4–6 Lakh/month",
  "Zero distribution plan",
  "You remain invisible",
];

const OUR_ITEMS = [
  "1 main page + 9 distribution",
  "Multi-platform every day",
  "₹2 Lakh/month (half the market)",
  "50K followers — guaranteed",
  "You become the authority",
];

export default function Mechanism() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapScope(
    sectionRef,
    ({ gsap }) => {
      if (prefersReducedMotion()) return;
      const column = sectionRef.current?.querySelector(".mechanism-compare");
      const panels = gsap.utils.toArray<HTMLElement>(".mechanism-panel");
      if (!column || !panels.length) return;

      gsap.from(panels, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: column,
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
      className="section-surface section-surface--mechanism section-padding relative z-content"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[22vh] lg:z-sticky lg:self-start">
          <p className="type-label mb-4">The Mechanism</p>
          <h2 className="type-section text-primary">
            <span className="block">Distribution</span>
            <span className="block">is the</span>
            <span className="block text-gold-300">new king.</span>
          </h2>
          <p className="type-body mt-5 max-w-xs text-muted">
            Everyone posts. Almost no one owns distribution. That&apos;s the gap
            we engineer closed.
          </p>
        </div>

        <div>
        <div className="mechanism-compare mechanism-panel">
          <article className="mechanism-card--others">
            <p className="type-label mb-4 text-red-300">What Others Do</p>
            <ul>
              {OTHERS_ITEMS.map((item) => (
                <li key={item} className="mechanism-item">
                  <span className="mechanism-item-icon text-red-400" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="mechanism-card--ours">
            <p className="type-label mb-4">What We Do</p>
            <ul>
              {OUR_ITEMS.map((item) => (
                <li key={item} className="mechanism-item">
                  <span className="mechanism-item-icon text-gold-300" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mechanism-panel mt-6">
          <NetworkDiagram />
        </div>
        </div>
      </div>
    </section>
  );
}

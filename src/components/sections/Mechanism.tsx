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
      const column = sectionRef.current?.querySelector(".mechanism-panels");
      const panels = gsap.utils.toArray<HTMLElement>(".mechanism-panel");
      if (!column || !panels.length) return;

      gsap.set(panels, { opacity: 1, y: 0 });
      gsap.from(panels, {
        y: 40,
        opacity: 0,
        duration: 0.75,
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
      className="section-padding relative z-content bg-void"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[22vh] lg:z-sticky lg:self-start">
          <p className="mb-4 font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
            The Mechanism
          </p>
          <h2
            className="font-editorial font-normal text-primary"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.95 }}
          >
            <span className="block">Distribution</span>
            <span className="block">is the</span>
            <span className="block text-gold-300">new king.</span>
          </h2>
          <p className="mt-5 max-w-xs font-satoshi text-sm leading-relaxed text-muted md:text-base">
            Everyone makes content. Nobody asks where it goes after it&apos;s
            made.
          </p>
        </div>

        <div className="mechanism-panels flex flex-col gap-5">
          <article className="mechanism-panel min-h-[180px] rounded-2xl border border-red-500/35 bg-red-950/40 p-6 backdrop-blur-sm md:p-8">
            <p className="mb-2 font-satoshi text-[10px] font-medium uppercase tracking-[0.35em] text-red-300">
              What Others Do
            </p>
            <div className="mb-5 h-px w-full bg-red-400/35" />
            <ul className="space-y-2.5 font-satoshi text-sm text-secondary">
              {OTHERS_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="shrink-0 text-red-400" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="mechanism-panel min-h-[180px] rounded-2xl border border-gold-300/35 bg-gold-500/12 p-6 backdrop-blur-sm md:p-8">
            <p className="mb-2 font-satoshi text-[10px] font-medium uppercase tracking-[0.35em] text-gold-300">
              What We Do
            </p>
            <div className="mb-5 h-px w-full bg-gold-300/35" />
            <ul className="space-y-2.5 font-satoshi text-sm text-secondary">
              {OUR_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="shrink-0 text-gold-300" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="mechanism-panel">
            <NetworkDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

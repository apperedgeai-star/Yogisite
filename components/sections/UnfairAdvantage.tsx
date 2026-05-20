"use client";

import { useRef } from "react";
import { DistributionNetwork } from "@/components/sections/DistributionNetwork";
import { useGsapScope } from "@/hooks/useGsapScope";
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

export default function UnfairAdvantage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapScope(
    sectionRef,
    ({ gsap }) => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".advantage-panel").forEach((panel) => {
        gsap.from(panel, {
          y: 56,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="advantage"
      className="section-padding relative z-content bg-void"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[30vh] lg:z-sticky lg:self-start">
          <p className="mb-6 font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
            The Mechanism
          </p>
          <h2
            className="font-editorial font-normal text-primary"
            style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.9 }}
          >
            <span className="block">Distribution</span>
            <span className="block">is the</span>
            <span className="block">new king.</span>
          </h2>
          <p className="mt-6 max-w-xs font-satoshi text-base leading-relaxed text-muted">
            Everyone makes content.
            <br />
            Nobody asks where it goes
            <br />
            after it&apos;s made.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <article className="advantage-panel rounded-2xl border border-red-500/20 bg-red-950/25 p-8 backdrop-blur-sm">
            <p className="mb-2 font-satoshi text-[10px] uppercase tracking-[0.35em] text-red-300/80">
              What Others Do
            </p>
            <div className="mb-6 h-px w-full bg-red-400/25" />
            <ul className="space-y-3 font-satoshi text-sm text-secondary">
              {OTHERS_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-red-400" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="advantage-panel rounded-2xl border border-gold-300/25 bg-gold-500/10 p-8 backdrop-blur-sm">
            <p className="mb-2 font-satoshi text-[10px] uppercase tracking-[0.35em] text-gold-300">
              What We Do
            </p>
            <div className="mb-6 h-px w-full bg-gold-300/30" />
            <ul className="space-y-3 font-satoshi text-sm text-secondary">
              {OUR_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold-300" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="advantage-panel rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 backdrop-blur-sm md:p-8">
            <DistributionNetwork />
          </article>
        </div>
      </div>
    </section>
  );
}

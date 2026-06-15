"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { SiteGrid } from "@/components/layout/Section";

const HEADLINE_LINES = ["We make", "founders", "famous."];
const SUB_LINES = [
  "Your competitor is less skilled.",
  "But they're more visible.",
  "We close the distribution gap.",
];
const PROOF_LINE = "125M+ views · Vision11 · Starbucks · Rapido";

type HeroProps = {
  ready?: boolean;
};

export default function Hero({ ready = true }: HeroProps) {
  const reduced = prefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const show = ready || reduced;

  useGsapScope(
    heroRef,
    ({ gsap }) => {
      if (prefersReducedMotion() || !headlineRef.current) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })
        .to(headlineRef.current, { opacity: 0.12, y: -32, ease: "none" })
        .to(subtextRef.current, { opacity: 0, ease: "none" }, "<");
    },
    [ready]
  );

  return (
    <section ref={heroRef} id="hero" className="hero-section relative z-content border-0">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <HeroVideo className="opacity-[0.22] md:opacity-[0.28]" />
        <div className="hero-media-glow absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="site-container relative z-10">
        <SiteGrid>
          <motion.div
            className="hero-content"
            initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-eyebrow mb-6">Personal · Business Branding &amp; Distribution</p>

            <h1 ref={headlineRef} className="hero-headline">
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div ref={subtextRef} className="mt-after-headline max-w-md space-y-1.5">
              {SUB_LINES.map((line) => (
                <p key={line} className="hero-subtext">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-before-cta flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary hoverable tap-target w-full sm:w-auto"
              >
                Book a Call →
              </a>
              <a
                href={SITE.seeOurWork}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary hoverable tap-target w-full sm:w-auto"
              >
                See Our Work
              </a>
            </div>

            <p className="hero-proof hero-proof--bright mt-10">{PROOF_LINE}</p>
          </motion.div>
        </SiteGrid>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { HERO_VIDEO } from "@/lib/videos";

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
        .to(headlineRef.current, { opacity: 0.15, y: -24, ease: "none" })
        .to(subtextRef.current, { opacity: 0, ease: "none" }, "<");
    },
    [ready]
  );

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <LazyVideo
          src={HERO_VIDEO}
          eager
          pauseWhenHidden={false}
          className="h-full w-full object-cover opacity-[0.18] md:opacity-[0.22]"
        />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-3xl lg:max-w-4xl"
        initial={false}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="hero-eyebrow mb-5 md:mb-6">
          Personal · Business Branding &amp; Distribution
        </p>

        <h1 ref={headlineRef} className="hero-headline">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div ref={subtextRef} className="mt-after-headline max-w-md space-y-1">
          {SUB_LINES.map((line) => (
            <p key={line} className="hero-subtext">
              {line}
            </p>
          ))}
        </div>

        <div className="mt-before-cta flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center">
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

        <p className="hero-proof mt-8 md:mt-10">{PROOF_LINE}</p>
      </motion.div>
    </section>
  );
}

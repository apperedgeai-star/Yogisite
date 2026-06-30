"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { HeroVideoCard } from "@/components/ui/HeroVideoCard";
import { Col, SiteGrid } from "@/components/layout/Section";

const HEADLINE_LINES = ["We make", "founders", "famous."];
const SUB_LINES = [
  "Your competitor is less skilled.",
  "But they're more visible.",
  "We close the distribution gap.",
];
const PROOF_LINE = "125M+ VIEWS · VISION11 · STARBUCKS · RAPIDO";

type HeroProps = {
  ready?: boolean;
};

export default function Hero({ ready = true }: HeroProps) {
  const reduced = prefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const show = ready || reduced;

  useGsapScope(
    heroRef,
    ({ gsap }) => {
      if (prefersReducedMotion() || !headlineRef.current) return;
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        opacity: 0.15,
        y: -24,
        ease: "none",
      });
    },
    [ready]
  );

  useEffect(() => {
    if (!show || reduced) return;

    let cancelled = false;
    import("animejs").then(({ createTimeline }) => {
      if (cancelled) return;
      document.querySelectorAll(".hero-reveal").forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
      });
      const tl = createTimeline();
      tl
        .add(".hero-label", { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: "outExpo" })
        .add(".hero-title", { opacity: [0, 1], translateY: [40, 0], duration: 800, ease: "outExpo" }, "+=0")
        .add(".hero-subtitle", { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: "outExpo" }, "-=400")
        .add(".hero-buttons", { opacity: [0, 1], translateY: [20, 0], duration: 500, ease: "outExpo" }, "-=300")
        .add(".hero-statbar", { opacity: [0, 1], duration: 500, ease: "outExpo" }, "-=200");
    });

    return () => {
      cancelled = true;
    };
  }, [show, reduced]);

  return (
    <section ref={heroRef} id="hero" className="hero-section hero-section--card">
      <div className="site-container relative z-10">
        <SiteGrid className="hero-grid items-center">
          <Col span={12} spanLg={6} className="hero-grid__copy">
            <motion.div
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="hero-eyebrow hero-label hero-reveal will-animate mb-5 md:mb-6">
                Personal · Business Branding &amp; Distribution
              </p>

              <h1 ref={headlineRef} className="hero-headline hero-title hero-reveal will-animate">
                {HEADLINE_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <div className="hero-subtitle hero-reveal will-animate mt-after-headline max-w-md space-y-1.5">
                {SUB_LINES.map((line) => (
                  <p key={line} className="hero-subtext">
                    {line}
                  </p>
                ))}
              </div>

              <div className="hero-buttons hero-reveal will-animate mt-before-cta flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  className="hero-cta-secondary hoverable tap-target w-full sm:w-auto"
                >
                  See Our Work
                </a>
              </div>

              <div className="hero-proof-ticker hero-statbar hero-reveal will-animate mt-8 md:mt-10" aria-label={PROOF_LINE}>
                <div className="hero-proof-ticker__track" aria-hidden>
                  <span>{PROOF_LINE}</span>
                  <span>{PROOF_LINE}</span>
                </div>
              </div>
            </motion.div>
          </Col>

          <Col span={12} spanLg={6} className="hero-grid__media">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hero-video-card-wrap"
            >
              <HeroVideoCard />
            </motion.div>
          </Col>
        </SiteGrid>
      </div>
    </section>
  );
}

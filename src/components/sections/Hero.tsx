"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { HeroVideoCard } from "@/components/ui/HeroVideoCard";
import { Col, SiteGrid } from "@/components/layout/Section";
import { animateNumber } from "@/lib/animate-number";

const HEADLINE_WORDS = ["We", "make", "founders", "famous."];
const SUB_LINES = [
  "Your competitor is less skilled.",
  "But they're more visible.",
  "The gap is distribution. We close it.",
];

type HeroProps = {
  ready?: boolean;
};

export default function Hero({ ready = true }: HeroProps) {
  const reduced = prefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [views, setViews] = useState(reduced ? 125 : 0);
  const show = ready || reduced;

  useEffect(() => {
    if (reduced) {
      setViews(125);
      return;
    }

    return animateNumber({
      to: 125,
      durationMs: 2200,
      onUpdate: (value) => setViews(Math.round(value)),
    });
  }, [reduced]);

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
              <p className="hero-eyebrow mb-5 md:mb-6" style={{ willChange: "transform" }}>
                {SITE.tagline}
              </p>

              <h1 ref={headlineRef} className="hero-headline">
                {HEADLINE_WORDS.map((word, index) => (
                  <motion.span
                    key={word}
                    className="mr-[0.18em] inline-block"
                    initial={reduced ? false : { opacity: 0, y: 40 }}
                    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: reduced ? 0 : 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ willChange: "transform" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <div className="mt-after-headline max-w-md space-y-1.5">
                {SUB_LINES.map((line) => (
                  <p key={line} className="hero-subtext">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-before-cta flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-primary hoverable tap-target w-full sm:w-auto"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ willChange: "transform" }}
                >
                  See Our Work
                </motion.a>
                <motion.a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-secondary hoverable tap-target w-full sm:w-auto"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ willChange: "transform" }}
                >
                  Claim Your Spot →
                </motion.a>
              </div>

              <p className="hero-proof hero-proof--bright mt-8 md:mt-10" style={{ willChange: "transform" }}>
                {views}M+ Views Delivered and counting….
              </p>
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
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { SCROLL_SCRUB_MIN } from "@/lib/gsap-config";
import { useGsapReady } from "@/providers/LenisProvider";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { HERO_VIDEO } from "@/lib/videos";

const HEADLINE_LINES = ["We make", "founders", "famous."];
const SUB_LINES = [
  "Your competitor is less skilled.",
  "But they're more visible.",
  "The gap is distribution. We close it.",
];
const PROOF_LINE =
  "125M+ Views Delivered and counting… · Vision11 · Starbucks · Rapido";

const REVEAL_Y = 24;
const REVEAL_DURATION = 0.65;
const REVEAL_EASE = [0.25, 0.1, 0.25, 1] as const;
const STAGGER = 0.12;

type HeroProps = {
  ready?: boolean;
};

export default function Hero({ ready = false }: HeroProps) {
  const gsapReady = useGsapReady();
  const reduced = prefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  const animate = ready && !reduced;
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
          scrub: SCROLL_SCRUB_MIN,
        },
      })
        .to(headlineRef.current, {
          scale: 1.04,
          opacity: 0,
          ease: "none",
        })
        .to(subtextRef.current, { opacity: 0, ease: "none" }, "<0.15");
    },
    [gsapReady],
    gsapReady && ready
  );

  const fade = (delay: number) => ({
    initial: false as const,
    animate: show ? { y: 0, opacity: 1 } : { y: REVEAL_Y, opacity: 0 },
    transition: {
      duration: reduced ? 0 : REVEAL_DURATION,
      delay: reduced ? 0 : animate ? delay : 0,
      ease: REVEAL_EASE,
    },
  });

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <LazyVideo
          src={HERO_VIDEO}
          eager
          pauseWhenHidden={false}
          className="h-full w-full object-cover opacity-[0.22] md:opacity-[0.28]"
        />
      </div>

      <motion.div
        className="hero-bg-fallback pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 1.2 }}
      />

      <div className="hero-grain pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <motion.div
        className="hero-glow pointer-events-none absolute inset-0 z-[3]"
        aria-hidden
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 1.6, delay: reduced ? 0 : 0.3 }}
      />
      <div className="hero-vignette pointer-events-none absolute inset-0 z-[4]" aria-hidden />

      <motion.div
        className="relative z-10 w-full max-w-3xl md:max-w-4xl"
        {...fade(0)}
      >
        <p className="hero-eyebrow mb-6">
          Personal · Business Branding &amp; Distribution Agency
        </p>

        <h1 ref={headlineRef} className="hero-headline">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-0.5">
              <motion.span
                className="block"
                initial={false}
                animate={show ? { y: "0%" } : { y: "100%" }}
                transition={{
                  duration: reduced ? 0 : REVEAL_DURATION,
                  delay: reduced ? 0 : animate ? i * STAGGER : 0,
                  ease: REVEAL_EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          ref={subtextRef}
          className="mt-after-headline max-w-md space-y-1"
          {...fade(STAGGER * 3)}
        >
          {SUB_LINES.map((line) => (
            <p key={line} className="hero-subtext">
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="mt-before-cta flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center"
          {...fade(STAGGER * 4)}
        >
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary magnetic hoverable tap-target w-full cursor-pointer sm:w-auto"
          >
            Claim Your Spot →
          </a>
          <a
            href={SITE.seeOurWork}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-secondary hoverable tap-target min-h-[44px] w-full cursor-pointer sm:w-auto"
          >
            See Our Work
          </a>
        </motion.div>

        <motion.hr
          className="hero-divider mt-10 hidden md:mt-12 md:block"
          aria-hidden
          {...fade(STAGGER * 5)}
        />

        <motion.p
          className="hero-proof hero-proof--bright mt-6 md:mt-8"
          {...fade(STAGGER * 5 + 0.04)}
        >
          {PROOF_LINE}
        </motion.p>
      </motion.div>
    </section>
  );
}

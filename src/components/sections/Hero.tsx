"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { useGsapReady } from "@/providers/LenisProvider";

const HEADLINE_LINES = ["We make", "founders", "famous."];
const SUB_LINES = [
  "Your competitor is less skilled.",
  "But they're more visible.",
  "The gap is distribution. We close it.",
];
const LINE_DELAYS = [0.25, 0.38, 0.51];
const LINE_EASE = [0.76, 0, 0.24, 1] as const;

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
          scrub: 1,
        },
      })
        .to(headlineRef.current, {
          scale: 1.08,
          opacity: 0,
          ease: "none",
        })
        .to(subtextRef.current, { opacity: 0, ease: "none" }, "<0.15");
    },
    [gsapReady],
    gsapReady && ready
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-[max(5.5rem,env(safe-area-inset-top))] md:pb-28 md:pt-28"
      style={{ paddingInline: 20 }}
    >
      {/* Mobile — CSS ambient only (no portrait / WebGL) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(212, 168, 67, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(212, 168, 67, 0.04) 0%, transparent 60%),
            var(--void)
          `,
        }}
      />

      {/* Desktop — portrait + ambient */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block"
        aria-hidden
      >
        <Image
          src={ASSETS.portrait}
          alt=""
          fill
          priority
          className="object-cover object-[75%_25%] opacity-[0.28]"
          sizes="50vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 75% 35%, rgba(212, 168, 67, 0.06) 0%, transparent 55%),
              linear-gradient(105deg, var(--void) 0%, transparent 48%, rgba(3, 3, 3, 0.4) 100%)
            `,
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background: `
            linear-gradient(90deg, var(--void) 0%, var(--void) 42%, transparent 72%),
            radial-gradient(ellipse 70% 80% at 50% 50%,
              rgba(3, 3, 3, 0.15) 0%,
              rgba(3, 3, 3, 0.75) 70%,
              rgba(3, 3, 3, 0.98) 100%)
          `,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.p
          className="mb-6 font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.45em",
            color: "var(--g300)",
          }}
          initial={false}
          animate={show ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : animate ? 0.1 : 0,
          }}
        >
          Personal Branding & Distribution
        </motion.p>

        <h1
          ref={headlineRef}
          className="font-editorial font-normal"
          style={{
            fontSize: "clamp(58px, 11vw, 140px)",
            lineHeight: 0.9,
            color: "var(--t1)",
            transformOrigin: "left center",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-0.5">
              <motion.span
                className="block"
                initial={false}
                animate={show ? { y: "0%" } : { y: "100%" }}
                transition={{
                  duration: reduced ? 0 : 0.85,
                  delay: reduced ? 0 : animate ? LINE_DELAYS[i] : 0,
                  ease: LINE_EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          ref={subtextRef}
          className="mt-6 max-w-md space-y-1"
          initial={false}
          animate={show ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : animate ? 0.68 : 0,
          }}
        >
          {SUB_LINES.map((line) => (
            <p
              key={line}
              className="block font-satoshi"
              style={{
                fontSize: "var(--f-base)",
                color: "var(--t2)",
                lineHeight: 1.5,
              }}
            >
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex w-full max-w-md flex-col gap-4 md:max-w-none md:flex-row md:items-center"
          initial={false}
          animate={show ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : animate ? 0.85 : 0,
          }}
        >
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic hoverable tap-target flex min-h-[48px] w-full items-center justify-center rounded-full px-8 py-4 font-satoshi font-semibold tracking-wide transition-[transform,background-color] duration-300 active:scale-[0.98] md:w-auto md:hover:scale-[1.02]"
            style={{
              fontSize: 13,
              background: SITE.gold,
              color: "#000000",
            }}
          >
            Claim Your Spot →
          </a>
          <a
            href="#how-it-works"
            className="hoverable tap-target flex min-h-[44px] w-full items-center justify-center font-satoshi font-medium underline underline-offset-4 transition-colors md:w-auto md:rounded-full md:border md:px-8 md:py-4 md:font-semibold md:no-underline"
            style={{
              fontSize: 13,
              color: "var(--t2)",
            }}
          >
            Watch How It Works
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-10"
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : animate ? 1.3 : 0,
        }}
      >
        <span
          className="font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.4em",
            color: "var(--t3)",
          }}
        >
          Scroll
        </span>
        <span className="hero-scroll-line block h-12 w-px origin-top bg-[var(--g300)]/50" />
      </motion.div>
    </section>
  );
}


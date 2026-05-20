"use client";

import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";
import { useGsapReady } from "@/providers/SmoothScrollProvider";

const HEADLINE_LINES = ["We make", "founders", "famous."];

type HeroProps = {
  ready?: boolean;
};

export default function Hero({ ready = true }: HeroProps) {
  const gsapReady = useGsapReady();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGsapScope(
    heroRef,
    ({ gsap }) => {
      const reduced = prefersReducedMotion();
      if (reduced) {
        gsap.set(
          [
            labelRef.current,
            ...lineRefs.current,
            subtextRef.current,
            ctaRef.current,
            scrollIndRef.current,
          ],
          { clearProps: "all", opacity: 1, y: 0, rotateX: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (labelRef.current) {
        tl.from(labelRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.1);
      }
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        tl.from(
          line,
          {
            y: 80,
            rotateX: 12,
            opacity: 0,
            duration: 1,
            transformOrigin: "bottom center",
          },
          0.25 + i * 0.13
        );
      });
      if (subtextRef.current) {
        tl.from(subtextRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.7);
      }
      if (ctaRef.current) {
        tl.from(ctaRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.9);
      }
      if (scrollIndRef.current) {
        tl.from(scrollIndRef.current, { opacity: 0, duration: 0.6 }, 1.4);
      }
    },
    [ready, gsapReady],
    ready && gsapReady
  );

  useGsapScope(
    heroRef,
    ({ gsap }) => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      tl.to(headlineRef.current, {
        scale: 1.12,
        opacity: 0,
        y: -80,
        ease: "none",
      }).to(subtextRef.current, { opacity: 0, y: -40, ease: "none" }, "<0.1");
    },
    [gsapReady],
    gsapReady && !prefersReducedMotion()
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-content flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-28 pt-28 md:px-12 lg:px-20"
    >
      {/* Layer 3 — radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(200, 169, 110, 0.07) 0%, transparent 55%), radial-gradient(ellipse at center, transparent 35%, rgba(3, 3, 3, 0.92) 100%)",
        }}
      />

      {/* Layer 4 — noise grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Layer 2 — gold line */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-px bg-gold-300/60"
        aria-hidden
      />

      {/* Layer 5 — content */}
      <div className="relative z-[4] max-w-5xl">
        <p
          ref={labelRef}
          className="mb-8 font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300 opacity-0"
        >
          Personal Branding & Distribution
        </p>

        <h1
          ref={headlineRef}
          className="font-editorial font-normal text-primary"
          style={{
            fontSize: "var(--text-hero)",
            lineHeight: 0.92,
            transformOrigin: "center center",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-0.5">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block opacity-0"
                style={{ transformOrigin: "bottom center" }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          ref={subtextRef}
          className="mt-8 max-w-lg font-satoshi text-lg leading-relaxed text-secondary opacity-0"
        >
          <p>Your competitor is less skilled.</p>
          <p>But they&apos;re more visible.</p>
          <p className="text-primary/80">
            The gap is distribution. We close it.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="mt-12 flex flex-col gap-4 opacity-0 sm:flex-row sm:items-center"
        >
          <MagneticButton href="https://topmate.io/techieyogi">
            Claim Your Spot →
          </MagneticButton>
          <MagneticButton href="#how-it-works" variant="ghost">
            <span className="mr-2 text-gold-300" aria-hidden>
              ○
            </span>
            Watch How It Works
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-10 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="font-satoshi text-[10px] uppercase tracking-[0.4em] text-muted">
          Scroll
        </span>
        <span className="hero-scroll-line block h-12 w-px origin-top bg-gold-300/50" />
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const rm18Ref = useRef<HTMLDivElement>(null);

  useGsapScope(
    footerRef,
    ({ gsap }) => {
      if (!rm18Ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        rm18Ref.current,
        { y: 80 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    },
    [],
    !prefersReducedMotion()
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-content bg-void pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      {/* Top gradient edge */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold-300) 50%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Part 1 — CTA */}
      <div className="relative overflow-hidden px-6 py-32 text-center md:py-40">
        <div
          ref={rm18Ref}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-editorial font-normal text-primary"
          style={{
            fontSize: "20vw",
            lineHeight: 0.85,
            opacity: 0.04,
          }}
          aria-hidden
        >
          RM18
        </div>

        <div className="relative z-[1] mx-auto flex max-w-2xl flex-col items-center">
          <p className="mb-10 font-satoshi text-[11px] uppercase tracking-[0.35em] text-gold-300">
            Ready to become the authority?
          </p>

          <a
            href="https://topmate.io/techieyogi"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic interactive footer-cta flex h-[220px] w-[220px] flex-col items-center justify-center rounded-full border border-gold-300 text-center font-editorial text-primary transition-[color,background,box-shadow] duration-500"
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              lineHeight: 1.15,
            }}
          >
            Let&apos;s Build
            <br />
            Your Authority
          </a>

          <p className="mt-8 font-satoshi text-sm text-muted">
            Book a 25-minute discovery call
          </p>
          <a
            href="https://topmate.io/techieyogi"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive mt-2 font-satoshi text-sm text-secondary underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
          >
            topmate.io/techieyogi
          </a>
        </div>
      </div>

      {/* Part 2 — Footer bottom */}
      <div className="border-t border-[var(--border-subtle)] px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="font-editorial text-2xl text-gold-300">YK</span>
              <span className="font-satoshi text-xs uppercase tracking-[0.2em] text-primary">
                Recun Marketing 18
              </span>
            </div>
            <p className="mt-3 font-satoshi text-sm text-muted">
              Surat, Gujarat, India
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 font-satoshi text-sm text-secondary">
            <a
              href="tel:+917863033445"
              className="interactive transition-colors hover:text-gold-300"
            >
              +91 7863033445
            </a>
            <a
              href="mailto:techie.yogi1@gmail.com"
              className="interactive transition-colors hover:text-gold-300"
            >
              techie.yogi1@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-center font-satoshi text-sm text-muted md:items-end md:text-right">
            <a
              href="https://instagram.com/iamthatyogii"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive text-secondary transition-colors hover:text-gold-300"
            >
              @iamthatyogii
            </a>
            <p>© 2025 Yogii Kumar</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { SITE } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/utils";

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const rm18Ref = useRef<HTMLDivElement>(null);

  useGsapScope(
    footerRef,
    ({ gsap }) => {
      if (!rm18Ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        rm18Ref.current,
        { y: 40 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
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
      className="relative z-content bg-[var(--void)] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Part 1 — CTA */}
        <div className="relative overflow-hidden px-5 py-24 text-center md:px-6 md:py-32">
          <div
            ref={rm18Ref}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-editorial font-normal"
            style={{
              fontSize: "var(--f-giant)",
              lineHeight: 0.85,
              color: "var(--t4)",
              opacity: 0.035,
            }}
            aria-hidden
          >
            RM18
          </div>

          <div className="relative z-[1] mx-auto flex max-w-2xl flex-col items-center">
            <p
              className="mb-10 font-satoshi uppercase"
              style={{
                fontSize: "var(--f-xs)",
                letterSpacing: "0.4em",
                color: "var(--t3)",
              }}
            >
              Ready to become the authority?
            </p>

            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic hoverable footer-cta flex h-[160px] w-[160px] flex-col items-center justify-center rounded-full border text-center font-editorial transition-all duration-[400ms] md:h-[200px] md:w-[200px]"
              style={{
                fontSize: "var(--f-md)",
                lineHeight: 1.2,
                borderColor: "var(--g-border)",
                background: "transparent",
                color: "var(--t1)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Let&apos;s Build
              <br />
              Your Authority
            </a>

            <p
              className="mt-6 font-satoshi"
              style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
            >
              Book a 25-minute discovery call
            </p>
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="hoverable mt-2 font-satoshi underline-offset-4 transition-colors hover:text-[var(--g300)] hover:underline"
              style={{ fontSize: "var(--f-sm)", color: "var(--t2)" }}
            >
              {SITE.booking.replace("https://", "")}
            </a>
          </div>
        </div>

        {/* Tagline strip */}
        <p
          className="px-6 pb-12 text-center font-editorial italic"
          style={{
            fontSize: "var(--f-lg)",
            color: "var(--t4)",
          }}
        >
          Authority isn&apos;t built. It&apos;s engineered.
        </p>

        {/* Part 2 — Bottom bar */}
        <div
          className="border-t px-5 py-8 text-center md:px-12 md:text-left"
          style={{ borderColor: "var(--b1)" }}
        >
          <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-3 md:gap-6 md:text-left">
            <div className="md:text-left">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <span
                  className="font-editorial"
                  style={{ fontSize: 20, color: "var(--g300)" }}
                >
                  YK
                </span>
                <span
                  className="font-satoshi uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    color: "var(--t3)",
                  }}
                >
                  Recun Marketing 18
                </span>
              </div>
              <p
                className="mt-2 font-satoshi"
                style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
              >
                Surat, India
              </p>
            </div>

            <div
              className="flex flex-col items-center justify-center gap-1 font-satoshi md:items-center md:text-center"
              style={{ fontSize: "var(--f-sm)", color: "var(--t2)" }}
            >
              <p className="flex flex-wrap items-center justify-center gap-x-2">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="hoverable transition-colors hover:text-[var(--g300)]"
                >
                  {SITE.phone}
                </a>
                <span className="text-[var(--t4)]" aria-hidden>
                  ·
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hoverable transition-colors hover:text-[var(--g300)]"
                >
                  {SITE.email}
                </a>
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 md:items-end md:text-right">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hoverable inline-flex items-center gap-2 font-satoshi transition-colors hover:text-[var(--g300)]"
                style={{ fontSize: "var(--f-sm)", color: "var(--t2)" }}
              >
                <InstagramIcon />
                {SITE.instagramHandle}
              </a>
              <p
                className="font-satoshi"
                style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
              >
                © 2025 Yogii Kumar
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



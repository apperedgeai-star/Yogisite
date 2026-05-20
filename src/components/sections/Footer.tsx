"use client";

import { useRef } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { SITE } from "@/lib/site";
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
        { y: "2%" },
        {
          y: "-2%",
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
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
        <div className="relative overflow-hidden px-5 py-24 text-center md:px-6 md:py-32">
          <div ref={rm18Ref} className="footer-ghost-rm18" aria-hidden>
            RM18
          </div>

          <div className="relative z-[1] mx-auto flex max-w-2xl flex-col items-center">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-magnetic-cta magnetic-strong magnetic hoverable cursor-pointer"
            >
              Let&apos;s Build
              <br />
              Your Authority
            </a>

            <p
              className="mt-12 text-center font-satoshi text-sm"
              style={{ color: "#9d9890" }}
            >
              <a
                href={`tel:${SITE.phoneTel}`}
                className="hoverable transition-colors hover:text-[var(--g300)]"
              >
                {SITE.phone}
              </a>
              <span className="mx-2 text-[var(--t4)]" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="hoverable transition-colors hover:text-[var(--g300)]"
              >
                {SITE.email}
              </a>
              <span className="mx-2 text-[var(--t4)]" aria-hidden>
                ·
              </span>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hoverable transition-colors hover:text-[var(--g300)]"
              >
                {SITE.instagramHandle}
              </a>
            </p>
          </div>
        </div>

        <div
          className="mt-16 border-t px-5 pt-8 md:px-12"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="mx-auto grid max-w-7xl gap-6 text-center md:grid-cols-3 md:gap-4 md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="type-nav-brand">YK</span>
              <span
                className="font-satoshi text-[10px] uppercase tracking-[0.35em]"
                style={{ color: "var(--t3)" }}
              >
                Recun Marketing 18
              </span>
            </div>

            <p
              className="font-satoshi text-sm md:text-center"
              style={{ color: "var(--t3)" }}
            >
              © 2025 Yogii Kumar
            </p>

            <div className="md:text-right">
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="hoverable font-satoshi text-sm transition-colors hover:text-[var(--g300)]"
                style={{ color: "var(--t2)" }}
              >
                Book a Call
              </a>
              <p
                className="mt-1 font-satoshi text-xs"
                style={{ color: "var(--t4)" }}
              >
                {SITE.booking.replace("https://", "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

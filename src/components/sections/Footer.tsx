"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE, whatsappUrl } from "@/lib/site";
import { FOOTER_SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

const SLOGANS = [
  "Stop being invisible online.",
  "Your competitor is already visible.",
  "22 channels. One authority.",
  "Content is not enough. Distribution is.",
  "125M+ views. Yours next.",
  "We don't post. We dominate.",
] as const;

function AnimatedSlogan() {
  const [index, setIndex] = useState(0);
  const elRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = elRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    import("animejs").then(({ animate }) => {
      if (cancelled) return;
      interval = setInterval(() => {
        animate(el, {
          opacity: [1, 0],
          translateY: [0, -24],
          duration: 450,
          easing: "easeInQuart",
          onComplete: () => {
            setIndex((prev) => (prev + 1) % SLOGANS.length);
            animate(el, {
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 550,
              easing: "easeOutExpo",
            });
          },
        });
      }, 3200);
    });

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <h2 ref={elRef} className="footer-slogan type-section will-animate mt-6 max-w-xl" style={{ minHeight: "1.2em" }}>
      {SLOGANS[index]}
    </h2>
  );
}

export default function Footer() {
  return (
    <Section id="contact" tone="deep" border className="pb-[max(2rem,env(safe-area-inset-bottom))]">
      <SiteGrid className="footer-stack">
        <Col span={12} spanLg={5}>
          <div className="footer-brand-lockup">
            <Image
              src={ASSETS.logo}
              alt="The Recun Media"
              width={48}
              height={48}
              className="footer-brand-logo object-contain"
            />
            <span className="footer-brand-name">The Recun Media</span>
          </div>
          <AnimatedSlogan />
          <p className="type-body mt-4 max-w-md">
            Book a 25-minute discovery call. No pitch deck. No generic proposal. A real conversation about your brand — and a dedicated plan built for you on the call.
          </p>
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary hoverable tap-target mt-6 inline-flex"
          >
            Book Discovery Call →
          </a>
        </Col>

        <Col span={12} spanMd={6} spanLg={3}>
          <p className="section-label mb-5">Services</p>
          <ul className="space-y-2.5">
            {FOOTER_SERVICES.map((s) => (
              <li key={s} className="type-body">
                {s}
              </li>
            ))}
          </ul>
        </Col>

        <Col span={12} spanMd={6} spanLg={4}>
          <p className="section-label mb-5">Contact</p>
          <div className="space-y-2.5">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="type-body-strong hoverable block text-gold-300"
            >
              WhatsApp — {SITE.whatsapp}
            </a>
            <a href={`mailto:${SITE.emails.company}`} className="type-body hoverable block">
              {SITE.emails.company}
            </a>
            <a href={`mailto:${SITE.emails.sales}`} className="type-body hoverable block">
              {SITE.emails.sales}
            </a>
            <a href={`mailto:${SITE.emails.yogii}`} className="type-body hoverable block">
              {SITE.emails.yogii}
            </a>
            <a href={SITE.seeOurWork} className="type-body hoverable block">
              See Our Work →
            </a>
          </div>
        </Col>

        <Col span={12} className="border-t border-[var(--b1)] pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="type-caption">© 2026 Recun Marketing 18 Pvt Ltd · All rights reserved</p>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Legal">
              <a
                href={SITE.legal.privacy}
                target="_blank"
                rel="noopener noreferrer"
                className="type-caption hoverable"
              >
                Privacy Policy
              </a>
              <a
                href={SITE.legal.cookie}
                target="_blank"
                rel="noopener noreferrer"
                className="type-caption hoverable"
              >
                Cookie Policy
              </a>
              <a
                href={SITE.legal.terms}
                target="_blank"
                rel="noopener noreferrer"
                className="type-caption hoverable"
              >
                Terms &amp; Conditions
              </a>
            </nav>
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}

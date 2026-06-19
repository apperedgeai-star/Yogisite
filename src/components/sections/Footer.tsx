"use client";

import Image from "next/image";
import { SITE, whatsappUrl } from "@/lib/site";
import { FOOTER_SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

export default function Footer() {
  return (
    <Section id="contact" tone="deep" border className="pb-[max(2rem,env(safe-area-inset-bottom))]">
      <SiteGrid className="footer-stack">
        <Col span={12} spanLg={5}>
          <Image
            src={ASSETS.logo}
            alt="Yogii Kumar"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <h2 className="type-section mt-6 max-w-sm">Stop being invisible online.</h2>
          <p className="type-body mt-4 max-w-md">
            25-minute discovery call. No pitch deck — a real conversation and a plan built for you on the call.
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
            <a href={SITE.seeOurWork} target="_blank" rel="noopener noreferrer" className="type-body hoverable block">
              See Our Work →
            </a>
          </div>
        </Col>

        <Col span={12} className="border-t border-[var(--b1)] pt-6">
          <p className="type-caption">© 2026 Recun Marketing 18 Pvt Ltd · All rights reserved</p>
        </Col>
      </SiteGrid>
    </Section>
  );
}

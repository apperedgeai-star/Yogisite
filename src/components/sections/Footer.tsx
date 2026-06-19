"use client";

import Image from "next/image";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { SITE, whatsappUrl } from "@/lib/site";
import { FOOTER_SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

export default function Footer() {
  return (
    <Section id="contact" tone="deep" border className="pb-[max(2rem,env(safe-area-inset-bottom))]">
      <SiteGrid className="footer-stack">
        <Col span={12} spanLg={3}>
          <div className="flex items-center gap-3">
            <Image
              src={ASSETS.logo}
              alt="Yogii Kumar"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="type-body-strong">{SITE.companyName}</p>
              <p className="type-caption">{SITE.tagline}</p>
            </div>
          </div>
          <h2 className="type-section mt-6 max-w-sm">
            Stop being
            <br />
            invisible online.
          </h2>
          <p className="type-body mt-4 max-w-md">
            Book a 25-minute discovery call. No pitch deck. No generic proposal.
            A real conversation about your brand — and a dedicated plan built for you on the call.
          </p>
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary hoverable tap-target mt-6 inline-flex"
          >
            Book a Discovery Call
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

        <Col span={12} spanMd={6} spanLg={3}>
          <p className="section-label mb-5">Contact</p>
          <div className="space-y-2.5">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="type-body-strong hoverable flex items-center gap-2 text-gold-300"
            >
              <FaWhatsapp aria-hidden />
              WhatsApp — {SITE.whatsapp}
            </a>
            <a href={`mailto:${SITE.emails.company}`} className="type-body hoverable block">
              <FaEnvelope className="mr-2 inline-block text-gold-300" aria-hidden />
              {SITE.emails.company}
            </a>
            <a href={`mailto:${SITE.emails.hr}`} className="type-body hoverable block">
              <FaEnvelope className="mr-2 inline-block text-gold-300" aria-hidden />
              {SITE.emails.hr}
            </a>
            <a href={`mailto:${SITE.emails.sales}`} className="type-body hoverable block">
              <FaEnvelope className="mr-2 inline-block text-gold-300" aria-hidden />
              {SITE.emails.sales}
            </a>
            <a href={`mailto:${SITE.emails.yogii}`} className="type-body hoverable block">
              <FaEnvelope className="mr-2 inline-block text-gold-300" aria-hidden />
              {SITE.emails.yogii}
            </a>
          </div>
        </Col>

        <Col span={12} spanMd={6} spanLg={3}>
          <p className="section-label mb-5">Quick Links</p>
          <div className="space-y-2.5">
            <a href="#services" className="type-body hoverable block">Services</a>
            <a href="#work" className="type-body hoverable block">Work</a>
            <a href="#about" className="type-body hoverable block">About</a>
            <a href="#contact" className="type-body hoverable block">Contact</a>
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="type-body hoverable block">
              Book a Call
            </a>
          </div>
        </Col>

        <Col span={12} className="border-t border-[var(--b1)] pt-6">
          <p className="type-caption">© 2026 - All Rights Reserved | Privacy - T&amp;C apply</p>
          <p className="type-caption mt-1">{SITE.companyLegal}</p>
        </Col>
      </SiteGrid>
    </Section>
  );
}
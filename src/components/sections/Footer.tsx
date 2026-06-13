"use client";

import Image from "next/image";
import { SITE, whatsappUrl } from "@/lib/site";
import { FOOTER_SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";

export default function Footer() {
  return (
    <footer id="contact" className="section-surface section-surface--footer relative z-content">
      <div className="site-container py-16 pb-[max(4rem,env(safe-area-inset-bottom))] md:py-28">
        <div className="footer-stack">
          <div>
            <Image src={ASSETS.logo} alt="Yogii Kumar" width={140} height={40} className="h-9 w-auto object-contain opacity-90" />
            <h2 className="type-section mt-8 whitespace-pre-line">
              {"Stop being\ninvisible online."}
            </h2>
            <p className="type-body mt-6 max-w-md">
              Book a 25-minute discovery call. No pitch deck. No generic proposal. A real conversation about your brand — and a dedicated plan built for you on the call.
            </p>
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary hoverable tap-target mt-8 inline-flex"
            >
              Book Discovery Call →
            </a>
          </div>

          <div>
            <p className="type-label mb-4">Services</p>
            <ul className="space-y-3">
              {FOOTER_SERVICES.map((s) => (
                <li key={s} className="type-body-strong">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label mb-4">Contact</p>
            <div className="space-y-3">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="type-body-strong hoverable block text-gold-300">
                WhatsApp — {SITE.whatsapp}
              </a>
              <a href={`mailto:${SITE.emails.company}`} className="type-body hoverable block">{SITE.emails.company}</a>
              <a href={`mailto:${SITE.emails.hr}`} className="type-body hoverable block">{SITE.emails.hr}</a>
              <a href={`mailto:${SITE.emails.sales}`} className="type-body hoverable block">{SITE.emails.sales}</a>
              <a href={`mailto:${SITE.emails.yogii}`} className="type-body hoverable block">{SITE.emails.yogii}</a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="type-body hoverable block">{SITE.instagramHandle}</a>
              <a href={SITE.seeOurWork} target="_blank" rel="noopener noreferrer" className="type-body hoverable block">See Our Work →</a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--b1)] pt-8 text-center md:text-left">
          <p className="type-caption">
            © 2026 — All Rights Reserved · Recun Marketing 18 Pvt Ltd · Privacy · T&amp;C apply
          </p>
        </div>
      </div>
    </footer>
  );
}

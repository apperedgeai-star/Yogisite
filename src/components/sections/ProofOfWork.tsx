"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

const CASE_STUDIES = [
  {
    brandLabel: "VISION11 × CSK",
    imageSrc: "/images/clients/vision11.png",
    title: "IPL 2025 Campaign",
    description:
      "End-to-end social media, ad campaigns and full digital distribution across the IPL 2025 season — from match-day content to paid amplification.",
    metric: "55M+ Views Delivered",
    subMetric: "IPL 2025 Season",
  },
  {
    brandLabel: "STARBUCKS INDIA",
    imageSrc: "/images/clients/starbucks.png",
    title: "South Gujarat Influencer Campaign",
    description:
      "Managed the 2024 influencer marketing rollout across Surat, Vadodara and Vapi — delivering global brand standards through regional creator partnerships.",
    metric: "Surat · Vadodara · Vapi",
    subMetric: "2024 Regional Campaign",
  },
  {
    brandLabel: "RAPIDO",
    imageSrc: "/images/clients/rapido.webp",
    title: "Captain Stories Campaign",
    description:
      "Crafted and produced content for Rapido captains — humanising India's #1 bike taxi platform through the real stories of the people behind every ride.",
    metric: "Documentary Content",
    subMetric: "Captain Stories Shoot",
  },
] as const;

export default function ProofOfWork() {
  return (
    <Section id="work" tone="deep">
      <SiteGrid>
        <Col span={12}>
          <SectionHeader label="Case Studies" title="Results that can't be faked." />
        </Col>

        <Col span={12}>
          <div className="case-studies-grid">
            {CASE_STUDIES.map((client, index) => (
              <article key={client.brandLabel} className="case-card">
                <div className="case-card__image-area">
                  <Image
                    src={client.imageSrc}
                    alt={client.brandLabel}
                    fill
                    quality={90}
                    priority={index === 0}
                    sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      padding: "24px",
                    }}
                  />
                </div>

                <div className="case-card__content">
                  <span className="case-card__brand-label">{client.brandLabel}</span>
                  <h3 className="case-card__title">{client.title}</h3>
                  <p className="case-card__description">{client.description}</p>
                  <div className="case-card__metric">{client.metric}</div>
                  <div className="case-card__sub-metric">{client.subMetric}</div>
                </div>
              </article>
            ))}
          </div>
        </Col>

        <Col span={12} className="mt-4 border-t border-[var(--b1)] pt-12 md:mt-8">
          <p className="section-label mb-8">Industry voices</p>
          <div className="site-grid">
            {TESTIMONIALS.map((t) => (
              <Col key={t.author} span={12} spanLg={6}>
                <blockquote className="surface-card h-full border-l-2 border-l-[var(--g300)] p-6 md:p-8">
                  <p className="type-body text-[var(--t2)]">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="type-body-strong mt-5">— {t.author}</footer>
                </blockquote>
              </Col>
            ))}
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}

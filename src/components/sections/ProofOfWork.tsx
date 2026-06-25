"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { CLIENT_CASES, TESTIMONIALS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

const IMAGE_MAP = {
  vision11: ASSETS.clients.vision11,
  starbucks: ASSETS.clients.starbucks,
  rapido: ASSETS.clients.rapido,
} as const;

export default function ProofOfWork() {
  return (
    <Section id="work" tone="deep">
      <SiteGrid>
        <Col span={12}>
          <SectionHeader label="Case Studies" title="Results that can't be faked." />
        </Col>

        {CLIENT_CASES.map((c, index) => (
          <Col key={c.id} span={12} spanMd={6} spanLg={4}>
            <article className="surface-card case-card">
              <div className="case-card__media relative">
                <Image
                  src={IMAGE_MAP[c.id]}
                  alt={c.title}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </div>
              <div className="case-card__body">
                <p className="case-card__eyebrow">{c.eyebrow}</p>
                <h3 className="case-card__title">{c.title}</h3>
                <p className="type-body mt-2 flex-1 text-sm">{c.description}</p>
                <p className={c.id === "vision11" ? "case-card__metric" : "case-card__submetric"}>{c.stat}</p>
              </div>
            </article>
          </Col>
        ))}

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

"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { SITE } from "@/lib/site";
import { PROGRAM_DESCRIPTIONS } from "@/lib/content";
import { RECUN_AI_VIDEOS } from "@/lib/videos";

function CourseMedia({ src, badge }: { src: string; badge: string }) {
  return (
    <div className="course-image">
      <LazyVideo src={src} className="object-cover" pauseWhenHidden />
      <div className="course-image-overlay" />
      <span className="course-image-badge">{badge}</span>
    </div>
  );
}

export default function Programs() {
  return (
    <Section id="programs" tone="elevated">
      <SiteGrid>
        <Col span={12} spanLg={8}>
          <SectionHeader label="Education" title="We don't just do. We teach." />
        </Col>

        <Col span={12} spanLg={6}>
          <article className="surface-card flex h-full flex-col overflow-hidden">
            <CourseMedia src={RECUN_AI_VIDEOS.aiWebsite} badge="AI TOOLS · CONTENT · SYSTEMS" />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <span className="tag-pill tag-pill--alert mb-4 w-fit">Launching June 2026</span>
              <h3 className="type-subhead">Recun Content &amp; AI</h3>
              <p className="type-body mt-3 flex-1">{PROGRAM_DESCRIPTIONS.recunAI}</p>
              <p className="type-body-strong mt-6">
                <span className="price-number text-xl">₹59,000</span>
                <span className="type-caption ml-2 font-normal">with internship</span>
              </p>
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary hoverable tap-target mt-6 inline-flex w-full sm:w-auto"
              >
                Apply Now →
              </a>
            </div>
          </article>
        </Col>

        <Col span={12} spanLg={6}>
          <article className="surface-card flex h-full flex-col overflow-hidden">
            <CourseMedia src={RECUN_AI_VIDEOS.generativeBrand} badge="PRODUCT · SERVICE · MONETISE" />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <span className="tag-pill mb-4 w-fit">Coming Soon</span>
              <h3 className="type-subhead">Content Se Crore</h3>
              <p className="type-body mt-3 flex-1">{PROGRAM_DESCRIPTIONS.contentSeCrore}</p>
              <p className="price-number mt-6 text-xl text-gold-300">₹99,000</p>
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary hoverable tap-target mt-6 inline-flex w-full sm:w-auto"
              >
                Join Waitlist
              </a>
            </div>
          </article>
        </Col>
      </SiteGrid>
    </Section>
  );
}

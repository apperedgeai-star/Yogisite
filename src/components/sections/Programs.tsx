"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { SITE } from "@/lib/site";
import { PROGRAM_DESCRIPTIONS } from "@/lib/content";

function CourseMediaRecun() {
  return (
    <div className="course-image course-image--recun" aria-hidden>
      <div className="course-image-overlay" />
      <span className="course-image-badge">AI + CONTENT</span>
    </div>
  );
}

function CourseMediaCrore() {
  return (
    <div className="course-image course-image--crore" aria-hidden>
      <div className="course-image-overlay" />
      <span className="course-image-badge">MONETISE</span>
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
            <CourseMediaRecun />
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
            <CourseMediaCrore />
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

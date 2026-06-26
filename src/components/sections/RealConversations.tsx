"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { CREATOR_BADGES } from "@/lib/content";
import { ConversationsCarousel } from "./ConversationsCarousel";

export default function RealConversations() {
  return (
    <Section id="conversations" tone="base">
      <SiteGrid>
        <Col span={12} spanLg={8}>
          <SectionHeader
            label="Behind the work"
            title="Real conversations. Real collaboration."
            description="Strategy sessions and in-person meetups with India's top creators — where the distribution system gets built."
          />
        </Col>

        <Col span={12}>
          <ConversationsCarousel />
        </Col>

        <Col span={12} className="mt-4">
          <section className="creator-badge-section">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="tag-pill tag-pill--alert mb-4 w-fit">10+</span>
                <h3 className="type-subhead">A-List Creator Partnerships</h3>
                <p className="type-body mt-3 max-w-3xl">
                  Helped India&apos;s top creators across finance, business, tech, and lifestyle with viral research, scriptwriting, ghostwriting, and content strategy using our Proven Content System.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["RESEARCH", "SCRIPTING", "GHOSTWRITING", "CONTENT STRATEGY"].map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="creator-badge-grid">
              {CREATOR_BADGES.map((creator) => (
                <article key={creator.name} className="creator-badge-card">
                  <span className="creator-badge-photo">
                    <Image
                      src={creator.image}
                      alt={creator.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </span>
                  <div className="creator-badge-copy">
                    <div className="creator-badge-heading">
                      <p className="creator-badge-name type-body-strong text-sm">{creator.name}</p>
                      <p className="creator-badge-followers type-label">{creator.followers}</p>
                    </div>
                    <p className="type-caption mt-1">{creator.handle}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Col>
      </SiteGrid>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { RECUN_AI_CARDS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

function AICard({ card }: { card: (typeof RECUN_AI_CARDS)[number] }) {
  return (
    <article className="surface-card service-reel-card flex h-full flex-col overflow-hidden">
      <div className="service-reel-card__video relative aspect-[9/16] bg-[var(--void)]">
        <LazyVideo src={card.video} pauseWhenHidden />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="type-label">{card.label}</p>
        <h3 className="type-subhead mt-2 text-lg">{card.title}</h3>
        <p className="type-body mt-2 flex-1 text-sm">{card.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function RecunAI() {
  const reduced = prefersReducedMotion();

  return (
    <Section id="recun-ai" tone="elevated">
      <SiteGrid>
        <Col span={12} spanLg={8}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="Built on AI"
              title="We don't just create content. We engineer it."
              description="AI clone, generative brand films, and deployed digital systems — inside the same agency that runs Dragon's Head and Jupiter Node."
            />
          </motion.div>
        </Col>

        <Col span={12}>
          <div className="service-reels-grid">
            {RECUN_AI_CARDS.map((card) => (
              <AICard key={card.label} card={card} />
            ))}
          </div>
        </Col>

        <Col span={12}>
          <p className="type-pull mx-auto mt-2 max-w-3xl text-center text-xl">
            AI Clone content is already live inside Dragon&apos;s Head — powering founders who can&apos;t shoot daily.
          </p>
        </Col>
      </SiteGrid>
    </Section>
  );
}

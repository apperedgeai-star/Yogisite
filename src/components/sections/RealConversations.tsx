"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { CONVERSATIONS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

export default function RealConversations() {
  const reduced = prefersReducedMotion();

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

        {CONVERSATIONS.map((c, i) => (
          <Col key={c.name} span={12} spanMd={6} spanLg={3}>
            <motion.article
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              className="surface-card h-full overflow-hidden"
            >
              <div className="conv-card__media relative">
                <Image
                  src={c.image}
                  alt={`${c.name} — ${c.session}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="type-body-strong">{c.name}</p>
                {c.stat !== "—" && (
                  <p className="problem-stat-number mt-1 text-xl text-gold-300">{c.stat}</p>
                )}
                <p className="type-caption mt-1.5 leading-snug">{c.session}</p>
              </div>
            </motion.article>
          </Col>
        ))}
      </SiteGrid>
    </Section>
  );
}

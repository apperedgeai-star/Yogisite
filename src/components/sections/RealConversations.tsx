"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { CONVERSATIONS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, type: "spring", stiffness: 100 },
  }),
};

export default function RealConversations() {
  const reduced = prefersReducedMotion();
  const featured = CONVERSATIONS[0];
  const rest = CONVERSATIONS.slice(1);

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

        <Col span={12} spanLg={8} className="creators-grid-featured">
          <motion.article
            custom={0}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="creator-card creator-card--featured"
          >
            <div className="creator-card__media relative">
              <Image
                src={featured.image}
                alt={`${featured.name} — ${featured.session}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="creator-card__body">
              <p className="creator-card__name">{featured.name}</p>
              <p className="creator-card__metric">{featured.stat}</p>
              <p className="creator-card__session">{featured.session}</p>
            </div>
          </motion.article>
        </Col>

        {rest.map((c, i) => (
          <Col key={c.name} span={6} spanMd={4} spanLg={3}>
            <motion.article
              custom={i + 1}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="creator-card"
            >
              <div className="creator-card__media relative">
                <Image
                  src={c.image}
                  alt={`${c.name} — ${c.session}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="creator-card__body">
                <p className="creator-card__name">{c.name}</p>
                {c.stat !== "—" && <p className="creator-card__metric">{c.stat}</p>}
                <p className="creator-card__session">{c.session}</p>
              </div>
            </motion.article>
          </Col>
        ))}
      </SiteGrid>
    </Section>
  );
}

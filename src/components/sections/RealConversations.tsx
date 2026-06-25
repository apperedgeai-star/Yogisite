"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { CONVERSATIONS, CREATOR_BADGES } from "@/lib/content";
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

        <Col span={12}>
          <div className="real-conversations-grid">
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
                  sizes="(max-width: 768px) 100vw, 56vw"
                  priority={false}
                  placeholder="empty"
                  quality={90}
                />
              </div>
              <div className="creator-card__body">
                <p className="creator-card__name">{featured.name}</p>
                <p className="creator-card__metric">{featured.stat}</p>
                <p className="creator-card__session">{featured.session}</p>
              </div>
            </motion.article>

            {rest.map((c, i) => (
              <motion.article
                key={c.name}
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    placeholder="empty"
                    quality={90}
                  />
                </div>
                <div className="creator-card__body">
                  <p className="creator-card__name">{c.name}</p>
                  {c.stat !== "—" && <p className="creator-card__metric">{c.stat}</p>}
                  <p className="creator-card__session">{c.session}</p>
                </div>
              </motion.article>
            ))}
          </div>
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
                    <p className="creator-badge-name type-body-strong text-sm">{creator.name}</p>
                    <p className="type-label mt-1">{creator.followers}</p>
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

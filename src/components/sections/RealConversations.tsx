"use client";

import { useState, type CSSProperties } from "react";
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

if (process.env.NODE_ENV === "development") {
  console.group("CONVERSATIONS GRID - Images Needing Replacement");
  console.warn("REPLACE: RJ Dheeraj -> /public/images/conversations/rj-dheeraj.jpg - flagged wrong in v4");
  console.warn("REPLACE: Kasim Shaikh -> /public/images/conversations/kasim-shaikh.jpg - flagged wrong in v4");
  console.warn("IMPROVE: Nawaz Shaikh -> /public/images/conversations/nawaz-shaikh.jpg - low resolution");
  console.warn("IMPROVE: Riya Upreti -> /public/images/conversations/riya-upreti.jpg - low resolution/dark");
  console.warn("IMPROVE: Dabhi Manthan -> /public/images/conversations/dabhi-manthan.jpg - poor composition");
  console.warn("IMPROVE: Multi-Session -> /public/images/conversations/multi-session.jpg - raw meeting screenshot");
  console.info("OK: Shubhankar Sen Gupta, Viplav+Gaurav, Karthik Naidu, Romil Mavani");
  console.groupEnd();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ConversationCardFallback({ name }: { name: string }) {
  return (
    <div className="conversation-card__fallback" aria-hidden>
      <div className="conversation-card__initials">{getInitials(name)}</div>
      <span className="conversation-card__pending">Photo pending</span>
    </div>
  );
}

export default function RealConversations() {
  const reduced = prefersReducedMotion();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (cardName: string) => {
    setImageErrors((prev) => ({ ...prev, [cardName]: true }));
  };

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
            {CONVERSATIONS.map((card, i) => {
              const isNawaz = card.image.endsWith("/nawaz-shaikh.jpg");
              const shouldUseFallback = card.quality === "wrong" || imageErrors[card.name];
              return (
              <motion.article
                key={card.name}
                custom={i}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="conversation-card"
                data-quality={card.quality}
                style={{ "--conversation-focal": card.focal } as CSSProperties}
              >
                <div className="conversation-card__image-wrapper">
                  {shouldUseFallback ? (
                    <ConversationCardFallback name={card.name} />
                  ) : (
                    <Image
                      src={card.image}
                      alt={`${card.name} — ${card.session}`}
                      fill
                      quality={isNawaz ? 85 : 90}
                      sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 20vw"
                      className="conversation-card__image"
                      placeholder="empty"
                      style={{
                        objectFit: "cover",
                        objectPosition: card.focal,
                        imageRendering: isNawaz ? "crisp-edges" : "auto",
                      }}
                      onError={() => handleImageError(card.name)}
                    />
                  )}
                </div>
                <div className="conversation-card__text">
                  <div className="conversation-card__name">{card.name}</div>
                  {card.stat !== "—" && <div className="conversation-card__followers">{card.stat}</div>}
                  <div className="conversation-card__session">{card.session}</div>
                </div>
              </motion.article>
              );
            })}
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

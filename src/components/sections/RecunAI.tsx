"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RECUN_AI_CARDS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

function AICard({ card }: { card: (typeof RECUN_AI_CARDS)[number] }) {
  return (
    <article className="surface-card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-[var(--void)]">
        <LazyVideo src={card.video} pauseWhenHidden />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="type-label">{card.label}</p>
        <h3 className="type-subhead mt-2 text-xl md:text-2xl">{card.title}</h3>
        <p className="type-body mt-3 flex-1">{card.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
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
    <section id="recun-ai" className="section-surface section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            label="Built on AI"
            title="We don't just create content. We engineer it."
            description="AI clone, generative brand films, and deployed digital systems — built inside the same agency that runs Dragon's Head and Jupiter Node."
          />
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {RECUN_AI_CARDS.map((card) => (
            <AICard key={card.label} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

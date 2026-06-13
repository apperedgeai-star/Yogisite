"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Drama, Sparkles, Megaphone, Globe, Zap, Wrench } from "lucide-react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { RECUN_AI_CARDS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

const ICON_SETS = [
  [Drama, Sparkles, Megaphone],
  [Sparkles, Megaphone, Megaphone],
  [Globe, Zap, Wrench],
] as const;

function AICard({
  card,
  icons,
}: {
  card: (typeof RECUN_AI_CARDS)[number];
  icons: readonly [typeof Drama, typeof Sparkles, typeof Megaphone];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % icons.length), 3000);
    return () => clearInterval(t);
  }, [icons.length]);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass-card-gold flex h-full flex-col overflow-hidden p-5 sm:p-6"
    >
      <div className="relative mb-5 aspect-video overflow-hidden rounded-sm bg-[var(--void)]">
        <LazyVideo src={card.video} pauseWhenHidden />
      </div>
      <div className="mb-4 flex gap-2">
        {icons.map((I, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
              i === active ? "border-gold-300 text-gold-300" : "border-[var(--b1)] text-muted"
            }`}
          >
            <I size={16} />
          </button>
        ))}
      </div>
      <p className="type-label">{card.label}</p>
      <h3 className="type-subhead mt-2 text-lg">{card.title}</h3>
      <p className="type-body mt-3 flex-1">{card.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span key={tag} className="about-pill text-[10px]">{tag}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function RecunAI() {
  const reduced = prefersReducedMotion();

  return (
    <section id="recun-ai" className="section-surface section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <p className="type-label mb-3">Built on AI</p>
          <h2 className="type-section">We Don&apos;t Just Create Content. We Engineer It.</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RECUN_AI_CARDS.map((card, i) => (
            <AICard key={card.label} card={card} icons={ICON_SETS[i]} />
          ))}
        </div>
        <p className="type-pull mt-10 max-w-3xl">
          AI Clone content is already live inside Dragon&apos;s Head — powering founders who can&apos;t shoot daily.
        </p>
      </div>
    </section>
  );
}

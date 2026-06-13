"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONVERSATIONS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

export default function RealConversations() {
  const reduced = prefersReducedMotion();

  return (
    <section id="conversations" className="section-surface section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Behind the work"
          title="Real conversations. Real collaboration."
          description="Strategy sessions and in-person meetups with India's top creators — this is where the distribution system gets built."
          className="mb-10 md:mb-14"
        />

        <div className="conversations-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CONVERSATIONS.map((c, i) => (
            <motion.article
              key={c.name}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              className="surface-card overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--deep)]">
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
                <p className="type-caption mt-1">{c.session}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CONVERSATIONS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

export default function RealConversations() {
  const reduced = prefersReducedMotion();

  return (
    <section id="conversations" className="section-surface section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <p className="type-label mb-4">Proof of Work</p>
        <h2 className="type-section mb-3">Real Conversations. Real Collaboration.</h2>
        <p className="type-body mb-10 max-w-2xl">
          Online strategy sessions and in-person meetups with India&apos;s top creators — this is where the work actually happens.
        </p>

        <div className="conversations-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CONVERSATIONS.map((c, i) => (
            <motion.article
              key={c.name}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
              className="glass-card overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface)]">
                <Image
                  src={c.image}
                  alt={`${c.name} — ${c.session}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  <p className="type-body-strong">{c.name}</p>
                </div>
                {c.stat !== "—" && (
                  <p className="problem-stat-number mt-1 text-2xl">{c.stat}</p>
                )}
                <p className="type-caption mt-1 text-gold-300">{c.session}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

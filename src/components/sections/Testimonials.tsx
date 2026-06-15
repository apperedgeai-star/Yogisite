"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

export default function Testimonials() {
  const reduced = prefersReducedMotion();

  return (
    <section className="section-surface section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <p className="type-label mb-4">Industry Voices</p>
        <h2 className="type-section mb-10 md:mb-14">What the Industry Says</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card border-l-2 border-l-[var(--g300)] p-6 md:p-8"
            >
              <p className="type-body text-[var(--t2)]">&ldquo;{t.quote}&rdquo;</p>
              <footer className="type-body-strong mt-4">— {t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

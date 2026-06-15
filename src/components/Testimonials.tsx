"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "The team showcased exceptional execution during IPL 2025. Handling high-profile assets like Suresh Raina along with multiple Vision 11 creator profiles, they delivered consistent, high-quality content with strong strategic direction.",
    author: "Mr. Jay, CMO, Vision 11",
  },
  {
    quote:
      "From content to media planning, Yogi delivered effective ad creatives for Rapido Captains. His work ensured strong visibility, engagement, and measurable results.",
    author: "Mr. Robin, Regional Manager, Rapido",
  },
  {
    quote:
      "Yogi managed our Summer 2024 campaign in South Gujarat with a sharp influencer strategy. His execution drove strong visibility, engagement, and brand impact.",
    author: "Amar Thakur, Regional Manager, Starbucks India",
  },
  {
    quote:
      "From ideation to funding and UAE company setup, Yogi handled tech, operations, and systems single-handedly. A true one-man army delivering complete business execution beyond his CMO role.",
    author: "Prashant Kakadiya, Founder & CEO, Festum Evento Pvt Ltd",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          {...fadeUp}
          className="mb-12 font-display text-4xl text-[var(--text-primary)] md:text-5xl"
        >
          What the Industry Says
        </motion.h2>

        <motion.div
          {...staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              variants={scaleIn}
              className="relative rounded-2xl border border-[var(--border)] border-l-[3px] border-l-[var(--gold)] bg-[var(--bg-tertiary)]/50 p-6 backdrop-blur-sm md:p-8"
            >
              <span
                className="font-display text-5xl leading-none text-[var(--gold)] opacity-40"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {t.quote}
              </p>
              <footer className="mt-4 font-sans text-sm font-semibold text-[var(--text-primary)]">
                — {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

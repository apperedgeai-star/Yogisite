"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const faqs = [
  {
    q: "What is the Content Distribution Network?",
    a: "We manage 22 touchpoints in total — 4 main accounts across Instagram, YouTube, Facebook, and LinkedIn that you own completely, plus 18 distribution pages (9 Instagram fan and niche pages + 9 YouTube Shorts pages) that push the same audience toward you from every angle, every single day. Most agencies fight for attention on 1 channel. We give you 22.",
  },
  {
    q: "What happens if 50K followers is not achieved in 24 weeks?",
    a: "You choose — either we return your money or we continue our services at zero additional cost until the goal is reached. This is a real guarantee. We only take clients we are confident we can deliver results for — which is also why we limit ourselves to 5 clients at a time.",
  },
  {
    q: "What is Jupiter Node and how is it different from Dragon's Head?",
    a: "Dragon's Head is for founders and professionals — 4 weeks retainer, 24 weeks contract, personal brand, 18-page distribution, 50K follower goal. Jupiter Node is for brands and businesses — a focused 50-piece content campaign, deliverable-based, not a monthly retainer, ends when 5M views is achieved. Different goals, different structure.",
  },
  {
    q: "How much of my time does Dragon's Head require each month?",
    a: "Minimal. You show up for one batch shoot per week — typically 3 to 4 hours where we shoot all videos. We handle scripting before the shoot, direction during it, and editing and distribution after. Plus one 30-minute monthly strategy call with Yogii. That is roughly 8 to 10 hours per month of your time in total. If we go with AI Avatar then only 3 to 4 hours per month.",
  },
  {
    q: "What niches do you work with?",
    a: "We work across all niches — real estate, finance, law, medicine, manufacturing, food, fashion, coaching, consulting, technology, e-commerce, hospitality, politics and more. Our Proven Content System is built to research and adapt to any niche within 48 hours of onboarding.",
  },
  {
    q: "What is the $100 token and is it refundable?",
    a: "The $100 token is paid after the discovery call to confirm your spot and show mutual seriousness. It is fully adjusted against your first month's payment — so you pay nothing extra. It ensures that only serious clients book spots, which protects everyone's time. It is not refundable and will count as consulting fees.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="contact" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          {...fadeUp}
          className="mb-10 font-display text-4xl text-[var(--text-primary)]"
        >
          FAQ
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                {...fadeUp}
                className={`rounded-xl border bg-[var(--bg-tertiary)] transition-colors ${
                  isOpen ? "border-[var(--gold)]/30" : "border-[var(--border)]"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base font-medium text-[var(--text-primary)]">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 font-sans text-2xl text-[var(--gold)] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

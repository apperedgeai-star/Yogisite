"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { SITE } from "@/lib/site";

const programs = [
  {
    title: "Recun Content & AI",
    copy: "Learn AI tools, content creation, social media marketing, and how to build a career in this space — from the inside of a real working agency.",
    cta: "Join the Program →",
    href: SITE.tallyRecunAI,
    badge: null,
  },
  {
    title: "Content se Crore",
    copy: "A premium 4-month program where followers turn into customers. You will get the complete blueprint to build a sellable product or service — and a one-man-army system to grow and monetise it.",
    cta: "Join Waitlist →",
    href: SITE.tallyContentSeCrore,
    badge: "Join Waitlist",
  },
];

export default function ContentPrograms() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {programs.map((p) => (
            <motion.div
              key={p.title}
              variants={scaleIn}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8"
            >
              {p.badge && (
                <span className="mb-4 inline-block rounded-full border border-[var(--red-accent)]/50 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-[var(--red-accent)]">
                  {p.badge}
                </span>
              )}
              <h3 className="font-display text-3xl text-[var(--text-primary)]">{p.title}</h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                {p.copy}
              </p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex font-sans text-sm font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

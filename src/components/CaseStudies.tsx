"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

const cases = [
  {
    eyebrow: "VISION11 × CSK",
    title: "IPL 2025 Campaign",
    description:
      "End-to-end social media, ad campaigns and full digital distribution across the IPL 2025 season — from match-day content to paid amplification.",
    stat: "55M+ · Views Delivered",
    image: "/images/clients/vision11.png",
  },
  {
    eyebrow: "STARBUCKS INDIA",
    title: "South Gujarat Influencer Campaign",
    description:
      "Managed the 2024 influencer marketing rollout across Surat, Vadodara and Vapi — delivering global brand standards through regional creator partnerships.",
    stat: "Surat · Vadodara · Vapi · 2024",
    image: "/images/clients/starbucks.png",
  },
  {
    eyebrow: "RAPIDO",
    title: "Captain Stories Campaign",
    description:
      "Crafted and produced content for Rapido captains — humanising India's #1 bike taxi platform through the real stories of the people behind every ride.",
    stat: "Documentary content shoot",
    image: "/images/clients/rapido.webp",
  },
];

export default function CaseStudies() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            The Work
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)] md:text-5xl">
            Results that moved the needle.
          </h2>
        </motion.div>

        <motion.div {...staggerContainer} className="space-y-6">
          {cases.map((item) => (
            <motion.article
              key={item.title}
              variants={scaleIn}
              className="group grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] md:grid-cols-[280px_1fr]"
            >
              <div className="relative h-48 md:h-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 transition-opacity group-hover:opacity-80"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl text-[var(--text-primary)] md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.description}
                </p>
                <p className="mt-4 font-stats text-lg font-bold text-[var(--gold)]">
                  {item.stat}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

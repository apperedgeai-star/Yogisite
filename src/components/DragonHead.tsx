"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SITE } from "@/lib/site";

const deliverables = [
  "20 premium videos/month — Real Shoot or AI Clone, scripted + edited",
  "4 main accounts managed — Instagram, YouTube, Facebook & LinkedIn",
  "18 distribution pages — 9 Instagram + 9 YouTube Shorts, posted daily",
  "Monthly strategy session + growth report",
];

export default function DragonHead() {
  return (
    <section id="services" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-4xl">
        <motion.div {...fadeUp}>
          <span className="inline-block rounded-full border border-[var(--red-accent)]/50 bg-[var(--red-accent)]/10 px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--red-accent)]">
            5 Founders at a Time
          </span>

          <h2 className="mt-6 font-display text-5xl text-[var(--text-primary)] md:text-6xl">
            Dragon&apos;s Head
          </h2>
          <p className="mt-2 font-sans text-lg text-[var(--gold)]">
            Personal Branding &amp; Content Distribution
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <p className="font-stats text-3xl font-bold text-[var(--text-primary)]">
                $2000 <span className="text-lg font-normal text-[var(--text-muted)]">/ 4 Weeks</span>
              </p>
              <p className="text-sm text-[var(--text-muted)]">with full distribution</p>
            </div>
            <div>
              <p className="font-stats text-3xl font-bold text-[var(--text-primary)]">
                $1000 <span className="text-lg font-normal text-[var(--text-muted)]">/ 4 Weeks</span>
              </p>
              <p className="text-sm text-[var(--text-muted)]">without distribution</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-6 md:p-8">
            <p className="font-sans text-base leading-relaxed text-[var(--text-muted)]">
              The dragon&apos;s head is the most powerful position — it leads, it sets direction, and
              everything follows. This service is for the founder or business owner who wants to
              lead their industry online — not follow. Not posting occasionally. Not hoping for results. Lead.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--text-muted)]">
              You are placed at the centre of a content distribution network — 4 main accounts across
              Instagram, YouTube, Facebook and LinkedIn, plus 18 fan and niche pages all pointing the
              audience back to you, from 22 different angles, every month. The algorithm does not see
              one account. It sees 22 voices — all pointing to the same authority.
            </p>
          </div>

          <ul className="mt-8 space-y-4">
            {deliverables.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-[var(--text-primary)]">
                <span className="text-[var(--gold)]">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-sans text-sm italic text-[var(--text-muted)]">
            We work with only 5 founders at a time.
            <br />
            Quality over volume.
          </p>

          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-[var(--gold)] px-8 font-sans text-sm font-semibold text-[var(--bg-primary)] transition-all hover:scale-[1.04] hover:bg-[var(--gold-light)]"
          >
            Secure Your Spot
          </a>
        </motion.div>
      </div>
    </section>
  );
}

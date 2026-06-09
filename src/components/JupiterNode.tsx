"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { SITE } from "@/lib/site";

const statCards = [
  { num: "30", title: "In-Act Reels", desc: "Up to 2 actors in frame. Full shoot — scripted, directed & edited." },
  { num: "10", title: "AI Videos", desc: "Max 15 seconds each. Produced using advanced AI tools." },
  { num: "10", title: "Graphic Content", desc: "Including carousels. Designed for saves and shareability." },
  { num: "50", title: "TOTAL", desc: "Guaranteed 5M views · or we keep going free" },
];

const included = [
  "Social media management throughout the entire campaign",
  "Dedicated account manager — one contact, always available",
  "Daily stories — audience kept warm between main posts",
  "2 PR activities — media coverage about your business or founder story",
  "3 meme page collabs — pages up to 50,000 followers for amplified reach",
  "1 free brand & business strategy consultation with Yogii Kumar",
  "Full content creation — research, scripting, shoot, edit, and post — entirely by us",
];

export default function JupiterNode() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp}>
          <span className="inline-block rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            5 Million Views Or We Continue Free
          </span>

          <h2 className="mt-6 font-display text-5xl text-[var(--text-primary)] md:text-6xl">
            Jupiter Node
          </h2>
          <p className="mt-2 font-sans text-lg text-[var(--gold)]">
            Business Branding &amp; Content Production Campaigns
          </p>

          <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-[var(--text-muted)]">
            Jupiter is the largest planet — it commands gravity. This service is for brands and
            businesses that want a complete content campaign that pulls massive attention.
            50 pieces, 5 million views, done.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((card) => (
            <motion.div
              key={card.title}
              variants={scaleIn}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6"
            >
              <p className="font-stats text-4xl font-bold text-[var(--gold)]">{card.num}</p>
              <p className="mt-2 font-sans font-semibold text-[var(--text-primary)]">{card.title}</p>
              <p className="mt-2 font-sans text-sm text-[var(--text-muted)]">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div {...fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8">
            <h3 className="font-sans text-lg font-semibold text-[var(--text-primary)]">
              Everything Included
            </h3>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--gold)]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-[var(--red-accent)]/50 bg-[var(--red-accent)]/5 p-6"
            >
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--red-accent)]">
                Important
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                Service ends once all 50 pieces are live AND 5M views are achieved. Not ongoing.
                A complete campaign with a clear finish line. Ongoing management after the campaign
                is discussed separately.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6"
            >
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                Note on 5M Views Guarantee
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                The 5M views guarantee is based on an account starting from scratch or with
                inconsistent posting history. If your brand already generates 100K+ monthly reach
                through existing consistent content, the outcome projection will differ — and will be
                discussed after a full page analysis and narrative review before we commit to a number.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-2xl border-2 border-[var(--gold)] bg-[var(--gold)]/5 p-6 text-center"
            >
              <p className="font-sans text-lg font-bold uppercase tracking-wider text-[var(--gold)]">
                5 Million Views — Guaranteed
              </p>
              <p className="mt-2 font-sans text-sm text-[var(--text-muted)]">
                If we do not hit 5M combined views, we keep working at zero additional cost.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--gold)] px-8 font-sans text-sm font-semibold text-[var(--bg-primary)] transition-all hover:scale-[1.04]"
          >
            Claim Your Spot
          </a>
        </motion.div>
      </div>
    </section>
  );
}

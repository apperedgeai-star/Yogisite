"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SITE } from "@/lib/site";

const bio = `I believe in one simple truth: execution teaches more than education. My journey —
from selling first-copy fashion on Instagram during college to leading high-growth
startups across India — is built on doing, learning, and building things that work.

Over the last nine years, I've operated across multiple verticals including
marketing-tech, e-commerce, fundraising, operations, and branding. I've served as
Chief Operating Officer and Chief Marketing Officer and now founder, and in each of
these roles, I didn't just contribute — I executed, built systems, raised funds,
hired teams, and turned chaos into clarity.

At Apnaadz.media, I built a content marketing-tech platform helping business/agency
owners and MSMEs grow through automated digital systems.

At Scalelot Technologies, I rose in days — a leap driven by trust in my ability to
get things done. At Festum Evento Pvt Ltd, I led investor relations, created pitch
decks, established a UAE-based entity, and oversaw tech, brand, and operational expansion.

Recently, I was selected by Master's Union — one of India's most elite B-schools.
I cleared all three interview rounds and received their highest-ever scholarship offer
of 35%. After deep reflection, I declined the admission. Not because I lacked ambition,
but because I wanted to go all-in on my next venture.

I don't just talk about growth. I engineer it.`;

const paragraphs = bio.split("\n\n");

export default function Founder() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
        <motion.div {...fadeUp} className="relative aspect-square max-w-md overflow-hidden rounded-2xl lg:max-w-none">
          <Image
            src="/images/yogii-portrait.jpg"
            alt="Yogii Kumar"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        </motion.div>

        <motion.div {...fadeUp}>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            The Founder
          </p>
          <h2 className="mt-3 font-display text-5xl text-[var(--text-primary)]">Yogii Kumar</h2>
          <p className="mt-2 font-sans text-sm text-[var(--text-muted)]">
            Former COO &amp; CMO · Founder, Recun Marketing 18
          </p>

          <div className="mt-8 space-y-4 font-sans text-base leading-relaxed text-[var(--text-muted)]">
            {(expanded ? paragraphs : paragraphs.slice(0, 2)).map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            <div className="hidden lg:block">
              {paragraphs.slice(2).map((p) => (
                <p key={p.slice(0, 48)} className="mt-4">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-4 font-sans text-sm text-[var(--gold)] underline underline-offset-4 lg:hidden"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--gold)] px-8 font-sans text-sm font-semibold text-[var(--bg-primary)]"
            >
              Book a Call
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--border)] px-8 font-sans text-sm font-medium text-[var(--text-primary)]"
            >
              Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

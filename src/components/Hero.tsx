"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { HERO_VIDEO } from "@/lib/videos";
import { SITE } from "@/lib/site";
import { fadeUp } from "@/lib/animations";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32"
      style={{ background: "var(--gradient-hero), var(--bg-primary)" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.p
            {...fadeUp}
            className="mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]"
          >
            Personal · Business Branding &amp; Distribution Agency
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-display text-[clamp(3rem,10vw,5.5rem)] font-normal leading-[0.95] text-[var(--text-primary)]"
          >
            We make
            <br />
            founder
            <br />
            famous.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-6 max-w-md font-sans text-base leading-relaxed text-[var(--text-muted)]"
          >
            Your competitor is less skilled.
            <br />
            But they&apos;re more visible.
            <br />
            The gap is distribution. We close it.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--gold)] px-8 font-sans text-sm font-semibold text-[var(--bg-primary)] transition-all hover:scale-[1.04] hover:bg-[var(--gold-light)] hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
            >
              Claim Your Spot →
            </a>
            <a
              href={SITE.seeOurWork}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--border)] px-8 font-sans text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              See Our Work
            </a>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="group relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            className="relative aspect-[9/16] max-h-[60vw] overflow-hidden rounded-3xl border border-[var(--border)] shadow-[0_0_60px_rgba(201,168,76,0.15)] transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_80px_rgba(201,168,76,0.25)] lg:ml-auto lg:max-h-[85vh]"
          >
            <LazyVideo src={HERO_VIDEO} className="absolute inset-0" eager />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

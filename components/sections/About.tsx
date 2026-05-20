"use client";

import { ParallaxImage } from "@/components/ui/ParallaxImage";

const BODY_PARAGRAPHS = [
  "COO and CMO at two startups simultaneously.",
  "Secured ₹2 crore in funding for Festum Evento.",
  "Established a UAE entity from scratch.",
  "Built an AI SaaS prototype valued at $1M+ pre-launch.",
  "Selected by Master's Union — India's most elite business school. Cleared all 3 rounds. Received the highest-ever 35% scholarship.",
];

const STAT_PILLS = [
  "₹2 Cr Raised",
  "UAE Entity",
  "$1M+ SaaS",
  "35% Scholarship Declined",
];

export default function About() {
  return (
    <section id="about" className="section-padding relative z-content bg-void">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        {/* Left — copy */}
        <div className="order-2 lg:order-1 lg:pr-4">
          <p className="font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
            The Founder
          </p>

          <h2
            className="mt-6 font-editorial font-normal text-primary"
            style={{
              fontSize: "clamp(40px, 7vw, 96px)",
              lineHeight: 0.88,
            }}
          >
            <span className="block">Execution</span>
            <span className="block">over</span>
            <span className="block">everything.</span>
          </h2>

          <div
            className="mt-8 space-y-4 font-satoshi leading-relaxed text-secondary"
            style={{ fontSize: "var(--text-base)" }}
          >
            {BODY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <blockquote
            className="my-8 border-l-2 border-gold-300 pl-6 font-editorial italic text-gold-300"
            style={{ fontSize: "clamp(18px, 1.8vw, 28px)", lineHeight: 1.2 }}
          >
            &ldquo;I chose execution over education.&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            {STAT_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[var(--border-visible)] px-4 py-2.5 font-satoshi text-xs tracking-wide text-secondary"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right — portrait */}
        <div className="relative order-1 lg:order-2 lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-sm">
            <ParallaxImage
              src="/images/yogii-portrait.jpg"
              alt="Yogii Kumar — Founder, Recun Marketing 18"
              height="h-[700px]"
              className="rounded-sm"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 60%, var(--bg-void) 100%)",
              }}
              aria-hidden
            />
            <span
              className="pointer-events-none absolute right-3 top-1/2 z-10 origin-center -translate-y-1/2 rotate-[-90deg] font-satoshi text-[10px] uppercase tracking-[0.35em] text-muted"
              aria-hidden
            >
              ©Yogii Kumar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

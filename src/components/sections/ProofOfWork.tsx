"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { CLIENT_CASES, TESTIMONIALS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

const IMAGE_MAP = {
  vision11: ASSETS.clients.vision11,
  starbucks: ASSETS.clients.starbucks,
  rapido: ASSETS.clients.rapido,
} as const;

export default function ProofOfWork() {
  return (
    <section id="work" className="section-surface section-surface--proof section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Case Studies"
          title="Results that can't be faked."
          className="mb-10 md:mb-14"
        />

        <div className="proof-grid grid gap-5 md:grid-cols-3 md:gap-6">
          {CLIENT_CASES.map((c) => (
            <article key={c.id} className="surface-card client-card overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--deep)]">
                <Image
                  src={IMAGE_MAP[c.id]}
                  alt={c.title}
                  fill
                  className="client-card__image object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="type-label text-[var(--t3)]">{c.eyebrow}</p>
                <h3 className="type-body-strong mt-2 text-lg">{c.title}</h3>
                <p className="type-body mt-2 text-sm">{c.description}</p>
                <p className="problem-stat-number mt-4 text-2xl text-gold-300">
                  {c.stat}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 border-t border-[var(--b1)] pt-12 md:mt-16">
          <p className="type-label mb-6">Industry voices</p>
          <div className="grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author} className="surface-card border-l-2 border-l-[var(--g300)] p-6 md:p-7">
                <p className="type-body">&ldquo;{t.quote}&rdquo;</p>
                <footer className="type-body-strong mt-4 text-[var(--t2)]">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

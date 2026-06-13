"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { CLIENT_CASES } from "@/lib/content";

const IMAGE_MAP = {
  vision11: ASSETS.clients.vision11,
  starbucks: ASSETS.clients.starbucks,
  rapido: ASSETS.clients.rapido,
} as const;

export default function ProofOfWork() {
  return (
    <section id="work" className="section-surface section-surface--proof section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <p className="type-label mb-4">Case Studies</p>
        <h2 className="type-section mb-10 md:mb-14">Results that can&apos;t be faked.</h2>

        <div className="proof-grid">
          {CLIENT_CASES.map((c) => (
            <article key={c.id} className="client-card glass-card relative overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface)]">
                <Image
                  src={IMAGE_MAP[c.id]}
                  alt={c.title}
                  fill
                  className="client-card__image object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="client-card__overlay" aria-hidden />
                <div className="client-card__scrim" aria-hidden />
              </div>
              <div className="client-card__content relative p-6">
                <p className="client-card__client">{c.eyebrow}</p>
                <h3 className="client-card__campaign">{c.title}</h3>
                <p className="type-body mt-2 text-sm">{c.description}</p>
                <p className="client-card__result mt-3">
                  {c.stat}
                  <span className="client-card__result-label"> · Delivered</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

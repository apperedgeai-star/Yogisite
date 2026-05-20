"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";

type BrandCard = {
  id: string;
  client: string;
  campaign: string;
  result?: string;
  quote?: string;
  image: string;
  imageAlt: string;
};

const BRAND_CARDS: BrandCard[] = [
  {
    id: "vision11",
    client: "Vision11",
    campaign: "Vision11 × CSK · IPL 2025",
    result: "50M+ Views",
    image: ASSETS.clients.vision11,
    imageAlt: "Vision11 × CSK campaign",
  },
  {
    id: "starbucks",
    client: "Starbucks India",
    campaign: "Starbucks India",
    quote: "Global brand standards. Premium shoots, delivered on brief.",
    image: ASSETS.clients.starbucks,
    imageAlt: "Starbucks India campaign",
  },
  {
    id: "rapido",
    client: "Rapido",
    campaign: "Rapido",
    quote: "Humanising India's leading ride platform",
    image: ASSETS.clients.rapido,
    imageAlt: "Rapido campaign",
  },
];

const CREATORS = [
  { name: "Nawaz Shaikh", followers: "1.6M+", role: "Creator partner" },
  { name: "Riya Upreti", followers: "999K", role: "Creator partner" },
  { name: "CA Jay Desai", followers: "400K", role: "Creator partner" },
  { name: "Kaushal Pandey", followers: "105K", role: "Creator partner" },
  { name: "Harsh K.", followers: "100K", role: "Creator partner" },
  { name: "Viplav Panghal", followers: "190K", role: "Creator partner" },
];

function BrandProofCard({ card }: { card: BrandCard }) {
  return (
    <article className="proof-brand-card group">
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 33vw"
        loading="lazy"
      />
      <div className="proof-brand-card__overlay" aria-hidden />
      <div className="proof-brand-card__content">
        <p className="proof-client-name">{card.client}</p>
        <p className="proof-campaign">{card.campaign}</p>
        {card.result && <p className="proof-result">{card.result}</p>}
        {card.quote && !card.result && (
          <p className="proof-result" style={{ fontWeight: 400, color: "var(--t2)" }}>
            {card.quote}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ProofOfWork() {
  return (
    <section
      id="work"
      className="section-padding relative z-content bg-[var(--void)]"
    >
      <div className="mx-auto max-w-7xl">
        <p className="type-label mb-4">The Work Speaks</p>
        <h2 className="type-section mb-10 md:mb-14">
          Results that can&apos;t be faked.
        </h2>

        <div className="proof-grid">
          {BRAND_CARDS.map((card) => (
            <BrandProofCard key={card.id} card={card} />
          ))}

          <article className="proof-card proof-card--wide border border-[var(--b1)] p-6 md:p-8">
            <h3 className="type-subhead mb-6">10+ A-List Creator Partnerships</h3>
            <ul className="divide-y divide-[var(--b1)]">
              {CREATORS.map((creator) => (
                <li key={creator.name} className="proof-creator-row">
                  <span className="proof-creator-avatar" aria-hidden>
                    {creator.name.charAt(0)}
                  </span>
                  <div>
                    <p
                      className="font-satoshi text-sm font-semibold"
                      style={{ color: "var(--t1)" }}
                    >
                      {creator.name}
                    </p>
                    <p className="proof-result text-[13px]">{creator.followers}</p>
                    <p className="type-caption">{creator.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

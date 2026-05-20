"use client";

import { ASSETS } from "@/lib/assets";
import { ClientCard } from "@/components/ui/ClientCard";

const CLIENT_CARDS = [
  {
    id: "vision11",
    imageSrc: ASSETS.clients.vision11,
    clientName: "Vision11 × CSK",
    campaign: "IPL 2025 Campaign",
    result: "50M+",
    resultLabel: "Views Delivered",
    imageAlt: "Vision11 × CSK campaign",
  },
  {
    id: "starbucks",
    imageSrc: ASSETS.clients.starbucks,
    clientName: "Starbucks India",
    campaign: "Premium Content Shoots",
    result: "Global",
    resultLabel: "Brand Standards",
    imageAlt: "Starbucks India campaign",
  },
  {
    id: "rapido",
    imageSrc: ASSETS.clients.rapido,
    clientName: "Rapido",
    campaign: "Platform Humanisation",
    result: "India's #1",
    resultLabel: "Bike Taxi Platform",
    imageAlt: "Rapido campaign",
  },
] as const;

const CREATORS = [
  { name: "Nawaz Shaikh", followers: "1.6M+", role: "Creator partner" },
  { name: "Riya Upreti", followers: "999K", role: "Creator partner" },
  { name: "CA Jay Desai", followers: "400K", role: "Creator partner" },
  { name: "Kaushal Pandey", followers: "105K", role: "Creator partner" },
  { name: "Harsh K.", followers: "100K", role: "Creator partner" },
  { name: "Viplav Panghal", followers: "190K", role: "Creator partner" },
];

export default function ProofOfWork() {
  return (
    <section
      id="work"
      className="section-surface section-surface--proof section-padding relative z-content"
    >
      <div className="mx-auto max-w-7xl">
        <p className="type-label mb-4">The Work Speaks</p>
        <h2 className="type-section mb-10 md:mb-14">
          Results that can&apos;t be faked.
        </h2>

        <div className="proof-grid">
          {CLIENT_CARDS.map(({ id, ...card }) => (
            <ClientCard key={id} {...card} />
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

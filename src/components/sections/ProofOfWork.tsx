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
  { name: "Nawaz Shaikh", followers: "1.6M+" },
  { name: "Riya Upreti", followers: "999K" },
  { name: "CA Jay Desai", followers: "400K" },
  { name: "Kaushal Pandey", followers: "105K" },
  { name: "Harsh K.", followers: "100K" },
  { name: "Viplav Panghal", followers: "190K" },
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

          <article className="proof-card proof-card--wide glass-card p-6 md:p-8">
            <h3 className="type-subhead mb-6">10+ A-List Creator Partnerships</h3>
            <div className="proof-creator-grid">
              {CREATORS.map((creator) => (
                <div key={creator.name} className="proof-creator-cell">
                  <div className="proof-creator-name">{creator.name}</div>
                  <div className="proof-creator-followers">{creator.followers}</div>
                  <div className="proof-creator-role">Creator Partner</div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

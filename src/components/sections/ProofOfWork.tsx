"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";

type BrandCard = {
  id: string;
  title: string;
  metric?: string;
  note?: string;
  quote?: string;
  image?: string;
  imageAlt?: string;
  fallbackLetter?: string;
};

const BRAND_CARDS: BrandCard[] = [
  {
    id: "vision11",
    title: "Vision11 × CSK · IPL 2025",
    metric: "50M+ Views",
    note: "Complete business & content strategy",
    image: ASSETS.clients.vision11,
    imageAlt: "Vision11",
    fallbackLetter: "V",
  },
  {
    id: "starbucks",
    title: "Starbucks India",
    quote: "Global brand standards. Premium shoots.",
    image: ASSETS.clients.starbucks,
    imageAlt: "Starbucks India",
    fallbackLetter: "S",
  },
  {
    id: "rapido",
    title: "Rapido",
    quote: "Humanising India's leading ride platform",
    image: ASSETS.clients.rapido,
    imageAlt: "Rapido",
    fallbackLetter: "R",
  },
];

const CREATORS = [
  { name: "Nawaz Shaikh", followers: "1.6M+" },
  { name: "Riya Upreti", followers: "999K" },
  { name: "CA Jay Desai", followers: "400K" },
  { name: "Kaushal Pandey", followers: "105K" },
  { name: "Harsh K.", followers: "100K" },
  { name: "Viplav Panghal", followers: "190K" },
];

function ProofImage({
  src,
  alt,
  letter,
}: {
  src?: string;
  alt: string;
  letter: string;
}) {
  if (src) {
    return (
      <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-sm border border-[var(--b1)] bg-[var(--void)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-left p-4 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className="mb-6 flex aspect-[16/10] w-full items-center justify-center rounded-sm border border-[var(--b1)]"
      style={{
        background: "linear-gradient(135deg, #111111 0%, #1a1a0a 100%)",
      }}
      aria-hidden
    >
      <span
        className="font-editorial select-none"
        style={{ fontSize: "clamp(48px, 8vw, 72px)", color: "var(--g300)" }}
      >
        {letter}
      </span>
    </div>
  );
}

function BrandProofCard({ card }: { card: BrandCard }) {
  return (
    <article className="proof-card group flex flex-col rounded-sm border p-6">
      <ProofImage
        src={card.image}
        alt={card.imageAlt ?? card.title}
        letter={card.fallbackLetter ?? card.title.charAt(0)}
      />
      <div className="mt-auto">
        <h3
          className="font-editorial font-normal"
          style={{ fontSize: "var(--f-lg)", color: "var(--t1)", lineHeight: 1.15 }}
        >
          {card.title}
        </h3>
        {card.metric && (
          <p className="metric-number mt-2" style={{ fontSize: "var(--f-md)" }}>
            {card.metric}
          </p>
        )}
        {card.note && (
          <p
            className="mt-2 font-satoshi"
            style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
          >
            {card.note}
          </p>
        )}
        {card.quote && (
          <p
            className="mt-3 font-satoshi leading-relaxed"
            style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
          >
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
        <p
          className="mb-4 font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.45em",
            color: "var(--g300)",
          }}
        >
          The Work Speaks
        </p>
        <h2
          className="mb-10 font-editorial font-normal md:mb-14"
          style={{
            fontSize: "var(--f-2xl)",
            color: "var(--t1)",
            lineHeight: 1.05,
          }}
        >
          Results that can&apos;t be faked.
        </h2>

        <div className="proof-grid">
          {BRAND_CARDS.map((card) => (
            <BrandProofCard key={card.id} card={card} />
          ))}

          <article className="proof-card proof-card--wide group rounded-sm border p-6 md:p-8">
            <h3
              className="mb-6 font-editorial font-normal"
              style={{
                fontSize: "var(--f-xl)",
                color: "var(--t1)",
                lineHeight: 1.1,
              }}
            >
              10+ A-List Creator Partnerships
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CREATORS.map((creator) => (
                <li
                  key={creator.name}
                  className="font-satoshi"
                  style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
                >
                  <span style={{ color: "var(--t1)" }}>{creator.name}</span>
                  {" "}
                  <span className="metric-number" style={{ fontSize: "inherit" }}>
                    {creator.followers}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

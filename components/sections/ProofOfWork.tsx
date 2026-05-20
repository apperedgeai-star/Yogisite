"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type ProofCard = {
  id: string;
  size: "tall" | "short" | "medium";
  title: string;
  subtitle?: string;
  quote?: string;
  detail?: string;
  roster?: string[];
  logo?: string;
  logoAlt?: string;
};

const CARDS: ProofCard[] = [
  {
    id: "vision11",
    size: "tall",
    title: "Vision11 × CSK",
    subtitle: "IPL 2025 Campaign",
    quote: "50M+ Views Delivered",
    logo: "/images/clients/vision11.png",
    logoAlt: "Vision11",
  },
  {
    id: "starbucks",
    size: "short",
    title: "Starbucks India",
    quote: "Global brand standards maintained",
    logo: "/images/clients/starbucks.png",
    logoAlt: "Starbucks India",
  },
  {
    id: "rapido",
    size: "short",
    title: "Rapido",
    quote: "Humanising India's platform",
    logo: "/images/clients/rapido.webp",
    logoAlt: "Rapido",
  },
  {
    id: "nawaz",
    size: "medium",
    title: "Nawaz Shaikh",
    subtitle: "1.6M+ Followers",
    detail: "Research · Scripting · Strategy",
  },
  {
    id: "riya",
    size: "medium",
    title: "Riya Upreti",
    subtitle: "999K Followers",
  },
  {
    id: "roster",
    size: "tall",
    title: "Creator Roster",
    roster: [
      "CA Jay Desai 400K",
      "Kaushal Pandey 105K",
      "Harsh K. 100K",
      "Viplav Panghal 190K",
    ],
  },
];

const SIZE_CLASS = {
  tall: "min-h-[340px] md:min-h-[420px]",
  medium: "min-h-[220px] md:min-h-[260px]",
  short: "min-h-[160px] md:min-h-[190px]",
} as const;

function ProofCardArticle({ card }: { card: ProofCard }) {
  return (
    <article
      className={cn(
        "proof-card group flex flex-col rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 md:p-8",
        SIZE_CLASS[card.size]
      )}
    >
      {card.logo && (
        <div className="relative mb-6 h-16 w-full max-w-[140px] overflow-hidden md:h-20">
          <Image
            src={card.logo}
            alt={card.logoAlt ?? card.title}
            fill
            className="object-contain object-left opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            sizes="140px"
            loading="lazy"
          />
        </div>
      )}

      <div className="mt-auto">
        <h3 className="font-editorial text-2xl text-primary md:text-3xl">
          {card.title}
        </h3>

        {card.subtitle && (
          <p className="mt-2 font-satoshi text-sm text-gold-300 md:text-base">
            {card.subtitle}
          </p>
        )}

        {card.quote && (
          <p
            className={cn(
              "mt-3 font-satoshi",
              card.id === "vision11"
                ? "text-lg text-gold-300 md:text-xl"
                : "text-sm text-secondary md:text-base"
            )}
          >
            {card.id === "vision11" ? (
              card.quote
            ) : (
              <span>&ldquo;{card.quote}&rdquo;</span>
            )}
          </p>
        )}

        {card.detail && (
          <p className="mt-4 font-satoshi text-xs uppercase tracking-[0.15em] text-muted">
            {card.detail}
          </p>
        )}

        {card.roster && (
          <ul className="mt-5 space-y-2 border-t border-[var(--border-subtle)] pt-5 font-satoshi text-sm text-secondary md:text-base">
            {card.roster.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-gold-300/80" aria-hidden>
                  ·
                </span>
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function ProofOfWork() {
  return (
    <section
      id="work"
      className="section-padding relative z-content bg-void"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
          The Work Speaks
        </p>
        <h2
          className="mb-12 font-editorial font-normal text-primary md:mb-16"
          style={{ fontSize: "clamp(32px, 4vw, 64px)", lineHeight: 1.05 }}
        >
          Results that can&apos;t be faked.
        </h2>

        <div className="proof-masonry">
          {CARDS.map((card) => (
            <ProofCardArticle key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

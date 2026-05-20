"use client";

import { ASSETS } from "@/lib/assets";

const DIVIDER = (
  <span className="marquee-divider shrink-0" aria-hidden />
);

export type MarqueeItem =
  | { kind: "logo"; src: string; alt: string }
  | { kind: "text"; label: string };

export const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  { kind: "logo", src: ASSETS.clients.vision11, alt: "Vision11" },
  { kind: "text", label: "50M+ Views" },
  { kind: "logo", src: ASSETS.clients.starbucks, alt: "Starbucks India" },
  { kind: "text", label: "3+ National Brands" },
  { kind: "logo", src: ASSETS.clients.rapido, alt: "Rapido" },
  { kind: "text", label: "10+ A-List Creators" },
  { kind: "text", label: "Global Campaigns" },
  { kind: "text", label: "Platform Content" },
];

type MarqueeProps = {
  items?: MarqueeItem[];
  className?: string;
};

function MarqueeLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="marquee-logo-img mx-4 block shrink-0"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

function MarqueeTrack({
  items,
  ariaHidden,
}: {
  items: MarqueeItem[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="marquee-proof-track flex shrink-0 items-center"
      aria-hidden={ariaHidden}
    >
      {items.map((item, i) => (
        <span key={`${item.kind}-${i}`} className="flex shrink-0 items-center">
          {i > 0 && DIVIDER}
          {item.kind === "logo" ? (
            <MarqueeLogo src={item.src} alt={item.alt} />
          ) : (
            <span className="marquee-proof-text px-3">{item.label}</span>
          )}
        </span>
      ))}
      {DIVIDER}
    </div>
  );
}

/** Infinite CSS marquee — duplicate track for seamless loop. */
export function Marquee({
  items = DEFAULT_MARQUEE_ITEMS,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`marquee-proof-viewport marquee-proof-bar flex items-center overflow-hidden ${className}`}
    >
      <div className="marquee-proof-inner flex w-max items-center">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} ariaHidden />
      </div>
    </div>
  );
}

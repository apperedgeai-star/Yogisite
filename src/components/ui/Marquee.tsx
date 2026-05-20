import Image from "next/image";
import { ASSETS } from "@/lib/assets";

const STAR = (
  <span className="marquee-star shrink-0" aria-hidden>
    ★
  </span>
);

export type MarqueeItem =
  | { kind: "logo"; src: string; alt: string }
  | { kind: "text"; label: string };

export const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  { kind: "logo", src: ASSETS.clients.vision11, alt: "Vision11" },
  { kind: "text", label: "50M+ Views" },
  { kind: "logo", src: ASSETS.clients.starbucks, alt: "Starbucks" },
  { kind: "text", label: "Global Campaigns" },
  { kind: "logo", src: ASSETS.clients.rapido, alt: "Rapido" },
  { kind: "text", label: "Platform Content" },
  { kind: "text", label: "10+ A-List Creators" },
  { kind: "text", label: "3 National Brands" },
  { kind: "text", label: "₹2L/Month" },
  { kind: "text", label: "50K Followers Guaranteed" },
];

type MarqueeProps = {
  items?: MarqueeItem[];
  className?: string;
  heightClass?: string;
};

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
          {i > 0 && STAR}
          {item.kind === "logo" ? (
            <span className="relative mx-3 inline-flex h-6 w-20 shrink-0 overflow-hidden md:h-7 md:w-24">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-contain object-center opacity-80"
                sizes="96px"
              />
            </span>
          ) : (
            <span className="marquee-proof-text whitespace-nowrap px-1 font-satoshi uppercase">
              {item.label}
            </span>
          )}
        </span>
      ))}
      {STAR}
    </div>
  );
}

/** Infinite CSS marquee — duplicate track for seamless loop. */
export function Marquee({
  items = DEFAULT_MARQUEE_ITEMS,
  className = "",
  heightClass = "h-12",
}: MarqueeProps) {
  return (
    <div
      className={`marquee-proof-viewport flex ${heightClass} items-center overflow-hidden ${className}`}
    >
      <div className="marquee-proof-inner flex w-max">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} ariaHidden />
      </div>
    </div>
  );
}

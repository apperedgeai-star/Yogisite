"use client";

import { TICKER_ITEMS } from "@/lib/content";

export default function Ticker() {
  const row = TICKER_ITEMS.map((item, i) => (
    <span key={item} className="flex shrink-0 items-center">
      <span className="type-label" style={{ color: "var(--g300)" }}>
        {item}
      </span>
      {i < TICKER_ITEMS.length - 1 && (
        <span className="marquee-divider mx-8" aria-hidden />
      )}
    </span>
  ));

  return (
    <div className="ticker-root relative z-content overflow-hidden border-y border-[var(--b1)] bg-[var(--void)] py-4">
      <div className="ticker-track flex w-max items-center">
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
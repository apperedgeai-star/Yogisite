"use client";

const items = [
  "Personal Branding",
  "Business Branding",
  "PR & Distribution",
  "AI System Deployment",
  "Creator Program",
];

export default function Ticker() {
  const row = items.map((item, i) => (
    <span key={item} className="flex shrink-0 items-center">
      <span className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
        {item}
      </span>
      {i < items.length - 1 && (
        <span className="mx-6 h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-60" />
      )}
    </span>
  ));

  return (
    <div className="ticker-root overflow-hidden border-b border-[var(--border)] bg-[var(--bg-primary)] py-4">
      <div className="ticker-track flex w-max gap-0">
        {row}
        {row}
      </div>
    </div>
  );
}

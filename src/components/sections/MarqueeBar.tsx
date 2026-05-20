import { Marquee } from "@/components/ui/Marquee";

export default function MarqueeBar() {
  return (
    <section
      className="marquee-proof-root relative z-content border-y bg-[var(--surface)]"
      style={{ borderColor: "var(--b1)" }}
      aria-label="Client proof highlights"
    >
      <Marquee />
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Drama, Sparkles, Megaphone, Globe, Zap, Wrench } from "lucide-react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { subVideos } from "@/lib/videos";

const cards = [
  {
    label: "AI Clone Videos",
    title: "Your Face. Your Voice. Without a Shoot.",
    desc: "AI clone of the founder. Scripted, produced, and posted using your voice and likeness — no camera needed.",
    tags: ["Personal Branding", "Dragon's Head"],
    accent: "var(--gold)",
    icons: [Drama, Sparkles, Megaphone],
    badge: "POSTED TO 4 PLATFORMS",
    sub: "IG · YT · FB · LinkedIn",
    previews: subVideos.slice(0, 4),
  },
  {
    label: "Generative Brand Videos",
    title: "Ad-Ready. Scroll-Stopping. Produced at Scale.",
    desc: "Generative AI video for product and service brands. Ready to run as organic or paid ads — no traditional shoot.",
    tags: ["Product Brands", "Service Brands"],
    accent: "var(--electric)",
    icons: [Sparkles, Megaphone, Megaphone],
    badge: "PAID AD READY",
    sub: "Meta · YouTube · Insta",
    previews: subVideos.slice(4, 7),
  },
  {
    label: "Website & Software Deployment",
    title: "Digital Systems That Work While You Sleep.",
    desc: "Websites, landing pages, and digital tools — fully built and deployed. No technical knowledge needed.",
    tags: ["Websites", "Landing Pages", "Softwares"],
    accent: "var(--neon)",
    icons: [Globe, Zap, Wrench],
    badge: "DIGITAL TOOLS",
    sub: "Software that runs 24/7",
    previews: subVideos.slice(7, 10),
  },
];

function AICard({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % card.previews.length);
    }, 3000);
    return () => clearInterval(t);
  }, [card.previews.length]);

  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 transition-all hover:border-transparent"
      style={{
        background:
          "linear-gradient(var(--bg-secondary), var(--bg-secondary)) padding-box, linear-gradient(135deg, var(--electric), var(--gold)) border-box",
      }}
    >
      <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-[var(--bg-tertiary)]">
        <LazyVideo src={card.previews[active]} />
        <p
          className="absolute left-3 top-3 font-sans text-[10px] font-bold uppercase tracking-wider"
          style={{ color: card.accent }}
        >
          {card.badge}
        </p>
        <p className="absolute bottom-3 left-3 font-sans text-[10px] text-[var(--text-muted)]">
          {card.sub}
        </p>
        <p className="absolute bottom-3 right-3 font-sans text-[10px] text-[var(--text-muted)]">
          GIF {active + 1} / {card.previews.length}
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        {card.icons.map((Icon, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i % card.previews.length)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              i === active % card.icons.length
                ? "border-current"
                : "border-[var(--border)] text-[var(--text-muted)]"
            }`}
            style={i === active % card.icons.length ? { color: card.accent, borderColor: card.accent } : {}}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      <p className="font-sans text-xs font-medium uppercase tracking-wider" style={{ color: card.accent }}>
        {card.label}
      </p>
      <h3 className="mt-2 font-display text-xl text-[var(--text-primary)]">{card.title}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--text-muted)]">{card.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] px-3 py-1 font-sans text-[10px] text-[var(--text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function RecunAI() {
  return (
    <section className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 text-center md:text-left">
          <p className="flex items-center justify-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.3em] text-[var(--neon)] md:justify-start">
            <span className="h-2 w-2 rounded-full bg-[var(--neon)]" />
            Built on AI
          </p>
          <h2 className="mt-4 font-display text-4xl text-[var(--text-primary)] md:text-5xl">
            We Don&apos;t Just Create Content. We Engineer It.
          </h2>
          <p className="mt-4 font-sans text-sm text-[var(--text-muted)]">
            Each card below shows real examples of what we produce — click any thumbnail or watch them auto-cycle.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid gap-6 lg:grid-cols-3"
        >
          {cards.map((card, i) => (
            <AICard key={card.label} card={card} index={i} />
          ))}
        </motion.div>

        <motion.p
          {...fadeUp}
          className="mt-10 flex items-center justify-center gap-2 text-center font-sans text-sm italic text-[var(--text-muted)] md:justify-start"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)]" />
          AI Clone content is already live inside Dragon&apos;s Head — powering founders who can&apos;t shoot daily.
        </motion.p>
      </div>
    </section>
  );
}

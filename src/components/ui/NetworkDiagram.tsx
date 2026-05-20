"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";

const PLATFORM_CHIPS = [
  { id: "ig-business", label: "IG Business", top: "12%", left: "52%" },
  { id: "ig-motivation", label: "IG Motivation", top: "18%", left: "72%" },
  { id: "ig-industry", label: "IG Industry", top: "42%", left: "88%" },
  { id: "yt-main", label: "YT Main", top: "65%", left: "78%" },
  { id: "yt-clips", label: "YT Clips", top: "80%", left: "58%" },
  { id: "linkedin", label: "LinkedIn", top: "82%", left: "38%" },
  { id: "twitter", label: "Twitter/X", top: "68%", left: "18%" },
  { id: "threads", label: "Threads", top: "40%", left: "8%" },
  { id: "podcast", label: "Podcast", top: "18%", left: "26%" },
] as const;

/** Scattered ambient dots — fixed positions, varied delays */
const AMBIENT_DOTS = [
  { top: "22%", left: "44%", delay: "0s" },
  { top: "55%", left: "62%", delay: "0.4s" },
  { top: "72%", left: "28%", delay: "0.9s" },
  { top: "35%", left: "18%", delay: "1.2s" },
  { top: "48%", left: "92%", delay: "1.6s" },
  { top: "88%", left: "48%", delay: "2.1s" },
  { top: "12%", left: "38%", delay: "2.5s" },
  { top: "58%", left: "8%", delay: "0.7s" },
  { top: "28%", left: "78%", delay: "1.9s" },
] as const;

export function NetworkDiagram() {
  const reduced = useReducedMotion();
  const [activeChip, setActiveChip] = useState(0);

  const chipCount = PLATFORM_CHIPS.length;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveChip((i) => (i + 1) % chipCount);
    }, 1500);
    return () => window.clearInterval(id);
  }, [reduced, chipCount]);

  const particles = useMemo(() => AMBIENT_DOTS, []);

  return (
    <div
      className="network-diagram-card relative aspect-[4/3] w-full overflow-hidden rounded-sm border md:aspect-video"
      style={{
        borderColor: "var(--b-gold)",
        boxShadow: "0 0 60px rgba(212, 168, 67, 0.08)",
      }}
      role="img"
      aria-label="Distribution network: your main page connected to nine platform channels"
    >
      <div
        className={cn(
          "absolute inset-0",
          !reduced && "network-diagram-zoom"
        )}
      >
        <Image
          src={ASSETS.networkShowcase}
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.45)" }}
        aria-hidden
      />

      {!reduced &&
        particles.map((dot, i) => (
          <span
            key={i}
            className="network-diagram-particle pointer-events-none absolute h-1 w-1 rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              background: "var(--g300)",
              animationDelay: dot.delay,
            }}
            aria-hidden
          />
        ))}

      {!reduced && (
        <div
          className="network-diagram-pulse pointer-events-none absolute z-[2]"
          style={{
            top: "48%",
            left: "50%",
            width: 48,
            height: 48,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
          }}
          aria-hidden
        />
      )}

      <div
        className="pointer-events-none absolute z-[3] whitespace-pre-line text-center font-satoshi font-bold uppercase tracking-wide text-white"
        style={{
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 11,
          lineHeight: 1.35,
          textShadow: "0 1px 12px rgba(0,0,0,0.8)",
        }}
      >
        {"YOUR\nMAIN PAGE"}
      </div>

      {PLATFORM_CHIPS.map((chip, i) => (
        <motion.span
          key={chip.id}
          className={cn(
            "network-diagram-chip pointer-events-none absolute z-[4] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-satoshi uppercase",
            !reduced && activeChip === i && "network-diagram-chip--active"
          )}
          style={{
            top: chip.top,
            left: chip.left,
            padding: "4px 10px",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "var(--g300)",
            background: "rgba(0, 0, 0, 0.65)",
            border: "1px solid rgba(212, 168, 67, 0.4)",
            borderRadius: 100,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.3 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
}

export default NetworkDiagram;

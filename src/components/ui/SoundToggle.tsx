"use client";

import { useEffect, useState } from "react";
import { heroVideoEngine } from "@/lib/hero-video";
import { cn } from "@/lib/utils";

const BAR_DURATIONS = [0.6, 0.8, 0.5, 0.9, 0.7] as const;
const BAR_HEIGHTS = [12, 18, 10, 16, 14] as const;

type SoundToggleProps = {
  variant?: "dock" | "inline";
};

function SoundBars({ playing, compact }: { playing: boolean; compact?: boolean }) {
  const width = 20;
  const height = compact ? 16 : 20;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
      aria-hidden
    >
      {BAR_HEIGHTS.map((barHeight, i) => {
        const x = i * 4 + 1;
        const y = height - barHeight;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={3}
            height={barHeight}
            rx={1}
            fill="var(--g300)"
            className="origin-bottom"
            style={{
              transformOrigin: `${x + 1.5}px ${height}px`,
              transform: playing ? undefined : "scaleY(0.2)",
              opacity: playing ? 1 : 0.4,
              animation: playing
                ? `soundBarPulse ${BAR_DURATIONS[i]}s ease-in-out infinite alternate`
                : "none",
            }}
          />
        );
      })}
    </svg>
  );
}

export default function SoundToggle({ variant = "dock" }: SoundToggleProps) {
  const [audible, setAudible] = useState(false);
  const inline = variant === "inline";

  useEffect(() => heroVideoEngine.subscribe(setAudible), []);

  return (
    <button
      type="button"
      onClick={() => void heroVideoEngine.toggle()}
      className={cn(
        "hoverable flex items-center gap-2.5 transition-colors",
        inline
          ? "rounded-full border border-[var(--b1)] bg-[var(--void)]/80 px-3 py-2 hover:border-[var(--b-gold)]"
          : [
              "fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[var(--z-float)]",
              "rounded-full border border-[var(--b1)] bg-[var(--deep)]/90 px-4 py-3 backdrop-blur-md",
              "hover:border-[var(--b-gold)]",
            ]
      )}
      aria-label={audible ? "Mute hero video" : "Unmute hero video"}
      aria-pressed={audible}
    >
      <SoundBars playing={audible} compact={inline} />
      <span
        className="font-satoshi uppercase"
        style={{
          fontSize: "var(--f-xs)",
          letterSpacing: "0.3em",
          color: "var(--t3)",
        }}
      >
        Sound
      </span>
    </button>
  );
}

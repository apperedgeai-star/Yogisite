"use client";

import { useEffect, useState } from "react";
import { audioEngine } from "@/lib/audio";
import { cn } from "@/lib/utils";

const BAR_DURATIONS = ["0.6s", "0.8s", "0.5s", "0.9s", "0.7s"] as const;

type SoundToggleProps = {
  variant?: "dock" | "inline";
};

export default function SoundToggle({ variant = "dock" }: SoundToggleProps) {
  const [playing, setPlaying] = useState(false);
  const inline = variant === "inline";

  useEffect(() => audioEngine.subscribe(setPlaying), []);

  return (
    <button
      type="button"
      onClick={() => void audioEngine.toggle()}
      className={cn(
        "interactive flex items-center gap-2 transition-colors",
        inline
          ? "rounded-full border border-[var(--border-subtle)] px-3 py-2 hover:border-gold-300/40"
          : [
              "fixed bottom-8 right-8 z-floating gap-3",
              "rounded-full border border-[var(--border-subtle)] bg-deep/80 px-4 py-3 backdrop-blur-md",
              "hover:border-gold-300/40",
            ]
      )}
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={playing}
    >
      <div
        className={cn("flex items-end gap-[3px]", inline ? "h-4" : "h-5")}
        aria-hidden
      >
        {BAR_DURATIONS.map((duration, i) => (
          <span
            key={i}
            className="origin-bottom rounded-full bg-gold-300"
            style={{
              width: 3,
              height: inline ? 16 : 20,
              transform: playing ? undefined : "scaleY(0.2)",
              opacity: playing ? 1 : 0.4,
              animation: playing
                ? `soundBarPulse ${duration} ease-in-out alternate infinite`
                : "none",
            }}
          />
        ))}
      </div>
      <span className="font-satoshi text-[10px] uppercase tracking-widest text-secondary">
        Sound
      </span>
    </button>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { mainVideos, subVideos } from "@/lib/videos";
import { prefersReducedMotion } from "@/lib/utils";

function SquareThumb({
  src,
  selected,
  onSelect,
  label,
}: {
  src: string;
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`reel-square-thumb shrink-0 overflow-hidden tap-target ${selected ? "reel-square-thumb--active" : ""}`}
      onClick={onSelect}
      aria-label={label}
      aria-pressed={selected}
    >
      <LazyVideo src={src} pauseWhenHidden poster={undefined} />
    </button>
  );
}

function ScrollStrip({
  videos,
  direction,
  activeSrc,
  onSelect,
  labels,
}: {
  videos: string[];
  direction: "left" | "right";
  activeSrc: string;
  onSelect: (src: string) => void;
  labels: Record<string, string>;
}) {
  const reduced = prefersReducedMotion();
  const doubled = [...videos, ...videos];

  if (reduced) {
    return (
      <div className="flex gap-2 overflow-x-auto px-4">
        {videos.slice(0, 8).map((src) => (
          <SquareThumb
            key={src}
            src={src}
            selected={activeSrc === src}
            onSelect={() => onSelect(src)}
            label={labels[src] ?? "Featured reel"}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="reel-scroll-row overflow-hidden">
      <motion.div
        className="reel-scroll-track flex w-max gap-2 px-2"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {doubled.map((src, i) => (
          <SquareThumb
            key={`${src}-${i}`}
            src={src}
            selected={activeSrc === src}
            onSelect={() => onSelect(src)}
            label={labels[src] ?? "Featured reel"}
          />
        ))}
      </motion.div>
    </div>
  );
}

const FEATURED_LABELS: Record<string, string> = {
  "/videos/hero/homepage.mp4": "Featured",
  "/videos/main/video-1.mp4": "Nawaz Shaikh",
  "/videos/main/video-2.mp4": "Riya Upreti",
};

export default function ReelShowcaseMobile() {
  const half = Math.ceil(subVideos.length / 2);
  const row1 = subVideos.slice(0, half);
  const row2 = subVideos.slice(half);
  const [activeSrc, setActiveSrc] = useState(mainVideos[0]);

  return (
    <div className="reel-mobile-showcase pb-10 pt-4 lg:hidden">
      <ScrollStrip
        videos={row1}
        direction="left"
        activeSrc={activeSrc}
        onSelect={setActiveSrc}
        labels={FEATURED_LABELS}
      />

      <div className="flex justify-center px-4 py-4">
        <div className="reel-mobile-main">
          <p className="type-label mb-2 text-center">Featured Work</p>
          <div className="reel-mobile-main__card">
            <LazyVideo key={activeSrc} src={activeSrc} eager pauseWhenHidden={false} />
          </div>
        </div>
      </div>

      <ScrollStrip
        videos={row2}
        direction="right"
        activeSrc={activeSrc}
        onSelect={setActiveSrc}
        labels={FEATURED_LABELS}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { INFLUENCER_VIDEOS, subVideos } from "@/lib/videos";
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
}: {
  videos: string[];
  direction: "left" | "right";
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
            selected={false}
            onSelect={() => {}}
            label="Reel"
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
            selected={false}
            onSelect={() => {}}
            label="Reel"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function ReelShowcaseMobile() {
  const half = Math.ceil(subVideos.length / 2);
  const row1 = subVideos.slice(0, half);
  const row2 = subVideos.slice(half);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INFLUENCER_VIDEOS[activeIndex];

  return (
    <div className="reel-mobile-showcase pb-10 pt-4 lg:hidden">
      <ScrollStrip videos={row1} direction="left" />

      <div className="flex justify-center px-4 py-4">
        <div className="reel-mobile-main w-full max-w-[280px]">
          <p className="type-label mb-2 text-center">Featured Work</p>
          <div className="reel-mobile-main__card">
            <LazyVideo key={active.id} src={active.src} eager pauseWhenHidden={false} />
          </div>
          <div className="mt-3 flex justify-center gap-3">
            {INFLUENCER_VIDEOS.map((video, i) => (
              <button
                key={video.id}
                type="button"
                className={`reel-square-thumb tap-target ${activeIndex === i ? "reel-square-thumb--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={video.label}
                aria-pressed={activeIndex === i}
              >
                <LazyVideo src={video.src} eager pauseWhenHidden poster={undefined} />
                <span className="reel-square-thumb__label">{video.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ScrollStrip videos={row2} direction="right" />
    </div>
  );
}

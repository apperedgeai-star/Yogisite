"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { mainVideos, subVideos } from "@/lib/videos";
import { prefersReducedMotion } from "@/lib/utils";

function SquareThumb({ src }: { src: string }) {
  return (
    <div className="reel-square-thumb shrink-0 overflow-hidden">
      <LazyVideo src={src} pauseWhenHidden poster={undefined} />
    </div>
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
          <SquareThumb key={src} src={src} />
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
          <SquareThumb key={`${src}-${i}`} src={src} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ReelShowcaseMobile() {
  const half = Math.ceil(subVideos.length / 2);
  const row1 = subVideos.slice(0, half);
  const row2 = subVideos.slice(half);
  const main = mainVideos[0];

  return (
    <div className="reel-mobile-showcase pb-10 pt-4 lg:hidden">
      <ScrollStrip videos={row1} direction="left" />

      <div className="flex justify-center px-4 py-4">
        <div className="reel-mobile-main">
          <p className="type-label mb-2 text-center">Featured Work</p>
          <div className="reel-mobile-main__card">
            <LazyVideo src={main} eager pauseWhenHidden={false} />
          </div>
        </div>
      </div>

      <ScrollStrip videos={row2} direction="right" />
    </div>
  );
}

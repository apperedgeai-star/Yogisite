"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { subVideos } from "@/lib/videos";
import { prefersReducedMotion } from "@/lib/utils";

function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative h-[200px] w-[112px] shrink-0 overflow-hidden rounded-sm border border-[var(--b1)] sm:h-[220px] sm:w-[124px] [contain:strict]">
      <LazyVideo src={src} pauseWhenHidden />
    </div>
  );
}

function HorizontalMarquee({
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
      <div className="flex gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {videos.slice(0, 8).map((src) => (
          <VideoCard key={src} src={src} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-3 will-change-transform"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((src, i) => (
          <VideoCard key={`${src}-${i}`} src={src} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ReelShowcaseMobile() {
  const half = Math.ceil(subVideos.length / 2);
  const row1 = subVideos.slice(0, half);
  const row2 = subVideos.slice(half);

  return (
    <div className="space-y-3 pb-section-y pt-6 lg:hidden">
      <HorizontalMarquee videos={row1} direction="left" />
      <HorizontalMarquee videos={row2} direction="right" />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { mainVideos, leftVideos, rightVideos } from "@/lib/videos";
import { prefersReducedMotion } from "@/lib/utils";

function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative aspect-[9/16] w-full shrink-0 overflow-hidden rounded-sm border border-[var(--b1)] [contain:strict]">
      <LazyVideo src={src} pauseWhenHidden />
    </div>
  );
}

function ScrollColumn({ videos, direction }: { videos: string[]; direction: "up" | "down" }) {
  const doubled = [...videos, ...videos];
  return (
    <div className="h-full overflow-hidden">
      <div
        className={`flex flex-col gap-3 ${
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((src, i) => (
          <VideoCard key={`${src}-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
}

function CenterReel({ videos }: { videos: string[] }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();
  const duration = 8000;

  useEffect(() => {
    if (reduced || videos.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % videos.length);
      setProgress(0);
    }, duration);
    return () => clearInterval(interval);
  }, [videos.length, reduced]);

  useEffect(() => {
    if (reduced) return;
    setProgress(0);
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, reduced]);

  return (
    <div className="relative w-full max-w-[420px]">
      <p className="type-label mb-3 text-center">Featured Work</p>
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-sm border border-[var(--b-gold)] p-[2px]"
        style={{ boxShadow: "var(--shadow-glow)" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-void">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <LazyVideo src={videos[index]} eager pauseWhenHidden={false} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--b1)]">
            <div className="h-full bg-gold-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReelShowcaseDesktop() {
  return (
    <div className="relative hidden h-[min(100svh,920px)] overflow-hidden lg:block">
      <div className="absolute left-[4%] top-0 h-full w-[22vw] max-w-[280px]">
        <ScrollColumn videos={leftVideos} direction="up" />
      </div>
      <div className="absolute left-1/2 top-1/2 w-[min(30vw,420px)] -translate-x-1/2 -translate-y-1/2">
        <CenterReel videos={mainVideos} />
      </div>
      <div className="absolute right-[4%] top-0 h-full w-[22vw] max-w-[280px]">
        <ScrollColumn videos={rightVideos} direction="down" />
      </div>
    </div>
  );
}

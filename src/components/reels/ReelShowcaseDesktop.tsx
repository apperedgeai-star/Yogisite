"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { INFLUENCER_VIDEOS, leftVideos, rightVideos } from "@/lib/videos";
import { prefersReducedMotion } from "@/lib/utils";

function ScrollColumn({
  videos,
  direction,
}: {
  videos: string[];
  direction: "up" | "down";
}) {
  const doubled = [...videos, ...videos];
  return (
    <div className="h-full overflow-hidden">
      <div
        className={`flex flex-col gap-3 ${
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative aspect-[9/16] w-full shrink-0 overflow-hidden rounded-lg border border-[var(--b1)] bg-[var(--deep)] opacity-90 transition-opacity duration-300 hover:opacity-100"
          >
            <LazyVideo src={src} eager={i < 4} pauseWhenHidden />
          </div>
        ))}
      </div>
    </div>
  );
}

function CenterReel() {
  const videos = INFLUENCER_VIDEOS;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();
  const duration = 10000;

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
    <div className="reel-center-wrap mx-auto w-full max-w-[380px]">
      <p className="type-label mb-3 text-center">Featured Work</p>
      <div className="reel-center-card relative aspect-[9/16] overflow-hidden rounded-2xl border border-[var(--g300)] p-[2px] shadow-[var(--shadow-glow)]">
        <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-void">
          <AnimatePresence mode="wait">
            <motion.div
              key={videos[index].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <LazyVideo src={videos[index].src} eager pauseWhenHidden={false} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--b1)]">
            <div
              className="h-full origin-left bg-gold-300 will-change-transform"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <p className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold tracking-wide text-gold-300 backdrop-blur-sm">
            {videos[index].label}
          </p>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-3">
        {videos.map((video, videoIndex) => (
          <button
            key={video.id}
            type="button"
            className={`reel-square-thumb tap-target ${index === videoIndex ? "reel-square-thumb--active" : ""}`}
            onClick={() => {
              setIndex(videoIndex);
              setProgress(0);
            }}
            aria-label={`Play ${video.label}`}
            aria-pressed={index === videoIndex}
          >
            <LazyVideo src={video.src} eager pauseWhenHidden poster={undefined} />
            <span className="reel-square-thumb__label">{video.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReelShowcaseDesktop() {
  return (
    <div className="reel-desktop-showcase relative hidden min-h-[560px] overflow-hidden py-10 lg:block">
      <div className="absolute left-[5%] top-0 h-full w-[min(22vw,260px)] scale-95 opacity-80 transition-transform duration-300 hover:scale-[0.97] hover:opacity-100">
        <ScrollColumn videos={leftVideos} direction="up" />
      </div>
      <div className="absolute left-1/2 top-1/2 w-[min(30vw,380px)] -translate-x-1/2 -translate-y-1/2">
        <CenterReel />
      </div>
      <div className="absolute right-[5%] top-0 h-full w-[min(22vw,260px)] scale-95 opacity-80 transition-transform duration-300 hover:scale-[0.97] hover:opacity-100">
        <ScrollColumn videos={rightVideos} direction="down" />
      </div>
    </div>
  );
}

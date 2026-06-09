"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import {
  mainVideos,
  leftVideos,
  rightVideos,
} from "@/lib/videos";
import { fadeUp } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";

function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative aspect-[9/16] w-full shrink-0 overflow-hidden rounded-2xl">
      <LazyVideo src={src} />
    </div>
  );
}

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
    <div className="relative w-full">
      <p className="mb-3 text-center font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
        Featured Work
      </p>
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-2xl border-2 border-transparent p-[2px]"
        style={{
          background:
            "linear-gradient(135deg, var(--gold), var(--electric)) border-box",
          boxShadow:
            "0 0 80px rgba(201,168,76,0.25), 0 0 160px rgba(123,47,255,0.1)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[var(--bg-primary)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <LazyVideo src={videos[index]} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-[var(--gold)] transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show reel ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-[var(--gold)]" : "bg-[var(--text-muted)]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReelShowcase() {
  const allMobile = [...mainVideos, ...leftVideos, ...rightVideos];

  return (
    <section id="work" className="relative bg-[var(--bg-primary)]">
      <motion.div
        {...fadeUp}
        className="px-4 pb-8 pt-20 text-center md:px-6 lg:absolute lg:left-1/2 lg:top-8 lg:z-20 lg:-translate-x-1/2 lg:pb-0 lg:pt-0"
      >
        <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          The Work
        </p>
        <h2 className="mt-2 font-display text-4xl text-[var(--text-primary)] md:text-5xl">
          Reels that
          <br />
          built brands.
        </h2>
        <p className="mt-3 font-sans text-sm text-[var(--text-muted)]">
          125M+ views delivered. Real clients. Real results.
        </p>
      </motion.div>

      {/* Desktop */}
      <div className="relative hidden h-screen overflow-hidden lg:block">
        <div className="absolute left-[5%] top-0 h-full w-[22vw]">
          <ScrollColumn videos={leftVideos} direction="up" />
        </div>
        <div className="absolute left-1/2 top-1/2 w-[30vw] -translate-x-1/2 -translate-y-1/2">
          <CenterReel videos={mainVideos} />
        </div>
        <div className="absolute right-[5%] top-0 h-full w-[22vw]">
          <ScrollColumn videos={rightVideos} direction="down" />
        </div>
      </div>

      {/* Mobile grid */}
      <motion.div
        {...fadeUp}
        className="grid grid-cols-2 gap-3 px-4 pb-16 pt-8 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] lg:hidden"
      >
        {allMobile.map((src, i) => (
          <motion.div
            key={`${src}-m-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            className={`relative aspect-[9/16] overflow-hidden rounded-xl ${
              i < 2 ? "border-2 border-[var(--gold)]" : ""
            }`}
          >
            <LazyVideo src={src} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

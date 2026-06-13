"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { isGif } from "@/lib/videos";

type LazyVideoProps = {
  src: string;
  className?: string;
  alt?: string;
  /** Load and play immediately (featured reel) */
  eager?: boolean;
  /** Pause when scrolled off-screen — keeps marquee columns at 60fps */
  pauseWhenHidden?: boolean;
};

export function LazyVideo({
  src,
  className,
  alt = "",
  eager = false,
  pauseWhenHidden = !eager,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || isGif(src)) return;

    const loadAndPlay = () => {
      if (!loadedRef.current) {
        if (!eager) {
          el.src = src;
          el.load();
        }
        loadedRef.current = true;
      }
      void el.play().catch(() => {});
    };

    const pause = () => {
      if (!el.paused) el.pause();
    };

    if (eager) {
      loadedRef.current = true;
      loadAndPlay();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadAndPlay();
          if (!pauseWhenHidden) observer.disconnect();
        } else if (pauseWhenHidden) {
          pause();
        }
      },
      { rootMargin: "120px", threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, eager, pauseWhenHidden]);

  if (isGif(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        sizes="(max-width: 1024px) 50vw, 22vw"
        unoptimized
      />
    );
  }

  return (
    <video
      ref={videoRef}
      {...(eager ? { src } : {})}
      className={cn(
        "h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]",
        className
      )}
      muted
      autoPlay
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload={eager ? "auto" : "metadata"}
    />
  );
}

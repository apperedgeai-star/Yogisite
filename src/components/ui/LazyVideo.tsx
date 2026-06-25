"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { isGif } from "@/lib/videos";

type LazyVideoProps = {
  src: string;
  className?: string;
  alt?: string;
  eager?: boolean;
  pauseWhenHidden?: boolean;
  poster?: string;
};

export function LazyVideo({
  src,
  className,
  alt = "",
  eager = false,
  pauseWhenHidden = !eager,
  poster,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || isGif(src)) return;

    const onReady = () => {
      setLoading(false);
      setReady(true);
    };

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

    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);

    if (eager) {
      loadedRef.current = true;
      loadAndPlay();
      return () => {
        el.removeEventListener("loadeddata", onReady);
        el.removeEventListener("canplay", onReady);
      };
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
      { rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [src, eager, pauseWhenHidden]);

  if (isGif(src)) {
    return (
      <Image
        src={src}
        alt={alt || "Video preview"}
        fill
        className={cn("object-cover", className)}
        sizes="(max-width: 1024px) 50vw, 22vw"
        unoptimized
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {loading && <div className="video-shimmer reel-skeleton absolute inset-0 z-[1]" aria-hidden />}
      <video
        ref={videoRef}
        {...(eager ? { src } : {})}
        poster={poster ?? "/images/hero-ambient.jpg"}
        className={cn(
          "h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]",
          !ready && "opacity-0",
          ready && "opacity-100 transition-opacity duration-300",
          className
        )}
        muted
        autoPlay
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="metadata"
      />
    </div>
  );
}

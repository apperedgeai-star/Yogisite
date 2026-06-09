"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { isGif } from "@/lib/videos";

type LazyVideoProps = {
  src: string;
  className?: string;
  alt?: string;
  eager?: boolean;
};

export function LazyVideo({ src, className, alt = "", eager = false }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || isGif(src)) return;

    if (eager) {
      el.src = src;
      void el.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!el.getAttribute("src")) {
          el.src = src;
          void el.play().catch(() => {});
        }
        observer.disconnect();
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, eager]);

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
      className={cn("h-full w-full object-cover", className)}
      muted
      autoPlay
      loop
      playsInline
      preload="none"
    />
  );
}

"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { heroVideoEngine } from "@/lib/hero-video";
import { HERO_VIDEO } from "@/lib/videos";
import { ASSETS } from "@/lib/assets";

type HeroVideoProps = {
  className?: string;
};

export function HeroVideo({ className }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unregister = heroVideoEngine.register(el);

    const tryPlay = () => {
      if (el.paused) {
        void el.play().catch(() => {
          /* autoplay blocked until gesture — stays muted */
        });
      }
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay, { once: true });
    el.addEventListener("canplay", tryPlay, { once: true });

    const onVisibility = () => {
      if (document.hidden) {
        heroVideoEngine.mute();
        el.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const section = el.closest("#hero");
    let observer: IntersectionObserver | undefined;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) heroVideoEngine.mute();
        },
        { threshold: 0.15 }
      );
      observer.observe(section);
    }

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
      unregister();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={HERO_VIDEO}
      className={cn(
        "h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]",
        className
      )}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={ASSETS.heroAmbient}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
    />
  );
}

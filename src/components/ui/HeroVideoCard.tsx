"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroVideoEngine } from "@/lib/hero-video";
import { HERO_VIDEO } from "@/lib/videos";
import { ASSETS } from "@/lib/assets";

type HeroVideoCardProps = {
  className?: string;
};

export function HeroVideoCard({ className }: HeroVideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [audible, setAudible] = useState(false);

  useEffect(() => heroVideoEngine.subscribe(setAudible), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unregister = heroVideoEngine.register(el);

    const tryPlay = () => {
      if (el.paused) void el.play().catch(() => {});
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
    <div className={cn("hero-video-card", className)}>
      <video
        ref={ref}
        src={HERO_VIDEO}
        className="hero-video-card__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={ASSETS.heroAmbient}
        disablePictureInPicture
        disableRemotePlayback
      />
      <button
        type="button"
        className="hero-video-card__sound tap-target"
        onClick={() => void heroVideoEngine.toggle()}
        aria-label={audible ? "Mute video" : "Unmute video"}
        aria-pressed={audible}
      >
        {audible ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
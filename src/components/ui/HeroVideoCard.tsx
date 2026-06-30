"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroVideoEngine } from "@/lib/hero-video";
import { HERO_FEATURED_VIDEOS } from "@/lib/videos";
import { ASSETS } from "@/lib/assets";

type HeroVideoCardProps = {
  className?: string;
};

export function HeroVideoCard({ className }: HeroVideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [audible, setAudible] = useState(false);
  const active = HERO_FEATURED_VIDEOS[activeIndex];

  useEffect(() => heroVideoEngine.subscribe(setAudible), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    heroVideoEngine.mute();
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
  }, [activeIndex]);

  const selectVideo = (index: number) => {
    if (index === activeIndex) return;
    heroVideoEngine.mute();
    setActiveIndex(index);
  };

  return (
    <div className={cn("hero-video-card-stack", className)}>
      <div className="hero-video-card">
        <video
          key={active.id}
          ref={ref}
          src={active.src}
          className="hero-video-card__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={ASSETS.heroAmbient}
          style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
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

      <div className="hero-video-card__thumbs" role="tablist" aria-label="Featured work videos">
        {HERO_FEATURED_VIDEOS.map((video, index) => (
          <button
            key={video.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={video.label}
            className={cn(
              "hero-video-card__thumb tap-target",
              index === activeIndex && "hero-video-card__thumb--active"
            )}
            onClick={() => selectVideo(index)}
          >
            <video
              src={video.src}
              muted
              playsInline
              preload="metadata"
              poster={ASSETS.heroAmbient}
              aria-hidden
            />
            <span className="hero-video-card__thumb-label">{video.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { CONVERSATIONS } from "@/lib/content";

export function ConversationsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStart = useRef(0);
  const total = CONVERSATIONS.length;

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(total - 1, index)));
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((value) => (value - 1 + total) % total);
    setIsAutoPlaying(false);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((value) => (value + 1) % total);
    setIsAutoPlaying(false);
  }, [total]);

  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, total]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const diff = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) <= 40) return;
    diff > 0 ? next() : prev();
  };

  const slide = CONVERSATIONS[current];
  const followers = slide.stat === "—" ? "" : slide.stat;

  return (
    <div className="conversations-carousel">
      <div
        className="carousel-slide"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="carousel-image-wrapper">
          <Image
            key={slide.id}
            src={slide.image}
            alt={`${slide.name} - ${slide.session}`}
            fill
            quality={90}
            priority={current === 0}
            sizes="(max-width: 768px) 100vw, 90vw"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              background: "#0a0a0a",
            }}
          />
          <div className="carousel-overlay" />
        </div>

        <div className="carousel-text">
          <div className="carousel-name">{slide.name}</div>
          {followers && <div className="carousel-followers">{followers}</div>}
          <div className="carousel-session">{slide.session}</div>
        </div>
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-arrow--prev"
        onClick={prev}
        aria-label="Previous conversation"
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow--next"
        onClick={next}
        aria-label="Next conversation"
      >
        ›
      </button>

      <div className="carousel-dots">
        {CONVERSATIONS.map((conversation, index) => (
          <button
            key={conversation.id}
            type="button"
            className={`carousel-dot ${index === current ? "carousel-dot--active" : ""}`}
            onClick={() => {
              goTo(index);
              setIsAutoPlaying(false);
            }}
            aria-label={`Go to ${conversation.name}`}
            aria-current={index === current ? "true" : undefined}
          />
        ))}
      </div>

      <div className="carousel-counter">
        {current + 1} / {total}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { CONVERSATIONS } from "@/lib/content";

export function ConversationsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
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

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const slide = CONVERSATIONS[current];
  const followers = slide.stat === "—" ? "" : slide.stat;
  const hasError = imageErrors[slide.id];

  return (
    <div className="conversations-carousel">
      <div className="carousel-main">
        <div
          className="carousel-image-area"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!hasError ? (
            <div className="carousel-image-frame">
              <Image
                key={slide.id}
                src={slide.image}
                alt={`${slide.name} - ${slide.session}`}
                fill
                quality={92}
                priority={current === 0}
                sizes="(max-width: 768px) 100vw, 900px"
                className="carousel-image"
                style={{
                  objectFit: "contain",
                  objectPosition: "center center",
                }}
                onError={() => handleImageError(slide.id)}
              />
            </div>
          ) : (
            <div className="carousel-fallback">
              <div className="carousel-fallback__initials">{getInitials(slide.name)}</div>
              <p className="carousel-fallback__label">Session photo uploading soon</p>
            </div>
          )}
          {!hasError && <div className="carousel-image-overlay carousel-image-overlay--subtle" />}

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
        </div>

        <div className="carousel-info">
          <div className="carousel-info__name">{slide.name}</div>
          {followers && <div className="carousel-info__followers">{followers}</div>}
          <div className="carousel-info__session">{slide.session}</div>
        </div>
      </div>

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

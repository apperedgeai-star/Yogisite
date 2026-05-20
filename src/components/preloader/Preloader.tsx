"use client";

import { useEffect, useState, useRef } from "react";
import { loadGsap } from "@/lib/gsap-loader";
import { prefersReducedMotion } from "@/lib/utils";

type PreloaderProps = {
  onComplete: () => void;
};

/** Matches cubic-bezier(0.76, 0, 0.24, 1) */
const EASE_CURTAIN = "power4.inOut";
const VOID = "var(--void)";
const TOTAL_MS = 2700;
const COUNTER_START_MS = 200;
const COUNTER_END_MS = 1800;
const CURTAIN_START_MS = 2000;
const CURTAIN_DURATION = 0.7;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [phase, setPhase] = useState<"run" | "curtain" | "done">("run");
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = setTimeout(() => {
        setPhase("done");
        onCompleteRef.current();
      }, 120);
      return () => clearTimeout(t);
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let ctx: { revert: () => void } | undefined;

    timeouts.push(setTimeout(() => setShowCounter(true), COUNTER_START_MS));

    loadGsap().then(({ gsap }) => {
      const counter = { value: 0 };
      const line = { value: 0 };

      ctx = gsap.context(() => {
        gsap.to(counter, {
          value: 100,
          duration: (COUNTER_END_MS - COUNTER_START_MS) / 1000,
          delay: COUNTER_START_MS / 1000,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.value)),
        });

        gsap.to(line, {
          value: 100,
          duration: (COUNTER_END_MS - COUNTER_START_MS) / 1000,
          delay: COUNTER_START_MS / 1000,
          ease: "power2.inOut",
          onUpdate: () => setLineWidth(line.value),
        });

        timeouts.push(
          setTimeout(() => {
            setPhase("curtain");
            const top = topRef.current;
            const bottom = bottomRef.current;
            if (top && bottom) {
              gsap.to(top, {
                yPercent: -100,
                duration: CURTAIN_DURATION,
                ease: EASE_CURTAIN,
              });
              gsap.to(bottom, {
                yPercent: 100,
                duration: CURTAIN_DURATION,
                ease: EASE_CURTAIN,
              });
            }
          }, CURTAIN_START_MS)
        );
      }, rootRef);
    });

    timeouts.push(
      setTimeout(() => {
        setPhase("done");
        ctx?.revert();
        onCompleteRef.current();
      }, TOTAL_MS)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      ctx?.revert();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-preloader overflow-hidden"
      style={{ background: VOID }}
      aria-busy={phase === "run"}
      role="presentation"
    >
      <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center">
        <p className="type-label text-gold-300">RM18</p>

        <p
          className="type-preloader-count mt-8 text-primary transition-opacity duration-300"
          style={{ opacity: showCounter ? 1 : 0 }}
          aria-live="polite"
        >
          {String(count).padStart(2, "0")}
        </p>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[5] h-px bg-[var(--g300)]"
        style={{ width: `${lineWidth}%` }}
        aria-hidden
      />

      <div
        ref={topRef}
        className="absolute left-0 right-0 top-0 z-[3] h-1/2"
        style={{
          background: VOID,
          transform: phase === "curtain" ? undefined : "translateY(0)",
        }}
      />
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 z-[3] h-1/2"
        style={{
          background: VOID,
          transform: phase === "curtain" ? undefined : "translateY(0)",
        }}
      />
    </div>
  );
}

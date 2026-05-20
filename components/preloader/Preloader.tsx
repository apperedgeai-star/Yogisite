"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getPreloaderDurationMs,
  isMobileViewport,
  prefersReducedMotion,
} from "@/lib/utils";

type PreloaderProps = {
  onComplete: () => void;
};

type Phase = "intro" | "counting" | "tagline" | "curtain" | "done";

const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;
const VOID = "var(--bg-void)";

/** Standard ease-in-out (not linear) */
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const rafRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = setTimeout(() => {
        setPhase("done");
        onCompleteRef.current();
      }, 100);
      return () => clearTimeout(t);
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const mobile = isMobileViewport();
    const totalMs = getPreloaderDurationMs();

    const tCounter = mobile ? 200 : 300;
    const tTagline = mobile ? 1200 : 2400;
    const tCurtain = mobile ? 1400 : 2700;
    const tDone = totalMs;

    timeouts.push(setTimeout(() => setShowCounter(true), tCounter));
    timeouts.push(setTimeout(() => setPhase("counting"), tCounter));

    const counterDuration = mobile ? 900 : 2100;
    timeouts.push(
      setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / counterDuration, 1);
          const eased = easeInOut(t);
          setCount(Math.round(eased * 100));
          setProgress(eased);
          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick);
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      }, tCounter)
    );

    timeouts.push(setTimeout(() => setPhase("tagline"), tTagline));
    timeouts.push(setTimeout(() => setPhase("curtain"), tCurtain));
    timeouts.push(
      setTimeout(() => {
        setPhase("done");
        onCompleteRef.current();
      }, tDone)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (phase === "done") return null;

  const showTagline = phase === "tagline" || phase === "curtain";
  const showCount = showCounter && !showTagline;

  return (
    <motion.div
      className="fixed inset-0 z-preloader overflow-hidden"
      style={{ background: VOID }}
      aria-hidden={phase === "curtain"}
      role="presentation"
    >
      {/* Center content */}
      <div className="flex h-full flex-col items-center justify-center px-6">
        <motion.p
          className="font-editorial text-sm uppercase tracking-[0.4em] text-gold-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          RM18
        </motion.p>

        <div className="relative mt-10 flex min-h-[14vw] items-center justify-center">
          <AnimatePresence mode="wait">
            {showCount && (
              <motion.p
                key="counter"
                className="font-editorial tabular-nums text-primary"
                style={{
                  fontSize: "clamp(48px, 11vw, 120px)",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {String(count).padStart(3, "0")}
              </motion.p>
            )}
            {showTagline && (
              <motion.h1
                key="tagline"
                className="max-w-4xl text-center font-editorial uppercase leading-tight tracking-wide text-primary"
                style={{ fontSize: "clamp(18px, 3vw, 32px)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                We make founders famous
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom progress bar — grows 300ms → 2400ms */}
      <div
        className="fixed bottom-0 left-0 h-px bg-gold-300 transition-opacity duration-200"
        style={{
          width: `${progress * 100}%`,
          opacity: showCounter ? 1 : 0,
        }}
      />

      {/* Curtain split — starts 2700ms, 1000ms duration */}
      <AnimatePresence>
        {phase === "curtain" && (
          <>
            <motion.div
              className="absolute left-0 right-0 top-0 h-1/2"
              style={{ background: VOID }}
              initial={{ y: 0 }}
              animate={{ y: "-100vh" }}
              transition={{ duration: 1, ease: EASE_CURTAIN }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{ background: VOID }}
              initial={{ y: 0 }}
              animate={{ y: "100vh" }}
              transition={{ duration: 1, ease: EASE_CURTAIN }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

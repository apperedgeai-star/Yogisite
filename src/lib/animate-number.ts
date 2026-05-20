export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

type AnimateNumberOptions = {
  from?: number;
  to: number;
  durationMs?: number;
  ease?: (t: number) => number;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
};

/** Counter tween via rAF — no setInterval / GSAP. */
export function animateNumber({
  from = 0,
  to,
  durationMs = 2000,
  ease = easeOutCubic,
  onUpdate,
  onComplete,
}: AnimateNumberOptions): () => void {
  const start = performance.now();
  let rafId = 0;

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    const value = from + (to - from) * ease(t);
    onUpdate(value);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      onUpdate(to);
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}

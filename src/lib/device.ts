/** Viewport & hardware detection for responsive / perf tuning */

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/** Low-power: mobile viewport OR ≤4 CPU cores */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  const cores =
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : 8;
  return isMobileViewport() || cores <= 4;
}

export function getParticleCount(): number {
  if (typeof window === "undefined") return 4000;
  if (isLowPowerDevice()) return 1000;
  return 4000;
}

export function getDeviceDpr(): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio, 1.5);
}

export function getPreloaderDurationMs(): number {
  return 2700;
}

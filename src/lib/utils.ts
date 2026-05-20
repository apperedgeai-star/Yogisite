import { clsx, type ClassValue } from "clsx";

export {
  getDeviceDpr,
  getParticleCount,
  getPreloaderDurationMs,
  isLowPowerDevice,
  isMobileViewport,
  isTouchDevice,
} from "@/lib/device";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { SITE } from "@/lib/site";

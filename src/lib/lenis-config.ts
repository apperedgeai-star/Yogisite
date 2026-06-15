/** Lenis + GSAP ScrollTrigger shared easing (exponential ease-out). */
export const LENIS_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const LENIS_DURATION = 1.4;
export const LENIS_TOUCH_MULTIPLIER = 2;

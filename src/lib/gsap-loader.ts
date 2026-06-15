import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

type GsapBundle = {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerPlugin;
};

let bundlePromise: Promise<GsapBundle> | null = null;
let registered = false;

/** Lazy-load GSAP + ScrollTrigger (keeps them out of the initial JS chunk). */
export function loadGsap(): Promise<GsapBundle> {
  if (!bundlePromise) {
    bundlePromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapMod, stMod]) => {
      if (!registered) {
        gsapMod.gsap.registerPlugin(stMod.ScrollTrigger);
        registered = true;
        if (typeof document !== "undefined" && document.fonts?.ready) {
          document.fonts.ready.then(() => stMod.ScrollTrigger.refresh());
        }
      }
      return { gsap: gsapMod.gsap, ScrollTrigger: stMod.ScrollTrigger };
    });
  }
  return bundlePromise;
}

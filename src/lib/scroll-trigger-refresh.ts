import { loadGsap } from "@/lib/gsap-loader";

/** Refresh ScrollTrigger after webfonts load (prevents misaligned triggers). */
export function refreshScrollTriggerAfterFonts(): Promise<void> {
  return loadGsap().then(({ ScrollTrigger }) => {
    const refresh = () => ScrollTrigger.refresh();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      return document.fonts.ready.then(refresh);
    }
    refresh();
  });
}

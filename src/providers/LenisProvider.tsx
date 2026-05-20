"use client";

import Lenis from "@studio-freight/lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { loadGsap } from "@/lib/gsap-loader";
import {
  LENIS_DURATION,
  LENIS_EASING,
  LENIS_TOUCH_MULTIPLIER,
} from "@/lib/lenis-config";
import { refreshScrollTriggerAfterFonts } from "@/lib/scroll-trigger-refresh";
import { useScrollInit } from "@/providers/ScrollInitProvider";
import type { gsap as GsapCore } from "gsap";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  scrollVelocity: MutableRefObject<number>;
  scrollY: MutableRefObject<number>;
  gsapReady: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollVelocity: { current: 0 },
  scrollY: { current: 0 },
  gsapReady: false,
});

export function useLenis() {
  return useContext(SmoothScrollContext).lenis;
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function useGsapReady() {
  return useContext(SmoothScrollContext).gsapReady;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const { scrollReady } = useScrollInit();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [gsapReady, setGsapReady] = useState(false);
  const scrollVelocity = useRef(0);
  const scrollY = useRef(0);
  const gsapRef = useRef<typeof GsapCore | null>(null);

  useEffect(() => {
    if (!scrollReady) return;

    let lenisInstance: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      gsapRef.current = gsap;
      setGsapReady(true);

      lenisInstance = new Lenis({
        duration: LENIS_DURATION,
        easing: LENIS_EASING,
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: LENIS_TOUCH_MULTIPLIER,
        infinite: false,
      });

      setLenis(lenisInstance);

      lenisInstance.on("scroll", (e: { scroll: number; velocity: number }) => {
        scrollVelocity.current = e.velocity;
        scrollY.current = e.scroll;
        window.__scrollVelocity = e.velocity;
        ScrollTrigger.update();
      });

      raf = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      void refreshScrollTriggerAfterFonts();
    });

    return () => {
      cancelled = true;
      if (raf && gsapRef.current) {
        gsapRef.current.ticker.remove(raf);
      }
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then((st) => {
          st.ScrollTrigger.getAll().forEach((t) => t.kill());
        });
      }
      lenisInstance?.destroy();
      setLenis(null);
      setGsapReady(false);
      window.__scrollVelocity = 0;
    };
  }, [scrollReady]);

  return (
    <SmoothScrollContext.Provider
      value={{ lenis, scrollVelocity, scrollY, gsapReady }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

/** @deprecated Use LenisProvider */
export const SmoothScrollProvider = LenisProvider;

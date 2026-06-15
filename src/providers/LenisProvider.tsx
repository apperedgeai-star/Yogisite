"use client";

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
import { refreshScrollTriggerAfterFonts } from "@/lib/scroll-trigger-refresh";
import { useScrollInit } from "@/providers/ScrollInitProvider";

type SmoothScrollContextValue = {
  lenis: null;
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
  const lenis = null;
  const [gsapReady, setGsapReady] = useState(false);
  const scrollVelocity = useRef(0);
  const scrollY = useRef(0);

  useEffect(() => {
    if (!scrollReady) return;

    let cancelled = false;
    let lastY = window.scrollY;
    let lastT = performance.now();

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      setGsapReady(true);
      ScrollTrigger.refresh();
      void refreshScrollTriggerAfterFonts();
    });

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastT, 16);
      const velocity = ((y - lastY) / dt) * 1000;
      scrollVelocity.current = velocity;
      scrollY.current = y;
      window.__scrollVelocity = velocity;
      lastY = y;
      lastT = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then((st) => {
          st.ScrollTrigger.getAll().forEach((t) => t.kill());
        });
      }
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

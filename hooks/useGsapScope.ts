"use client";

import {
  useEffect,
  type DependencyList,
  type RefObject,
} from "react";
import { loadGsap } from "@/lib/gsap-loader";
import {
  getScopeElement,
  revertGsapScope,
  type GsapContextHandle,
} from "@/lib/gsap-scope";
import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export type GsapScopeApi = {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerPlugin;
};

/**
 * Mandatory GSAP pattern: scoped context + revert + ScrollTrigger cleanup on unmount.
 */
export function useGsapScope(
  containerRef: RefObject<HTMLElement | null>,
  setup: (api: GsapScopeApi) => void,
  deps: DependencyList,
  enabled = true
) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    let ctx: GsapContextHandle | undefined;
    let scrollTrigger: typeof ScrollTriggerPlugin | undefined;
    let cancelled = false;

    loadGsap().then((bundle) => {
      if (cancelled || !containerRef.current) return;
      scrollTrigger = bundle.ScrollTrigger;
      ctx = bundle.gsap.context(
        () => setup(bundle),
        containerRef
      ) as GsapContextHandle;
    });

    return () => {
      cancelled = true;
      const scope = getScopeElement(containerRef);
      revertGsapScope(ctx, scrollTrigger, scope);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup is intentional per deps array
  }, deps);
}

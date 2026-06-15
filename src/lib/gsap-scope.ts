import type { RefObject } from "react";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export type GsapContextHandle = {
  revert: () => void;
};

/** Kill ScrollTriggers whose trigger element lives inside `scope`. */
export function killScrollTriggersInScope(
  ScrollTrigger: typeof ScrollTriggerPlugin,
  scope: HTMLElement | null
) {
  if (!scope) return;
  ScrollTrigger.getAll().forEach((trigger) => {
    const el = trigger.trigger;
    if (!el) return;
    if (el === scope || (el instanceof Node && scope.contains(el))) {
      trigger.kill();
    }
  });
}

/** Mandatory teardown: revert context + scoped ScrollTrigger cleanup. */
export function revertGsapScope(
  ctx: GsapContextHandle | undefined,
  ScrollTrigger: typeof ScrollTriggerPlugin | undefined,
  scope: HTMLElement | null
) {
  ctx?.revert();
  if (ScrollTrigger) {
    killScrollTriggersInScope(ScrollTrigger, scope);
  }
}

export function getScopeElement(
  ref: RefObject<HTMLElement | null>
): HTMLElement | null {
  return ref.current;
}

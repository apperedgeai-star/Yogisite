"use client";

import { useEffect, useRef } from "react";
import { lerp } from "@/lib/utils";

export function useCanvasMouse(lerpFactor = 0.08) {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const step = () => {
    current.current.x = lerp(current.current.x, target.current.x, lerpFactor);
    current.current.y = lerp(current.current.y, target.current.y, lerpFactor);
    return current.current;
  };

  return { current, step };
}

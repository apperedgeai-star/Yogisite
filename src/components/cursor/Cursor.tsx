"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { isTouchDevice, lerp } from "@/lib/utils";

const RING_SIZE = 40;
const RING_HOVER_SCALE = 2;
const LERP = 0.12;

const dotStyle: React.CSSProperties = {
  width: 6,
  height: 6,
  background: "var(--g300)",
  borderRadius: "50%",
  position: "fixed",
  pointerEvents: "none",
  zIndex: "var(--z-cursor)",
  transform: "translate(-50%, -50%)",
  transition: "transform 0.1s, opacity 0.2s",
  left: 0,
  top: 0,
};

const ringBase: CSSProperties = {
  width: RING_SIZE,
  height: RING_SIZE,
  border: "1.5px solid rgba(212, 168, 67, 0.7)",
  background: "transparent",
  borderRadius: "50%",
  position: "fixed",
  pointerEvents: "none",
  zIndex: "var(--z-cursor)",
  transform: "translate(-50%, -50%)",
  transition:
    "width 0.25s, height 0.25s, border-color 0.25s, background 0.25s",
  left: 0,
  top: 0,
};

function isHoverTarget(el: HTMLElement | null): boolean {
  if (!el) return false;
  return Boolean(
    el.closest(".hoverable, a, button, .interactive, .magnetic, [data-cursor]")
  );
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const visible = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (isTouchDevice()) return;

    document.documentElement.classList.add("custom-cursor");

    const show = () => {
      if (!visible.current && dotRef.current && ringRef.current) {
        visible.current = true;
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "1";
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      show();

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      const nextHover = isHoverTarget(e.target as HTMLElement);
      if (nextHover !== hovering.current) {
        hovering.current = nextHover;
        const ring = ringRef.current;
        if (ring) {
          const size = nextHover ? RING_SIZE * RING_HOVER_SCALE : RING_SIZE;
          ring.style.width = `${size}px`;
          ring.style.height = `${size}px`;
          ring.style.background = nextHover
            ? "rgba(212, 168, 67, 0.2)"
            : "transparent";
          ring.style.borderColor = nextHover
            ? "rgba(212, 168, 67, 0.9)"
            : "rgba(212, 168, 67, 0.7)";
        }
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      visible.current = false;
    };

    const loop = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, LERP);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, LERP);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    if (dotRef.current) dotRef.current.style.opacity = "0";
    if (ringRef.current) ringRef.current.style.opacity = "0";

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={dotStyle} aria-hidden />
      <div ref={ringRef} className="cursor-ring" style={ringBase} aria-hidden />
    </>
  );
}

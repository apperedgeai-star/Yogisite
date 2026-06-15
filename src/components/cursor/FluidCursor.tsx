"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import { gsap } from "gsap";
import { cn, isTouchDevice, lerp } from "@/lib/utils";
import { useMagneticElements } from "@/lib/useMagneticElements";

type CursorState = "default" | "link" | "drag" | "magnetic" | "video";

const TRAIL_LENGTH = 12;
const LERP = 0.08;
const GOLD = "#D4A843";

const cursorLayer: CSSProperties = {
  pointerEvents: "none",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: "var(--z-cursor)",
};

function detectState(target: HTMLElement): CursorState {
  if (target.closest("video, .play-area, [data-cursor='video']")) {
    return "video";
  }
  if (target.closest(".drag-item, [data-cursor='drag']")) {
    return "drag";
  }
  if (target.closest(".magnetic")) {
    return "magnetic";
  }
  if (target.closest("a, button, .interactive, [data-cursor]")) {
    const el = target.closest("[data-cursor]") as HTMLElement | null;
    if (el?.dataset.cursor === "video") return "video";
    if (el?.dataset.cursor === "drag") return "drag";
    return "link";
  }
  return "default";
}

function getMagneticCenter(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export default function FluidCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const stateRef = useRef<CursorState>("default");
  const rafRef = useRef<number>(0);
  const [active, setActive] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  useMagneticElements(active);

  const setCursorState = useCallback((next: CursorState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  useEffect(() => {
    if (isTouchDevice()) {
      document.documentElement.style.cursor = "auto";
      document.documentElement.classList.remove("custom-cursor");
      return;
    }

    setActive(true);
    document.documentElement.classList.add("custom-cursor");

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      const magnetic = (e.target as HTMLElement).closest<HTMLElement>(
        ".magnetic"
      );
      if (magnetic && stateRef.current === "magnetic") {
        const c = getMagneticCenter(magnetic);
        x = lerp(x, c.x, 0.35);
        y = lerp(y, c.y, 0.35);
      }

      target.current.x = x;
      target.current.y = y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      trail.current.push({ x: e.clientX, y: e.clientY });
      if (trail.current.length > TRAIL_LENGTH) trail.current.shift();
    };

    const onOver = (e: MouseEvent) => {
      setCursorState(detectState(e.target as HTMLElement));
    };

    const onDown = () => {
      const ring = ringRef.current;
      if (!ring) return;
      const s = stateRef.current;
      const endScale =
        s === "link" ? 2.2 : s === "magnetic" ? 1.5 : 1;
      gsap.fromTo(
        ring,
        { scale: 0.7 },
        { scale: endScale, duration: 0.55, ease: "elastic.out(1.2, 0.4)" }
      );
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);

    const loop = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        trail.current.forEach((p, i) => {
          const t = (i + 1) / trail.current.length;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 + t * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 201, 110, ${t * 0.35})`;
          ctx.fill();
        });
      }

      ringPos.current.x = lerp(ringPos.current.x, target.current.x, LERP);
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, LERP);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setCursorState]);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || !active) return;

    const isLink = state === "link";
    const isDrag = state === "drag";
    const isVideo = state === "video";
    const isMagnetic = state === "magnetic";
    const hideDot = isLink || isDrag || isVideo;

    gsap.to(ring, {
      scale: isLink ? 2.2 : isMagnetic ? 1.5 : 1,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(dot, {
      scale: hideDot ? 0 : 1,
      opacity: hideDot ? 0 : 1,
      duration: 0.25,
    });
  }, [state, active]);

  if (!active) return null;

  const isLink = state === "link";
  const isDrag = state === "drag";
  const isVideo = state === "video";

  return (
    <>
      <canvas ref={canvasRef} className="cursor-trail" style={cursorLayer} aria-hidden />

      <div
        ref={dotRef}
        className="cursor-dot rounded-full"
        style={{
          ...cursorLayer,
          width: 8,
          height: 8,
          background: GOLD,
        }}
      />

      <div
        ref={ringRef}
        className={cn(
          "cursor-ring flex items-center justify-center font-satoshi",
          (isLink || isVideo) && "cursor-ring--filled"
        )}
        style={{
          ...cursorLayer,
          width: isDrag ? 80 : 44,
          height: isDrag ? 30 : 44,
          borderRadius: isDrag ? 9999 : "50%",
        }}
      >
        {isLink && (
          <span className="text-[9px] font-medium uppercase tracking-widest text-primary">
            View
          </span>
        )}
        {isDrag && (
          <span className="text-[9px] font-medium uppercase tracking-widest text-primary">
            Drag
          </span>
        )}
        {isVideo && (
          <span className="text-sm leading-none text-primary" aria-hidden>
            ▶
          </span>
        )}
      </div>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getDeviceDpr, isMobileViewport, prefersReducedMotion } from "@/lib/utils";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const ParticleField = lazy(() => import("./ParticleField"));

export function SceneCanvas() {
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.85, 0.5]);

  useEffect(() => {
    const sync = () => {
      setDesktop(!isMobileViewport());
      setDpr(getDeviceDpr());
    };
    sync();
    setMounted(true);
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (!mounted) return null;

  if (prefersReducedMotion() || !desktop) {
    return null;
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        opacity,
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        dpr={Math.max(1.5, Math.min(dpr, 2))}
        gl={{
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

export default SceneCanvas;

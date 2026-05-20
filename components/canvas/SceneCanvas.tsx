"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleUniverse } from "./ParticleUniverse";
import { FloatingGeometries } from "./FloatingGeometries";
import {
  getDeviceDpr,
  isMobileViewport,
  prefersReducedMotion,
} from "@/lib/utils";

export function SceneCanvas() {
  const [dpr, setDpr] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setDpr(getDeviceDpr());
    setMobile(isMobileViewport());
    setMounted(true);

    const onResize = () => {
      setDpr(getDeviceDpr());
      setMobile(isMobileViewport());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted || prefersReducedMotion()) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,169,78,0.06), transparent 70%), var(--bg-void)",
        }}
      />
    );
  }

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 6], fov: 75, near: 0.1, far: 100 }}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ParticleUniverse />
        {!mobile && <FloatingGeometries />}
      </Suspense>
    </Canvas>
  );
}

export default SceneCanvas;

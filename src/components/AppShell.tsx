"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/Preloader";
import Navbar from "@/components/layout/Navbar";
import { useScrollInit } from "@/providers/ScrollInitProvider";
import { useMagneticElements } from "@/lib/useMagneticElements";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { prefersReducedMotion } from "@/lib/utils";

const SceneCanvas = dynamic(
  () => import("@/components/canvas/SceneCanvas"),
  { ssr: false }
);

const FluidCursor = dynamic(
  () => import("@/components/cursor/FluidCursor"),
  { ssr: false }
);

type AppShellProps = {
  children: (ready: boolean) => ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [ready, setReady] = useState(false);
  const { markScrollReady } = useScrollInit();
  const isDesktop = useIsDesktop();
  const enableDesktopFx = isDesktop && !prefersReducedMotion();

  useMagneticElements(ready && enableDesktopFx);

  const handlePreloaderComplete = () => {
    setReady(true);
    markScrollReady();
  };

  return (
    <>
      {!ready && <Preloader onComplete={handlePreloaderComplete} />}
      {enableDesktopFx && <SceneCanvas />}
      {enableDesktopFx && <FluidCursor />}
      <Navbar />
      {children(ready)}
    </>
  );
}

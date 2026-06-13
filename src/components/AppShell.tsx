"use client";

import { useEffect, type ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { useScrollInit } from "@/providers/ScrollInitProvider";

type AppShellProps = {
  children: (ready: boolean) => ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const { markScrollReady } = useScrollInit();

  useEffect(() => {
    markScrollReady();
  }, [markScrollReady]);

  return (
    <>
      <Navbar />
      {children(true)}
    </>
  );
}

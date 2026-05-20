"use client";

import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}

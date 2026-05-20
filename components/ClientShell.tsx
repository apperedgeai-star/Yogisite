"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { bindFirstInteractionAudio } from "@/lib/audio";
import { isTouchDevice } from "@/lib/utils";
import Preloader from "@/components/preloader/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

const SceneCanvas = dynamic(
  () => import("@/components/canvas/SceneCanvas"),
  { ssr: false }
);
const FluidCursor = dynamic(
  () => import("@/components/cursor/FluidCursor"),
  { ssr: false }
);

const Problem = dynamic(() => import("@/components/sections/Problem"));
const UnfairAdvantage = dynamic(
  () => import("@/components/sections/UnfairAdvantage")
);
const Services = dynamic(() => import("@/components/sections/Services"));
const ProofOfWork = dynamic(
  () => import("@/components/sections/ProofOfWork")
);
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const About = dynamic(() => import("@/components/sections/About"));
const Programs = dynamic(() => import("@/components/sections/Programs"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function ClientShell() {
  const [loading, setLoading] = useState(true);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
    const cleanup = bindFirstInteractionAudio();
    return cleanup;
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <SceneCanvas />}
      {!loading && !touch && <FluidCursor />}
      <Navbar />
      <main className="relative z-content">
        <Hero ready={!loading} />
        {!loading && (
          <>
            <Problem />
            <UnfairAdvantage />
            <Services />
            <ProofOfWork />
            <HowItWorks />
            <About />
            <Programs />
            <FAQ />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}

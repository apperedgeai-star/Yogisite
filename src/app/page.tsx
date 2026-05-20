"use client";

/**
 * Home — all sections assembled (mobile-first order).
 */
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { bindFirstInteractionAudio } from "@/lib/audio";
import { refreshScrollTriggerAfterFonts } from "@/lib/scroll-trigger-refresh";
import { useMagneticElements } from "@/lib/useMagneticElements";
import Preloader from "@/components/preloader/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeBar from "@/components/sections/MarqueeBar";
import SoundToggle from "@/components/ui/SoundToggle";

const SceneCanvas = dynamic(
  () => import("@/components/canvas/SceneCanvas"),
  { ssr: false }
);
const Cursor = dynamic(() => import("@/components/cursor/Cursor"), {
  ssr: false,
});

const Problem = dynamic(() => import("@/components/sections/Problem"));
const Mechanism = dynamic(() => import("@/components/sections/Mechanism"));
const Services = dynamic(() => import("@/components/sections/Services"));
const ProofOfWork = dynamic(
  () => import("@/components/sections/ProofOfWork")
);
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const About = dynamic(() => import("@/components/sections/About"));
const Programs = dynamic(() => import("@/components/sections/Programs"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useMagneticElements(!loading);

  useEffect(() => {
    return bindFirstInteractionAudio();
  }, []);

  useEffect(() => {
    if (loading) return;
    void refreshScrollTriggerAfterFonts();
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <SceneCanvas />}
      {!loading && <Cursor />}
      {!loading && <SoundToggle variant="dock" />}
      <Navbar />
      <main className="relative z-content">
        <Hero ready={!loading} />
        <MarqueeBar />
        <Problem />
        <Mechanism />
        <Services />
        <ProofOfWork />
        <HowItWorks />
        <About />
        <Programs />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

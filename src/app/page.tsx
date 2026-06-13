"use client";

import dynamic from "next/dynamic";
import AppShell from "@/components/AppShell";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Problem from "@/components/sections/Problem";
import Mechanism from "@/components/sections/Mechanism";
import Services from "@/components/sections/Services";
import RecunAI from "@/components/sections/RecunAI";
import ProofOfWork from "@/components/sections/ProofOfWork";
import RealConversations from "@/components/sections/RealConversations";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

const ReelShowcase = dynamic(() => import("@/components/ReelShowcase"));

export default function HomePage() {
  return (
    <AppShell>
      {(ready) => (
        <main className="relative z-content">
          <Hero ready={ready} />
          <Ticker />
          <Problem />
          <ReelShowcase />
          <Mechanism />
          <Services />
          <RecunAI />
          <ProofOfWork />
          <RealConversations />
          <About />
          <Programs />
          <FAQ />
          <Footer />
        </main>
      )}
    </AppShell>
  );
}

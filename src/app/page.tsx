"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import Ticker from "@/components/Ticker";

const ReelShowcase = dynamic(() => import("@/components/ReelShowcase"));
const Mechanism = dynamic(() => import("@/components/Mechanism"));
const DragonHead = dynamic(() => import("@/components/DragonHead"));
const JupiterNode = dynamic(() => import("@/components/JupiterNode"));
const RecunAI = dynamic(() => import("@/components/RecunAI"));
const CaseStudies = dynamic(() => import("@/components/CaseStudies"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const RealConversations = dynamic(() => import("@/components/RealConversations"));
const Founder = dynamic(() => import("@/components/Founder"));
const ContentPrograms = dynamic(() => import("@/components/ContentPrograms"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <StatStrip />
        <Ticker />
        <ReelShowcase />
        <Mechanism />
        <DragonHead />
        <JupiterNode />
        <RecunAI />
        <CaseStudies />
        <Testimonials />
        <RealConversations />
        <Founder />
        <ContentPrograms />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

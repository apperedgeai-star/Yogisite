/**
 * Canonical public asset paths — premium redesign.
 *
 * Section mapping:
 * - logo, portrait → Navbar, Footer, About
 * - heroAmbient, og → Hero ambient, social share
 * - clients.* → MarqueeBar, ProofOfWork
 * - conversations.* → RealConversations
 * - services.dragon | jupiter → Services tab panels
 * - networkShowcase → Mechanism / NetworkDiagram
 * - programs.* → Programs cards
 * - logos.* → brand marks (Recun wordmark)
 * - audio → SoundToggle ambient loop
 */
export const ASSETS = {
  logo: "/logo.png",
  portrait: "/yogikumar.png",
  heroAmbient: "/images/hero-ambient.jpg",
  og: "/images/og-image.jpg",
  audio: "/audio/ambient-loop.mp3",
  favicon: "/favicon.ico",
  clients: {
    vision11: "/images/clients/vision11.png",
    starbucks: "/images/clients/starbucks.png",
    rapido: "/images/clients/rapido.webp",
  },
  conversations: {
    nawazShaikh: "/images/conversations/nawaz-shaikh.jpg",
    riyaUpreti: "/images/conversations/riya-upreti.jpg",
    subhankarSengupta: "/images/conversations/subhankar-sengupta.jpg",
    viplavGaurav: "/images/conversations/viplav-gaurav.jpg",
    rjDheeraj: "/images/conversations/rj-dheeraj.jpg",
    karthikNaidu: "/images/conversations/karthik-naidu.jpg",
    romilMavani: "/images/conversations/romil-mavani.jpg",
    kasimShaikh: "/images/conversations/kasim-shaikh.jpg",
    dabhiManthan: "/images/conversations/dabhi-manthan.jpg",
    multiSession: "/images/conversations/multi-session.jpg",
  },
  services: {
    dragon: "/dragon.webp",
    jupiter: "/jupiter.webp",
    jupiterAlt: "/jupitorwebp.webp",
  },
  logos: {
    trm: "/logos/trm-icon.svg",
    recun: "/logos/recun-full-logo.svg",
  },
  networkShowcase: "/soicial_platform_showcase.jpeg",
} as const;


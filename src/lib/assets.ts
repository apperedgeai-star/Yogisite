/**
 * Canonical public asset paths — premium redesign.
 *
 * Section mapping:
 * - portrait, heroAmbient → Hero, About
 * - og → layout metadata / social share
 * - clients.* → MarqueeBar, ProofOfWork
 * - services.dragon | jupiter → Services tab panels
 * - networkShowcase → Mechanism / NetworkDiagram
 * - audio → SoundToggle ambient loop
 * - fonts.* → globals.css @font-face
 * - favicon → layout icons
 */
export const ASSETS = {
  portrait: "/images/yogii-portrait.jpg",
  heroAmbient: "/images/hero-ambient.jpg",
  og: "/images/og-image.jpg",
  audio: "/audio/ambient-loop.mp3",
  fonts: {
    editorial: "/fonts/CormorantGaramond.woff2",
    satoshi: "/fonts/Satoshi-Variable.woff2",
  },
  clients: {
    vision11: "/images/clients/vision11.png",
    starbucks: "/images/clients/starbucks.png",
    rapido: "/images/clients/rapido.webp",
  },
  services: {
    dragon: "/dragon.webp",
    jupiter: "/jupiter.webp",
  },
  favicon: "/favicon.ico",
  networkShowcase: "/soicial_platform_showcase.jpeg",
} as const;

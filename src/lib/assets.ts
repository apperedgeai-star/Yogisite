/**
 * Canonical public asset paths — v3 delivery.
 *
 * Section mapping:
 * - portrait → Hero (desktop bg), About
 * - og → layout metadata / social share
 * - clients.* → MarqueeBar, ProofOfWork
 * - services.dragon | jupiter → Services tab panels (optional imagery)
 * - audio → SoundToggle ambient loop
 * - fonts.* → globals.css @font-face
 * - favicon → layout icons
 */
export const ASSETS = {
  portrait: "/images/yogii-portrait.jpg",
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
} as const;

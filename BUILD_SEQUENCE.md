# Build Sequence — Recun Marketing 18

## Phase 1 — Foundation
- [x] Next.js 14 + dependencies (`package.json`)
- [x] `app/globals.css` — full CSS variable system + scrollbar
- [x] Assets → `public/` (run `scripts/sync-assets.ps1`)
- [x] `providers/SmoothScrollProvider.tsx` — Lenis + GSAP sync
- [x] `components/canvas/SceneCanvas.tsx` — R3F particles + geometries
- [x] `components/cursor/FluidCursor.tsx`
- [x] `app/layout.tsx` — metadata, fonts, `Providers`

**Test:** `npm run dev` — canvas behind content, smooth scroll, custom cursor (desktop).

## Phase 2 — Shell
- [x] `components/preloader/Preloader.tsx`
- [x] `components/layout/Navbar.tsx` + `OverlayMenu.tsx`
- [x] `components/ui/SoundToggle.tsx` — no autoplay (`bindFirstInteractionAudio`)

**Test:** Preloader 000→100, curtain split, hamburger menu.

## Phase 3 — Hero + Problem
- [x] `components/sections/Hero.tsx` — entry + scroll-out
- [x] `components/sections/Problem.tsx` — stats + statement

## Phase 4 — Core Sections
- [x] `UnfairAdvantage.tsx` — sticky split
- [x] `Services.tsx` — horizontal pin (desktop), **vertical stack (mobile)**
- [x] `ProofOfWork.tsx` — masonry
- [x] `HowItWorks.tsx` — SVG timeline

## Phase 5 — Final Sections
- [x] `About.tsx` — parallax portrait
- [x] `Programs.tsx` — glass cards
- [x] `FAQ.tsx` + `AccordionCard.tsx`
- [x] `Footer.tsx` — magnetic CTA

## Phase 6 — Polish
- [x] Mobile perf (particles 1000, no geometries on mobile, touch cursor off)
- [x] `useGsapScope` / `useR3FDispose` cleanup patterns
- [x] `prefers-reduced-motion` in globals + sections
- [x] Metadata + OG in `layout.tsx`

**Final test:** Lighthouse > 90, 60fps — run in Chrome DevTools.

## Non-negotiables
1. No pure `#000` / `#FFF` — use `--bg-void`, `--text-primary`
2. Fonts: Editorial + Satoshi only
3. No nested `<p>` in `<p>`
4. GSAP/R3F/listener cleanup in `useEffect`
5. Images in `overflow-hidden` containers
6. Audio only after user gesture
7. Colors via CSS variables (layout/size may use inline)
8. Z-index: canvas -1 → content 10 → header 50 → preloader 90 → cursor 100
9. Services: vertical on mobile
10. R3F geometry/material in `useMemo`

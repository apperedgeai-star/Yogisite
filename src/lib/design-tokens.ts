/** Canonical design tokens — mirrored in globals.css :root */
export const GRID = {
  containerMax: "80rem",
  narrowMax: "48rem",
  proseMax: "40rem",
  columns: 12,
  gap: "clamp(1rem, 3vw, 1.5rem)",
  sectionX: "clamp(1.25rem, 6vw, 5rem)",
  sectionY: "clamp(5rem, 12vw, 10rem)",
} as const;

export const COLORS = {
  void: "#080808",
  deep: "#060606",
  surface: "#0c0c0c",
  card: "#111111",
  gold100: "#fff9ed",
  gold200: "#f5e6b8",
  gold300: "#d4a843",
  gold400: "#b8921e",
  gold500: "#8f6e0c",
  textPrimary: "#f2ede6",
  textSecondary: "#9d9890",
  textMuted: "#9d9890",
  textGhost: "rgba(157, 152, 144, 0.45)",
} as const;

export const FONTS = {
  display: '"Editorial", "Cormorant Garamond", Georgia, serif',
  body: '"Satoshi", system-ui, sans-serif',
} as const;

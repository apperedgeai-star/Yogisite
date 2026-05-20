import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        void: "var(--bg-void)",
        deep: "var(--bg-deep)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        gold: {
          100: "var(--gold-100)",
          200: "var(--gold-200)",
          300: "var(--gold-300)",
          400: "var(--gold-400)",
          500: "var(--gold-500)",
        },
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        ghost: "var(--text-ghost)",
        /* legacy */
        black: "var(--bg-void)",
        "off-black": "var(--bg-deep)",
        graphite: "var(--bg-surface)",
        charcoal: "var(--bg-elevated)",
        cream: "var(--gold-100)",
        white: "var(--text-primary)",
        accent: "var(--gold-300)",
        "accent-alt": "var(--gold-200)",
      },
      fontFamily: {
        editorial: ['"Editorial"', '"Cormorant Garamond"', "serif"],
        satoshi: ['"Satoshi"', "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        hero: "var(--text-hero)",
        giant: "var(--text-giant)",
      },
      zIndex: {
        canvas: "-1",
        content: "10",
        sticky: "20",
        floating: "30",
        header: "50",
        overlay: "80",
        preloader: "90",
        cursor: "100",
      },
      boxShadow: {
        gold: "0 0 40px var(--gold-glow)",
        "gold-hard": "0 0 30px var(--gold-glow-hard)",
      },
    },
  },
  plugins: [],
};

export default config;

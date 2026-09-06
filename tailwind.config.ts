import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// THEME TOKENS — all colors resolve to CSS custom properties defined in
// app/globals.css (`:root`). To re-brand this template for a different
// business, you only need to edit the numbers in globals.css — nothing here
// or in any component needs to change.
// ---------------------------------------------------------------------------

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: withOpacity("--color-accent"),
          dim: withOpacity("--color-accent-dim"),
        },
        ink: withOpacity("--color-ink"),
        surface: {
          base: withOpacity("--color-surface-base"),
          panel: withOpacity("--color-surface-panel"),
          elevated: withOpacity("--color-surface-elevated"),
          line: withOpacity("--color-surface-line"),
        },
        status: {
          ok: withOpacity("--color-status-ok"),
          warn: withOpacity("--color-status-warn"),
          bad: withOpacity("--color-status-bad"),
          idle: withOpacity("--color-status-idle"),
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        accent: "0 0 0 1px rgb(var(--color-accent) / 0.15), 0 0 24px rgb(var(--color-accent) / 0.06)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

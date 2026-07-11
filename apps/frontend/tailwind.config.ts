import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;

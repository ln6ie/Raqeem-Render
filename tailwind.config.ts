import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B3A6B",
        "primary-light": "#2952A3",
        "primary-muted": "#E8EEF8",
        accent: "#3B82F6",
        surface: "#F8FAFC",
        border: "#E2E8F0",
        "text-primary": "#0F172A",
        "text-muted": "#64748B",
        success: "#10B981",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;

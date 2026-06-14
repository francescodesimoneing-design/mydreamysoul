import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        blush: "#E8CFCF",
        "warm-beige": "#DCC8A0",
        sage: "#AAB7A3",
        anthracite: "#2F2F2F",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 22px 60px rgba(47, 47, 47, 0.08)",
        editorial: "0 28px 80px rgba(47, 47, 47, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;

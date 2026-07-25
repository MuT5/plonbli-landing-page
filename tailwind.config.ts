import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Alegreya Sans"', '"Segoe UI"', "sans-serif"],
        display: ['"Alegreya"', "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-atlas)"],
        display: ["var(--font-titles)"],
      },
      colors: {
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
} satisfies Config;

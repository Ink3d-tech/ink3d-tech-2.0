import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { 
    extend: {
      backgroundColor: {
        primary: "#000",
        secondary: "#FFF",
        terciary: "#D9D9D9"
      },
      borderColor: {
        primary: "#D9D9D9"
      },
      colors: {
        "primary": "#000",
        "secondary": "#FFF",
        "terciary": "#D9D9D9",
        "btnPrimary": "#0865F0",
        "btnSecondary": "0095F6",
        "background": "#D9D9D9",
        "inputPrimary": "#121212",
        "inputSecondary": "#727070",
        "shadow-gray": "rgba(0, 0, 0, 0.25)",
        "some-gray": "#B0B0B0"
      },
    },
  },
  plugins: [],
} satisfies Config;
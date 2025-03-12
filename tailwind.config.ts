import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { 
    extend: {
      maxWidth: {
        '8xl': '88rem',  // 1408px
        '9xl': '96rem',  // 1536px
        '10xl': '104rem', // 1664px
      },
      spacing: {
        21: "5.25rem", // 21 * 0.25rem = 5.25rem (84px)
        22: "5.5rem",  // 22 * 0.25rem = 5.5rem (88px)
        23: "5.75rem", // 23 * 0.25rem = 5.75rem (92px)
      },
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
        "some-gray": "#B0B0B0",
        "account-primary": "#727070"
      },
    },
  },
  plugins: [],
} satisfies Config;
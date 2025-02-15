import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: ["class", '[data-mode="dark"]'],

  theme: {
    extend: {
      colors: {
        primary: "#CC8F00",

        text: {
          100: "#1E1E1E",
          200: "#050706",
          300: "#B9B9B9",
        },
        bg: {
          100: "#D20832",
          200: "#FEF0D2",
          300: "#0D0E0E",
          400: "#191919",
          500: "#272727",
          600: "#FEF0D233",
          700: "#050706",
        },

        border: {
          100: "#D0D0D0",
          200: "#DCDCDC",
          300: "#DCDCDC4D",
          400: "#3D3D3D",
        },

        "bg-dark": {
          400: "#1D1F1E",
          500: "#1D1F1C",
        },

        gold: {
          100: "#FEFEF1",
          200: "#CA8E0E",
        },

        "gold-dark": {
          100: "#464646",
        },
      },
      screens: {
        "3xs": "350px",
        "2xs": "480px",
        xs: "576px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
        "3xl": "1600px",
        "4xl": "1800px",
      },

      fontFamily: {
        extralight: ["manrope-extraLight", "sans-serif"],
        light: ["manrope-light", "sans-serif"],
        regular: ["manrope-regular", "sans-serif"],
        medium: ["manrope-medium", "sans-serif"],
        semibold: ["manrope-semiBold", "sans-serif"],
        bold: ["manrope-bold", "sans-serif"],
        extrabold: ["manrope-extraBold", "sans-serif"],

        iregular: ["instrumental-sans-regular", "sans-serif"],
        imedium: ["instrumental-sans-medium", "sans-serif"],
        isemibold: ["instrumental-sans-semiBold", "sans-serif"],
        ibold: ["instrumental-sans-bold", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
